import type { CSSProperties, HTMLAttributes } from 'react'

const CarGlyph = ({ size = 34 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
  </svg>
)

interface GridCardItem {
  modelo?: string
  img?: string
  line?: string
  n?: string | number
}

interface GridCardProps extends HTMLAttributes<HTMLDivElement> {
  item?: GridCardItem
  owned?: boolean
  sub?: string | null
  onClick?: () => void
  style?: CSSProperties
}

export function GridCard({ item = {}, owned = false, sub, onClick, style, ...rest }: GridCardProps) {
  const { modelo, img, line } = item
  const isTH = line === 'th' || line === 'sth'
  const rarityLabel: Record<string, string> = { th: 'TH', sth: 'STH', premium: 'PREMIUM', rlc: 'RLC', 'silver-series': 'SILVER' }
  const label = line ? rarityLabel[line] : undefined
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative', background: 'var(--surface)', borderRadius: 'var(--r-lg)', overflow: 'hidden',
        cursor: 'pointer', border: `1px solid ${owned ? 'var(--accent)' : 'var(--border)'}`,
        boxShadow: 'var(--shadow-sm)', transition: 'transform var(--dur-fast) var(--ease), border-color var(--dur-base) var(--ease)', ...style,
      }}
      onPointerDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)' }}
      onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      onPointerLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      {...rest}
    >
      <div style={{ position: 'relative', aspectRatio: '1', background: 'var(--surface-2)', display: 'grid', placeItems: 'center', color: 'var(--subtle)' }}>
        {img ? <img src={img} alt={modelo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <CarGlyph />}
        {!owned && <div style={{ position: 'absolute', inset: 0, background: 'var(--surface)', opacity: 0.45, mixBlendMode: 'saturation' }} />}
        {!owned && <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)', opacity: 0.32 }} />}
        {label && (
          <span style={{
            position: 'absolute', bottom: 5, left: 5, zIndex: 2, fontSize: 9, fontWeight: 800, letterSpacing: '.03em',
            padding: '2px 6px', borderRadius: 'var(--r-full)', lineHeight: 1.3,
            color: isTH ? 'var(--rare-fg)' : '#fff',
            background: isTH ? 'var(--rare)' : 'rgba(40,40,40,.92)',
            border: isTH ? 'none' : '1px solid rgba(255,255,255,.18)',
          }}>{label}</span>
        )}
      </div>
      <div style={{ padding: '7px 8px 9px' }}>
        <div style={{
          fontSize: 11, fontWeight: 'var(--fw-semibold)', lineHeight: 1.2,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          color: owned ? 'var(--text)' : 'var(--subtle)',
        }}>{modelo}</div>
        {sub != null && <div style={{ fontSize: 10, color: 'var(--subtle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  )
}
