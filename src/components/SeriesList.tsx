import type { Serie, ModalFeedItem, OwnershipMap, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import { effectiveLine } from '../utils/line'
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

  const f = filter.toLowerCase().trim()

  let offset = 0
  const seriesWithOffsets = series.map((s) => {
    const o = offset
    offset += smartSortItems(s.items || []).length
    return { serie: s, offset: o }
  })

  // Pre-check: any serie has visible items after filter?
  const anyVisible = seriesWithOffsets.some(({ serie }) => {
    const sorted = smartSortItems(serie.items || [])
    return sorted.some((it) => {
      if (lineFilter && effectiveLine(it) !== lineFilter) return false
      return `${it.modelo || ''} ${it.n || ''} ${serie.nome}`.toLowerCase().includes(f)
    })
  })

  if (!anyVisible) return <EmptyState filtered onAddClick={onAddClick} />

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

  return <section id="list" className="px-3 pt-3 pb-2">{groups}</section>
}
