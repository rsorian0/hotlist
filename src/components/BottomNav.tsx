import { useDesktop } from '../hooks/useDesktop'
import { DsBottomNav } from './ds'

type Tab = 'home' | 'collection' | 'list' | 'explore' | 'grade' | 'stats'

const TABS = [
  { id: 'home',       label: 'Início',   icon: 'House' },
  { id: 'collection', label: 'Coleção',  icon: 'Library' },
  { id: 'list',       label: 'Lista',    icon: 'ListChecks' },
  { id: 'explore',    label: 'Explorar', icon: 'Compass' },
  { id: 'stats',      label: 'Stats',    icon: 'ChartBar' },
]

type Props = { active: Tab; onChange: (tab: Tab) => void }

export default function BottomNav({ active, onChange }: Props) {
  const desktop = useDesktop()
  if (desktop) return null

  return (
    <DsBottomNav
      tabs={TABS}
      active={active}
      onChange={(id) => onChange(id as Tab)}
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 30,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    />
  )
}
