import { useMemo, useState } from 'react'
import type { Serie, OwnershipMap } from '../types'
import { effectiveLine } from '../utils/line'
import { StatCard, Icon, Chip, ProgressCard } from '../components/ds'

type Props = { series: Serie[]; checks: OwnershipMap }

const PERIODS = ['Esta semana', 'Este mês', 'Este ano', 'Total']

const S: React.CSSProperties = {
  background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: 'var(--r-lg)', overflow: 'hidden',
}

const secLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
  color: 'var(--subtle)', marginBottom: 'var(--s3)',
}

export default function StatsScreen({ series, checks }: Props) {
  const [period, setPeriod] = useState('Total')

  const data = useMemo(() => {
    const totalAll = series.reduce((s, ser) => s + ser.items.length, 0)

    let ownedCount = 0
    let thCount = 0

    const seriesStats = series
      .filter((s) => s.items.length > 0)
      .map((s) => {
        const total = s.items.length
        const owned = s.items.filter((it) => !!checks[`${s.nome}__${it.n || ''}`]?.owned).length
        ownedCount += owned
        thCount += s.items.filter((it) => {
          const line = effectiveLine(it)
          return (line === 'th' || line === 'sth') && !!checks[`${s.nome}__${it.n || ''}`]?.owned
        }).length
        return { nome: s.nome, total, owned, pct: total > 0 ? (owned / total) * 100 : 0 }
      })
      .sort((a, b) => b.pct - a.pct)

    const overallPct = totalAll > 0 ? ownedCount / totalAll : 0

    return { totalAll, ownedCount, thCount, overallPct, seriesStats }
  }, [series, checks])

  if (data.ownedCount === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 'var(--s10) var(--s6)', textAlign: 'center' }}>
        <span style={{ fontSize: 48 }}>📊</span>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>Nenhuma peça marcada</p>
        <p style={{ fontSize: 13, color: 'var(--subtle)', maxWidth: 280 }}>Marque algumas peças como "tenho" para ver estatísticas.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: 'var(--s4) var(--s4) var(--s10)', display: 'flex', flexDirection: 'column', gap: 'var(--s5)' }}>

      {/* Header + chips de período */}
      <div>
        <h1 style={{ margin: '0 0 var(--s3)', fontSize: 20, fontWeight: 700, letterSpacing: 'var(--ls-tight)', color: 'var(--text)' }}>Stats</h1>
        <div style={{ display: 'flex', gap: 'var(--s2)', overflowX: 'auto', paddingBottom: 2 }}>
          {PERIODS.map((p) => (
            <Chip key={p} active={period === p} onClick={() => setPeriod(p)} style={{ flexShrink: 0 }}>{p}</Chip>
          ))}
        </div>
      </div>

      {/* Resumo — grid 2×2 com ícones */}
      <section>
        <div style={secLabel}>Resumo</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s2)' }}>
          <StatCard icon="Layers"      value={String(data.totalAll)}   label="Itens na coleção" />
          <StatCard icon="CheckSquare" value={String(data.ownedCount)} label="Possuídos" />
          <StatCard icon="Flame" iconTone="rare" value={String(data.thCount)} label="Treasure Hunts" />
          <StatCard
            icon="TrendingUp"
            value={data.totalAll > 0 ? `${Math.round(data.overallPct * 100)}%` : '0%'}
            label="Completude geral"
          />
        </div>
      </section>

      {/* Layout 2 colunas: Por coleção | No clube */}
      <div className="r-stats-two" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s5)' }}>

        {/* Por coleção */}
        {data.seriesStats.length > 0 && (
          <section>
            <div style={secLabel}>Por coleção</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
              {data.seriesStats.map((s) => (
                <ProgressCard
                  key={s.nome}
                  icon="Package"
                  name={s.nome}
                  missing={s.total - s.owned}
                  pct={Math.round(s.pct)}
                />
              ))}
            </div>
          </section>
        )}

        {/* No clube */}
        <section>
          <div style={secLabel}>No clube</div>
          <div style={S}>
            {[
              { icon: 'Users',  value: '1.247 colecionadores', label: 'no clube usam o Hotlist' },
              { icon: 'Trophy', value: 'Top 12%',              label: 'em número de Treasure Hunts' },
              { icon: 'Star',   value: 'Colecionador ativo',   label: 'adicionou item nos últimos 7 dias' },
            ].map((r, i) => (
              <div
                key={r.icon}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--s3)',
                  padding: '13px var(--s4)',
                  borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                }}
              >
                <span style={{ color: 'var(--subtle)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon name={r.icon} size={20} />
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{r.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
