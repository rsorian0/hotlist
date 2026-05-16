import type { User } from 'firebase/auth'
import { List, LayoutGrid, BarChart2, Settings, LogIn, LogOut } from 'lucide-react'

type Tab = 'list' | 'grid' | 'stats' | 'manage'

type Props = {
  active: Tab
  onChange: (tab: Tab) => void
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
}

const TABS: { id: Tab; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { id: 'list',   label: 'Lista',     Icon: List },
  { id: 'grid',   label: 'Grade',     Icon: LayoutGrid },
  { id: 'stats',  label: 'Stats',     Icon: BarChart2 },
  { id: 'manage', label: 'Gerenciar', Icon: Settings },
]

export default function Sidebar({ active, onChange, user, onSignIn, onSignOut }: Props) {
  return (
    <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 h-dvh">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-zinc-100 dark:border-zinc-800">
        <img src="/logo-black.svg" alt="Hotlist" className="h-6 w-auto dark:invert" />
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2 py-3">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={[
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left w-full',
              active === id
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-200',
            ].join(' ')}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="px-2 pb-4 border-t border-zinc-100 dark:border-zinc-800 pt-3">
        {!user ? (
          <button
            type="button"
            onClick={onSignIn}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors w-full"
          >
            <LogIn size={17} />
            Entrar
          </button>
        ) : (
          <button
            type="button"
            onClick={onSignOut}
            title="Sair da conta"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg w-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 shrink-0"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-semibold flex items-center justify-center shrink-0">
                {user.displayName?.[0]?.toUpperCase() ?? '?'}
              </div>
            )}
            <div className="flex-1 min-w-0 text-left">
              <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{user.displayName}</div>
              <div className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">{user.email}</div>
            </div>
            <LogOut size={14} className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 shrink-0 transition-colors" />
          </button>
        )}
      </div>
    </aside>
  )
}
