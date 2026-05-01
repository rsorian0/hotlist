import type { Serie, OwnershipMap } from '../types'
import { smartSortItems } from './sort'
import { pruneEmpty } from './ownership'

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

export function normalizeState(raw: { series: Serie[]; checks: OwnershipMap }) {
  const series = (raw.series || [])
    .map((s) => ({
      nome: s.nome,
      items: smartSortItems(
        (s.items || []).map((it) =>
          defined({
            n: it.n ?? undefined,
            modelo: it.modelo ?? undefined,
            img: it.img ?? undefined,
            line: it.line ?? undefined,
          }),
        ),
      ),
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }))

  const pruned = pruneEmpty(raw.checks || {})
  const checksEntries = Object.entries(pruned).sort((a, b) => a[0].localeCompare(b[0]))
  const checks: OwnershipMap = {}
  for (const [k, v] of checksEntries) checks[k] = defined(v)

  return { series, checks }
}

export function stableJSON(v: unknown): string {
  return JSON.stringify(v)
}
