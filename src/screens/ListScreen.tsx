import { useState, useMemo } from 'react'
import { Search, Plus } from 'lucide-react'
import type { Serie, OwnershipMap, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import { effectiveLine } from '../utils/line'
import { DsInput, IconButton, Chip, DsEmptyState, DsSeriesGroup } from '../components/ds'
import { SkeletonGroup } from '../components/Skeleton'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  filter: string
  setFilter: (f: string) => void
  syncing?: boolean
  onItemClick: (key: string) => void
  onToggle: (key: string, owned: boolean) => void
  onAddClick: () => void
  onOpenModal: (index: number, feed: { img: string; alt: string }[]) => void
}

const LINE_CHIPS: { id: Line | null; label: string }[] = [
  { id: null,             label: 'Tudo' },
  { id: 'th',            label: 'TH' },
  { id: 'premium',       label: 'Premium' },
  { id: 'rlc',           label: 'RLC' },
]

export default function ListScreen({ series, checks, filter, setFilter, syncing, onItemClick, onToggle, onAddClick }: Props) {
  const [lineFilter, setLineFilter] = useState<Line | null>(null)

  const anyVisible = useMemo(() => {
    const f = filter.toLowerCase().trim()
    return series.some((s) =>
      smartSortItems(s.items || []).some((it) => {
        if (lineFilter && effectiveLine(it) !== lineFilter) return false
        return `${it.modelo || ''} ${it.n || ''} ${s.nome}`.toLowerCase().includes(f)
      })
    )
  }, [series, filter, lineFilter])

  if (series.length === 0 && syncing) {
    return (
      <div style={{ padding: 'var(--s3)' }}>
        <SkeletonGroup rows={6} />
        <SkeletonGroup rows={4} />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--s3) var(--s3) var(--s10)' }}>
      {/* Search + add */}
      <div style={{ display: 'flex', gap: 'var(--s2)', marginBottom: 'var(--s3)' }}>
        <div style={{ flex: 1 }}>
          <DsInput
            type="search"
            placeholder="Buscar modelo, código…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            leading={<Search size={15} />}
            wrapperStyle={{ height: 40 }}
          />
        </div>
        <IconButton onClick={onAddClick} aria-label="Adicionar peça"><Plus size={20} /></IconButton>
      </div>

      {/* Chips de linha — scroll horizontal sem quebra */}
      <div style={{ display: 'flex', gap: 'var(--s2)', overflowX: 'auto', marginBottom: 'var(--s4)', paddingBottom: 2 }}>
        {LINE_CHIPS.map((c) => (
          <Chip key={String(c.id)} active={lineFilter === c.id} onClick={() => setLineFilter(c.id)} style={{ flexShrink: 0 }}>
            {c.label}
          </Chip>
        ))}
      </div>

      {/* Grupos */}
      {series.length === 0 ? (
        <DsEmptyState icon="PackageOpen" title="Coleção vazia" subtitle="Nenhuma peça ainda."
          action={<button type="button" onClick={onAddClick} style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Adicionar peça</button>}
        />
      ) : !anyVisible ? (
        <DsEmptyState icon="SearchX" title="Nenhum resultado" subtitle="Tente outro modelo ou linha." />
      ) : (
        series.map((s, idx) => {
          const filtered = lineFilter
            ? { ...s, items: s.items.filter((it) => effectiveLine(it) === lineFilter) }
            : s
          return (
            <DsSeriesGroup
              key={s.nome}
              serie={filtered}
              checks={checks}
              filter={filter}
              defaultOpen={idx === 0 || !!filter.trim()}
              onItemClick={onItemClick}
              onToggle={onToggle}
            />
          )
        })
      )}
    </div>
  )
}
