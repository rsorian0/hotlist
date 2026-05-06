import type { SerieItem } from '../types'
import { effectiveLine } from './line'

// Ordem de valor: RLC > Premium > Silver > Outra > STH > TH > Mainline > sem linha
const LINE_ORDER: Record<string, number> = {
  rlc:           0,
  premium:       1,
  'silver-series': 2,
  other:         3,
  sth:           4,
  th:            5,
  mainline:      6,
}

function lineRank(item: SerieItem): number {
  const line = effectiveLine(item)
  return line ? (LINE_ORDER[line] ?? 7) : 7
}

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
    const rankDiff = lineRank(a) - lineRank(b)
    if (rankDiff !== 0) return rankDiff

    const A = parseN(a?.n)
    const B = parseN(b?.n)
    if (A.has !== B.has) return A.has ? -1 : 1
    if (A.num !== B.num) return A.num - B.num
    if (A.den != null && B.den != null && A.den !== B.den) return A.den - B.den
    return (a?.modelo || '').localeCompare(b?.modelo || '', 'pt-BR', { sensitivity: 'base' })
  })
}
