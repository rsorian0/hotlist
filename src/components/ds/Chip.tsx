import type { ReactNode, CSSProperties, ButtonHTMLAttributes } from 'react'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  children?: ReactNode
  style?: CSSProperties
}

export function Chip({ active = false, children, style, ...rest }: ChipProps) {
  return (
    <button
      style={{
        flexShrink: 0, height: 32, padding: '0 var(--s3)',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: active ? 'var(--accent)' : 'var(--surface-2)',
        border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
        color: active ? 'var(--accent-fg)' : 'var(--muted)',
        borderRadius: 'var(--r-full)', fontFamily: 'var(--font-sans)',
        fontSize: 13, fontWeight: 'var(--fw-semibold)', whiteSpace: 'nowrap',
        transition: 'background var(--dur-base) var(--ease), color var(--dur-base) var(--ease)',
        cursor: 'pointer', ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
