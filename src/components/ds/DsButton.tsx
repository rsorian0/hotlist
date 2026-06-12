import type { ReactNode, CSSProperties, ButtonHTMLAttributes } from 'react'

interface DsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  fullWidth?: boolean
  children?: ReactNode
  style?: CSSProperties
}

export function DsButton({
  variant = 'primary',
  size = 'md',
  icon = null,
  fullWidth = false,
  disabled = false,
  children,
  style,
  ...rest
}: DsButtonProps) {
  const heights: Record<string, string> = { md: 'var(--touch)', sm: '32px', lg: '50px' }
  const pad: Record<string, string> = { md: '0 var(--s4)', sm: '0 var(--s3)', lg: '0 var(--s5)' }
  const fontSize: Record<string, string> = { md: '15px', sm: '13px', lg: '16px' }

  const variants: Record<string, CSSProperties> = {
    primary: { background: 'var(--accent)', color: 'var(--accent-fg)', border: '1px solid var(--accent)' },
    outline: { background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)' },
    ghost:   { background: 'transparent', color: 'var(--muted)', border: '1px solid transparent' },
    danger:  { background: 'transparent', color: 'var(--destructive)', border: '1px solid var(--destructive)' },
  }

  return (
    <button
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--s2)',
        height: heights[size], padding: pad[size], width: fullWidth ? '100%' : undefined,
        borderRadius: 'var(--r-md)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-semibold)',
        fontSize: fontSize[size], whiteSpace: 'nowrap', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur-base) var(--ease), transform var(--dur-fast) var(--ease)',
        ...variants[variant], ...style,
      }}
      onPointerDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(var(--press-scale))' }}
      onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      onPointerLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}
