import type { ReactNode, CSSProperties, HTMLAttributes } from 'react'

interface DsCardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
  owned?: boolean
  padded?: boolean
  children?: ReactNode
  style?: CSSProperties
}

export function DsCard({ interactive = false, owned = false, padded = true, children, style, ...rest }: DsCardProps) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: `1px solid ${owned ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--r-lg)', overflow: 'hidden',
        padding: padded ? 'var(--s4)' : 0,
        transition: 'border-color var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease)',
        cursor: interactive ? 'pointer' : 'default', ...style,
      }}
      onPointerDown={interactive ? (e) => { e.currentTarget.style.transform = 'scale(0.98)' } : undefined}
      onPointerUp={interactive ? (e) => { e.currentTarget.style.transform = 'scale(1)' } : undefined}
      onPointerLeave={interactive ? (e) => { e.currentTarget.style.transform = 'scale(1)' } : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}
