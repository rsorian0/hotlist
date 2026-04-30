import type { Serie, ModalFeedItem } from '../types'
import { smartSortItems } from '../utils/sort'
import SeriesGroup from './SeriesGroup'
import { useMemo } from 'react'

type Props = {
  series: Serie[]
  checks: Record<string, boolean>
  filter: string
  onToggle: (key: string) => void
  onOpenModal: (index: number, feed: ModalFeedItem[]) => void
}

export default function SeriesList({ series, checks, filter, onToggle, onOpenModal }: Props) {
  // Build the full gallery feed once, in same order as rendered
  const fullFeed = useMemo<ModalFeedItem[]>(() => {
    return series.flatMap((s) =>
      smartSortItems(s.items || []).map((it) => ({ img: it.img || '', alt: it.modelo || '' })),
    )
  }, [series])

  // Offset for each serie in the global feed
  let offset = 0
  const seriesWithOffsets = series.map((s) => {
    const o = offset
    offset += smartSortItems(s.items || []).length
    return { serie: s, offset: o }
  })

  return (
    <section id="list">
      {seriesWithOffsets.map(({ serie, offset: feedOffset }) => (
        <SeriesGroup
          key={serie.nome}
          serie={serie}
          checks={checks}
          filter={filter}
          feedOffset={feedOffset}
          fullFeed={fullFeed}
          onToggle={onToggle}
          onOpenModal={onOpenModal}
        />
      ))}
    </section>
  )
}
