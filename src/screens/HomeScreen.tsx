import type { User } from 'firebase/auth'
import { Search, Plus, Trophy, Flame, Star } from 'lucide-react'
import type { Serie, OwnershipMap } from '../types'
import { DsInput, IconButton } from '../components/ds'

type Props = {
  user: User | null
  series: Serie[]
  checks: OwnershipMap
  onAddClick: () => void
  onItemClick: (key: string) => void
}

function ProgressCard({ nome, owned, total, pct }: { nome: string; owned: number; total: number; pct: number }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', padding: 'var(--s4)',
      display: 'flex', flexDirection: 'column', gap: 'var(--s2)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>{nome}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', flexShrink: 0 }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 'var(--r-full)', transition: 'width .6s ease' }} />
      </div>
      <span style={{ fontSize: 11, color: 'var(--subtle)' }}>{owned} de {total}</span>
    </div>
  )
}

function AchievementCard({ icon, label, desc, unlocked }: { icon: React.ReactNode; label: string; desc: string; unlocked: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 'var(--s3)',
      background: unlocked ? 'var(--surface)' : 'var(--surface-2)',
      border: `1px solid ${unlocked ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: 'var(--r-lg)', padding: 'var(--s3)',
      opacity: unlocked ? 1 : 0.5,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 'var(--r-md)', flexShrink: 0,
        background: unlocked ? 'var(--accent)' : 'var(--surface-2)',
        color: unlocked ? 'var(--accent-fg)' : 'var(--subtle)',
        display: 'grid', placeItems: 'center',
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--subtle)', marginTop: 2 }}>{desc}</div>
      </div>
    </div>
  )
}

const sectionLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '.06em',
  color: 'var(--subtle)', textTransform: 'uppercase', marginBottom: 'var(--s3)',
}

export default function HomeScreen({ user, series, checks, onAddClick, onItemClick }: Props) {
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
    .slice(0, 2)

  const recentItems = series.flatMap((s) =>
    s.items.map((i) => ({ ...i, serie: s.nome, key: `${s.nome}__${i.n ?? ''}` }))
  ).slice(0, 5)

  const totalOwned = series.reduce((acc, s) =>
    acc + s.items.filter((i) => checks[`${s.nome}__${i.n ?? ''}`]?.owned).length, 0)
  const totalItems = series.reduce((acc, s) => acc + s.items.length, 0)

  const achievements = [
    { icon: <Flame size={18} />, label: 'Primeiro item', desc: 'Adicione sua primeira peça', unlocked: totalOwned >= 1 },
    { icon: <Trophy size={18} />, label: 'Colecionador', desc: '10 peças na coleção', unlocked: totalOwned >= 10 },
    { icon: <Star size={18} />, label: 'Completista', desc: 'Complete uma série inteira', unlocked: series.some((s) => s.items.length > 0 && s.items.every((i) => checks[`${s.nome}__${i.n ?? ''}`]?.owned)) },
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
        <IconButton icon={<Plus size={20} />} onClick={onAddClick} aria-label="Adicionar peça" />
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
          <div style={sectionLabel}>Seu progresso</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s2)' }}>
            {topSeries.map((s) => (
              <ProgressCard key={s.nome} {...s} />
            ))}
          </div>
        </section>
      )}

      {/* Feed recente */}
      {recentItems.length > 0 && (
        <section style={{ marginBottom: 'var(--s5)' }}>
          <div style={sectionLabel}>Adicionados recentemente</div>
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
                <div style={{
                  width: 44, height: 44, borderRadius: 'var(--r-md)', flexShrink: 0,
                  background: 'var(--surface-2)', overflow: 'hidden',
                }}>
                  {it.img && <img src={it.img} alt={it.modelo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.modelo || '—'}</div>
                  <div style={{ fontSize: 11, color: 'var(--subtle)', marginTop: 2 }}>{it.serie}</div>
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
        <div style={sectionLabel}>Conquistas</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s2)' }}>
          {achievements.map((a) => (
            <AchievementCard key={a.label} {...a} />
          ))}
        </div>
      </section>
    </div>
  )
}
