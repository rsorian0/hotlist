import type { Serie, ModalFeedItem, OwnershipMap, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import { effectiveLine } from '../utils/line'
import ItemRow from './ItemRow'

type Props = {
  serie: Serie
  checks: OwnershipMap
  filter: string
  lineFilter: Line | null
  feedOffset: number
  fullFeed: ModalFeedItem[]
  onOpenModal: (index: number, feed: ModalFeedItem[]) => void
  onItemClick: (key: string) => void
}

export default function SeriesGroup({
  serie, checks, filter, lineFilter, feedOffset, fullFeed, onOpenModal, onItemClick,
}: Props) {
  const f = filter.toLowerCase().trim()
  const sorted = smartSortItems(serie.items || [])
  const visible = sorted.filter((it) => {
    if (lineFilter && effectiveLine(it) !== lineFilter) return false
    return `${it.modelo || ''} ${it.n || ''} ${serie.nome}`.toLowerCase().includes(f)
  })

  if (visible.length === 0) return null

  const isDefault = serie.nome === 'Geral'

  const items = visible.map((it) => {
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
        onOpenModal={onOpenModal}
        onItemClick={() => onItemClick(key)}
        feed={fullFeed}
      />
    )
  })

  if (isDefault) {
    return <div className="items">{items}</div>
  }

  return (
    <details className="series" open>
      <summary>
        <svg className="chev" width="16" height="16" viewBox="0 0 24 24">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <div className="title">{serie.nome}</div>
        <span className="badge">{visible.length}</span>
      </summary>
      <div className="items">{items}</div>
    </details>
  )
}
