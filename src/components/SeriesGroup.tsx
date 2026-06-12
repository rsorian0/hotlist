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

  if (isDefault) {
    return (
      <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 'var(--s2)' }}>
        {rows}
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 'var(--s2)' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 'var(--s2)',
          padding: 'var(--s2) var(--s3)', textAlign: 'left', cursor: 'pointer',
          background: 'transparent', border: 0, fontFamily: 'var(--font-sans)',
          transition: 'background var(--dur-base) var(--ease)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-2)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
      >
        <ChevronDown
          size={16}
          style={{
            color: 'var(--subtle)',
            transition: 'transform 200ms ease',
            transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        />
        <span style={{ flex: 1, fontSize: 13, fontWeight: 'var(--fw-semibold)', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {serie.nome}
        </span>
        <span style={{ fontSize: 12, color: 'var(--subtle)' }}>
          {ownedCount}/{visible.length}
        </span>
      </button>

      {open && <div>{rows}</div>}
    </div>
  )
}
