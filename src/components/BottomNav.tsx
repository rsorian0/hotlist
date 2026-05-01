type Tab = 'list' | 'grid' | 'stats' | 'manage'

type Props = {
  active: Tab
  onChange: (tab: Tab) => void
}

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="bottom-nav" role="tablist">
      <button
        className={`nav-tab${active === 'list' ? ' active' : ''}`}
        type="button"
        role="tab"
        aria-selected={active === 'list'}
        onClick={() => onChange('list')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
        <span>Lista</span>
      </button>

      <button
        className={`nav-tab${active === 'grid' ? ' active' : ''}`}
        type="button"
        role="tab"
        aria-selected={active === 'grid'}
        onClick={() => onChange('grid')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        <span>Grade</span>
      </button>

      <button
        className={`nav-tab${active === 'stats' ? ' active' : ''}`}
        type="button"
        role="tab"
        aria-selected={active === 'stats'}
        onClick={() => onChange('stats')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 3v18h18"/>
          <rect x="7" y="12" width="3" height="6"/>
          <rect x="12" y="8" width="3" height="10"/>
          <rect x="17" y="4" width="3" height="14"/>
        </svg>
        <span>Stats</span>
      </button>

      <button
        className={`nav-tab${active === 'manage' ? ' active' : ''}`}
        type="button"
        role="tab"
        aria-selected={active === 'manage'}
        onClick={() => onChange('manage')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
        <span>Gerenciar</span>
      </button>
    </nav>
  )
}
