import type { User } from 'firebase/auth'
import type { ViewFilter, Line } from '../types'
import { lineMeta } from '../utils/line'

type Props = {
  filter: string
  onFilterChange: (v: string) => void
  view: ViewFilter
  onViewChange: (v: ViewFilter) => void
  lineFilter: Line | null
  onLineFilterChange: (l: Line | null) => void
  activeLines: Line[]
  viewMode: 'list' | 'grid'
  onViewModeToggle: () => void
  onAddClick: () => void
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
  canInstall?: boolean
  onInstall?: () => void
}

const VIEW_OPTS: { value: ViewFilter; label: string }[] = [
  { value: 'all', label: 'Tudo' },
  { value: 'owned', label: 'Tenho' },
  { value: 'wishlist', label: 'Quero' },
]

export default function Header({
  filter, onFilterChange, view, onViewChange, lineFilter, onLineFilterChange,
  activeLines, viewMode, onViewModeToggle, onAddClick,
  user, onSignIn, onSignOut, canInstall, onInstall,
}: Props) {
  return (
    <header>
      <div className="wrap">
        <div className="toolbar">
          <div className="search">
            <input
              autoComplete="off"
              id="q"
              placeholder="Buscar modelo, série…"
              type="search"
              aria-label="Buscar"
              value={filter}
              onChange={(e) => onFilterChange(e.target.value)}
            />
          </div>

          <button
            className="icon-btn"
            type="button"
            onClick={onViewModeToggle}
            title={viewMode === 'list' ? 'Modo grade' : 'Modo lista'}
          >
            {viewMode === 'list' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>

          {canInstall && (
            <button className="icon-btn" type="button" onClick={onInstall} title="Instalar app">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v13M7 11l5 5 5-5"/><path d="M3 19h18"/>
              </svg>
            </button>
          )}

          <div id="authBar" style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 'auto' }}>
            {!user ? (
              <button className="btn ghost" onClick={onSignIn}>Entrar</button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {user.photoURL && (
                  <img src={user.photoURL} alt="" referrerPolicy="no-referrer"
                    style={{ width: 28, height: 28, borderRadius: '50%', cursor: 'pointer' }}
                    onClick={onSignOut} title="Sair"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* View + Line chips */}
        <div className="chips-bar">
          {VIEW_OPTS.map((v) => (
            <button
              key={v.value}
              type="button"
              className={`chip${view === v.value ? ' active' : ''}`}
              onClick={() => onViewChange(v.value)}
            >
              {v.label}
            </button>
          ))}

          {activeLines.length > 0 && <div className="chips-divider" />}

          {activeLines.map((l) => {
            const meta = lineMeta(l)
            if (!meta) return null
            const isActive = lineFilter === l
            return (
              <button
                key={l}
                type="button"
                className={`chip${isActive ? ' active' : ''}`}
                style={isActive ? { background: meta.badgeBg || meta.color, borderColor: meta.color } : {}}
                onClick={() => onLineFilterChange(isActive ? null : l)}
              >
                {meta.short}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
