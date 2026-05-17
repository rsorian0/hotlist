import {
  collection, doc, getDoc, getDocs,
  increment, orderBy, query, setDoc,
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
  priceSource?: string
}

type PriceResult = Pick<CatalogEntry,
  'marketPrice' | 'priceMin' | 'priceMax' | 'priceCount' | 'priceUpdatedAt' | 'priceSource'
>

const ML_SEARCH = 'https://api.mercadolibre.com/sites/MLB/search'
const PRICE_TTL_DAYS = 7
// Reasonable price range for a single Hot Wheels car (R$)
const PRICE_MIN = 8
const PRICE_MAX = 600

function median(nums: number[]): number {
  const s = [...nums].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 !== 0 ? s[m] : (s[m - 1] + s[m]) / 2
}

function isStale(updatedAt?: string): boolean {
  if (!updatedAt) return true
  const age = (Date.now() - new Date(updatedAt).getTime()) / 86_400_000
  return age > PRICE_TTL_DAYS
}

async function mlSearch(q: string): Promise<number[]> {
  try {
    const res = await fetch(`${ML_SEARCH}?q=${encodeURIComponent(q)}&limit=20`)
    if (!res.ok) return []
    const json = await res.json()
    return (json.results as Array<{ price: number }> || [])
      .map((r) => Number(r.price))
      .filter((p) => p >= PRICE_MIN && p <= PRICE_MAX)
  } catch {
    return []
  }
}

export async function fetchMLPrice(n: string, modelo: string): Promise<PriceResult | null> {
  if (!n) return null

  // Try by reference code first, fall back to model name
  let prices = await mlSearch(`hot wheels ${n}`)
  if (prices.length < 2 && modelo) {
    const fallback = await mlSearch(`hot wheels ${modelo}`)
    if (fallback.length > prices.length) prices = fallback
  }

  if (prices.length === 0) return null

  const marketPrice = Math.round(median(prices) * 100) / 100
  const priceMin    = Math.round(Math.min(...prices) * 100) / 100
  const priceMax    = Math.round(Math.max(...prices) * 100) / 100
  const priceCount  = prices.length
  const priceUpdatedAt = new Date().toISOString()
  const priceSource = 'Mercado Livre'

  try {
    await setDoc(doc(db, 'catalog', String(n)), {
      n: String(n), modelo,
      marketPrice, priceMin, priceMax, priceCount, priceUpdatedAt, priceSource,
    }, { merge: true })
  } catch { /* save failure is non-critical */ }

  return { marketPrice, priceMin, priceMax, priceCount, priceUpdatedAt, priceSource }
}

export async function getCatalogPrice(n: string): Promise<PriceResult | null> {
  if (!n) return null
  const snap = await getDoc(doc(db, 'catalog', n))
  if (!snap.exists()) return null
  const data = snap.data() as CatalogEntry
  if (!data.marketPrice) return null
  return {
    marketPrice:    data.marketPrice,
    priceMin:       data.priceMin,
    priceMax:       data.priceMax,
    priceCount:     data.priceCount,
    priceUpdatedAt: data.priceUpdatedAt,
    priceSource:    data.priceSource,
  }
}

export { isStale }

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
  if (q.length < 2) return []
  const upper = q.charAt(0).toUpperCase() + q.slice(1)
  const col = collection(db, 'catalog')
  const snap = await getDocs(
    query(col, orderBy('modelo'), startAt(upper), endAt(upper + ''), limit(6)),
  )
  return snap.docs.map((d) => d.data() as CatalogEntry)
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
  await setDoc(ref, {
    n: String(n),
    modelo,
    marketPrice: price,
    priceUpdatedAt: new Date().toISOString(),
    priceSource: 'community',
  }, { merge: true })
}
