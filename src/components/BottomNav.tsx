import { List, LayoutGrid, BarChart2, Settings } from 'lucide-react'

type Tab = 'list' | 'grid' | 'stats' | 'manage'

const TABS: { id: Tab; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { id: 'list',   label: 'Lista',     Icon: List },
  { id: 'grid',   label: 'Grade',     Icon: LayoutGrid },
  { id: 'stats',  label: 'Stats',     Icon: BarChart2 },
  { id: 'manage', label: 'Gerenciar', Icon: Settings },
]

type Props = {
  active: Tab
  onChange: (tab: Tab) => void
}

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 flex bg-white border-t border-zinc-100 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={[
            'flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors',
            active === id ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600',
          ].join(' ')}
        >
          <Icon size={20} />
          {label}
        </button>
      ))}
    </nav>
  )
}
