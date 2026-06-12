import type { CSSProperties, HTMLAttributes } from 'react'

const CarGlyph = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
  </svg>
)

interface DsItemRowItem {
  n?: string | number
  modelo?: string
  img?: string
  line?: string
}

interface DsItemRowProps extends HTMLAttributes<HTMLDivElement> {
  item?: DsItemRowItem
  owned?: boolean
  qty?: number | null
  onClick?: () => void
  onThumbClick?: () => void
  style?: CSSProperties
}

export function DsItemRow({ item = {}, owned = false, qty = null, onClick, onThumbClick, style, ...rest }: DsItemRowProps) {
  const { n, modelo, img, line } = item
  const isTH = line === 'th' || line === 'sth'
  const rarityLabels: Record<string, string> = { th: 'TH', sth: 'STH', premium: 'PREMIUM', rlc: 'RLC', 'silver-series': 'SILVER' }
  const rarityLabel = line ? rarityLabels[line] : undefined
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--s3)', padding: 'var(--s2) var(--s3)',
        cursor: 'pointer', borderBottom: '1px solid var(--border)',
        transition: 'background var(--dur-base) var(--ease)', ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-2)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
      {...rest}
    >
      <div
        onClick={(e) => { e.stopPropagation(); onThumbClick?.() }}
        style={{
          position: 'relative', width: 56, height: 56, flexShrink: 0, borderRadius: 'var(--r-md)',
          overflow: 'hidden', background: 'var(--surface-2)', border: '1px solid var(--border)',
          display: 'grid', placeItems: 'center', color: 'var(--subtle)',
        }}
      >
        {img ? <img src={img} alt={modelo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <CarGlyph />}
        {rarityLabel && (
          <span style={{
            position: 'absolute', bottom: 3, left: 3, fontSize: 8, fontWeight: 800, letterSpacing: '.03em',
            padding: '1px 4px', borderRadius: 'var(--r-full)', lineHeight: 1.3,
            color: isTH ? 'var(--rare-fg)' : '#fff',
            background: isTH ? 'var(--rare)' : 'rgba(40,40,40,.92)',
            border: isTH ? 'none' : '1px solid rgba(255,255,255,.18)',
          }}>{rarityLabel}</span>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {n != null && <div style={{ fontSize: 10, color: 'var(--subtle)', lineHeight: 1, marginBottom: 3 }}>{n}</div>}
        <div style={{
          fontSize: 13, fontWeight: 'var(--fw-semibold)', lineHeight: 1.2,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          color: owned ? 'var(--text)' : 'var(--subtle)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{modelo}</span>
          {qty != null && qty > 1 && (
            <span style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 'var(--r-full)', background: 'var(--surface-2)', color: 'var(--muted)' }}>×{qty}</span>
          )}
        </div>
      </div>

      <span style={{
        width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
        background: owned ? 'var(--accent)' : 'transparent',
        border: owned ? 'none' : '1.5px solid var(--border-2)',
      }} aria-label={owned ? 'owned' : 'not owned'} />
    </div>
  )
}
