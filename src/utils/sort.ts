import type { SerieItem } from '../types'

export function parseN(n: unknown): { has: boolean; num: number; den: number | null } {
  const s = String(n ?? '').trim()
  let m = s.match(/^(\d+)\s*[/\-|]\s*(\d+)\b/)
  if (m) return { has: true, num: +m[1], den: +m[2] }
  m = s.match(/^(\d+)\b/)
  if (m) return { has: true, num: +m[1], den: null }
  return { has: false, num: Number.POSITIVE_INFINITY, den: null }
}

export function smartSortItems(arr: SerieItem[]): SerieItem[] {
  return (arr || []).slice().sort((a, b) => {
    const A = parseN(a?.n)
    const B = parseN(b?.n)
    if (A.has !== B.has) return A.has ? -1 : 1
    if (A.num !== B.num) return A.num - B.num
    if (A.den != null && B.den != null && A.den !== B.den) return A.den - B.den
    return (a?.modelo || '').localeCompare(b?.modelo || '', 'pt-BR', { sensitivity: 'base' })
  })
}
