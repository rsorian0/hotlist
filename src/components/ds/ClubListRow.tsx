import type { CSSProperties } from 'react'
import { Check } from 'lucide-react'
import { DsItemRow } from './DsItemRow'
import { CommunityHint } from './CommunityHint'

interface ClubListRowItem {
  n?: string | number
  modelo?: string
  img?: string
  line?: string
  qty?: number
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

  return (
    <div style={{ borderBottom: '1px solid var(--border)', ...style }}>
      {/* main item row — no bottom border, small bottom padding */}
      <DsItemRow
        item={item}
        owned={owned}
        qty={item.qty ?? null}
        onClick={onClick}
        style={{ borderBottom: 'none', paddingBottom: 2 }}
      />
      {/* footer row: community hint + check button */}
      <div style={{
        padding: '0 var(--s3) 9px 83px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <CommunityHint count={clubCount ?? 0} rare={isRare} />
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
            aria-label={owned ? 'Remover' : 'Marcar como tenho'}
          >
            <Check size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  )
}
