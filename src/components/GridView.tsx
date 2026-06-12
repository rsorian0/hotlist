import { useMemo } from 'react'
import type { Serie, OwnershipMap, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import { effectiveLine } from '../utils/line'
import { CAR_PLACEHOLDER } from '../utils/placeholder'
import EmptyState from './EmptyState'
import { SkeletonGrid } from './Skeleton'
import { GridCard } from './ds'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  filter: string
  lineFilter: Line | null
  syncing?: boolean
  onItemClick: (key: string) => void
  onAddClick: () => void
}

export default function GridView({ series, checks, filter, lineFilter, syncing, onItemClick, onAddClick }: Props) {
  const items = useMemo(() => {
    const f = filter.toLowerCase().trim()
    const result: Array<{
      key: string
      serie: string
      modelo: string
      n?: string | number
      img?: string
      line?: Line
      owned: boolean
    }> = []

    for (const s of series) {
      for (const it of smartSortItems(s.items || [])) {
        const key = `${s.nome}__${it.n || ''}`
        const line = effectiveLine(it)
        if (lineFilter && line !== lineFilter) continue
        if (f && !`${it.modelo || ''} ${it.n || ''} ${s.nome}`.toLowerCase().includes(f)) continue
        result.push({ key, serie: s.nome, modelo: it.modelo || '', n: it.n, img: it.img, line, owned: !!checks[key]?.owned })
      }
    }
    return result
  }, [series, checks, filter, lineFilter])

  if (series.length === 0) {
    if (syncing) return <SkeletonGrid count={12} />
    return <EmptyState filtered={false} onAddClick={onAddClick} />
  }
  if (items.length === 0) return <EmptyState filtered onAddClick={onAddClick} />

  return (
    <div style={{ padding: 'var(--s3)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s2)' }} className="sm:grid-cols-4 md:grid-cols-5">
        {items.map((it) => (
          <GridCard
            key={it.key}
            item={{ modelo: it.modelo, img: it.img || CAR_PLACEHOLDER, line: it.line, n: it.n }}
            owned={it.owned}
            sub={it.serie !== 'Geral' ? it.serie : (it.n ? String(it.n) : null)}
            onClick={() => onItemClick(it.key)}
          />
        ))}
      </div>
    </div>
  )
}
