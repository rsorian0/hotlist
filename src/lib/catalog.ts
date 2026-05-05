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
}

export async function getCatalogPrice(n: string): Promise<Pick<CatalogEntry, 'marketPrice' | 'priceMin' | 'priceMax' | 'priceCount' | 'priceUpdatedAt'> | null> {
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
  if (q.length < 2) return []
  const upper = q.charAt(0).toUpperCase() + q.slice(1)
  const col = collection(db, 'catalog')
  const snap = await getDocs(
    query(col, orderBy('modelo'), startAt(upper), endAt(upper + ''), limit(6)),
  )
  return snap.docs.map((d) => d.data() as CatalogEntry)
}

export async function getCatalogEntry(n: string): Promise<CatalogEntry | null> {
  if (!n) return null
  const snap = await getDoc(doc(db, 'catalog', n))
  return snap.exists() ? (snap.data() as CatalogEntry) : null
}
