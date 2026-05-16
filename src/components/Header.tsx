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
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-2 px-3 h-12">
        {/* Logo — mobile only (sidebar has it on desktop) */}
        <img src="/logo-black.svg" alt="Hotlist" className="h-5 w-auto shrink-0 md:hidden dark:invert" />

        <div className="flex-1">
          <Input
            type="search"
            placeholder="Buscar modelo…"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="h-8 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 text-sm"
          />
        </div>

        {canInstall && (
          <button
            type="button"
            onClick={onInstall}
            title="Instalar app"
            className="p-2 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Download size={18} />
          </button>
        )}

        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="p-2 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2">
                <Avatar className="h-7 w-7 cursor-pointer">
                  <AvatarImage src={user.photoURL ?? undefined} referrerPolicy="no-referrer" />
                  <AvatarFallback className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
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
    </header>
  )
}
