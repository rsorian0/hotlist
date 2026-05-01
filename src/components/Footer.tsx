import type { Serie, OwnershipMap } from '../types'
import { smartSortItems } from '../utils/sort'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  filter: string
  onShare: () => void
  onStats: () => void
}

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export default function Footer({ series, checks, filter, onShare, onStats }: Props) {
  const f = filter.toLowerCase().trim()
  let total = 0
  let done = 0
  let invested = 0
  let estimated = 0

  for (const s of series) {
    for (const it of smartSortItems(s.items || [])) {
      if (!`${it.modelo || ''} ${it.n || ''} ${s.nome}`.toLowerCase().includes(f)) continue
      total++
      const o = checks[`${s.nome}__${it.n || ''}`]
      if (o?.owned) {
        done++
        const qty = Math.max(1, o.qty ?? 1)
        if (typeof o.paidPrice === 'number') invested += o.paidPrice
        if (typeof o.marketPrice === 'number') estimated += o.marketPrice * qty
        else if (typeof o.paidPrice === 'number') estimated += o.paidPrice
      }
    }
  }

  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="dash-pills">
          <div className="dash-pill" title="Itens marcados">
            <span className="dash-num">{done}/{total}</span>
            <span className="dash-lbl">{pct}%</span>
          </div>
          {invested > 0 && (
            <div className="dash-pill" title="Total investido">
              <span className="dash-num">{BRL.format(invested)}</span>
              <span className="dash-lbl">investido</span>
            </div>
          )}
          {estimated > 0 && estimated !== invested && (
            <div className="dash-pill" title="Valor estimado">
              <span className="dash-num">{BRL.format(estimated)}</span>
              <span className="dash-lbl">estimado</span>
            </div>
          )}
        </div>
        <div className="footer-actions">
          <button className="icon-btn" type="button" aria-label="Estatísticas" onClick={onStats}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <rect x="7" y="12" width="3" height="6" />
              <rect x="12" y="8" width="3" height="10" />
              <rect x="17" y="4" width="3" height="14" />
            </svg>
          </button>
          <button className="icon-btn" type="button" aria-label="Compartilhar checklist" onClick={onShare}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
              <path d="M16 6l-4-4-4 4" />
              <path d="M12 2v14" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
