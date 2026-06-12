import type { CSSProperties, HTMLAttributes } from 'react'
import { Users } from 'lucide-react'

interface CollectionClubCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  fabricante?: string
  owned: number
  total: number
  pct: number
  clubCount?: number
  style?: CSSProperties
}

export function CollectionClubCard({ name, fabricante, owned, total, pct, clubCount, style, ...rest }: CollectionClubCardProps) {
  return (
    <div
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', overflow: 'hidden', cursor: 'pointer',
        transition: 'transform var(--dur-fast) var(--ease)',
        ...style,
      }}
      onPointerDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
      onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      onPointerLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      {...rest}
    >
      {/* thumb */}
      <div style={{ aspectRatio: '16/9', background: 'var(--surface-2)', display: 'grid', placeItems: 'center', position: 'relative' }}>
        <span style={{ fontSize: 28 }}>🚗</span>
        {fabricante && (
          <span style={{
            position: 'absolute', top: 8, left: 8, fontSize: 9, fontWeight: 700,
            padding: '2px 6px', borderRadius: 'var(--r-full)',
            background: 'rgba(0,0,0,.55)', color: '#fff', letterSpacing: '.04em',
          }}>{fabricante.toUpperCase()}</span>
        )}
        {/* progress overlay bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(0,0,0,.2)' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', transition: 'width .6s ease' }} />
        </div>
      </div>

      <div style={{ padding: 'var(--s3)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4 }}>
          {name}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--subtle)' }}>{owned}/{total}</span>
          {clubCount != null && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--subtle)' }}>
              <Users size={10} />{clubCount} no clube
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
