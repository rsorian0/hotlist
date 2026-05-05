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
