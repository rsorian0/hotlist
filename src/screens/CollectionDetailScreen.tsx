import { useState } from 'react'
import type { Serie, OwnershipMap } from '../types'
import { ClubListRow, DsEmptyState, Icon } from '../components/ds'
import { smartSortItems } from '../utils/sort'
import { effectiveLine } from '../utils/line'

type Filter = 'Todas' | 'Possuídos' | 'Faltando' | 'TH'
const FILTERS: Filter[] = ['Todas', 'Possuídos', 'Faltando', 'TH']

const ROUND_BTN: React.CSSProperties = {
  width: 32, height: 32, borderRadius: '50%', display: 'grid', placeItems: 'center',
  background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(4px)',
  border: 'none', cursor: 'pointer', color: '#fff',
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
  const sorted = smartSortItems(serie.items || [])
  const owned = sorted.filter((it) => !!checks[`${serie.nome}__${it.n ?? ''}`]?.owned).length
  const pct = sorted.length > 0 ? Math.round((owned / sorted.length) * 100) : 0
  const clubCount = Math.floor(Math.random() * 1200 + 200)

  const filtered = sorted.filter((it) => {
    const key = `${serie.nome}__${it.n ?? ''}`
    const isOwned = !!checks[key]?.owned
    const line = effectiveLine(it)
    if (filter === 'Possuídos') return isOwned
    if (filter === 'Faltando') return !isOwned
    if (filter === 'TH') return line === 'th' || line === 'sth'
    return true
  })

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', paddingBottom: 'var(--s10)' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 200, background: 'var(--surface-2)', display: 'grid', placeItems: 'center', color: 'var(--border)' }}>
        <Icon name="Car" size={88} strokeWidth={1.25} />
        {/* gradient fade */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80, background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />
        {/* back button */}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <button type="button" onClick={onBack} aria-label="Voltar" style={ROUND_BTN}>
            <Icon name="ChevronLeft" size={20} />
          </button>
        </div>
      </div>

      {/* Info + progress */}
      <div style={{ padding: 'var(--s4) var(--s4) var(--s3)' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: 'var(--ls-tight)', color: 'var(--text)' }}>{serie.nome}</h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '12px 0 8px' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{owned} possuídos</span>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>de {sorted.length}</span>
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

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 'var(--s2)', padding: '0 var(--s4) var(--s3)', overflowX: 'auto' }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px', borderRadius: 'var(--r-full)', border: '1px solid var(--border)',
              background: filter === f ? 'var(--accent)' : 'var(--surface)',
              color: filter === f ? 'var(--accent-fg)' : 'var(--subtle)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'var(--font-sans)',
              transition: 'background var(--dur-base) var(--ease)',
            }}
          >{f}</button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div style={{ padding: 'var(--s4)' }}>
          <DsEmptyState icon="PackageOpen" title="Nenhum item" subtitle="Nenhuma peça corresponde ao filtro." />
        </div>
      ) : (
        <div style={{ background: 'var(--surface)', margin: '0 var(--s3)', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
          {filtered.map((it) => {
            const key = `${serie.nome}__${it.n ?? ''}`
            const isOwned = !!checks[key]?.owned
            const line = effectiveLine(it)
            const club = Math.floor(Math.random() * 500 + 50)
            return (
              <ClubListRow
                key={key}
                item={{ ...it, line }}
                owned={isOwned}
                clubCount={club}
                onClick={() => onItemClick(key)}
                onToggle={() => onToggle(key, !isOwned)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
