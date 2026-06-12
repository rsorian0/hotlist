import { useState } from 'react'
import { Search, TrendingUp } from 'lucide-react'
import type { Serie, OwnershipMap, Line } from '../types'
import { DsInput, Chip, GridCard } from '../components/ds'
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
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--subtle)', marginBottom: 'var(--s3)' }}>
            Resultados
          </div>
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
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--subtle)', marginBottom: 'var(--s3)' }}>
          Por linha
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--s2)' }}>
          {CATEGORY_LINES.map((l) => {
            const isTH = l.value === 'th'
            return (
              <button
                key={l.value}
                type="button"
                onClick={() => onLineFilter(l.value)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--s3)',
                  padding: 'var(--s3) var(--s3)',
                  background: 'var(--surface)',
                  border: isTH ? '1px solid rgba(200,45,107,.35)' : '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)', cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'var(--font-sans)',
                  transition: 'background var(--dur-base) var(--ease)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-2)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface)' }}
              >
                <span style={{
                  width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                  background: isTH ? 'var(--rare)' : 'var(--subtle)',
                }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                  {l.label}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Por fabricante */}
      <section style={{ marginBottom: 'var(--s5)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--subtle)', marginBottom: 'var(--s3)' }}>
          Por fabricante
        </div>
        <div style={{ display: 'flex', gap: 'var(--s2)', flexWrap: 'wrap' }}>
          {FABRICANTES.map((f) => (
            <Chip key={f}>{f}</Chip>
          ))}
        </div>
      </section>

      {/* Mais valiosos */}
      {topItems.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--subtle)', marginBottom: 'var(--s3)' }}>
            <TrendingUp size={13} />
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
