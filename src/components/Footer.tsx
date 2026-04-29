import type { Serie } from '../types'
import { smartSortItems } from '../utils/sort'

type Props = {
  series: Serie[]
  checks: Record<string, boolean>
  filter: string
  onShare: () => void
}

export default function Footer({ series, checks, filter, onShare }: Props) {
  const f = filter.toLowerCase().trim()
  let total = 0
  let done = 0

  for (const s of series) {
    for (const it of smartSortItems(s.items || [])) {
      if (!`${it.modelo || ''} ${it.n || ''} ${s.nome}`.toLowerCase().includes(f)) continue
      total++
      if (checks[`${s.nome}__${it.n || ''}`]) done++
    }
  }

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="total-pill">
          Total: <span>{done}</span> de <span>{total}</span>
        </div>
        <button className="share-pill" type="button" aria-label="Compartilhar checklist" onClick={onShare}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
            <path d="M16 6l-4-4-4 4" />
            <path d="M12 2v14" />
          </svg>
          Compartilhar
        </button>
      </div>
    </footer>
  )
}
