import { useMemo } from 'react'
import type { Serie, OwnershipMap, Line } from '../types'
import { effectiveLine, lineMeta } from '../utils/line'

type Props = {
  series: Serie[]
  checks: OwnershipMap
}

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })

type OwnedItem = {
  key: string
  serie: string
  modelo: string
  n?: string | number
  img?: string
  line?: Line
  qty: number
  paid?: number
  market?: number
  estimated: number
  packaging?: string
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
        owned.push({
          key, serie: s.nome, modelo: it.modelo || '',
          n: it.n, img: it.img, line: effectiveLine(it),
          qty, paid, market, estimated, packaging: o.packaging,
        })
      }
    }

    const totalCount     = owned.reduce((s, o) => s + o.qty, 0)
    const totalInvested  = owned.reduce((s, o) => s + (o.paid ?? 0), 0)
    const totalEstimated = owned.reduce((s, o) => s + o.estimated, 0)

    // Valorização — só itens com ambos os preços
    const withBoth = owned.filter((o) => o.paid != null && o.market != null)
    const valorInvested  = withBoth.reduce((s, o) => s + o.paid! * o.qty, 0)
    const valorEstimated = withBoth.reduce((s, o) => s + o.estimated, 0)
    const valorizacao    = valorEstimated - valorInvested

    // Média de mercado por peça
    const withMarket = owned.filter((o) => o.market != null)
    const avgMarket  = withMarket.length > 0
      ? withMarket.reduce((s, o) => s + o.market!, 0) / withMarket.length
      : null

    // Top 5 mais valiosos
    const top5 = [...owned].sort((a, b) => b.estimated - a.estimated).slice(0, 5)

    // Maior valorização individual
    const bestGain = withBoth.length > 0
      ? withBoth.reduce((best, o) =>
          o.market! / o.paid! > best.market! / best.paid! ? o : best)
      : null

    // Aquisição mais barata
    const withPaid = owned.filter((o) => o.paid != null)
    const cheapest = withPaid.length > 0
      ? withPaid.reduce((min, o) => o.paid! < min.paid! ? o : min)
      : null

    // Top 3 coleções por valor estimado
    const bySerie = new Map<string, number>()
    for (const o of owned) bySerie.set(o.serie, (bySerie.get(o.serie) ?? 0) + o.estimated)
    const topSeries = Array.from(bySerie.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3)

    // Distribuição por linha
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

    // Embalagem
    const carded = owned.filter((o) => o.packaging === 'carded').reduce((s, o) => s + o.qty, 0)
    const loose  = owned.filter((o) => o.packaging === 'loose').reduce((s, o) => s + o.qty, 0)
    const semEmb = totalCount - carded - loose

    return {
      totalCount, totalInvested, totalEstimated,
      valorizacao, valorInvested,
      avgMarket, withMarketCount: withMarket.length,
      top5, bestGain, cheapest, topSeries,
      lineDist, carded, loose, semEmb,
      ownedCount: owned.length,
    }
  }, [series, checks])

  if (data.ownedCount === 0) {
    return (
      <div className="stats-wrap">
        <div className="empty-state" style={{ padding: '32px 16px' }}>
          <div className="empty-icon">📊</div>
          <p className="empty-title">Nenhuma peça marcada</p>
          <p className="empty-sub">Marque algumas peças como "tenho" para ver estatísticas.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="stats-wrap">

      {/* ── Resumo ── */}
      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-num">{data.totalCount}</div>
          <div className="stat-lbl">peças</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{data.ownedCount}</div>
          <div className="stat-lbl">modelos únicos</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{BRL.format(data.totalEstimated)}</div>
          <div className="stat-lbl">valor estimado</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{BRL.format(data.totalInvested)}</div>
          <div className="stat-lbl">investido</div>
        </div>
      </div>

      {/* ── Valorização ── */}
      {data.valorInvested > 0 && (
        <div className="stats-section">
          <h4>Valorização</h4>
          <div className="stat-highlights">
            <div className="stat-highlight-card">
              <div className={`stat-hl-num ${data.valorizacao >= 0 ? 'positive' : 'negative'}`}>
                {data.valorizacao >= 0 ? '+' : ''}{BRL.format(data.valorizacao)}
              </div>
              <div className="stat-hl-lbl">ganho estimado</div>
            </div>
            <div className="stat-highlight-card">
              <div className={`stat-hl-num ${data.valorizacao >= 0 ? 'positive' : 'negative'}`}>
                {data.valorInvested > 0
                  ? `${((data.valorizacao / data.valorInvested) * 100).toFixed(1)}%`
                  : '—'}
              </div>
              <div className="stat-hl-lbl">retorno</div>
            </div>
            {data.avgMarket != null && (
              <div className="stat-highlight-card">
                <div className="stat-hl-num">{BRL.format(data.avgMarket)}</div>
                <div className="stat-hl-lbl">média por peça</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Destaques ── */}
      {(data.bestGain || data.cheapest) && (
        <div className="stats-section">
          <h4>Destaques</h4>
          <div className="top-list">
            {data.bestGain && (
              <div className="top-list-item">
                {data.bestGain.img && <img src={data.bestGain.img} alt="" />}
                <div className="top-info">
                  <div className="top-modelo">{data.bestGain.modelo}</div>
                  <div className="top-meta">Maior valorização</div>
                </div>
                <div className="top-price positive">
                  +{((data.bestGain.market! / data.bestGain.paid! - 1) * 100).toFixed(0)}%
                </div>
              </div>
            )}
            {data.cheapest && data.cheapest.key !== data.bestGain?.key && (
              <div className="top-list-item">
                {data.cheapest.img && <img src={data.cheapest.img} alt="" />}
                <div className="top-info">
                  <div className="top-modelo">{data.cheapest.modelo}</div>
                  <div className="top-meta">Menor preço pago</div>
                </div>
                <div className="top-price">{BRL.format(data.cheapest.paid!)}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Top 5 mais valiosos ── */}
      {data.top5.length > 0 && (
        <div className="stats-section">
          <h4>Top 5 mais valiosos</h4>
          <ol className="top-list">
            {data.top5.map((it) => {
              const meta = lineMeta(it.line)
              return (
                <li key={it.key} className="top-list-item">
                  {it.img && <img src={it.img} alt="" />}
                  <div className="top-info">
                    <div className="top-modelo">{it.modelo}</div>
                    <div className="top-meta">
                      {it.serie}{it.n ? ` · ${it.n}` : ''}
                      {meta && (
                        <span className="line-tag" style={{ background: meta.badgeBg || meta.color, marginLeft: 4 }}>
                          {meta.short}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="top-price">{BRL.format(it.estimated)}</div>
                </li>
              )
            })}
          </ol>
        </div>
      )}

      {/* ── Top coleções ── */}
      {data.topSeries.length > 1 && (
        <div className="stats-section">
          <h4>Top coleções</h4>
          <div className="top-list">
            {data.topSeries.map(([nome, val]) => (
              <div key={nome} className="top-list-item">
                <div className="top-info">
                  <div className="top-modelo">{nome}</div>
                </div>
                <div className="top-price">{BRL.format(val)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Distribuição por linha ── */}
      {data.lineDist.length > 0 && (
        <div className="stats-section">
          <h4>Distribuição por linha</h4>
          <div className="line-bars">
            {data.lineDist.map((d) => {
              const meta = lineMeta(d.line)
              const pct = data.totalCount > 0 ? (d.count / data.totalCount) * 100 : 0
              return (
                <div key={d.key} className="line-bar-row">
                  <div className="line-bar-head">
                    <span className="line-bar-name">{meta?.label || 'Sem linha'}</span>
                    <span className="line-bar-vals">{d.count} · {BRL.format(d.estimated)}</span>
                  </div>
                  <div className="line-bar-track">
                    <div className="line-bar-fill"
                      style={{ width: `${pct}%`, background: meta?.badgeBg || meta?.color || '#475569' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Embalagem ── */}
      {(data.carded > 0 || data.loose > 0) && (
        <div className="stats-section">
          <h4>Embalagem</h4>
          <div className="stat-highlights">
            <div className="stat-highlight-card">
              <div className="stat-hl-num">{data.carded}</div>
              <div className="stat-hl-lbl">carteladas</div>
            </div>
            <div className="stat-highlight-card">
              <div className="stat-hl-num">{data.loose}</div>
              <div className="stat-hl-lbl">soltas</div>
            </div>
            {data.semEmb > 0 && (
              <div className="stat-highlight-card">
                <div className="stat-hl-num">{data.semEmb}</div>
                <div className="stat-hl-lbl">não informado</div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
