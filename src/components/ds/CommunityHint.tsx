import { Users } from 'lucide-react'

interface CommunityHintProps {
  count: number
  rare?: boolean
}

export function CommunityHint({ count, rare = false }: CommunityHintProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4,
      fontSize: 10, color: rare ? 'var(--rare)' : 'var(--subtle)',
    }}>
      <Users size={11} />
      <span>
        {count} colecionadores têm este{rare ? ' · raro' : ''}
      </span>
    </div>
  )
}
