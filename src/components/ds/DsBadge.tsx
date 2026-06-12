import type { ReactNode, CSSProperties, HTMLAttributes } from 'react'

interface DsBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'outline' | 'solid' | 'rare' | 'success' | 'invert'
  size?: 'sm' | 'md'
  children?: ReactNode
  style?: CSSProperties
}

export function DsBadge({ variant = 'outline', size = 'md', children, style, ...rest }: DsBadgeProps) {
  const variants: Record<string, CSSProperties> = {
    outline: { background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)' },
    solid:   { background: 'var(--surface-2)', color: 'var(--text)', border: '1px solid var(--border)' },
    rare:    { background: 'var(--rare)', color: 'var(--rare-fg)', border: '1px solid var(--rare)' },
    success: { background: 'var(--accent)', color: 'var(--accent-fg)', border: '1px solid var(--accent)' },
    invert:  { background: 'var(--accent)', color: 'var(--accent-fg)', border: '1px solid var(--accent)' },
  }
  const sizes: Record<string, CSSProperties> = {
    sm: { fontSize: 9, padding: '2px 5px', fontWeight: 800, letterSpacing: '.03em' },
    md: { fontSize: 11, padding: '2px 8px', fontWeight: 700, letterSpacing: '.02em' },
  }
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        borderRadius: 'var(--r-full)', lineHeight: 1.4, whiteSpace: 'nowrap',
        fontFamily: 'var(--font-sans)', ...sizes[size], ...variants[variant], ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  )
}
