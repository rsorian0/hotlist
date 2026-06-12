import { useState } from 'react'
import { Search } from 'lucide-react'
import type { Serie, OwnershipMap, Line } from '../types'
import { DsInput, Chip, GridCard, Icon, DsBadge, CategoryCard } from '../components/ds'
import { LINES } from '../utils/line'
import { CAR_PLACEHOLDER } from '../utils/placeholder'
import { smartSortItems } from '../utils/sort'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  onLineFilter: (line: Line) => void
  onItemClick: (key: string) => void
}

const FABRICANTES = ['Hot Wheels', 'Matchbox', 'Majorette', 'Tomica', 'Maisto']
const CATEGORY_LINES = LINES.filter((l) => l.value !== 'other')

const LINE_ICONS: Record<string, string> = {
  mainline: 'Car', th: 'Flame', sth: 'Trophy', premium: 'Star', rlc: 'Award', 'silver-series': 'Diamond',
}

const TRENDING = [
  { modelo: 'Twin Mill', line: 'th', delta: '+340 esta semana' },
  { modelo: 'Porsche 911 RSR', line: 'premium', delta: '+218 esta semana' },
  { modelo: 'Toyota Supra MK4', line: 'rlc', delta: '+194 esta semana' },
  { modelo: 'Nissan Skyline BNR34', line: 'mainline', delta: '+187 esta semana' },
]

const LINE_LABELS: Record<string, string> = {
  mainline: 'MAINLINE', th: 'TH', sth: 'STH', premium: 'PREMIUM',
  rlc: 'RLC', 'silver-series': 'SILVER',
}

const secLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
  color: 'var(--subtle)', marginBottom: 'var(--s3)',
}

export default function ExploreScreen({ series, checks, onLineFilter, onItemClick }: Props) {
  const [search, setSearch] = useState('')

  const topItems = series
    .flatMap((s) => smartSortItems(s.items || []).map((i) => {
      const key = `${s.nome}__${i.n ?? ''}`
      return { ...i, key, serie: s.nome, owned: !!checks[key]?.owned, market: checks[key]?.marketPrice }
    }))
    .filter((i) => i.market != null)
    .sort((a, b) => (b.market ?? 0) - (a.market ?? 0))
    .slice(0, 6)

  const searched = search.trim().length >= 2
    ? series.flatMap((s) => s.items.map((i) => ({ ...i, key: `${s.nome}__${i.n ?? ''}`, serie: s.nome }))).filter((i) =>
        `${i.modelo || ''} ${i.n || ''}`.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 12)
    : []

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--s3) var(--s4) var(--s10)' }}>
      <div style={{ marginBottom: 'var(--s4)' }}>
        <DsInput
          type="search"
          placeholder="Buscar por modelo, código…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leading={<Search size={15} />}
          wrapperStyle={{ height: 40 }}
        />
      </div>

      {/* Search results */}
      {searched.length > 0 && (
        <section style={{ marginBottom: 'var(--s5)' }}>
          <div style={secLabel}>Resultados</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s2)' }}>
            {searched.map((it) => (
              <GridCard
                key={it.key}
                item={{ modelo: it.modelo, img: it.img || CAR_PLACEHOLDER, line: it.line, n: it.n }}
                owned={!!checks[it.key]?.owned}
                sub={it.serie !== 'Geral' ? it.serie : undefined}
                onClick={() => onItemClick(it.key)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Por linha */}
      <section style={{ marginBottom: 'var(--s5)' }}>
        <div style={secLabel}>Por linha</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'var(--s2)' }}>
          {CATEGORY_LINES.map((l) => (
            <CategoryCard
              key={l.value}
              label={l.label}
              icon={LINE_ICONS[l.value] || 'Car'}
              rare={l.value === 'th' || l.value === 'sth'}
              onClick={() => onLineFilter(l.value)}
            />
          ))}
        </div>
      </section>

      {/* Por fabricante */}
      <section style={{ marginBottom: 'var(--s5)' }}>
        <div style={secLabel}>Por fabricante</div>
        <div style={{ display: 'flex', gap: 'var(--s2)', flexWrap: 'wrap' }}>
          {FABRICANTES.map((f) => (
            <Chip key={f}>{f}</Chip>
          ))}
        </div>
      </section>

      {/* Mais buscados */}
      <section style={{ marginBottom: 'var(--s5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...secLabel }}>
          <Icon name="TrendingUp" size={13} />
          Mais buscados no clube
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
          {TRENDING.map((item, idx) => {
            const isRare = item.line === 'th' || item.line === 'sth'
            return (
              <div key={item.modelo} style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)', padding: 'var(--s2) var(--s3)', borderBottom: idx < TRENDING.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}>
                <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0, borderRadius: 'var(--r-md)', background: 'var(--surface-2)', display: 'grid', placeItems: 'center', color: 'var(--border-2)' }}>
                  <Icon name="Car" size={24} strokeWidth={1.6} />
                  {isRare && (
                    <span style={{ position: 'absolute', top: -3, right: -3, width: 7, height: 7, borderRadius: '50%', background: 'var(--rare)', border: '1.5px solid var(--surface)' }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.modelo}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--muted)', marginTop: 2 }}>
                    <Icon name="TrendingUp" size={11} />
                    <span style={{ fontSize: 11 }}>{item.delta}</span>
                  </div>
                </div>
                {isRare
                  ? <DsBadge variant="rare">{item.line === 'sth' ? 'STH' : 'TH'}</DsBadge>
                  : <DsBadge variant="outline">{LINE_LABELS[item.line] ?? item.line.toUpperCase()}</DsBadge>
                }
              </div>
            )
          })}
        </div>
      </section>

      {/* Mais valiosos */}
      {topItems.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...secLabel }}>
            <Icon name="TrendingUp" size={13} />
            Mais valiosos na sua coleção
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s2)' }}>
            {topItems.map((it) => (
              <GridCard
                key={it.key}
                item={{ modelo: it.modelo, img: it.img || CAR_PLACEHOLDER, line: it.line, n: it.n }}
                owned={it.owned}
                onClick={() => onItemClick(it.key)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
