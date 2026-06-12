import type { User } from 'firebase/auth'
import { LogIn, LogOut, Sun, Moon, Settings } from 'lucide-react'
import { Logo, Icon } from './ds'

type Tab = 'home' | 'collection' | 'list' | 'explore' | 'grade' | 'stats'

type Props = {
  active: Tab
  onChange: (tab: Tab) => void
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
  onManage: () => void
  theme?: 'light' | 'dark'
  onToggleTheme?: () => void
}

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'home',       label: 'Início',   icon: 'House' },
  { id: 'collection', label: 'Coleção',  icon: 'Library' },
  { id: 'list',       label: 'Lista',    icon: 'ListChecks' },
  { id: 'explore',    label: 'Explorar', icon: 'Compass' },
  { id: 'grade',      label: 'Grade',    icon: 'LayoutGrid' },
  { id: 'stats',      label: 'Stats',    icon: 'ChartBar' },
]

const ICON_BTN: React.CSSProperties = {
  display: 'grid', placeItems: 'center',
  width: 32, height: 32, borderRadius: 'var(--r-md)',
  border: 0, cursor: 'pointer',
  background: 'transparent', color: 'var(--subtle)',
  flexShrink: 0,
  transition: 'color var(--dur-base) var(--ease)',
}

export default function Sidebar({ active, onChange, user, onSignIn, onSignOut, onManage, theme, onToggleTheme }: Props) {
  return (
    <aside
      className="hidden md:flex flex-col"
      style={{
        width: 'var(--sidebar-w)', flexShrink: 0, height: '100dvh',
        position: 'sticky', top: 0,
        background: 'var(--surface)', borderRight: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <div style={{ padding: 'var(--s4)', borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>
        <Logo height={28} />
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, padding: 'var(--s3) var(--s2)' }}>
        {TABS.map(({ id, label, icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              data-active={isActive ? 'true' : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--s3)',
                minHeight: 44, padding: '10px var(--s3)',
                borderRadius: 'var(--r-md)', border: 0, cursor: 'pointer', textAlign: 'left', width: '100%',
                background: isActive ? 'var(--surface-2)' : 'transparent',
                color: isActive ? 'var(--text)' : 'var(--subtle)',
                fontFamily: 'var(--font-sans)', fontSize: 14,
                fontWeight: isActive ? 700 : 500,
                transition: 'background var(--dur-base) var(--ease), color var(--dur-base) var(--ease)',
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--surface-2)' }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
            >
              <Icon name={icon} size={18} />
              {label}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border)', padding: 'var(--s2) var(--s3)' }}>
        {!user ? (
          <button
            type="button"
            onClick={onSignIn}
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--s3)',
              minHeight: 40, padding: '8px var(--s2)', width: '100%',
              borderRadius: 'var(--r-md)', border: 0, cursor: 'pointer',
              background: 'transparent', color: 'var(--subtle)',
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
            }}
          >
            <LogIn size={16} />
            Entrar
          </button>
        ) : (
          /* User row: avatar+name + icon buttons */
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s2)', minHeight: 44 }}>
            {/* Avatar + name (click = sign out) */}
            <button
              type="button"
              onClick={onSignOut}
              title="Sair da conta"
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--s2)', flex: 1, minWidth: 0, background: 'transparent', border: 0, cursor: 'pointer', borderRadius: 'var(--r-md)', padding: '4px var(--s1)' }}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  referrerPolicy="no-referrer"
                  style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--border)', flexShrink: 0 }}
                />
              ) : (
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-fg)', fontSize: 12, fontWeight: 700, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  {user.displayName?.[0]?.toUpperCase() ?? '?'}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.displayName}</div>
                <div style={{ fontSize: 10, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <LogOut size={9} />
                  Sair
                </div>
              </div>
            </button>

            {/* Theme toggle */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
                style={ICON_BTN}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {/* Settings / Gerenciar */}
            <button
              type="button"
              onClick={onManage}
              title="Gerenciar coleções"
              style={ICON_BTN}
            >
              <Settings size={16} />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
