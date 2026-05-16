import type { User } from 'firebase/auth'
import type { Line } from '../types'
import { lineMeta } from '../utils/line'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, List, LayoutGrid, BarChart2, Settings } from 'lucide-react'

type Tab = 'list' | 'grid' | 'stats' | 'manage'

type Props = {
  filter: string
  onFilterChange: (v: string) => void
  lineFilter: Line | null
  onLineFilterChange: (l: Line | null) => void
  activeLines: Line[]
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
  canInstall?: boolean
  onInstall?: () => void
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'list',   label: 'Lista',     icon: <List size={18} /> },
  { id: 'grid',   label: 'Grade',     icon: <LayoutGrid size={18} /> },
  { id: 'stats',  label: 'Stats',     icon: <BarChart2 size={18} /> },
  { id: 'manage', label: 'Gerenciar', icon: <Settings size={18} /> },
]

export default function Header({
  filter, onFilterChange, lineFilter, onLineFilterChange, activeLines,
  user, onSignOut, canInstall, onInstall,
  activeTab, onTabChange,
}: Props) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-100">

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-3 px-4 h-14 max-w-3xl mx-auto">
        <img
          src="/hotlist/logo-black.svg"
          alt="Hotlist"
          className="h-7 w-auto shrink-0"
        />

        <div className="flex-1">
          <Input
            type="search"
            placeholder="Buscar modelo…"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="h-8 bg-zinc-50 border-zinc-200 text-sm"
          />
        </div>

        {canInstall && (
          <button
            type="button"
            onClick={onInstall}
            title="Instalar app"
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M12 2v13M7 11l5 5 5-5"/><path d="M3 19h18"/>
            </svg>
          </button>
        )}

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={user.photoURL ?? undefined} referrerPolicy="no-referrer" />
                  <AvatarFallback className="text-xs bg-zinc-200 text-zinc-700">
                    {user.displayName?.[0] ?? '?'}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="font-normal">
                <div className="font-semibold text-sm truncate">{user.displayName}</div>
                <div className="text-xs text-muted-foreground truncate">{user.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                onClick={onSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair da conta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* ── Tab navigation ── */}
      <div className="flex border-t border-zinc-100 max-w-3xl mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            className={[
              'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-xs font-medium transition-colors',
              activeTab === tab.id
                ? 'text-zinc-900 border-b-2 border-zinc-900'
                : 'text-zinc-400 hover:text-zinc-600 border-b-2 border-transparent',
            ].join(' ')}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Line filter chips ── */}
      {activeLines.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto px-4 pb-2 pt-1 max-w-3xl mx-auto scrollbar-hide">
          {activeLines.map((l) => {
            const meta = lineMeta(l)
            if (!meta) return null
            const isActive = lineFilter === l
            return (
              <button
                key={l}
                type="button"
                onClick={() => onLineFilterChange(isActive ? null : l)}
                className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors"
                style={
                  isActive
                    ? { background: meta.badgeBg || meta.color, borderColor: meta.badgeBg || meta.color, color: '#fff' }
                    : { background: 'transparent', borderColor: meta.badgeBg || meta.color, color: meta.badgeBg || meta.color }
                }
              >
                {meta.short}
              </button>
            )
          })}
        </div>
      )}
    </header>
  )
}
