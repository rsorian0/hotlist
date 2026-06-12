import { useState } from 'react'
import type { Serie, OwnershipMap } from '../types'
import { Chip } from '../components/ds'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  onSerieClick: (nome: string) => void
}

function CollectionCard({ nome, total, owned, pct, onClick }: {
  nome: string; total: number; owned: number; pct: number; onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', overflow: 'hidden', cursor: 'pointer',
        transition: 'transform var(--dur-fast) var(--ease), border-color var(--dur-base) var(--ease)',
      }}
      onPointerDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
      onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      onPointerLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
    >
      {/* thumb placeholder */}
      <div style={{ aspectRatio: '16/9', background: 'var(--surface-2)', display: 'grid', placeItems: 'center' }}>
        <span style={{ fontSize: 28 }}>🚗</span>
      </div>

      <div style={{ padding: 'var(--s3)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 'var(--s1)' }}>
          {nome}
        </div>

        {/* progress bar */}
        <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 'var(--r-full)', overflow: 'hidden', marginBottom: 'var(--s2)' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 'var(--r-full)' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--subtle)' }}>
          <span>{owned}/{total} itens</span>
          <span style={{ fontWeight: 700, color: 'var(--text)' }}>{pct}%</span>
        </div>
      </div>
    </div>
  )
}

export default function CollectionScreen({ series, checks, onSerieClick }: Props) {
  const [activeChip, setActiveChip] = useState('Todos')

  const collections = series.map((s) => {
    const owned = s.items.filter((i) => checks[`${s.nome}__${i.n ?? ''}`]?.owned).length
    return {
      nome: s.nome,
      total: s.items.length,
      owned,
      pct: s.items.length > 0 ? Math.round((owned / s.items.length) * 100) : 0,
    }
  })

  const chips = ['Todos', 'Hot Wheels']

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--s4) var(--s4) var(--s10)' }}>
      <div style={{ marginBottom: 'var(--s4)' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 'var(--s1)' }}>Coleção</h1>
        <p style={{ fontSize: 13, color: 'var(--subtle)' }}>{collections.length} {collections.length === 1 ? 'série' : 'séries'}</p>
      </div>

      {/* Chips */}
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
            <CollectionCard key={c.nome} {...c} onClick={() => onSerieClick(c.nome)} />
          ))}
        </div>
      )}
    </div>
  )
}
