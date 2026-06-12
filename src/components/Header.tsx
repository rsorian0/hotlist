import type { User } from 'firebase/auth'
import { Search, Download, Sun, Moon } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { Logo, DsInput } from './ds'

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
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'var(--header-bg)', backdropFilter: 'var(--blur-glass)',
        WebkitBackdropFilter: 'var(--blur-glass)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s2)', padding: '0 var(--s3)', height: 'var(--header-h)' }}>
        {/* Logo — mobile only */}
        <div className="md:hidden" style={{ color: 'var(--text)', flexShrink: 0 }}>
          <Logo height={22} />
        </div>

        <div style={{ flex: 1 }}>
          <DsInput
            type="search"
            placeholder="Buscar modelo…"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            leading={<Search size={15} />}
            wrapperStyle={{ height: 36 }}
          />
        </div>

        {canInstall && (
          <button
            type="button"
            onClick={onInstall}
            title="Instalar app"
            style={{ display: 'grid', placeItems: 'center', width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'transparent', border: 'none', color: 'var(--subtle)', cursor: 'pointer', flexShrink: 0 }}
          >
            <Download size={18} />
          </button>
        )}

        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="md:hidden"
            style={{ display: 'grid', placeItems: 'center', width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'transparent', border: 'none', color: 'var(--subtle)', cursor: 'pointer', flexShrink: 0 }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

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
