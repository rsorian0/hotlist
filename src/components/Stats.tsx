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

const card = 'bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 border border-neutral-100 dark:border-neutral-700'
const listWrap = 'divide-y divide-neutral-100 dark:divide-neutral-800 border border-neutral-100 dark:border-neutral-800 rounded-xl overflow-hidden'
const listRow = 'flex items-center gap-3 p-3 bg-white dark:bg-neutral-900'
const sectionLabel = 'text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2'

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
        <p className="text-base font-semibold text-neutral-800 dark:text-neutral-200">Nenhuma peça marcada</p>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 max-w-xs">Marque algumas peças como "tenho" para ver estatísticas.</p>
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
          <div key={c.label} className={card}>
            <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100 truncate">{c.value}</div>
            <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Valorização */}
      {data.valorInvested > 0 && (
        <section>
          <h4 className={sectionLabel}>Valorização</h4>
          <div className="flex gap-3">
            <div className={`flex-1 ${card}`}>
              <div className={['text-lg font-bold', data.valorizacao >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'].join(' ')}>
                {data.valorizacao >= 0 ? '+' : ''}{BRL.format(data.valorizacao)}
              </div>
              <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">ganho estimado</div>
            </div>
            <div className={`flex-1 ${card}`}>
              <div className={['text-lg font-bold', data.valorizacao >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'].join(' ')}>
                {data.valorInvested > 0 ? `${((data.valorizacao / data.valorInvested) * 100).toFixed(1)}%` : '—'}
              </div>
              <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">retorno</div>
            </div>
            {data.avgMarket != null && (
              <div className={`flex-1 ${card}`}>
                <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{BRL.format(data.avgMarket)}</div>
                <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">média por peça</div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Destaques */}
      {(data.bestGain || data.cheapest) && (
        <section>
          <h4 className={sectionLabel}>Destaques</h4>
          <div className={listWrap}>
            {data.bestGain && (
              <div className={listRow}>
                {data.bestGain.img && <img src={data.bestGain.img} alt="" className="w-10 h-10 object-contain rounded-lg bg-neutral-100 dark:bg-neutral-800" />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{data.bestGain.modelo}</div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500">Maior valorização</div>
                </div>
                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  +{((data.bestGain.market! / data.bestGain.paid! - 1) * 100).toFixed(0)}%
                </div>
              </div>
            )}
            {data.cheapest && data.cheapest.key !== data.bestGain?.key && (
              <div className={listRow}>
                {data.cheapest.img && <img src={data.cheapest.img} alt="" className="w-10 h-10 object-contain rounded-lg bg-neutral-100 dark:bg-neutral-800" />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{data.cheapest.modelo}</div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500">Menor preço pago</div>
                </div>
                <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{BRL.format(data.cheapest.paid!)}</div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Top 5 */}
      {data.top5.length > 0 && (
        <section>
          <h4 className={sectionLabel}>Top 5 mais valiosos</h4>
          <div className={listWrap}>
            {data.top5.map((it, i) => {
              const meta = lineMeta(it.line)
              return (
                <div key={it.key} className={listRow}>
                  <span className="text-xs font-bold text-neutral-300 dark:text-neutral-600 w-4 text-center">{i + 1}</span>
                  {it.img && <img src={it.img} alt="" className="w-10 h-10 object-contain rounded-lg bg-neutral-100 dark:bg-neutral-800" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{it.modelo}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">{it.serie}{it.n ? ` · ${it.n}` : ''}</span>
                      {meta && (
                        <span className="px-1 py-px text-[9px] font-bold text-white rounded" style={{ background: meta.badgeBg || meta.color }}>
                          {meta.short}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{BRL.format(it.estimated)}</div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Top coleções */}
      {data.topSeries.length > 1 && (
        <section>
          <h4 className={sectionLabel}>Top coleções</h4>
          <div className={listWrap}>
            {data.topSeries.map(([nome, val]) => (
              <div key={nome} className={`${listRow} justify-between`}>
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">{nome}</span>
                <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 ml-3">{BRL.format(val)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Distribuição por linha */}
      {data.lineDist.length > 0 && (
        <section>
          <h4 className={sectionLabel}>Por linha</h4>
          <div className="space-y-2">
            {data.lineDist.map((d) => {
              const meta = lineMeta(d.line)
              const pct = data.totalCount > 0 ? (d.count / data.totalCount) * 100 : 0
              return (
                <div key={d.key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">{meta?.label || 'Sem linha'}</span>
                    <span className="text-neutral-400 dark:text-neutral-500">{d.count} · {BRL.format(d.estimated)}</span>
                  </div>
                  <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: meta?.badgeBg || meta?.color || '#a3a3a3' }} />
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
          <h4 className={sectionLabel}>Embalagem</h4>
          <div className="flex gap-3">
            {[
              { value: data.carded, label: 'carteladas' },
              { value: data.loose,  label: 'soltas' },
              ...(data.semEmb > 0 ? [{ value: data.semEmb, label: 'não informado' }] : []),
            ].map((c) => (
              <div key={c.label} className={`flex-1 ${card} text-center`}>
                <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{c.value}</div>
                <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">{c.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
