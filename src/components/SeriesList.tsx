import type { Serie, ModalFeedItem, OwnershipMap, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import SeriesGroup from './SeriesGroup'
import EmptyState from './EmptyState'
import { useMemo } from 'react'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  filter: string
  lineFilter: Line | null
  onOpenModal: (index: number, feed: ModalFeedItem[]) => void
  onAddClick: () => void
  onItemClick: (key: string) => void
}

export default function SeriesList({
  series, checks, filter, lineFilter, onOpenModal, onAddClick, onItemClick,
}: Props) {
  const fullFeed = useMemo<ModalFeedItem[]>(() => {
    return series.flatMap((s) =>
      smartSortItems(s.items || []).map((it) => ({ img: it.img || '', alt: it.modelo || '' })),
    )
  }, [series])

  let offset = 0
  const seriesWithOffsets = series.map((s) => {
    const o = offset
    offset += smartSortItems(s.items || []).length
    return { serie: s, offset: o }
  })

  if (series.length === 0) return <EmptyState filtered={false} onAddClick={onAddClick} />

  const groups = seriesWithOffsets.map(({ serie, offset: feedOffset }) => (
    <SeriesGroup
      key={serie.nome}
      serie={serie}
      checks={checks}
      filter={filter}
      lineFilter={lineFilter}
      feedOffset={feedOffset}
      fullFeed={fullFeed}
      onOpenModal={onOpenModal}
      onItemClick={onItemClick}
    />
  ))

  const allHidden = groups.every((g) => g === null)
  if (allHidden) return <EmptyState filtered onAddClick={onAddClick} />

  return <section id="list" className="pt-3">{groups}</section>
}
