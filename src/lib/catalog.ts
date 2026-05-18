import {
  collection, doc, getDoc, getDocs,
  increment, orderBy, query, runTransaction, setDoc,
  serverTimestamp, startAt, endAt, limit,
} from 'firebase/firestore'
import { db } from './firebase'
import type { SerieItem, Line } from '../types'

export type CatalogEntry = {
  n: string
  modelo: string
  line?: Line
  img?: string
  count: number
  marketPrice?: number
  priceMin?: number
  priceMax?: number
  priceCount?: number
  priceUpdatedAt?: string
  priceCheckedAt?: string  // last time ML was queried (even if no results)
  priceNoResults?: boolean // true = ML was queried and returned 0 results
  priceSource?: string
  communityPriceSum?: number   // sum of all community contributions
  communityPriceCount?: number // number of community contributions
}

export type PriceResult = Pick<CatalogEntry,
  'marketPrice' | 'priceMin' | 'priceMax' | 'priceCount' |
  'priceUpdatedAt' | 'priceCheckedAt' | 'priceSource'
>

export type FetchPriceResult =
  | { status: 'found'; data: PriceResult }
  | { status: 'not_found' }
  | { status: 'error'; reason?: string }

export type CatalogPriceResult =
  | { status: 'found'; data: PriceResult }
  | { status: 'not_found_recent' }
  | { status: 'missing' }

const ML_SEARCH = 'https://api.mercadolibre.com/sites/MLB/search'
const ML_OAUTH  = 'https://api.mercadolibre.com/oauth/token'
const PRICE_TTL_DAYS = 7
const PRICE_MIN = 5
const PRICE_MAX = 2000

const ML_APP_ID     = import.meta.env.VITE_ML_APP_ID     || ''
const ML_APP_SECRET = import.meta.env.VITE_ML_CLIENT_SECRET || ''

type TokenCache = { token: string; expiresAt: number }
const LS_ML_TOKEN = 'ml_token_v1'

let tokenInFlight: Promise<string> | null = null

async function getMLToken(): Promise<string> {
  if (!ML_APP_ID || !ML_APP_SECRET) return ''

  const cached = (() => {
    try {
      const raw = localStorage.getItem(LS_ML_TOKEN)
      if (!raw) return null
      const c = JSON.parse(raw) as TokenCache
      // Refresh 5 min before expiry
      return c.expiresAt - Date.now() > 300_000 ? c.token : null
    } catch { return null }
  })()
  if (cached) return cached

  if (tokenInFlight) return tokenInFlight

  tokenInFlight = (async () => {
    const res = await fetch(ML_OAUTH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
      body: new URLSearchParams({
        grant_type:    'client_credentials',
        client_id:     ML_APP_ID,
        client_secret: ML_APP_SECRET,
      }),
    })
    if (!res.ok) throw new Error(`ML OAuth HTTP ${res.status}`)
    const json = await res.json() as { access_token: string; expires_in: number }
    const cache: TokenCache = {
      token:     json.access_token,
      expiresAt: Date.now() + json.expires_in * 1000,
    }
    try { localStorage.setItem(LS_ML_TOKEN, JSON.stringify(cache)) } catch { /* quota */ }
    return json.access_token
  })().finally(() => { tokenInFlight = null })

  return tokenInFlight
}

function median(nums: number[]): number {
  const s = [...nums].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 !== 0 ? s[m] : (s[m - 1] + s[m]) / 2
}

export function isStale(updatedAt?: string): boolean {
  if (!updatedAt) return true
  const age = (Date.now() - new Date(updatedAt).getTime()) / 86_400_000
  return age > PRICE_TTL_DAYS
}

// Throws on HTTP error so callers can distinguish API failure from empty results
async function mlSearch(q: string): Promise<number[]> {
  const token = await getMLToken().catch(() => '')
  const url = `${ML_SEARCH}?q=${encodeURIComponent(q)}&limit=30`

  let res = await fetch(url, {
    headers: { 'Accept': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
  })

  // Token rejected — invalidate cache and retry without auth
  if (res.status === 403 && token) {
    try { localStorage.removeItem(LS_ML_TOKEN) } catch { /* ignore */ }
    res = await fetch(url, { headers: { 'Accept': 'application/json' } })
  }

  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  const results = json.results as Array<{ price: number; title: string }> || []
  const all = results
    .map((r) => Number(r.price))
    .filter((p) => p >= PRICE_MIN && p <= PRICE_MAX)

  // Prefer results whose title mentions Hot Wheels; fall back to all results
  const hw = all.filter((_, i) => {
    const t = (results[i].title || '').toLowerCase()
    return t.includes('hot wheels') || t.includes('hotwheels')
      || t.includes(' hw ') || t.startsWith('hw ') || t.endsWith(' hw')
  })
  return hw.length > 0 ? hw : all
}

function dedup(prices: number[]): number[] {
  return [...new Set(prices)]
}

export async function fetchMLPrice(n: string, modelo: string): Promise<FetchPriceResult> {
  if (!n) return { status: 'error' }

  let prices: number[] = []
  let apiErrorReason: string | undefined

  try {
    // Sequential to avoid rate-limiting (each call is already one HTTP request)
    const byModelo = await mlSearch(`hot wheels ${modelo}`)
    prices = byModelo

    if (n) {
      const byN = await mlSearch(`hot wheels ${n}`)
      prices = dedup([...prices, ...byN])
    }

    // Last resort: modelo name alone (some sellers omit "hot wheels")
    if (prices.length < 3 && modelo) {
      const bare = await mlSearch(modelo)
      prices = dedup([...prices, ...bare])
    }
  } catch (e) {
    apiErrorReason = e instanceof Error ? e.message : 'unknown'
  }

  const checkedAt = new Date().toISOString()

  if (apiErrorReason !== undefined) return { status: 'error', reason: apiErrorReason }

  if (prices.length === 0) {
    try {
      await setDoc(doc(db, 'catalog', String(n)), {
        n: String(n), modelo,
        priceCheckedAt: checkedAt,
        priceNoResults: true,
      }, { merge: true })
    } catch { /* non-critical */ }
    return { status: 'not_found' }
  }

  const marketPrice = Math.round(median(prices) * 100) / 100
  const priceMin    = Math.round(Math.min(...prices) * 100) / 100
  const priceMax    = Math.round(Math.max(...prices) * 100) / 100
  const priceCount  = prices.length
  const priceSource = 'Mercado Livre'

  try {
    await setDoc(doc(db, 'catalog', String(n)), {
      n: String(n), modelo,
      marketPrice, priceMin, priceMax, priceCount,
      priceUpdatedAt: checkedAt, priceCheckedAt: checkedAt,
      priceNoResults: false,
      priceSource,
    }, { merge: true })
  } catch { /* non-critical */ }

  return {
    status: 'found',
    data: { marketPrice, priceMin, priceMax, priceCount, priceUpdatedAt: checkedAt, priceCheckedAt: checkedAt, priceSource },
  }
}

export async function getCatalogPrice(n: string): Promise<CatalogPriceResult> {
  if (!n) return { status: 'missing' }
  try {
    const snap = await getDoc(doc(db, 'catalog', n))
    if (!snap.exists()) return { status: 'missing' }
    const data = snap.data() as CatalogEntry

    if (data.marketPrice) {
      return {
        status: 'found',
        data: {
          marketPrice:    data.marketPrice,
          priceMin:       data.priceMin,
          priceMax:       data.priceMax,
          priceCount:     data.priceCount,
          priceUpdatedAt: data.priceUpdatedAt,
          priceCheckedAt: data.priceCheckedAt,
          priceSource:    data.priceSource,
        },
      }
    }

    if (data.priceNoResults && !isStale(data.priceCheckedAt)) {
      return { status: 'not_found_recent' }
    }

    return { status: 'missing' }
  } catch {
    return { status: 'missing' }
  }
}

export async function contributeToCatalog(item: SerieItem): Promise<void> {
  if (!item.n || !item.modelo) return
  const ref = doc(db, 'catalog', String(item.n))
  await setDoc(ref, {
    n: String(item.n),
    modelo: item.modelo,
    ...(item.line ? { line: item.line } : {}),
    ...(item.img  ? { img:  item.img  } : {}),
    count: increment(1),
    updatedAt: serverTimestamp(),
  }, { merge: true })
}

export async function searchCatalog(q: string): Promise<CatalogEntry[]> {
  const trimmed = q.trim()
  if (trimmed.length < 2) return []
  const col = collection(db, 'catalog')

  const lower = trimmed.toLowerCase()
  const upper = lower.charAt(0).toUpperCase() + lower.slice(1)

  const queries = [
    getDocs(query(col, orderBy('modelo'), startAt(lower), endAt(lower + ''), limit(6))),
    ...(upper !== lower
      ? [getDocs(query(col, orderBy('modelo'), startAt(upper), endAt(upper + ''), limit(6)))]
      : []),
  ]

  const byCode = getDoc(doc(col, trimmed)).then((s) =>
    s.exists() ? [s.data() as CatalogEntry] : [],
  ).catch(() => [] as CatalogEntry[])

  const [codeResults, ...snapshots] = await Promise.all([byCode, ...queries])

  const seen = new Set<string>()
  const entries: CatalogEntry[] = []

  for (const e of codeResults) {
    if (!seen.has(e.n)) { seen.add(e.n); entries.push(e) }
  }
  for (const snap of snapshots) {
    for (const d of snap.docs) {
      const e = d.data() as CatalogEntry
      if (!seen.has(d.id)) { seen.add(d.id); entries.push(e) }
    }
  }
  return entries.slice(0, 8)
}

export async function getCatalogEntry(n: string): Promise<CatalogEntry | null> {
  if (!n) return null
  const snap = await getDoc(doc(db, 'catalog', n))
  return snap.exists() ? (snap.data() as CatalogEntry) : null
}

export async function contributeMarketPrice(
  n: string,
  modelo: string,
  price: number,
): Promise<void> {
  if (!n || price <= 0) return
  const ref = doc(db, 'catalog', String(n))
  const updatedAt = new Date().toISOString()
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref)
    const data = snap.exists() ? (snap.data() as CatalogEntry) : {}
    const newSum   = (data.communityPriceSum   || 0) + price
    const newCount = (data.communityPriceCount || 0) + 1
    const avg = Math.round((newSum / newCount) * 100) / 100
    tx.set(ref, {
      n: String(n), modelo,
      marketPrice: avg,
      communityPriceSum:   newSum,
      communityPriceCount: newCount,
      priceUpdatedAt: updatedAt,
      priceCheckedAt: updatedAt,
      priceNoResults: false,
      priceSource: 'community',
    }, { merge: true })
  })
}
