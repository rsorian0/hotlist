import { DsBottomNav } from './ds'

type Tab = 'list' | 'grid' | 'stats' | 'manage'

const TABS = [
  { id: 'list',   label: 'Lista',     icon: 'List' },
  { id: 'grid',   label: 'Grade',     icon: 'LayoutGrid' },
  { id: 'stats',  label: 'Stats',     icon: 'BarChart2' },
  { id: 'manage', label: 'Gerenciar', icon: 'Settings' },
]

type Props = { active: Tab; onChange: (tab: Tab) => void }

export default function BottomNav({ active, onChange }: Props) {
  return (
    <DsBottomNav
      tabs={TABS}
      active={active}
      onChange={(id) => onChange(id as Tab)}
      className="md:hidden"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 30,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    />
  )
}
