import { useState } from 'react'
import type { Serie, OwnershipMap } from '../types'
import { Chip, CollectionClubCard } from '../components/ds'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  onSerieClick: (serie: Serie) => void
}

export default function CollectionScreen({ series, checks, onSerieClick }: Props) {
  const [activeChip, setActiveChip] = useState('Todos')

  const collections = series.map((s) => {
    const owned = s.items.filter((i) => checks[`${s.nome}__${i.n ?? ''}`]?.owned).length
    return {
      serie: s,
      nome: s.nome,
      total: s.items.length,
      owned,
      pct: s.items.length > 0 ? Math.round((owned / s.items.length) * 100) : 0,
      clubCount: Math.floor(Math.random() * 1000 + 100),
    }
  })

  const chips = ['Todos', 'Hot Wheels']

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--s4) var(--s4) var(--s10)' }}>
      <div style={{ marginBottom: 'var(--s4)' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>Coleção</h1>
        <p style={{ fontSize: 13, color: 'var(--subtle)' }}>{collections.length} {collections.length === 1 ? 'série' : 'séries'}</p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--s2)', marginBottom: 'var(--s4)', flexWrap: 'wrap' }}>
        {chips.map((c) => (
          <Chip key={c} active={activeChip === c} onClick={() => setActiveChip(c)}>{c}</Chip>
        ))}
      </div>

      {collections.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--s10) 0', color: 'var(--subtle)', fontSize: 14 }}>
          Nenhuma coleção ainda.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--s3)' }}>
          {collections.map((c) => (
            <CollectionClubCard
              key={c.nome}
              name={c.nome}
              fabricante="Hot Wheels"
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
