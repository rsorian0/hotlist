import { useState } from 'react'
import type { Serie, ModalFeedItem, OwnershipMap, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import { effectiveLine } from '../utils/line'
import { ChevronDown } from 'lucide-react'
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
  const [open, setOpen] = useState(true)

  const f = filter.toLowerCase().trim()
  const sorted = smartSortItems(serie.items || [])
  const visible = sorted.filter((it) => {
    if (lineFilter && effectiveLine(it) !== lineFilter) return false
    return `${it.modelo || ''} ${it.n || ''} ${serie.nome}`.toLowerCase().includes(f)
  })

  if (visible.length === 0) return null

  const isDefault = serie.nome === 'Geral'
  const ownedCount = visible.filter((it) => {
    const key = `${serie.nome}__${it.n || ''}`
    return !!checks[key]?.owned
  }).length

  const rows = visible.map((it) => {
    const globalIdx = feedOffset + sorted.indexOf(it)
    const key = `${serie.nome}__${it.n || ''}`
    return (
      <ItemRow
        key={`${it.n}-${it.modelo}`}
        item={it}
        serieNome={serie.nome}
        ownership={checks[key]}
        galleryIndex={globalIdx}
        onOpenModal={onOpenModal}
        onItemClick={() => onItemClick(key)}
        feed={fullFeed}
      />
    )
  })

  if (isDefault) return <div>{rows}</div>

  return (
    <div className="border-b border-zinc-100">
      <button
        type="button"
        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-zinc-50 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronDown
          size={16}
          className={['text-zinc-400 transition-transform duration-200', open ? '' : '-rotate-90'].join(' ')}
        />
        <span className="flex-1 text-sm font-semibold text-zinc-800 truncate">{serie.nome}</span>
        <span className="text-xs text-zinc-400">
          {ownedCount}/{visible.length}
        </span>
      </button>

      {open && <div>{rows}</div>}
    </div>
  )
}
