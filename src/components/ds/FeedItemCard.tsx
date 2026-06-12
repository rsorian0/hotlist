import type { CSSProperties } from 'react'
import { Check } from 'lucide-react'
import { CommunityHint } from './CommunityHint'
import { CAR_PLACEHOLDER } from '../../utils/placeholder'

interface FeedItem {
  n?: string | number
  modelo?: string
  img?: string
  line?: string
}

interface FeedItemCardProps {
  item: FeedItem
  owned: boolean
  onToggle?: () => void
  onClick?: () => void
  clubCount?: number
  style?: CSSProperties
}

export function FeedItemCard({ item, owned, onToggle, onClick, clubCount = 0, style }: FeedItemCardProps) {
  const isRare = item.line === 'th' || item.line === 'sth'
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--s3)',
        padding: 'var(--s3)', background: 'var(--surface)',
        border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background var(--dur-base) var(--ease)',
        ...style,
      }}
      onMouseEnter={(e) => { if (onClick) e.currentTarget.style.background = 'var(--surface-2)' }}
      onMouseLeave={(e) => { if (onClick) e.currentTarget.style.background = 'var(--surface)' }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 'var(--r-md)', flexShrink: 0,
        background: 'var(--surface-2)', overflow: 'hidden',
        border: `1px solid ${isRare ? 'var(--rare)' : 'var(--border)'}`,
      }}>
        <img src={item.img || CAR_PLACEHOLDER} alt={item.modelo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.modelo || '—'}
        </div>
        {item.n != null && (
          <div style={{ fontSize: 10, color: 'var(--subtle)', marginTop: 1 }}>{item.n}</div>
        )}
        {clubCount > 0 && (
          <div style={{ marginTop: 3 }}>
            <CommunityHint count={clubCount} rare={isRare} />
          </div>
        )}
      </div>

      {onToggle && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggle() }}
          style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            display: 'grid', placeItems: 'center', cursor: 'pointer',
            background: owned ? 'var(--accent)' : 'transparent',
            border: `2px solid ${owned ? 'var(--accent)' : 'var(--border-2)'}`,
            color: owned ? 'var(--accent-fg)' : 'var(--subtle)',
            transition: 'background var(--dur-base) var(--ease), border-color var(--dur-base) var(--ease)',
          }}
          aria-label={owned ? 'Remover da coleção' : 'Adicionar à coleção'}
        >
          {owned && <Check size={16} strokeWidth={3} />}
        </button>
      )}
    </div>
  )
}
