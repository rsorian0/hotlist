import type { Line, SerieItem } from '../types'

export type LineMeta = {
  value: Line
  label: string
  short: string
  color: string
  badgeBg?: string
}

export const LINES: LineMeta[] = [
  { value: 'mainline',     label: 'Mainline',          short: 'Mainline', color: '#8b949e' },
  { value: 'th',           label: 'Treasure Hunt',     short: 'TH',       color: '#c82d6b', badgeBg: 'rgba(200,45,107,.95)' },
  { value: 'sth',          label: 'Super Treasure Hunt', short: 'STH',    color: '#fb5607', badgeBg: 'linear-gradient(90deg,#ffb703,#fb5607 60%,#ff006e)' },
  { value: 'silver-series', label: 'Silver Series',    short: 'Silver',   color: '#94a3b8', badgeBg: 'linear-gradient(90deg,#64748b,#cbd5e1 50%,#64748b)' },
  { value: 'premium',      label: 'Premium',           short: 'Premium',  color: '#1f6feb', badgeBg: 'rgba(31,111,235,.9)' },
  { value: 'rlc',          label: 'Red Line Club',     short: 'RLC',      color: '#dc2626', badgeBg: 'rgba(220,38,38,.95)' },
  { value: 'other',        label: 'Outra linha',       short: 'Outra',    color: '#6b7280', badgeBg: 'rgba(107,114,128,.9)' },
]

// Legado: sub-tipos de Premium e outros mapeiam para 'premium' nos badges
type LegacyLineMeta = Omit<LineMeta, 'value'> & { value: string }
const LEGACY: LegacyLineMeta[] = [
  { value: 'premium-car-culture',    label: 'Premium · Car Culture',    short: 'Premium', color: '#1f6feb', badgeBg: 'rgba(31,111,235,.9)' },
  { value: 'premium-boulevard',      label: 'Premium · Boulevard',      short: 'Premium', color: '#1f6feb', badgeBg: 'rgba(31,111,235,.9)' },
  { value: 'premium-pop-culture',    label: 'Premium · Pop Culture',    short: 'Premium', color: '#1f6feb', badgeBg: 'rgba(31,111,235,.9)' },
  { value: 'premium-fast-furious',   label: 'Premium · Fast & Furious', short: 'Premium', color: '#1f6feb', badgeBg: 'rgba(31,111,235,.9)' },
  { value: 'premium-entertainment',  label: 'Premium · Entertainment',  short: 'Premium', color: '#1f6feb', badgeBg: 'rgba(31,111,235,.9)' },
  { value: 'premium-team-transport', label: 'Premium · Team Transport', short: 'Premium', color: '#1f6feb', badgeBg: 'rgba(31,111,235,.9)' },
  { value: 'convention', label: 'Convention',    short: 'Outra', color: '#6b7280', badgeBg: 'rgba(107,114,128,.9)' },
  { value: 'mystery',    label: 'Mystery Models', short: 'Outra', color: '#6b7280', badgeBg: 'rgba(107,114,128,.9)' },
]

const BY_VALUE: Record<string, LegacyLineMeta> = Object.fromEntries([...LINES, ...LEGACY].map((l) => [l.value, l]))

export function lineMeta(line: Line | string | undefined): LegacyLineMeta | undefined {
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
