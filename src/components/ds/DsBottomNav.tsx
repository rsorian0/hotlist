import type { CSSProperties, HTMLAttributes } from 'react'
import { Icon } from './Icon'

interface NavTab {
  id: string
  label: string
  icon: string
}

interface DsBottomNavProps extends HTMLAttributes<HTMLElement> {
  tabs?: NavTab[]
  active?: string
  onChange?: (id: string) => void
  style?: CSSProperties
}

const DEFAULT_TABS: NavTab[] = [
  { id: 'list',   label: 'Lista',     icon: 'List' },
  { id: 'grid',   label: 'Grade',     icon: 'LayoutGrid' },
  { id: 'stats',  label: 'Stats',     icon: 'BarChart2' },
  { id: 'manage', label: 'Gerenciar', icon: 'Settings' },
]

export function DsBottomNav({ tabs = DEFAULT_TABS, active, onChange, style, ...rest }: DsBottomNavProps) {
  return (
    <nav
      style={{
        display: 'flex', width: '100%', height: 'var(--nav-h)',
        background: 'var(--header-bg)', backdropFilter: 'var(--blur-glass)',
        WebkitBackdropFilter: 'var(--blur-glass)', borderTop: '1px solid var(--border)', ...style,
      }}
      {...rest}
    >
      {tabs.map((t) => {
        const on = t.id === active
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange?.(t.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
              background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--s2) var(--s1)',
              color: on ? 'var(--text)' : 'var(--subtle)',
              fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 'var(--fw-semibold)',
              transition: 'color var(--dur-base) var(--ease)',
            }}
          >
            <Icon name={t.icon} size={20} />
            {t.label}
          </button>
        )
      })}
    </nav>
  )
}
