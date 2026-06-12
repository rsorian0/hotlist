import { Icon } from './Icon'
import { Avatars } from './Avatars'

interface CommunityHintProps {
  count: number
  rare?: boolean
  variant?: 'avatars' | 'icon'
  people?: string[]
}

export function CommunityHint({ count, rare = false, variant = 'icon', people }: CommunityHintProps) {
  const compact = variant === 'icon'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 5 : 8, minWidth: 0 }}>
      {compact
        ? <span style={{ color: 'var(--subtle)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name="Users" size={11} /></span>
        : <Avatars people={people} />}
      <span style={{ fontSize: compact ? 10 : 11, color: 'var(--subtle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {count.toLocaleString('pt-BR')} colecionadores têm este
        {rare && <span style={{ color: 'var(--rare)', fontWeight: 600 }}> · raro</span>}
      </span>
    </div>
  )
}
