import { useMemo } from 'react'
import type { Serie, OwnershipMap, Line } from '../types'
import { effectiveLine, lineMeta } from '../utils/line'

type Props = {
  series: Serie[]
  checks: OwnershipMap
}

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })

type OwnedItem = {
  key: string; serie: string; modelo: string; n?: string | number
  img?: string; line?: Line; qty: number; paid?: number
  market?: number; estimated: number; packaging?: string
}

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

    const bySerie = new Map<string, number>()
    for (const o of owned) bySerie.set(o.serie, (bySerie.get(o.serie) ?? 0) + o.estimated)
    const topSeries = Array.from(bySerie.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3)

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

    return { totalCount, totalInvested, totalEstimated, valorizacao, valorInvested, avgMarket, top5, bestGain, cheapest, topSeries, lineDist, carded, loose, semEmb, ownedCount: owned.length }
  }, [series, checks])

  if (data.ownedCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <span className="text-5xl">📊</span>
        <p className="text-base font-semibold text-zinc-800">Nenhuma peça marcada</p>
        <p className="text-sm text-zinc-400 max-w-xs">Marque algumas peças como "tenho" para ver estatísticas.</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-5 space-y-6 max-w-xl mx-auto">

      {/* Resumo */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { value: data.totalCount,                 label: 'peças' },
          { value: data.ownedCount,                 label: 'modelos únicos' },
          { value: BRL.format(data.totalEstimated), label: 'valor estimado' },
          { value: BRL.format(data.totalInvested),  label: 'investido' },
        ].map((c) => (
          <div key={c.label} className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
            <div className="text-lg font-bold text-zinc-900 truncate">{c.value}</div>
            <div className="text-xs text-zinc-400 mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Valorização */}
      {data.valorInvested > 0 && (
        <section>
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Valorização</h4>
          <div className="flex gap-3">
            <div className="flex-1 bg-zinc-50 rounded-xl p-4 border border-zinc-100">
              <div className={['text-lg font-bold', data.valorizacao >= 0 ? 'text-emerald-600' : 'text-red-500'].join(' ')}>
                {data.valorizacao >= 0 ? '+' : ''}{BRL.format(data.valorizacao)}
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">ganho estimado</div>
            </div>
            <div className="flex-1 bg-zinc-50 rounded-xl p-4 border border-zinc-100">
              <div className={['text-lg font-bold', data.valorizacao >= 0 ? 'text-emerald-600' : 'text-red-500'].join(' ')}>
                {data.valorInvested > 0 ? `${((data.valorizacao / data.valorInvested) * 100).toFixed(1)}%` : '—'}
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">retorno</div>
            </div>
            {data.avgMarket != null && (
              <div className="flex-1 bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                <div className="text-lg font-bold text-zinc-900">{BRL.format(data.avgMarket)}</div>
                <div className="text-xs text-zinc-400 mt-0.5">média por peça</div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Destaques */}
      {(data.bestGain || data.cheapest) && (
        <section>
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Destaques</h4>
          <div className="divide-y divide-zinc-100 border border-zinc-100 rounded-xl overflow-hidden">
            {data.bestGain && (
              <div className="flex items-center gap-3 p-3 bg-white">
                {data.bestGain.img && <img src={data.bestGain.img} alt="" className="w-10 h-10 object-contain rounded-lg bg-zinc-50" />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-zinc-900 truncate">{data.bestGain.modelo}</div>
                  <div className="text-xs text-zinc-400">Maior valorização</div>
                </div>
                <div className="text-sm font-semibold text-emerald-600">
                  +{((data.bestGain.market! / data.bestGain.paid! - 1) * 100).toFixed(0)}%
                </div>
              </div>
            )}
            {data.cheapest && data.cheapest.key !== data.bestGain?.key && (
              <div className="flex items-center gap-3 p-3 bg-white">
                {data.cheapest.img && <img src={data.cheapest.img} alt="" className="w-10 h-10 object-contain rounded-lg bg-zinc-50" />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-zinc-900 truncate">{data.cheapest.modelo}</div>
                  <div className="text-xs text-zinc-400">Menor preço pago</div>
                </div>
                <div className="text-sm font-semibold text-zinc-700">{BRL.format(data.cheapest.paid!)}</div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Top 5 */}
      {data.top5.length > 0 && (
        <section>
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Top 5 mais valiosos</h4>
          <div className="divide-y divide-zinc-100 border border-zinc-100 rounded-xl overflow-hidden">
            {data.top5.map((it, i) => {
              const meta = lineMeta(it.line)
              return (
                <div key={it.key} className="flex items-center gap-3 p-3 bg-white">
                  <span className="text-xs font-bold text-zinc-300 w-4 text-center">{i + 1}</span>
                  {it.img && <img src={it.img} alt="" className="w-10 h-10 object-contain rounded-lg bg-zinc-50" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-zinc-900 truncate">{it.modelo}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-zinc-400">{it.serie}{it.n ? ` · ${it.n}` : ''}</span>
                      {meta && (
                        <span className="px-1 py-px text-[9px] font-bold text-white rounded" style={{ background: meta.badgeBg || meta.color }}>
                          {meta.short}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-zinc-700">{BRL.format(it.estimated)}</div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Top coleções */}
      {data.topSeries.length > 1 && (
        <section>
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Top coleções</h4>
          <div className="divide-y divide-zinc-100 border border-zinc-100 rounded-xl overflow-hidden">
            {data.topSeries.map(([nome, val]) => (
              <div key={nome} className="flex items-center justify-between p-3 bg-white">
                <span className="text-sm font-medium text-zinc-800 truncate">{nome}</span>
                <span className="text-sm font-semibold text-zinc-700 ml-3">{BRL.format(val)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Distribuição por linha */}
      {data.lineDist.length > 0 && (
        <section>
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Por linha</h4>
          <div className="space-y-2">
            {data.lineDist.map((d) => {
              const meta = lineMeta(d.line)
              const pct = data.totalCount > 0 ? (d.count / data.totalCount) * 100 : 0
              return (
                <div key={d.key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-zinc-700">{meta?.label || 'Sem linha'}</span>
                    <span className="text-zinc-400">{d.count} · {BRL.format(d.estimated)}</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: meta?.badgeBg || meta?.color || '#a1a1aa' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Embalagem */}
      {(data.carded > 0 || data.loose > 0) && (
        <section>
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Embalagem</h4>
          <div className="flex gap-3">
            {[
              { value: data.carded, label: 'carteladas' },
              { value: data.loose,  label: 'soltas' },
              ...(data.semEmb > 0 ? [{ value: data.semEmb, label: 'não informado' }] : []),
            ].map((c) => (
              <div key={c.label} className="flex-1 bg-zinc-50 rounded-xl p-4 border border-zinc-100 text-center">
                <div className="text-xl font-bold text-zinc-900">{c.value}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{c.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
