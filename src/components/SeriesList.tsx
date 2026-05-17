import type { Serie, ModalFeedItem, OwnershipMap, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import SeriesGroup from './SeriesGroup'
import EmptyState from './EmptyState'
import { SkeletonGroup } from './Skeleton'
import { useMemo } from 'react'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  filter: string
  lineFilter: Line | null
  syncing?: boolean
  onOpenModal: (index: number, feed: ModalFeedItem[]) => void
  onAddClick: () => void
  onItemClick: (key: string) => void
}

export default function SeriesList({
  series, checks, filter, lineFilter, syncing, onOpenModal, onAddClick, onItemClick,
}: Props) {
  const fullFeed = useMemo<ModalFeedItem[]>(() => {
    return series.flatMap((s) =>
      smartSortItems(s.items || []).map((it) => ({ img: it.img || '', alt: it.modelo || '' })),
    )
  }, [series])

  if (series.length === 0) {
    if (syncing) {
      return (
        <section className="px-3 pt-3 pb-2">
          <SkeletonGroup rows={6} />
          <SkeletonGroup rows={4} />
        </section>
      )
    }
    return <EmptyState filtered={false} onAddClick={onAddClick} />
  }

  let offset = 0
  const seriesWithOffsets = series.map((s) => {
    const o = offset
    offset += smartSortItems(s.items || []).length
    return { serie: s, offset: o }
  })

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

  return <section id="list" className="px-3 pt-3 pb-2">{groups}</section>
}
