import type { LucideIcon } from 'lucide-react'
import type { User } from 'firebase/auth'
import { List, LayoutGrid, BarChart2, Settings, LogIn, LogOut, Sun, Moon } from 'lucide-react'

type Tab = 'list' | 'grid' | 'stats' | 'manage'

type Props = {
  active: Tab
  onChange: (tab: Tab) => void
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
  theme?: 'light' | 'dark'
  onToggleTheme?: () => void
}

const TABS: { id: Tab; label: string; Icon: LucideIcon }[] = [
  { id: 'list',   label: 'Lista',     Icon: List },
  { id: 'grid',   label: 'Grade',     Icon: LayoutGrid },
  { id: 'stats',  label: 'Stats',     Icon: BarChart2 },
  { id: 'manage', label: 'Gerenciar', Icon: Settings },
]

export default function Sidebar({ active, onChange, user, onSignIn, onSignOut, theme, onToggleTheme }: Props) {
  return (
    <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0 h-dvh">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
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
                ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
                : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-700 dark:hover:text-neutral-200',
            ].join(' ')}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>

      {/* Footer: theme + user */}
      <div className="px-2 pb-4 border-t border-neutral-200 dark:border-neutral-800 pt-3 space-y-0.5">
        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors w-full"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          </button>
        )}
        {!user ? (
          <button
            type="button"
            onClick={onSignIn}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors w-full"
          >
            <LogIn size={17} />
            Entrar
          </button>
        ) : (
          <button
            type="button"
            onClick={onSignOut}
            title="Sair da conta"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg w-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors group"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full border border-neutral-200 dark:border-neutral-700 shrink-0"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-semibold flex items-center justify-center shrink-0">
                {user.displayName?.[0]?.toUpperCase() ?? '?'}
              </div>
            )}
            <div className="flex-1 min-w-0 text-left">
              <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">{user.displayName}</div>
              <div className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">{user.email}</div>
            </div>
            <LogOut size={14} className="text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 shrink-0 transition-colors" />
          </button>
        )}
      </div>
    </aside>
  )
}
