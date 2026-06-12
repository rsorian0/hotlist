import type { CSSProperties } from 'react'
import { Check } from 'lucide-react'
import { Icon } from './Icon'
import { DsBadge } from './DsBadge'
import { CommunityHint } from './CommunityHint'

const LINE_LABELS: Record<string, string> = {
  mainline: 'MAINLINE', th: 'TH', sth: 'STH', premium: 'PREMIUM',
  rlc: 'RLC', 'silver-series': 'SILVER',
}

interface FeedItem {
  n?: string | number
  modelo?: string
  img?: string
  line?: string
  serie?: string
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
  const year = new Date().getFullYear()

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)', overflow: 'hidden', ...style,
    }}>
      {/* top row */}
      <div
        onClick={onClick}
        style={{
          display: 'flex', gap: 'var(--s3)', padding: 'var(--s3) var(--s4) var(--s2)',
          cursor: onClick ? 'pointer' : 'default',
        }}
      >
        <div style={{
          position: 'relative', width: 48, height: 48, flexShrink: 0,
          borderRadius: 'var(--r-md)', background: 'var(--surface-2)',
          display: 'grid', placeItems: 'center', color: 'var(--border-2)',
        }}>
          <Icon name="Car" size={26} strokeWidth={1.6} />
          {isRare && (
            <span style={{
              position: 'absolute', top: -3, right: -3, width: 7, height: 7,
              borderRadius: '50%', background: 'var(--rare)', border: '1.5px solid var(--surface)',
            }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {item.modelo || '—'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--subtle)', margin: '1px 0 7px' }}>
            {item.serie ? `${item.serie} · ` : ''}{item.n != null ? `#${item.n} · ` : ''}{year}
          </div>
          {item.line && (
            isRare
              ? <DsBadge variant="rare">{item.line === 'sth' ? 'STH' : 'TH'}</DsBadge>
              : <DsBadge variant="outline">{LINE_LABELS[item.line] ?? item.line.toUpperCase()}</DsBadge>
          )}
        </div>
      </div>

      {/* footer row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 'var(--s2)', padding: 'var(--s2) var(--s4) var(--s3)',
        borderTop: '1px solid var(--border)',
      }}>
        <CommunityHint count={clubCount} rare={isRare} />
        {onToggle && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggle() }}
            style={{
              width: 32, height: 32, flexShrink: 0, borderRadius: '50%',
              display: 'grid', placeItems: 'center', cursor: 'pointer',
              background: owned ? 'var(--accent)' : 'transparent',
              border: `1.5px solid ${owned ? 'var(--accent)' : 'var(--border-2)'}`,
              color: owned ? 'var(--accent-fg)' : 'var(--subtle)',
              transition: 'background var(--dur-base) var(--ease), border-color var(--dur-base) var(--ease)',
            }}
            aria-label={owned ? 'Remover da coleção' : 'Adicionar à coleção'}
          >
            <Check size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  )
}
