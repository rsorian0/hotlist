import { useMemo } from 'react'
import type { Serie, OwnershipMap, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import { effectiveLine, lineMeta } from '../utils/line'
import { CAR_PLACEHOLDER } from '../utils/placeholder'
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
              <img src={it.img || CAR_PLACEHOLDER} alt={it.modelo} loading="lazy" />
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
