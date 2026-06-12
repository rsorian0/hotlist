import { useState } from 'react'
import type { Serie, OwnershipMap, Line } from '../types'
import { DsInput, Chip, DsBadge, CategoryCard, DsEmptyState, DsItemRow } from '../components/ds'
import { Icon } from '../components/ds'
import { LINES } from '../utils/line'
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

const LINE_LABELS: Record<string, string> = {
  mainline: 'MAINLINE', th: 'TH', sth: 'STH', premium: 'PREMIUM',
  rlc: 'RLC', 'silver-series': 'SILVER',
}

const TRENDING = [
  { modelo: 'Twin Mill', line: 'th', serie: 'HW Race Team 2024', delta: '+340 esta semana' },
  { modelo: 'Porsche 911 RSR', line: 'premium', serie: 'Car Culture', delta: '+218 esta semana' },
  { modelo: 'Toyota Supra MK4', line: 'rlc', serie: 'JDM Legends', delta: '+194 esta semana' },
  { modelo: 'Nissan Skyline BNR34', line: 'mainline', serie: '2024', delta: '+187 esta semana' },
]

const secLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '.06em',
  textTransform: 'uppercase', color: 'var(--subtle)',
  padding: 'var(--s5) 0 var(--s2)',
}

export default function ExploreScreen({ series, checks, onLineFilter, onItemClick }: Props) {
  const [search, setSearch] = useState('')
  const query = search.trim()

  const searched = query.length >= 2
    ? series.flatMap((s) => s.items.map((i) => ({
        ...i,
        key: `${s.nome}__${i.n ?? ''}`,
        serie: s.nome,
        owned: !!checks[`${s.nome}__${i.n ?? ''}`]?.owned,
      }))).filter((i) =>
        `${i.modelo || ''} ${i.n || ''} ${i.serie}`.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 20)
    : []

  const topItems = series
    .flatMap((s) => smartSortItems(s.items || []).map((i) => {
      const key = `${s.nome}__${i.n ?? ''}`
      return { ...i, key, serie: s.nome, owned: !!checks[key]?.owned, market: checks[key]?.marketPrice }
    }))
    .filter((i) => i.market != null)
    .sort((a, b) => (b.market ?? 0) - (a.market ?? 0))
    .slice(0, 6)

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--s4) var(--s4) var(--s10)' }}>

      {/* Título */}
      <h1 style={{ margin: '0 0 var(--s3)', fontSize: 20, fontWeight: 700, letterSpacing: 'var(--ls-tight)', color: 'var(--text)' }}>
        Explorar
      </h1>

      {/* Busca */}
      <DsInput
        type="search"
        placeholder="Série, modelo, número…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leading={<Icon name="Search" size={15} />}
        wrapperStyle={{ height: 40, marginBottom: query ? 'var(--s3)' : 0 }}
      />

      {/* Resultados de busca — ItemRow em lista */}
      {query.length >= 2 && (
        <section>
          {searched.length === 0 ? (
            <DsEmptyState icon="SearchX" title={`Nenhum resultado para "${query}"`} subtitle="Tente buscar pelo nome do modelo, número ou série." />
          ) : (
            <>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 'var(--ls-caps)', color: 'var(--subtle)', fontWeight: 600, padding: 'var(--s3) 0 var(--s2)' }}>
                {searched.length} {searched.length === 1 ? 'resultado' : 'resultados'}
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                {searched.map((it) => (
                  <DsItemRow
                    key={it.key}
                    item={it}
                    owned={it.owned}
                    onClick={() => onItemClick(it.key)}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* Conteúdo quando sem busca */}
      {!query && (
        <>
          {/* Por linha — grid 2 colunas */}
          <section>
            <div style={secLabel}>Por linha</div>
            <div className="r-grid-categories" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s2)' }}>
              {CATEGORY_LINES.map((l) => (
                <CategoryCard
                  key={l.value}
                  label={l.label}
                  icon={LINE_ICONS[l.value] || 'Car'}
                  rare={l.value === 'th'}
                  onClick={() => onLineFilter(l.value)}
                />
              ))}
            </div>
          </section>

          {/* Por fabricante */}
          <section>
            <div style={secLabel}>Por fabricante</div>
            <div className="r-brand-pills" style={{ display: 'flex', gap: 'var(--s2)', overflowX: 'auto', paddingBottom: 'var(--s2)' }}>
              {FABRICANTES.map((f) => (
                <Chip key={f} style={{ height: 40 }}>{f}</Chip>
              ))}
            </div>
          </section>

          {/* Mais buscados esta semana */}
          <section>
            <div style={secLabel}>Mais buscados esta semana</div>
            <div style={{ paddingBottom: 'var(--s4)' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                {TRENDING.map((item, idx) => {
                  const isRare = item.line === 'th' || item.line === 'sth'
                  return (
                    <div
                      key={item.modelo}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 'var(--s3)',
                        padding: 'var(--s2) var(--s3)',
                        borderBottom: idx < TRENDING.length - 1 ? '1px solid var(--border)' : 'none',
                        cursor: 'pointer',
                      }}
                    >
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
            </div>
          </section>

          {/* Mais valiosos na coleção */}
          {topItems.length > 0 && (
            <section>
              <div style={{ ...secLabel, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name="TrendingUp" size={13} />
                Mais valiosos na sua coleção
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                {topItems.map((it) => (
                  <DsItemRow
                    key={it.key}
                    item={{ n: it.n, modelo: it.modelo, img: it.img, line: it.line }}
                    owned={it.owned}
                    onClick={() => onItemClick(it.key)}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
