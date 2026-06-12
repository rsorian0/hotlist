import type { ReactNode, CSSProperties, HTMLAttributes } from 'react'
import { Icon } from './Icon'

interface DsEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string
  title: string
  subtitle?: string
  action?: ReactNode
  style?: CSSProperties
}

export function DsEmptyState({ icon = 'PackageOpen', title, subtitle, action = null, style, ...rest }: DsEmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', gap: 'var(--s2)', padding: '56px var(--s6)', ...style,
      }}
      {...rest}
    >
      <div style={{ color: 'var(--border-2)', marginBottom: 'var(--s1)' }}><Icon name={icon} size={40} strokeWidth={1.5} /></div>
      <div style={{ fontSize: 17, fontWeight: 'var(--fw-bold)', color: 'var(--text)' }}>{title}</div>
      {subtitle && <div style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 260, lineHeight: 1.45 }}>{subtitle}</div>}
      {action && <div style={{ marginTop: 'var(--s3)' }}>{action}</div>}
    </div>
  )
}
