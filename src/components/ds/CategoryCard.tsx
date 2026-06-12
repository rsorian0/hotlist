import { Icon } from './Icon'

interface CategoryCardProps {
  label: string
  icon: string
  rare?: boolean
  onClick?: () => void
}

export function CategoryCard({ label, icon, rare = false, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 var(--s4)', background: 'var(--surface)', borderRadius: 'var(--r-lg)',
        border: `1px solid ${rare ? 'rgba(200,45,107,.35)' : 'var(--border)'}`,
        cursor: 'pointer',
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{label}</span>
      <span style={{ color: rare ? 'rgba(200,45,107,.35)' : 'var(--border)', opacity: rare ? 1 : 0.4, display: 'grid', placeItems: 'center' }}>
        <Icon name={icon} size={28} strokeWidth={1.75} />
      </span>
    </div>
  )
}
