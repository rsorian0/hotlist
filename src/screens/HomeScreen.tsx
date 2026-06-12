import type { User } from 'firebase/auth'
import { Search, Plus } from 'lucide-react'
import type { Serie, OwnershipMap } from '../types'
import { DsInput, IconButton, ProgressCard, AchievementCard, FeedItemCard } from '../components/ds'
import { effectiveLine } from '../utils/line'

type Props = {
  user: User | null
  series: Serie[]
  checks: OwnershipMap
  onAddClick: () => void
  onItemClick: (key: string) => void
  onToggle: (key: string, owned: boolean) => void
  onSerieClick?: (nome: string) => void
}

const secLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '.06em',
  color: 'var(--subtle)', textTransform: 'uppercase',
  padding: 'var(--s5) 0 var(--s2)',
}

const secLabelRow: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
}

export default function HomeScreen({ user, series, checks, onAddClick, onItemClick, onToggle, onSerieClick }: Props) {
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
    s.items.map((i) => ({
      ...i,
      serie: s.nome,
      key: `${s.nome}__${i.n ?? ''}`,
      line: effectiveLine(i),
      clubCount: Math.floor(Math.random() * 400 + 30),
    }))
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
      <div style={{ paddingTop: 14, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--s3)', marginBottom: 'var(--s4)' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 'var(--ls-tight)', color: 'var(--text)' }}>
            {greeting}, {name} 👋
          </div>
          <div style={{ fontSize: 13, color: 'var(--subtle)', marginTop: 2 }}>
            {totalItems > 0 ? `${totalOwned} de ${totalItems} itens coletados` : 'Comece a sua coleção'}
          </div>
        </div>
        <IconButton onClick={onAddClick} aria-label="Adicionar peça"><Plus size={20} /></IconButton>
      </div>

      {/* Busca — oculta no desktop (Header já tem busca) */}
      <div className="md:hidden">
        <DsInput
          type="search"
          placeholder="Buscar modelo…"
          leading={<Search size={15} />}
          wrapperStyle={{ height: 40, marginBottom: 'var(--s4)' }}
          readOnly
          onClick={onAddClick}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* Progresso */}
      {topSeries.length > 0 && (
        <section>
          <div style={secLabel}>Seu progresso</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
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
        <section>
          <div style={{ ...secLabelRow, ...secLabel }}>
            <span>Adicionados recentemente</span>
            <span style={{ fontSize: 12, color: 'var(--subtle)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>Ver tudo</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
            {recentItems.map((it) => (
              <FeedItemCard
                key={it.key}
                item={{ n: it.n, modelo: it.modelo, img: it.img, line: it.line, serie: it.serie }}
                owned={!!checks[it.key]?.owned}
                clubCount={it.clubCount}
                onClick={() => onItemClick(it.key)}
                onToggle={() => onToggle(it.key, !checks[it.key]?.owned)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Conquistas */}
      <section>
        <div style={secLabel}>Conquistas</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)', paddingBottom: 'var(--s4)' }}>
          {achievements.map((a) => (
            <AchievementCard key={a.title} {...a} />
          ))}
        </div>
      </section>
    </div>
  )
}
