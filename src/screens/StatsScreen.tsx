import { useMemo, useState } from 'react'
import type { Serie, OwnershipMap, Line } from '../types'
import { effectiveLine, lineMeta } from '../utils/line'
import { StatCard, Icon, Chip, ProgressCard } from '../components/ds'

type Props = { series: Serie[]; checks: OwnershipMap }

const PERIODS = ['Esta semana', 'Este mês', 'Este ano', 'Total']

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })

type OwnedItem = {
  key: string; serie: string; modelo: string; n?: string | number
  img?: string; line?: Line; qty: number; paid?: number
  market?: number; estimated: number; packaging?: string
}

const S: React.CSSProperties = {
  background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: 'var(--r-lg)', padding: 'var(--s4)',
}

function RingChart({ pct, size = 128, stroke = 11 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = Math.max(0, Math.min(1, pct)) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray .7s ease' }} />
    </svg>
  )
}

function HBar({ pct, color }: { pct: number; color?: string }) {
  return (
    <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${Math.max(2, pct)}%`, background: color || 'var(--accent)', borderRadius: 'var(--r-full)', transition: 'width .5s ease' }} />
    </div>
  )
}

const secLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
  color: 'var(--subtle)', marginBottom: 'var(--s3)',
}

export default function StatsScreen({ series, checks }: Props) {
  const [period, setPeriod] = useState('Total')
  const data = useMemo(() => {
    const owned: OwnedItem[] = []
    for (const s of series) {
      for (const it of s.items) {
        const key = `${s.nome}__${it.n || ''}`
        const o = checks[key]
        if (!o?.owned) continue
        const qty = Math.max(1, o.qty ?? 1)
        const market = o.marketPrice
        const paid = o.paidPrice
        const estimated = market != null ? market * qty : paid != null ? paid : 0
        owned.push({ key, serie: s.nome, modelo: it.modelo || '', n: it.n, img: it.img, line: effectiveLine(it), qty, paid, market, estimated, packaging: o.packaging })
      }
    }

    const totalCount     = owned.reduce((s, o) => s + o.qty, 0)
    const totalInvested  = owned.reduce((s, o) => s + (o.paid ?? 0), 0)
    const totalEstimated = owned.reduce((s, o) => s + o.estimated, 0)

    const withBoth = owned.filter((o) => o.paid != null && o.market != null)
    const valorInvested  = withBoth.reduce((s, o) => s + o.paid! * o.qty, 0)
    const valorEstimated = withBoth.reduce((s, o) => s + o.estimated, 0)
    const valorizacao    = valorEstimated - valorInvested

    const withMarket = owned.filter((o) => o.market != null)
    const avgMarket  = withMarket.length > 0 ? withMarket.reduce((s, o) => s + o.market!, 0) / withMarket.length : null

    const top5 = [...owned].sort((a, b) => b.estimated - a.estimated).slice(0, 5)
    const bestGain = withBoth.length > 0
      ? withBoth.reduce((best, o) => o.market! / o.paid! > best.market! / best.paid! ? o : best)
      : null
    const withPaid = owned.filter((o) => o.paid != null)
    const cheapest = withPaid.length > 0 ? withPaid.reduce((min, o) => o.paid! < min.paid! ? o : min) : null

    const seriesStats = series
      .filter((s) => s.items.length > 0)
      .map((s) => {
        const total = s.items.length
        const ownedCount = s.items.filter((it) => !!checks[`${s.nome}__${it.n || ''}`]?.owned).length
        const value = owned.filter((o) => o.serie === s.nome).reduce((acc, o) => acc + o.estimated, 0)
        return { nome: s.nome, total, owned: ownedCount, pct: (ownedCount / total) * 100, value }
      })
      .sort((a, b) => b.pct - a.pct)

    const totalAll   = series.reduce((s, ser) => s + ser.items.length, 0)
    const ownedCount = owned.length
    const overallPct = totalAll > 0 ? ownedCount / totalAll : 0
    const valueBySerieMax = Math.max(...seriesStats.map((s) => s.value), 1)

    const byLine = new Map<string, { count: number; estimated: number; line?: Line }>()
    for (const o of owned) {
      const k = o.line || 'unknown'
      const cur = byLine.get(k) || { count: 0, estimated: 0, line: o.line }
      cur.count += o.qty; cur.estimated += o.estimated
      byLine.set(k, cur)
    }
    const lineDist = Array.from(byLine.entries())
      .map(([k, v]) => ({ key: k, line: v.line, count: v.count, estimated: v.estimated }))
      .sort((a, b) => b.count - a.count)

    const carded = owned.filter((o) => o.packaging === 'carded').reduce((s, o) => s + o.qty, 0)
    const loose  = owned.filter((o) => o.packaging === 'loose').reduce((s, o) => s + o.qty, 0)
    const semEmb = totalCount - carded - loose

    return { totalCount, totalInvested, totalEstimated, valorizacao, valorInvested,
      avgMarket, top5, bestGain, cheapest, lineDist, carded, loose, semEmb,
      ownedCount, totalAll, overallPct, seriesStats, valueBySerieMax }
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

  const pctLabel = data.totalAll > 0 ? `${Math.round(data.overallPct * 100)}%` : `${data.ownedCount}`

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: 'var(--s4) var(--s4) var(--s10)', display: 'flex', flexDirection: 'column', gap: 'var(--s5)' }}>

      {/* Header + período */}
      <div>
        <h1 style={{ margin: '0 0 var(--s3)', fontSize: 20, fontWeight: 700, letterSpacing: 'var(--ls-tight)', color: 'var(--text)' }}>Stats</h1>
        <div style={{ display: 'flex', gap: 'var(--s2)', overflowX: 'auto', paddingBottom: 2 }}>
          {PERIODS.map((p) => (
            <Chip key={p} active={period === p} onClick={() => setPeriod(p)} style={{ flexShrink: 0 }}>{p}</Chip>
          ))}
        </div>
      </div>

      {/* Resumo — 4 cards DS 2x2 com ícones */}
      <section>
        <div style={secLabel}>Resumo</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s2)' }}>
          <StatCard icon="Layers" value={String(data.totalAll)} label="Itens na coleção" />
          <StatCard icon="CheckSquare" value={String(data.ownedCount)} label="Possuídos" />
          <StatCard
            icon="Flame"
            iconTone="rare"
            value={String(data.lineDist.find((d) => d.key === 'th')?.count ?? 0)}
            label="Treasure Hunts"
          />
          <StatCard
            icon="TrendingUp"
            value={data.totalAll > 0 ? `${Math.round(data.overallPct * 100)}%` : '0%'}
            label="Completude geral"
          />
        </div>
      </section>

      {/* Hero ring */}
      <div style={{ ...S, display: 'flex', alignItems: 'center', gap: 'var(--s5)' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <RingChart pct={data.overallPct} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>{pctLabel}</span>
            {data.totalAll > 0 && <span style={{ fontSize: 10, color: 'var(--subtle)', marginTop: 2 }}>completo</span>}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)' }}>{data.ownedCount}</div>
          <div style={{ fontSize: 12, color: 'var(--subtle)' }}>
            {data.totalAll > 0 ? `de ${data.totalAll} modelos na coleção` : 'modelos coletados'}
          </div>
          <div style={{ marginTop: 'var(--s2)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s2)' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{data.totalCount}</div>
              <div style={{ fontSize: 11, color: 'var(--subtle)' }}>peças (c/ duplicatas)</div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{BRL.format(data.totalEstimated)}</div>
              <div style={{ fontSize: 11, color: 'var(--subtle)' }}>valor estimado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary StatCards financeiros */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s3)' }}>
        <StatCard icon="DollarSign" value={BRL.format(data.totalEstimated)} label="valor estimado" />
        <StatCard icon="Receipt" value={BRL.format(data.totalInvested)} label="total investido" />
        {data.avgMarket != null && <StatCard icon="Tag" value={BRL.format(data.avgMarket)} label="preço médio" />}
        {data.totalCount > data.ownedCount && <StatCard icon="Copy" value={String(data.totalCount - data.ownedCount)} label="duplicatas" />}
      </div>

      {/* Layout 2 colunas: Por coleção | No clube */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--s5)' }}>
        {/* Por coleção */}
        {data.seriesStats.length > 0 && (
          <section>
            <div style={secLabel}>Por coleção</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
              {data.seriesStats.slice(0, 5).map((s) => (
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
          <div style={{ ...S, padding: 0, overflow: 'hidden' }}>
            {[
              { icon: 'Users', value: '1.247 colecionadores', label: 'no clube usam o Hotlist' },
              { icon: 'Trophy', value: 'Top 12%', label: 'em número de Treasure Hunts' },
              { icon: 'Star', value: 'Colecionador ativo', label: 'adicionou item nos últimos 7 dias', last: true },
            ].map((r, i) => (
              <div key={r.icon} style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)', padding: '13px var(--s4)', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                <span style={{ color: 'var(--subtle)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name={r.icon} size={20} /></span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{r.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Valorização */}
      {data.valorInvested > 0 && (
        <section>
          <div style={secLabel}>Valorização</div>
          <div style={{ ...S, padding: 0, overflow: 'hidden' }}>
            {[
              { label: 'Investido', val: BRL.format(data.valorInvested), color: 'var(--text)' },
              { label: 'Valor de mercado', val: BRL.format(data.valorInvested + data.valorizacao), color: 'var(--text)' },
              { label: 'Ganho estimado', val: `${data.valorizacao >= 0 ? '+' : ''}${BRL.format(data.valorizacao)}`, color: data.valorizacao >= 0 ? '#22c55e' : '#ef4444' },
            ].map((r, i) => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--s3) var(--s4)', borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: 13, color: 'var(--subtle)' }}>{r.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: r.color }}>{r.val}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Completude por coleção */}
      {data.seriesStats.length > 0 && (
        <section>
          <div style={secLabel}>Completude por coleção</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
            {data.seriesStats.map((s) => (
              <div key={s.nome}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 8 }}>{s.nome}</span>
                  <span style={{ fontSize: 12, color: 'var(--subtle)', flexShrink: 0 }}>{s.owned}/{s.total} · {Math.round(s.pct)}%</span>
                </div>
                <HBar pct={s.pct} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Valor por coleção */}
      {data.seriesStats.filter((s) => s.value > 0).length > 1 && (
        <section>
          <div style={secLabel}>Valor por coleção</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
            {data.seriesStats.filter((s) => s.value > 0).sort((a, b) => b.value - a.value).map((s) => (
              <div key={s.nome}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 8 }}>{s.nome}</span>
                  <span style={{ fontSize: 12, color: 'var(--subtle)', flexShrink: 0 }}>{BRL.format(s.value)}</span>
                </div>
                <HBar pct={(s.value / data.valueBySerieMax) * 100} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Por linha */}
      {data.lineDist.length > 0 && (
        <section>
          <div style={secLabel}>Por linha</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
            {data.lineDist.map((d) => {
              const meta = lineMeta(d.line)
              const pct = data.totalCount > 0 ? (d.count / data.totalCount) * 100 : 0
              const color = meta?.color || 'var(--accent)'
              return (
                <div key={d.key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{meta?.label || 'Sem linha'}</span>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--subtle)' }}>{d.count} · {BRL.format(d.estimated)}</span>
                  </div>
                  <HBar pct={pct} color={color} />
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Top 5 */}
      {data.top5.length > 0 && (
        <section>
          <div style={secLabel}>Top 5 mais valiosos</div>
          <div style={{ ...S, padding: 0, overflow: 'hidden' }}>
            {data.top5.map((it, i) => {
              const meta = lineMeta(it.line)
              return (
                <div key={it.key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)', padding: 'var(--s3)', borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--subtle)', width: 16, textAlign: 'center', flexShrink: 0 }}>{i + 1}</span>
                  {it.img && <img src={it.img} alt="" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 'var(--r-md)', background: 'var(--surface-2)', flexShrink: 0 }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.modelo}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      <span style={{ fontSize: 11, color: 'var(--subtle)' }}>{it.serie}{it.n ? ` · ${it.n}` : ''}</span>
                      {meta && <span style={{ fontSize: 9, fontWeight: 800, padding: '1px 4px', borderRadius: 'var(--r-sm)', background: meta.badgeBg || meta.color, color: '#fff' }}>{meta.short}</span>}
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', flexShrink: 0 }}>{BRL.format(it.estimated)}</div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Destaques */}
      {(data.bestGain || data.cheapest) && (
        <section>
          <div style={secLabel}>Destaques</div>
          <div style={{ ...S, padding: 0, overflow: 'hidden' }}>
            {data.bestGain && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)', padding: 'var(--s3)' }}>
                {data.bestGain.img && <img src={data.bestGain.img} alt="" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 'var(--r-md)', background: 'var(--surface-2)', flexShrink: 0 }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.bestGain.modelo}</div>
                  <div style={{ fontSize: 11, color: 'var(--subtle)' }}>Maior valorização</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', flexShrink: 0 }}>
                  +{((data.bestGain.market! / data.bestGain.paid! - 1) * 100).toFixed(0)}%
                </div>
              </div>
            )}
            {data.cheapest && data.cheapest.key !== data.bestGain?.key && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)', padding: 'var(--s3)', borderTop: '1px solid var(--border)' }}>
                {data.cheapest.img && <img src={data.cheapest.img} alt="" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 'var(--r-md)', background: 'var(--surface-2)', flexShrink: 0 }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.cheapest.modelo}</div>
                  <div style={{ fontSize: 11, color: 'var(--subtle)' }}>Menor preço pago</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', flexShrink: 0 }}>{BRL.format(data.cheapest.paid!)}</div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Embalagem */}
      {(data.carded > 0 || data.loose > 0) && (
        <section>
          <div style={secLabel}>Embalagem</div>
          <div style={{ display: 'flex', gap: 'var(--s3)' }}>
            {[
              { value: data.carded, label: 'carteladas', pct: (data.carded / data.totalCount) * 100 },
              { value: data.loose,  label: 'soltas',     pct: (data.loose  / data.totalCount) * 100 },
              ...(data.semEmb > 0 ? [{ value: data.semEmb, label: 'não inf.', pct: (data.semEmb / data.totalCount) * 100 }] : []),
            ].map((c) => (
              <div key={c.label} style={{ flex: 1, ...S, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>{c.value}</div>
                <div style={{ fontSize: 10, color: 'var(--subtle)', marginTop: 2 }}>{c.label}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginTop: 4 }}>{Math.round(c.pct)}%</div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
