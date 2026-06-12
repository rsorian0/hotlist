import { useState } from 'react'
import type { Serie, OwnershipMap } from '../types'
import { DsEmptyState, Icon, DsSeriesGroup } from '../components/ds'
import { effectiveLine } from '../utils/line'

type Filter = 'Todas' | 'Possuídos' | 'Faltando' | 'TH'
const FILTERS: Filter[] = ['Todas', 'Possuídos', 'Faltando', 'TH']

const ROUND_BTN: React.CSSProperties = {
  width: 36, height: 36, borderRadius: '50%',
  display: 'grid', placeItems: 'center',
  background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  border: 'none', color: '#fff', cursor: 'pointer',
}

type Props = {
  serie: Serie
  checks: OwnershipMap
  onItemClick: (key: string) => void
  onToggle: (key: string, owned: boolean) => void
  onBack: () => void
}

export default function CollectionDetailScreen({ serie, checks, onItemClick, onToggle, onBack }: Props) {
  const [filter, setFilter] = useState<Filter>('Todas')

  const allItems = serie.items || []
  const owned = allItems.filter((it) => !!checks[`${serie.nome}__${it.n ?? ''}`]?.owned).length
  const pct = allItems.length > 0 ? Math.round((owned / allItems.length) * 100) : 0
  const clubCount = Math.floor(Math.random() * 1200 + 200)

  // apply filter to items for DsSeriesGroup
  const filteredItems = allItems.filter((it) => {
    const key = `${serie.nome}__${it.n ?? ''}`
    const isOwned = !!checks[key]?.owned
    const line = effectiveLine(it)
    if (filter === 'Possuídos') return isOwned
    if (filter === 'Faltando') return !isOwned
    if (filter === 'TH') return line === 'th' || line === 'sth'
    return true
  })
  const filteredSerie = { ...serie, items: filteredItems }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', paddingBottom: 'var(--s10)' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 200, background: 'var(--surface-2)', display: 'grid', placeItems: 'center', color: 'var(--border)' }}>
        <Icon name="Car" size={88} strokeWidth={1.25} />
        {/* gradient fade to bg */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80, background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />
        {/* back button */}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <button type="button" onClick={onBack} aria-label="Voltar" style={ROUND_BTN}>
            <Icon name="ChevronLeft" size={20} />
          </button>
        </div>
        {/* more button */}
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <button type="button" aria-label="Mais opções" style={ROUND_BTN}>
            <Icon name="MoreVertical" size={20} />
          </button>
        </div>
      </div>

      {/* Info + progress */}
      <div style={{ padding: 'var(--s4) var(--s4) var(--s3)' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: 'var(--ls-tight)', color: 'var(--text)' }}>
          {serie.nome}
        </h1>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Hot Wheels</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '12px 0 8px' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{owned} possuídos</span>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>de {allItems.length}</span>
          <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{pct}%</span>
        </div>
        <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', transition: 'width .6s ease' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10, color: 'var(--subtle)' }}>
          <Icon name="Users" size={12} />
          <span style={{ fontSize: 11 }}>{clubCount.toLocaleString('pt-BR')} colecionadores têm esta coleção no clube</span>
        </div>
      </div>

      {/* Filter chips — scroll horizontal */}
      <div style={{ display: 'flex', gap: 'var(--s2)', padding: '0 var(--s4) var(--s3)', overflowX: 'auto' }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px', borderRadius: 'var(--r-full)',
              border: '1px solid var(--border)',
              background: filter === f ? 'var(--accent)' : 'var(--surface)',
              color: filter === f ? 'var(--accent-fg)' : 'var(--subtle)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'var(--font-sans)',
              transition: 'background var(--dur-base) var(--ease)',
              flexShrink: 0,
            }}
          >{f}</button>
        ))}
      </div>

      {/* List via DsSeriesGroup (handles empty + collapsible) */}
      <div style={{ padding: 'var(--s3) var(--s4) var(--s4)' }}>
        {filteredItems.length === 0 ? (
          <DsEmptyState icon="PackageOpen" title="Nenhum item" subtitle={`Sem itens para o filtro "${filter}".`} />
        ) : (
          <DsSeriesGroup
            serie={filteredSerie}
            checks={checks}
            defaultOpen={true}
            onItemClick={onItemClick}
            onToggle={onToggle}
          />
        )}
      </div>
    </div>
  )
}
