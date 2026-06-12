import { useState } from 'react'
import type { Serie, OwnershipMap } from '../types'
import { Chip, CollectionClubCard, DsEmptyState } from '../components/ds'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  onSerieClick: (serie: Serie) => void
  onAddClick?: () => void
}

const FILTERS = ['Todas', 'Hot Wheels', 'Matchbox', 'Majorette', 'Tomica']

export default function CollectionScreen({ series, checks, onSerieClick, onAddClick }: Props) {
  const [filter, setFilter] = useState('Todas')

  const collections = series.map((s) => {
    const owned = s.items.filter((i) => checks[`${s.nome}__${i.n ?? ''}`]?.owned).length
    const pct = s.items.length > 0 ? Math.round((owned / s.items.length) * 100) : 0
    return {
      serie: s,
      nome: s.nome,
      total: s.items.length,
      owned,
      pct,
      clubCount: Math.floor(Math.random() * 1000 + 100),
    }
  })

  // filter by fabricante — since Serie has no maker field, match by keyword in name
  const filtered = filter === 'Todas'
    ? collections
    : collections.filter((c) => c.nome.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--s4) var(--s4) var(--s10)' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: 'var(--ls-tight)', color: 'var(--text)' }}>Coleção</h1>
      </div>

      {/* Filtros de fabricante — scroll horizontal */}
      <div style={{ display: 'flex', gap: 'var(--s2)', overflowX: 'auto', marginBottom: 'var(--s4)', paddingBottom: 2 }}>
        {FILTERS.map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)} style={{ flexShrink: 0 }}>{f}</Chip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <DsEmptyState
          icon="Library"
          title="Nenhuma coleção"
          subtitle={filter === 'Todas' ? 'Adicione o primeiro item para começar.' : `Nenhuma coleção de ${filter}.`}
        />
      ) : (
        <div className="r-grid-collections" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--s3)' }}>
          {filtered.map((c) => (
            <CollectionClubCard
              key={c.nome}
              name={c.nome}
              owned={c.owned}
              total={c.total}
              pct={c.pct}
              clubCount={c.clubCount}
              onClick={() => onSerieClick(c.serie)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
