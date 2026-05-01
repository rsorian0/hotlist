import { useMemo } from 'react'
import type { Serie, OwnershipMap, Line } from '../types'
import { effectiveLine, lineMeta } from '../utils/line'

type Props = {
  open: boolean
  series: Serie[]
  checks: OwnershipMap
  onClose: () => void
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
  acquiredAt?: string
}

export default function Stats({ open, series, checks, onClose }: Props) {
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
        const estimated = (market != null ? market * qty : paid != null ? paid : 0)
        owned.push({
          key,
          serie: s.nome,
          modelo: it.modelo || '',
          n: it.n,
          img: it.img,
          line: effectiveLine(it),
          qty,
          paid,
          market,
          estimated,
          acquiredAt: o.acquiredAt,
        })
      }
    }

    const totalCount = owned.reduce((sum, o) => sum + o.qty, 0)
    const totalInvested = owned.reduce((sum, o) => sum + (o.paid ?? 0), 0)
    const totalEstimated = owned.reduce((sum, o) => sum + o.estimated, 0)

    const top5 = [...owned].sort((a, b) => b.estimated - a.estimated).slice(0, 5)

    const byLine = new Map<string, { count: number; estimated: number; line?: Line }>()
    for (const o of owned) {
      const k = o.line || 'unknown'
      const cur = byLine.get(k) || { count: 0, estimated: 0, line: o.line }
      cur.count += o.qty
      cur.estimated += o.estimated
      byLine.set(k, cur)
    }
    const lineDist = Array.from(byLine.entries())
      .map(([k, v]) => ({ key: k, line: v.line, count: v.count, estimated: v.estimated }))
      .sort((a, b) => b.count - a.count)

    const withDate = owned.filter((o) => o.acquiredAt).sort((a, b) => (a.acquiredAt! < b.acquiredAt! ? -1 : 1))
    const oldest = withDate[0]
    const newest = withDate[withDate.length - 1]

    return { totalCount, totalInvested, totalEstimated, top5, lineDist, oldest, newest, ownedCount: owned.length }
  }, [series, checks])

  if (!open) return null

  return (
    <>
      <div className="detail-backdrop" onClick={onClose} />
      <aside className="detail-panel" aria-label="Estatísticas da coleção">
        <div className="hd">
          <h3>Minha coleção</h3>
          <button className="btn ghost" type="button" onClick={onClose}>Fechar</button>
        </div>
        <div className="detail-body">
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

          {data.top5.length > 0 && (
            <div className="stats-section">
              <h4>Top 5 mais valiosos</h4>
              <ol className="top-list">
                {data.top5.map((it) => {
                  const meta = lineMeta(it.line)
                  return (
                    <li key={it.key}>
                      {it.img && <img src={it.img} alt="" />}
                      <div className="top-info">
                        <div className="top-modelo">{it.modelo}</div>
                        <div className="top-meta">
                          {it.serie} · {it.n || ''}
                          {meta && (
                            <span className="line-tag" style={{ background: meta.badgeBg || meta.color, marginLeft: 6 }}>
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
                        <span className="line-bar-name">{meta?.label || 'Sem linha definida'}</span>
                        <span className="line-bar-vals">
                          {d.count} · {BRL.format(d.estimated)}
                        </span>
                      </div>
                      <div className="line-bar-track">
                        <div
                          className="line-bar-fill"
                          style={{ width: `${pct}%`, background: meta?.badgeBg || meta?.color || '#475569' }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {(data.oldest || data.newest) && (
            <div className="stats-section">
              <h4>Histórico</h4>
              {data.oldest && (
                <div className="hist-row">
                  <span className="muted">Mais antiga</span>
                  <span>{data.oldest.modelo} · {new Date(data.oldest.acquiredAt!).toLocaleDateString('pt-BR')}</span>
                </div>
              )}
              {data.newest && data.newest.key !== data.oldest?.key && (
                <div className="hist-row">
                  <span className="muted">Mais recente</span>
                  <span>{data.newest.modelo} · {new Date(data.newest.acquiredAt!).toLocaleDateString('pt-BR')}</span>
                </div>
              )}
            </div>
          )}

          {data.ownedCount === 0 && (
            <div className="empty-state" style={{ padding: '32px 16px' }}>
              <div className="empty-icon">📊</div>
              <p className="empty-title">Nenhuma peça marcada</p>
              <p className="empty-sub">Marque algumas peças como "tenho" para ver estatísticas.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
