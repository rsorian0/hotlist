import { useMemo } from 'react'
import type { Serie, OwnershipMap, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import { effectiveLine, lineMeta } from '../utils/line'
import EmptyState from './EmptyState'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  filter: string
  lineFilter: Line | null
  onItemClick: (key: string) => void
  onAddClick: () => void
}

export default function GridView({ series, checks, filter, lineFilter, onItemClick, onAddClick }: Props) {
  const items = useMemo(() => {
    const f = filter.toLowerCase().trim()
    const result: Array<{
      key: string
      serie: string
      modelo: string
      n?: string | number
      img?: string
      line?: Line
    }> = []

    for (const s of series) {
      for (const it of smartSortItems(s.items || [])) {
        const key = `${s.nome}__${it.n || ''}`
        const line = effectiveLine(it)
        if (lineFilter && line !== lineFilter) continue
        if (f && !`${it.modelo || ''} ${it.n || ''} ${s.nome}`.toLowerCase().includes(f)) continue
        result.push({ key, serie: s.nome, modelo: it.modelo || '', n: it.n, img: it.img, line })
      }
    }
    return result
  }, [series, checks, filter, lineFilter])

  if (series.length === 0) return <EmptyState filtered={false} onAddClick={onAddClick} />
  if (items.length === 0) return <EmptyState filtered onAddClick={onAddClick} />

  return (
    <section className="grid-view">
      {items.map((it) => {
        const meta = lineMeta(it.line)
        return (
          <div key={it.key} className="grid-card" onClick={() => onItemClick(it.key)}>
            <div className="grid-img-wrap">
              {it.img
                ? <img src={it.img} alt={it.modelo} loading="lazy" />
                : <div className="grid-no-img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 15l5-5 4 4 3-3 6 6"/><circle cx="8.5" cy="8.5" r="1.5"/></svg></div>
              }
              {meta && it.line !== 'mainline' && (
                <div className="grid-badge" style={{ background: meta.badgeBg || meta.color }}>{meta.short}</div>
              )}
            </div>
            <div className="grid-info">
              <div className="grid-modelo">{it.modelo}</div>
              <div className="grid-sub">{it.serie !== 'Geral' ? `${it.serie}${it.n ? ` · ${it.n}` : ''}` : (it.n || '')}</div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
