import type { Serie, ImportData } from '../types'

function todayStr(): string {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`
}

export function exportJSON(series: Serie[], checks: Record<string, boolean>): void {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    series: JSON.parse(JSON.stringify(series)),
    checks: JSON.parse(JSON.stringify(checks)),
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `hotlist-backup-${todayStr()}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(a.href)
}

export function validateImport(data: unknown): data is ImportData {
  if (typeof data !== 'object' || data === null) throw new Error('not an object')
  const d = data as Record<string, unknown>
  if (!Array.isArray(d.series)) throw new Error('series must be array')
  if (typeof d.checks !== 'object' || d.checks === null) throw new Error('checks must be object')
  return true
}

export function mergeSeries(existing: Serie[], incoming: Serie[]): Serie[] {
  const byName = new Map<string, Serie>(existing.map((s) => [s.nome, { ...s, items: [...s.items] }]))
  for (const ns of incoming) {
    if (!byName.has(ns.nome)) {
      byName.set(ns.nome, { nome: ns.nome, items: JSON.parse(JSON.stringify(ns.items || [])) })
    } else {
      const tgt = byName.get(ns.nome)!
      const seen = new Set((tgt.items || []).map((it) => `${it.n}|${it.modelo || ''}`))
      for (const it of ns.items || []) {
        const key = `${it.n}|${it.modelo || ''}`
        if (!seen.has(key)) {
          tgt.items.push(JSON.parse(JSON.stringify(it)))
          seen.add(key)
        }
      }
    }
  }
  return Array.from(byName.values())
}
