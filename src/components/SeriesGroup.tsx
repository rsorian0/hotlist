import type { Serie, ModalFeedItem } from '../types'
import { smartSortItems } from '../utils/sort'
import ItemRow from './ItemRow'

type Props = {
  serie: Serie
  checks: Record<string, boolean>
  filter: string
  feedOffset: number
  fullFeed: ModalFeedItem[]
  onToggle: (key: string) => void
  onOpenModal: (index: number, feed: ModalFeedItem[]) => void
}

export default function SeriesGroup({ serie, checks, filter, feedOffset, fullFeed, onToggle, onOpenModal }: Props) {
  const f = filter.toLowerCase().trim()
  const sorted = smartSortItems(serie.items || [])
  const visible = sorted.filter((it) =>
    `${it.modelo || ''} ${it.n || ''} ${serie.nome}`.toLowerCase().includes(f),
  )

  const checked = visible.filter((it) => checks[`${serie.nome}__${it.n || ''}`]).length

  return (
    <details className="series" open>
      <summary>
        <svg className="chev" width="16" height="16" viewBox="0 0 24 24">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <div className="title">{serie.nome}</div>
        <span className="badge">{checked}/{visible.length}</span>
      </summary>
      <div className="items">
        {visible.map((it, localIdx) => {
          const globalIdx = feedOffset + sorted.indexOf(it)
          const key = `${serie.nome}__${it.n || ''}`
          return (
            <ItemRow
              key={`${it.n}-${it.modelo}`}
              item={it}
              serieNome={serie.nome}
              checked={!!checks[key]}
              galleryIndex={globalIdx}
              onToggle={() => onToggle(key)}
              onOpenModal={onOpenModal}
              feed={fullFeed}
            />
          )
        })}
      </div>
    </details>
  )
}
