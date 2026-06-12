import type { CSSProperties } from 'react'
import { Check } from 'lucide-react'
import { CommunityHint } from './CommunityHint'
import { CAR_PLACEHOLDER } from '../../utils/placeholder'

interface ClubListRowItem {
  n?: string | number
  modelo?: string
  img?: string
  line?: string
}

interface ClubListRowProps {
  item: ClubListRowItem
  owned: boolean
  onToggle?: () => void
  onClick?: () => void
  clubCount?: number
  style?: CSSProperties
}

export function ClubListRow({ item, owned, onToggle, onClick, clubCount, style }: ClubListRowProps) {
  const isRare = item.line === 'th' || item.line === 'sth'
  const rarityLabels: Record<string, string> = { th: 'TH', sth: 'STH', premium: 'PREMIUM', rlc: 'RLC', 'silver-series': 'SILVER' }
  const rarityLabel = item.line ? rarityLabels[item.line] : undefined

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--s3)',
        padding: 'var(--s2) var(--s3)', cursor: onClick ? 'pointer' : 'default',
        borderBottom: '1px solid var(--border)',
        transition: 'background var(--dur-base) var(--ease)',
        ...style,
      }}
      onMouseEnter={(e) => { if (onClick) e.currentTarget.style.background = 'var(--surface-2)' }}
      onMouseLeave={(e) => { if (onClick) e.currentTarget.style.background = 'transparent' }}
    >
      {/* thumb */}
      <div style={{
        position: 'relative', width: 52, height: 52, flexShrink: 0,
        borderRadius: 'var(--r-md)', overflow: 'hidden',
        background: 'var(--surface-2)', border: `1px solid ${isRare ? 'var(--rare)' : 'var(--border)'}`,
        display: 'grid', placeItems: 'center', color: 'var(--subtle)',
      }}>
        <img src={item.img || CAR_PLACEHOLDER} alt={item.modelo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        {rarityLabel && (
          <span style={{
            position: 'absolute', bottom: 3, left: 3, fontSize: 8, fontWeight: 800,
            padding: '1px 4px', borderRadius: 'var(--r-full)', lineHeight: 1.3,
            color: isRare ? 'var(--rare-fg, #fff)' : '#fff',
            background: isRare ? 'var(--rare)' : 'rgba(40,40,40,.92)',
          }}>{rarityLabel}</span>
        )}
      </div>

      {/* content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {item.n != null && (
          <div style={{ fontSize: 10, color: 'var(--subtle)', lineHeight: 1, marginBottom: 2 }}>{item.n}</div>
        )}
        <div style={{
          fontSize: 13, fontWeight: 600, lineHeight: 1.2, color: owned ? 'var(--text)' : 'var(--subtle)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{item.modelo || '—'}</div>
        {clubCount != null && (
          <div style={{ marginTop: 3 }}>
            <CommunityHint count={clubCount} rare={isRare} />
          </div>
        )}
      </div>

      {/* check button */}
      {onToggle && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggle() }}
          style={{
            width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
            display: 'grid', placeItems: 'center', cursor: 'pointer',
            background: owned ? 'var(--accent)' : 'transparent',
            border: `2px solid ${owned ? 'var(--accent)' : 'var(--border-2)'}`,
            color: owned ? 'var(--accent-fg)' : 'var(--subtle)',
            transition: 'background var(--dur-base) var(--ease), border-color var(--dur-base) var(--ease)',
          }}
          aria-label={owned ? 'Remover' : 'Marcar como tenho'}
        >
          {owned && <Check size={14} strokeWidth={3} />}
        </button>
      )}
    </div>
  )
}
