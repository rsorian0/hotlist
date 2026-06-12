import type { CSSProperties, HTMLAttributes } from 'react'
import { Users } from 'lucide-react'
import { Icon } from './Icon'

interface CollectionClubCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  icon?: string
  maker?: string
  fabricante?: string
  year?: number | string
  owned: number
  total: number
  pct: number
  clubCount?: number
  club?: string | number
  style?: CSSProperties
}

export function CollectionClubCard({ name, icon = 'Car', maker, fabricante, year, owned, total, pct, clubCount, club, style, ...rest }: CollectionClubCardProps) {
  const makerLabel = maker ?? fabricante
  const clubLabel = club ?? clubCount
  return (
    <div
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', overflow: 'hidden', cursor: 'pointer',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform var(--dur-fast) var(--ease)',
        ...style,
      }}
      onPointerDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
      onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      onPointerLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      {...rest}
    >
      {/* square thumb */}
      <div style={{ position: 'relative', aspectRatio: '1', background: 'var(--surface-2)', display: 'grid', placeItems: 'center', color: 'var(--border)' }}>
        <Icon name={icon} size={46} strokeWidth={1.5} />
        {/* progress bar at bottom */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: 'rgba(0,0,0,.1)' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', transition: 'width .6s ease' }} />
        </div>
      </div>

      <div style={{ padding: '8px var(--s3) 10px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {name}
        </div>
        {(makerLabel || year) && (
          <div style={{ fontSize: 11, color: 'var(--subtle)', marginTop: 1 }}>
            {[makerLabel, year].filter(Boolean).join(' · ')}
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{owned} / {total}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)' }}>{pct}%</span>
        </div>
        {clubLabel != null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 6, color: 'var(--subtle)' }}>
            <Users size={11} />
            <span style={{ fontSize: 10 }}>{clubLabel} no clube</span>
          </div>
        )}
      </div>
    </div>
  )
}
