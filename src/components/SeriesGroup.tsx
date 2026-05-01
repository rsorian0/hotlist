import type { Serie, ModalFeedItem, OwnershipMap, ViewFilter, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import { effectiveLine } from '../utils/line'
import ItemRow from './ItemRow'

type Props = {
  serie: Serie
  checks: OwnershipMap
  filter: string
  view: ViewFilter
  lineFilter: Line | null
  feedOffset: number
  fullFeed: ModalFeedItem[]
  onToggle: (key: string) => void
  onOpenModal: (index: number, feed: ModalFeedItem[]) => void
  onItemClick: (key: string) => void
}

export default function SeriesGroup({
  serie, checks, filter, view, lineFilter, feedOffset, fullFeed, onToggle, onOpenModal, onItemClick,
}: Props) {
  const f = filter.toLowerCase().trim()
  const sorted = smartSortItems(serie.items || [])
  const visible = sorted.filter((it) => {
    const key = `${serie.nome}__${it.n || ''}`
    const o = checks[key]
    if (view === 'owned' && !o?.owned) return false
    if (view === 'wishlist' && !o?.wishlist) return false
    if (lineFilter && effectiveLine(it) !== lineFilter) return false
    return `${it.modelo || ''} ${it.n || ''} ${serie.nome}`.toLowerCase().includes(f)
  })

  if (visible.length === 0) return null

  const checked = visible.filter((it) => checks[`${serie.nome}__${it.n || ''}`]?.owned).length

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
        {visible.map((it) => {
          const globalIdx = feedOffset + sorted.indexOf(it)
          const key = `${serie.nome}__${it.n || ''}`
          const own = checks[key]
          return (
            <ItemRow
              key={`${it.n}-${it.modelo}`}
              item={it}
              serieNome={serie.nome}
              ownership={own}
              galleryIndex={globalIdx}
              onToggle={() => onToggle(key)}
              onOpenModal={onOpenModal}
              onItemClick={() => onItemClick(key)}
              feed={fullFeed}
            />
          )
        })}
      </div>
    </details>
  )
}
