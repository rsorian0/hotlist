import type { Serie } from '../types'
import { smartSortItems } from './sort'

export function buildShareText(
  series: Serie[],
  checks: Record<string, boolean>,
  filter: string,
): string {
  const f = filter.toLowerCase().trim()

  const visible: Array<{
    serie: string
    n?: string | number
    modelo?: string
    checked: boolean
  }> = []

  for (const s of series) {
    for (const it of smartSortItems(s.items || [])) {
      if (!`${it.modelo || ''} ${it.n || ''} ${s.nome}`.toLowerCase().includes(f)) continue
      visible.push({ serie: s.nome, n: it.n, modelo: it.modelo, checked: !!checks[`${s.nome}__${it.n || ''}`] })
    }
  }

  const tem = visible.filter((i) => i.checked)
  const falta = visible.filter((i) => !i.checked)
  const header = filter.trim() ? `Minha Hotlist (filtro: "${filter.trim()}")` : 'Minha Hotlist'

  const MAX_LINES = 80
  const linesTem = tem.map((i) => `• ${i.serie} — ${i.n || ''} ${i.modelo}`)
  const linesFalta = falta.map((i) => `• ${i.serie} — ${i.n || ''} ${i.modelo}`)

  let trimTem = linesTem.slice(0, Math.min(linesTem.length, Math.floor(MAX_LINES / 2)))
  let trimFalta = linesFalta.slice(0, MAX_LINES - trimTem.length - 6)

  if (trimTem.length < linesTem.length) trimTem.push(`…(+${linesTem.length - trimTem.length} itens)`)
  if (trimFalta.length < linesFalta.length) trimFalta.push(`…(+${linesFalta.length - trimFalta.length} itens)`)

  return ['📦 ' + header, `✅ Tenho: ${tem.length}`, trimTem.join('\n'), '', `❌ Falta: ${falta.length}`, trimFalta.join('\n')].join('\n')
}

export function shareChecklist(series: Serie[], checks: Record<string, boolean>, filter: string): boolean {
  if (series.every((s) => s.items.length === 0)) return false
  const texto = buildShareText(series, checks, filter)
  if (navigator.share) {
    navigator.share({ title: 'Checklist Hot Wheels', text: texto }).catch(() => {})
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank')
  }
  return true
}
