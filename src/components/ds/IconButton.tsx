import type { ReactNode, CSSProperties, ButtonHTMLAttributes } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md'
  active?: boolean
  children?: ReactNode
  style?: CSSProperties
}

export function IconButton({ size = 'md', active = false, disabled = false, children, style, ...rest }: IconButtonProps) {
  const dim = size === 'sm' ? '36px' : 'var(--touch)'
  return (
    <button
      disabled={disabled}
      style={{
        display: 'grid', placeItems: 'center', width: dim, height: dim, flexShrink: 0,
        background: active ? 'var(--accent)' : 'var(--surface-2)',
        color: active ? 'var(--accent-fg)' : 'var(--muted)',
        border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--r-md)', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'border-color var(--dur-base) var(--ease), color var(--dur-base) var(--ease), background var(--dur-base) var(--ease)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
