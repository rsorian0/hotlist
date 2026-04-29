import type { Serie } from '../types'
import { smartSortItems } from './sort'

function defined<T extends object>(obj: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: any = Array.isArray(obj) ? [] : {}
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (v === undefined) continue
    if (v && typeof v === 'object' && !Array.isArray(v)) out[k] = defined(v as object)
    else out[k] = v
  }
  return out as T
}

export function normalizeState(raw: { series: Serie[]; checks: Record<string, boolean> }) {
  const series = (raw.series || [])
    .map((s) => ({
      nome: s.nome,
      items: smartSortItems(
        (s.items || []).map((it) =>
          defined({
            n: it.n ?? undefined,
            modelo: it.modelo ?? undefined,
            img: it.img ?? undefined,
          }),
        ),
      ),
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }))

  const checksEntries = Object.entries(raw.checks || {}).sort((a, b) => a[0].localeCompare(b[0]))
  const checks: Record<string, boolean> = {}
  for (const [k, v] of checksEntries) checks[k] = !!v

  return { series, checks }
}

export function stableJSON(v: unknown): string {
  return JSON.stringify(v)
}
