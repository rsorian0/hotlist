import type { CSSProperties, HTMLAttributes } from 'react'
import { Icon } from './Icon'

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  value: string | number
  label: string
  tone?: 'default' | 'success' | 'destructive'
  icon?: string
  iconTone?: 'default' | 'rare'
  style?: CSSProperties
}

export function StatCard({ value, label, tone = 'default', icon, iconTone = 'default', style, ...rest }: StatCardProps) {
  const tones: Record<string, string> = { default: 'var(--text)', success: 'var(--text)', destructive: 'var(--destructive)' }
  return (
    <div
      style={{
        position: 'relative', background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)', padding: 'var(--s3) var(--s4)', ...style,
      }}
      {...rest}
    >
      {icon && (
        <span style={{ position: 'absolute', top: 'var(--s3)', right: 'var(--s3)', display: 'grid', placeItems: 'center', color: iconTone === 'rare' ? 'var(--rare)' : 'var(--subtle)' }}>
          <Icon name={icon} size={18} strokeWidth={1.75} />
        </span>
      )}
      <div style={{ fontSize: 20, fontWeight: 'var(--fw-bold)', lineHeight: 1.2, color: tones[tone] }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.04em', marginTop: 3 }}>{label}</div>
    </div>
  )
}
