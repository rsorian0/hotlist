import type { CSSProperties } from 'react'
import { Icon } from './Icon'

interface AchievementCardProps {
  icon: string
  title: string
  description: string
  isNew?: boolean
  style?: CSSProperties
}

export function AchievementCard({ icon, title, description, isNew = false, style }: AchievementCardProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 'var(--s3)',
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', padding: 'var(--s4)',
      ...style,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 'var(--r-md)', flexShrink: 0,
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        color: 'var(--text)', display: 'grid', placeItems: 'center',
      }}>
        <Icon name={icon} size={22} strokeWidth={1.75} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{title}</span>
          {isNew && (
            <span style={{
              fontSize: 9, fontWeight: 800, letterSpacing: '.03em',
              padding: '2px 7px', borderRadius: 'var(--r-full)',
              background: 'var(--accent)', color: 'var(--accent-fg)',
            }}>NOVO</span>
          )}
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.4, marginTop: 3 }}>{description}</div>
      </div>
    </div>
  )
}
