import type { User } from 'firebase/auth'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut, Download, Sun, Moon } from 'lucide-react'

type Props = {
  filter: string
  onFilterChange: (v: string) => void
  user: User | null
  onSignOut: () => void
  canInstall?: boolean
  onInstall?: () => void
  theme?: 'light' | 'dark'
  onToggleTheme?: () => void
}

export default function Header({ filter, onFilterChange, user, onSignOut, canInstall, onInstall, theme, onToggleTheme }: Props) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-2 px-3 h-12">
        {/* Logo — mobile only (sidebar has it on desktop) */}
        <img src="/logo-black.svg" alt="Hotlist" className="h-5 w-auto shrink-0 md:hidden dark:invert" />

        <div className="flex-1">
          <Input
            type="search"
            placeholder="Buscar modelo…"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="h-8 bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500 text-sm"
          />
        </div>

        {canInstall && (
          <button
            type="button"
            onClick={onInstall}
            title="Instalar app"
            className="p-2 rounded-md text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Download size={18} />
          </button>
        )}

        {/* Theme toggle: mobile only — desktop has it in Sidebar */}
        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="md:hidden p-2 rounded-md text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        {/* User avatar: mobile only — desktop has user info in Sidebar */}
        {user && (
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2">
                  <Avatar className="h-7 w-7 cursor-pointer">
                    <AvatarImage src={user.photoURL ?? undefined} referrerPolicy="no-referrer" />
                    <AvatarFallback className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
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
          </div>
        )}
      </div>
    </header>
  )
}
