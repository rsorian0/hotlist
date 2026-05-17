import { useMemo } from 'react'
import type { Serie, OwnershipMap, Line } from '../types'
import { effectiveLine, lineMeta } from '../utils/line'

type Props = { series: Serie[]; checks: OwnershipMap }

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })

type OwnedItem = {
  key: string; serie: string; modelo: string; n?: string | number
  img?: string; line?: Line; qty: number; paid?: number
  market?: number; estimated: number; packaging?: string
}

// ─── sub-components ──────────────────────────────────────────────────────────

function RingChart({ pct, size = 128, stroke = 11 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = Math.max(0, Math.min(1, pct)) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        className="stroke-neutral-200 dark:stroke-neutral-700" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        className="stroke-neutral-900 dark:stroke-neutral-100" strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray .7s ease' }} />
    </svg>
  )
}

function HBar({ pct, color }: { pct: number; color?: string }) {
  return (
    <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.max(2, pct)}%`, background: color || 'currentColor' }}
      />
    </div>
  )
}

function ValueBar({ value, max, color }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.max(2, pct)}%`, background: color || '#737373' }}
      />
    </div>
  )
}

// ─── main ────────────────────────────────────────────────────────────────────

const card = 'bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 border border-neutral-100 dark:border-neutral-700'
const listWrap = 'divide-y divide-neutral-100 dark:divide-neutral-800 border border-neutral-100 dark:border-neutral-800 rounded-xl overflow-hidden'
const listRow = 'flex items-center gap-3 p-3 bg-white dark:bg-neutral-900'
const sectionLabel = 'text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3'

export default function Stats({ series, checks }: Props) {
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

    // Series completion
    const seriesStats = series
      .filter((s) => s.items.length > 0)
      .map((s) => {
        const total = s.items.length
        const ownedCount = s.items.filter((it) => !!checks[`${s.nome}__${it.n || ''}`]?.owned).length
        const value = owned.filter((o) => o.serie === s.nome).reduce((acc, o) => acc + o.estimated, 0)
        return { nome: s.nome, total, owned: ownedCount, pct: (ownedCount / total) * 100, value }
      })
      .sort((a, b) => b.pct - a.pct)

    const totalAll = series.reduce((s, ser) => s + ser.items.length, 0)
    const ownedCount = owned.length
    const overallPct = totalAll > 0 ? ownedCount / totalAll : 0

    // Value by series (for bar chart)
    const valueBySerieMax = Math.max(...seriesStats.map((s) => s.value), 1)

    // By line
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

    return {
      totalCount, totalInvested, totalEstimated, valorizacao, valorInvested,
      avgMarket, top5, bestGain, cheapest, lineDist, carded, loose, semEmb,
      ownedCount, totalAll, overallPct, seriesStats, valueBySerieMax,
    }
  }, [series, checks])

  if (data.ownedCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <span className="text-5xl">📊</span>
        <p className="text-base font-semibold text-neutral-800 dark:text-neutral-200">Nenhuma peça marcada</p>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 max-w-xs">Marque algumas peças como "tenho" para ver estatísticas.</p>
      </div>
    )
  }

  const pctLabel = data.totalAll > 0
    ? `${Math.round(data.overallPct * 100)}%`
    : `${data.ownedCount}`

  return (
    <div className="px-4 py-5 space-y-6 max-w-xl mx-auto">

      {/* ── Hero: completion ring ── */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-5 flex items-center gap-5">
        <div className="relative shrink-0">
          <RingChart pct={data.overallPct} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-none">{pctLabel}</span>
            {data.totalAll > 0 && <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">completo</span>}
          </div>
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{data.ownedCount}</div>
            <div className="text-xs text-neutral-400 dark:text-neutral-500">
              {data.totalAll > 0 ? `de ${data.totalAll} modelos na coleção` : 'modelos coletados'}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div>
              <div className="font-semibold text-neutral-800 dark:text-neutral-200">{data.totalCount}</div>
              <div className="text-neutral-400 dark:text-neutral-500">peças (c/ duplicatas)</div>
            </div>
            <div>
              <div className="font-semibold text-neutral-800 dark:text-neutral-200">{BRL.format(data.totalEstimated)}</div>
              <div className="text-neutral-400 dark:text-neutral-500">valor estimado</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { value: BRL.format(data.totalEstimated), label: 'valor estimado' },
          { value: BRL.format(data.totalInvested),  label: 'total investido' },
          ...(data.avgMarket != null ? [{ value: BRL.format(data.avgMarket), label: 'preço médio' }] : []),
          ...(data.totalCount > data.ownedCount ? [{ value: data.totalCount - data.ownedCount, label: 'duplicatas' }] : []),
        ].map((c) => (
          <div key={c.label} className={card}>
            <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100 truncate">{c.value}</div>
            <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      {/* ── Valorização ── */}
      {data.valorInvested > 0 && (
        <section>
          <h4 className={sectionLabel}>Valorização</h4>
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800 divide-y divide-neutral-100 dark:divide-neutral-800">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Investido</span>
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{BRL.format(data.valorInvested)}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Valor de mercado</span>
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{BRL.format(data.valorInvested + data.valorizacao)}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Ganho estimado</span>
              <span className={['text-sm font-bold', data.valorizacao >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'].join(' ')}>
                {data.valorizacao >= 0 ? '+' : ''}{BRL.format(data.valorizacao)}
                <span className="ml-1.5 font-normal text-xs opacity-70">
                  ({data.valorInvested > 0 ? `${((data.valorizacao / data.valorInvested) * 100).toFixed(1)}%` : '—'})
                </span>
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ── Series completion ── */}
      {data.seriesStats.length > 0 && (
        <section>
          <h4 className={sectionLabel}>Completude por coleção</h4>
          <div className="space-y-3">
            {data.seriesStats.map((s) => (
              <div key={s.nome}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 truncate mr-2">{s.nome}</span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 shrink-0">
                    {s.owned}/{s.total} · {Math.round(s.pct)}%
                  </span>
                </div>
                <HBar pct={s.pct} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Value by series ── */}
      {data.seriesStats.filter((s) => s.value > 0).length > 1 && (
        <section>
          <h4 className={sectionLabel}>Valor por coleção</h4>
          <div className="space-y-3">
            {data.seriesStats
              .filter((s) => s.value > 0)
              .sort((a, b) => b.value - a.value)
              .map((s) => (
                <div key={s.nome}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 truncate mr-2">{s.nome}</span>
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 shrink-0">{BRL.format(s.value)}</span>
                  </div>
                  <ValueBar value={s.value} max={data.valueBySerieMax} />
                </div>
              ))}
          </div>
        </section>
      )}

      {/* ── By line ── */}
      {data.lineDist.length > 0 && (
        <section>
          <h4 className={sectionLabel}>Por linha</h4>
          <div className="space-y-3">
            {data.lineDist.map((d) => {
              const meta = lineMeta(d.line)
              const pct = data.totalCount > 0 ? (d.count / data.totalCount) * 100 : 0
              const color = meta?.badgeBg || meta?.color || '#a3a3a3'
              return (
                <div key={d.key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {meta && (
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                      )}
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{meta?.label || 'Sem linha'}</span>
                    </div>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">{d.count} · {BRL.format(d.estimated)}</span>
                  </div>
                  <HBar pct={pct} color={color} />
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Top 5 ── */}
      {data.top5.length > 0 && (
        <section>
          <h4 className={sectionLabel}>Top 5 mais valiosos</h4>
          <div className={listWrap}>
            {data.top5.map((it, i) => {
              const meta = lineMeta(it.line)
              return (
                <div key={it.key} className={listRow}>
                  <span className="text-xs font-bold text-neutral-300 dark:text-neutral-600 w-4 text-center shrink-0">{i + 1}</span>
                  {it.img && <img src={it.img} alt="" className="w-10 h-10 object-contain rounded-lg bg-neutral-100 dark:bg-neutral-800 shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{it.modelo}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 truncate">{it.serie}{it.n ? ` · ${it.n}` : ''}</span>
                      {meta && (
                        <span className="px-1 py-px text-[9px] font-bold text-white rounded shrink-0" style={{ background: meta.badgeBg || meta.color }}>
                          {meta.short}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 shrink-0">{BRL.format(it.estimated)}</div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Destaques ── */}
      {(data.bestGain || data.cheapest) && (
        <section>
          <h4 className={sectionLabel}>Destaques</h4>
          <div className={listWrap}>
            {data.bestGain && (
              <div className={listRow}>
                {data.bestGain.img && <img src={data.bestGain.img} alt="" className="w-10 h-10 object-contain rounded-lg bg-neutral-100 dark:bg-neutral-800 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{data.bestGain.modelo}</div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500">Maior valorização</div>
                </div>
                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
                  +{((data.bestGain.market! / data.bestGain.paid! - 1) * 100).toFixed(0)}%
                </div>
              </div>
            )}
            {data.cheapest && data.cheapest.key !== data.bestGain?.key && (
              <div className={listRow}>
                {data.cheapest.img && <img src={data.cheapest.img} alt="" className="w-10 h-10 object-contain rounded-lg bg-neutral-100 dark:bg-neutral-800 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{data.cheapest.modelo}</div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500">Menor preço pago</div>
                </div>
                <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 shrink-0">{BRL.format(data.cheapest.paid!)}</div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Embalagem ── */}
      {(data.carded > 0 || data.loose > 0) && (
        <section>
          <h4 className={sectionLabel}>Embalagem</h4>
          <div className="flex gap-3">
            {[
              { value: data.carded, label: 'carteladas', pct: (data.carded / data.totalCount) * 100 },
              { value: data.loose,  label: 'soltas',     pct: (data.loose  / data.totalCount) * 100 },
              ...(data.semEmb > 0 ? [{ value: data.semEmb, label: 'não inf.', pct: (data.semEmb / data.totalCount) * 100 }] : []),
            ].map((c) => (
              <div key={c.label} className={`flex-1 ${card} text-center`}>
                <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{c.value}</div>
                <div className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">{c.label}</div>
                <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-1">{Math.round(c.pct)}%</div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
