import type { CSSProperties } from 'react'
import { Icon } from './Icon'

interface ProgressCardProps {
  icon?: string
  name: string
  missing: number
  pct: number
  onClick?: () => void
  style?: CSSProperties
}

export function ProgressCard({ icon, name, missing, pct, onClick, style }: ProgressCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', padding: 'var(--s4)',
        display: 'flex', alignItems: 'center', gap: 'var(--s3)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background var(--dur-base) var(--ease)',
        ...style,
      }}
      onMouseEnter={(e) => { if (onClick) e.currentTarget.style.background = 'var(--surface-2)' }}
      onMouseLeave={(e) => { if (onClick) e.currentTarget.style.background = 'var(--surface)' }}
    >
      {icon && (
        <div style={{
          width: 36, height: 36, borderRadius: 'var(--r-md)', flexShrink: 0,
          background: 'var(--surface-2)', color: 'var(--muted)',
          display: 'grid', placeItems: 'center',
        }}>
          <Icon name={icon} size={18} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', flexShrink: 0, marginLeft: 8 }}>{pct}%</span>
        </div>
        <div style={{ height: 5, background: 'var(--surface-2)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 'var(--r-full)', transition: 'width .6s ease' }} />
        </div>
        {missing > 0 && (
          <div style={{ fontSize: 11, color: 'var(--subtle)', marginTop: 4 }}>Faltam {missing}</div>
        )}
      </div>
    </div>
  )
}
