import type { User } from 'firebase/auth'
import type { Line } from '../types'
import { lineMeta } from '../utils/line'

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
}

export default function Header({
  filter, onFilterChange, lineFilter, onLineFilterChange, activeLines,
  user, onSignIn, onSignOut, canInstall, onInstall,
}: Props) {
  return (
    <header>
      <div className="header-inner">
        <div className="toolbar">
          <div className="search">
            <input
              autoComplete="off"
              id="q"
              placeholder="Buscar modelo…"
              type="search"
              aria-label="Buscar"
              value={filter}
              onChange={(e) => onFilterChange(e.target.value)}
            />
          </div>

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
              user.photoURL && (
                <img
                  src={user.photoURL}
                  alt=""
                  referrerPolicy="no-referrer"
                  style={{ width: 28, height: 28, borderRadius: '50%', cursor: 'pointer' }}
                  onClick={onSignOut}
                  title="Sair"
                />
              )
            )}
          </div>
        </div>

        {activeLines.length > 0 && (
          <div className="chips-bar">
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
        )}
      </div>
    </header>
  )
}
