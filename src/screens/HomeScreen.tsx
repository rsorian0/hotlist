import type { User } from 'firebase/auth'
import { Search, Plus } from 'lucide-react'
import type { Serie, OwnershipMap } from '../types'
import { DsInput, IconButton, ProgressCard, AchievementCard } from '../components/ds'
import { effectiveLine } from '../utils/line'

type Props = {
  user: User | null
  series: Serie[]
  checks: OwnershipMap
  onAddClick: () => void
  onItemClick: (key: string) => void
  onSerieClick?: (nome: string) => void
}

const secLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '.06em',
  color: 'var(--subtle)', textTransform: 'uppercase', marginBottom: 'var(--s3)',
}

export default function HomeScreen({ user, series, checks, onAddClick, onItemClick, onSerieClick }: Props) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
  const name = user?.displayName?.split(' ')[0] ?? 'colecionador'

  const topSeries = series
    .filter((s) => s.items.length > 0)
    .map((s) => {
      const owned = s.items.filter((i) => checks[`${s.nome}__${i.n ?? ''}`]?.owned).length
      return { nome: s.nome, owned, total: s.items.length, pct: Math.round((owned / s.items.length) * 100) }
    })
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 3)

  const recentItems = series.flatMap((s) =>
    s.items.map((i) => ({ ...i, serie: s.nome, key: `${s.nome}__${i.n ?? ''}`, line: effectiveLine(i) }))
  ).slice(0, 5)

  const totalOwned = series.reduce((acc, s) =>
    acc + s.items.filter((i) => checks[`${s.nome}__${i.n ?? ''}`]?.owned).length, 0)
  const totalItems = series.reduce((acc, s) => acc + s.items.length, 0)

  const achievements = [
    { icon: 'Flame', title: 'Primeiro item', description: 'Adicione sua primeira peça', isNew: totalOwned >= 1 },
    { icon: 'Trophy', title: 'Colecionador', description: '10 peças na coleção', isNew: totalOwned >= 10 },
    { icon: 'Star', title: 'Completista', description: 'Complete uma série inteira', isNew: series.some((s) => s.items.length > 0 && s.items.every((i) => checks[`${s.nome}__${i.n ?? ''}`]?.owned)) },
  ]

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: 'var(--s4) var(--s4) var(--s10)' }}>

      {/* Saudação */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--s4)' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>{greeting}, {name} 👋</div>
          <div style={{ fontSize: 13, color: 'var(--subtle)', marginTop: 2 }}>
            {totalItems > 0 ? `${totalOwned} de ${totalItems} itens coletados` : 'Comece a sua coleção'}
          </div>
        </div>
        <IconButton onClick={onAddClick} aria-label="Adicionar peça"><Plus size={20} /></IconButton>
      </div>

      {/* Busca */}
      <div style={{ marginBottom: 'var(--s5)' }}>
        <DsInput
          type="search"
          placeholder="Buscar modelo, código…"
          leading={<Search size={15} />}
          wrapperStyle={{ height: 40 }}
          readOnly
          onClick={onAddClick}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* Progresso */}
      {topSeries.length > 0 && (
        <section style={{ marginBottom: 'var(--s5)' }}>
          <div style={secLabel}>Seu progresso</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s2)' }}>
            {topSeries.map((s) => (
              <ProgressCard
                key={s.nome}
                icon="Package"
                name={s.nome}
                missing={s.total - s.owned}
                pct={s.pct}
                onClick={onSerieClick ? () => onSerieClick(s.nome) : undefined}
              />
            ))}
          </div>
        </section>
      )}

      {/* Feed recente */}
      {recentItems.length > 0 && (
        <section style={{ marginBottom: 'var(--s5)' }}>
          <div style={secLabel}>Adicionados recentemente</div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
            {recentItems.map((it) => (
              <div
                key={it.key}
                onClick={() => onItemClick(it.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--s3)',
                  padding: 'var(--s2) var(--s3)', cursor: 'pointer',
                  borderBottom: '1px solid var(--border)',
                  transition: 'background var(--dur-base) var(--ease)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-2)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', flexShrink: 0, background: 'var(--surface-2)', overflow: 'hidden' }}>
                  {it.img && <img src={it.img} alt={it.modelo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.modelo || '—'}</div>
                  <div style={{ fontSize: 11, color: 'var(--subtle)', marginTop: 2 }}>
                    {it.line ? it.line.replace(/-/g, ' ').toUpperCase() : (it.n ? String(it.n) : '—')}
                  </div>
                </div>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: checks[it.key]?.owned ? 'var(--accent)' : 'transparent',
                  border: checks[it.key]?.owned ? 'none' : '1.5px solid var(--border-2)',
                }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Conquistas */}
      <section>
        <div style={secLabel}>Conquistas</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s2)' }}>
          {achievements.map((a) => (
            <AchievementCard key={a.title} {...a} />
          ))}
        </div>
      </section>
    </div>
  )
}
