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

export function ProgressCard({ icon = 'Car', name, missing, pct, onClick, style }: ProgressCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--s3)',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', padding: 'var(--s3)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform var(--dur-fast) var(--ease)',
        ...style,
      }}
      onPointerDown={(e) => { if (onClick) e.currentTarget.style.transform = 'scale(.98)' }}
      onPointerUp={(e) => { if (onClick) e.currentTarget.style.transform = 'scale(1)' }}
      onPointerLeave={(e) => { if (onClick) e.currentTarget.style.transform = 'scale(1)' }}
    >
      <div style={{
        width: 54, height: 54, flexShrink: 0, borderRadius: 'var(--r-md)',
        background: 'var(--surface-2)', display: 'grid', placeItems: 'center',
        color: 'var(--border-2)',
      }}>
        <Icon name={icon} size={26} strokeWidth={1.75} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', flexShrink: 0 }}>{pct}%</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--subtle)', margin: '2px 0 8px' }}>
          {missing} {missing === 1 ? 'modelo faltando' : 'modelos faltando'}
        </div>
        <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 'var(--r-full)' }} />
        </div>
      </div>
    </div>
  )
}
