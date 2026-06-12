import { useState } from 'react'
import type { ReactNode, CSSProperties, InputHTMLAttributes } from 'react'

interface DsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  leading?: ReactNode
  trailing?: ReactNode
  style?: CSSProperties
  wrapperStyle?: CSSProperties
}

export function DsInput({ leading = null, trailing = null, style, wrapperStyle, onFocus, onBlur, ...rest }: DsInputProps) {
  const [focused, setFocused] = useState(false)
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--s2)',
        height: 'var(--touch)', padding: '0 var(--s3)',
        background: 'var(--surface-2)',
        border: `1px solid ${focused ? 'var(--text)' : 'var(--border)'}`,
        borderRadius: 'var(--r-md)', transition: 'border-color var(--dur-base) var(--ease)',
        ...wrapperStyle,
      }}
    >
      {leading && <span style={{ display: 'grid', placeItems: 'center', color: 'var(--subtle)', flexShrink: 0 }}>{leading}</span>}
      <input
        onFocus={(e) => { setFocused(true); onFocus?.(e) }}
        onBlur={(e) => { setFocused(false); onBlur?.(e) }}
        style={{
          flex: 1, minWidth: 0, background: 'transparent', border: 0, outline: 'none',
          color: 'var(--text)', fontFamily: 'var(--font-sans)', fontSize: '15px', ...style,
        }}
        {...rest}
      />
      {trailing && <span style={{ display: 'grid', placeItems: 'center', color: 'var(--subtle)', flexShrink: 0 }}>{trailing}</span>}
    </div>
  )
}
