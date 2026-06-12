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
      background: isNew ? 'var(--surface)' : 'var(--surface-2)',
      border: `1px solid ${isNew ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: 'var(--r-lg)', padding: 'var(--s3)',
      opacity: isNew ? 1 : 0.55,
      ...style,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 'var(--r-md)', flexShrink: 0,
        background: isNew ? 'var(--accent)' : 'var(--surface-2)',
        color: isNew ? 'var(--accent-fg)' : 'var(--subtle)',
        display: 'grid', placeItems: 'center',
      }}>
        <Icon name={icon} size={18} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{title}</span>
          {isNew && (
            <span style={{
              fontSize: 9, fontWeight: 800, letterSpacing: '.05em',
              padding: '1px 5px', borderRadius: 'var(--r-full)',
              background: 'var(--accent)', color: 'var(--accent-fg)',
            }}>NOVO</span>
          )}
        </div>
        <div style={{ fontSize: 11, color: 'var(--subtle)', marginTop: 2 }}>{description}</div>
      </div>
    </div>
  )
}
