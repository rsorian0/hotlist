import type { Line, SerieItem } from '../types'

export type LineMeta = {
  value: Line
  label: string
  short: string
  color: string
  badgeBg?: string
}

export const LINES: LineMeta[] = [
  { value: 'mainline', label: 'Mainline', short: 'Mainline', color: '#8b949e' },
  { value: 'th', label: 'Treasure Hunt', short: 'TH', color: '#c82d6b', badgeBg: 'rgba(200,45,107,.95)' },
  { value: 'sth', label: 'Super Treasure Hunt', short: 'STH', color: '#fb5607', badgeBg: 'linear-gradient(90deg,#ffb703,#fb5607 60%,#ff006e)' },
  { value: 'premium-car-culture', label: 'Premium · Car Culture', short: 'Car Culture', color: '#1f6feb', badgeBg: 'rgba(31,111,235,.9)' },
  { value: 'premium-boulevard', label: 'Premium · Boulevard', short: 'Boulevard', color: '#475569', badgeBg: 'rgba(71,85,105,.95)' },
  { value: 'premium-pop-culture', label: 'Premium · Pop Culture', short: 'Pop Culture', color: '#a855f7', badgeBg: 'rgba(168,85,247,.9)' },
  { value: 'premium-fast-furious', label: 'Premium · Fast & Furious', short: 'F&F', color: '#f97316', badgeBg: 'rgba(249,115,22,.9)' },
  { value: 'premium-entertainment', label: 'Premium · Entertainment', short: 'Entertainment', color: '#10b981', badgeBg: 'rgba(16,185,129,.9)' },
  { value: 'premium-team-transport', label: 'Premium · Team Transport', short: 'Team Transport', color: '#0ea5e9', badgeBg: 'rgba(14,165,233,.9)' },
  { value: 'rlc', label: 'Red Line Club', short: 'RLC', color: '#dc2626', badgeBg: 'rgba(220,38,38,.95)' },
  { value: 'convention', label: 'Convention', short: 'Convention', color: '#eab308', badgeBg: 'rgba(234,179,8,.9)' },
  { value: 'mystery', label: 'Mystery Models', short: 'Mystery', color: '#7c3aed', badgeBg: 'rgba(124,58,237,.9)' },
  { value: 'other', label: 'Outra linha', short: 'Outra', color: '#6b7280', badgeBg: 'rgba(107,114,128,.9)' },
]

const BY_VALUE: Record<string, LineMeta> = Object.fromEntries(LINES.map((l) => [l.value, l]))

export function lineMeta(line: Line | undefined): LineMeta | undefined {
  if (!line) return undefined
  return BY_VALUE[line]
}

export function effectiveLine(item: SerieItem): Line | undefined {
  if (item.line) return item.line
  const nm = (item.modelo || '').toLowerCase()
  if (/super\s*treasure|\bsth\b/.test(nm)) return 'sth'
  if (/treasure\s*hunt|\(th\)|\bth\b/.test(nm)) return 'th'
  return undefined
}
