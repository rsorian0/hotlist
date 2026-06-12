import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Serie, OwnershipMap } from '../../types'
import { smartSortItems } from '../../utils/sort'
import { effectiveLine } from '../../utils/line'
import { ClubListRow } from './ClubListRow'

interface DsSeriesGroupProps {
  serie: Serie
  checks: OwnershipMap
  filter?: string
  defaultOpen?: boolean
  onItemClick?: (key: string) => void
  onToggle?: (key: string, owned: boolean) => void
}

export function DsSeriesGroup({ serie, checks, filter = '', defaultOpen = true, onItemClick, onToggle }: DsSeriesGroupProps) {
  const [open, setOpen] = useState(defaultOpen)

  const f = filter.toLowerCase().trim()
  const sorted = smartSortItems(serie.items || [])
  const visible = sorted.filter((it) =>
    `${it.modelo || ''} ${it.n || ''} ${serie.nome}`.toLowerCase().includes(f)
  )

  if (visible.length === 0) return null

  const ownedCount = visible.filter((it) => !!checks[`${serie.nome}__${it.n ?? ''}`]?.owned).length
  const isDefault = serie.nome === 'Geral'

  const rows = visible.map((it) => {
    const key = `${serie.nome}__${it.n ?? ''}`
    const owned = !!checks[key]?.owned
    const line = effectiveLine(it)
    const clubCount = Math.floor(Math.random() * 500 + 50)
    return (
      <ClubListRow
        key={key}
        item={{ ...it, line }}
        owned={owned}
        clubCount={clubCount}
        onClick={() => onItemClick?.(key)}
        onToggle={onToggle ? () => onToggle(key, !owned) : undefined}
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
          padding: '12px var(--s3)', minHeight: 'var(--touch)', cursor: 'pointer',
          background: 'transparent', border: 0, fontFamily: 'var(--font-sans)',
          transition: 'background var(--dur-base) var(--ease)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-2)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
      >
        <ChevronDown size={16} style={{ color: 'var(--subtle)', transition: 'transform 200ms ease', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
        <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>
          {serie.nome}
        </span>
        <span style={{ fontSize: 12, color: 'var(--subtle)', flexShrink: 0 }}>{ownedCount}/{visible.length}</span>
      </button>
      {open && <div>{rows}</div>}
    </div>
  )
}
