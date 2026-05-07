import { useState, useRef, useEffect } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

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

          {user && (
            <div className="user-menu-wrap" ref={menuRef}>
              <button
                className="user-avatar-btn"
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Menu do usuário"
              >
                {user.photoURL
                  ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
                  : <div className="user-avatar-fallback">{user.displayName?.[0] ?? '?'}</div>
                }
              </button>

              {menuOpen && (
                <div className="user-menu">
                  <div className="user-menu-info">
                    <div className="user-menu-name">{user.displayName}</div>
                    <div className="user-menu-email">{user.email}</div>
                  </div>
                  <div className="user-menu-divider" />
                  <button
                    className="user-menu-item danger"
                    type="button"
                    onClick={() => { setMenuOpen(false); onSignOut() }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Sair da conta
                  </button>
                </div>
              )}
            </div>
          )}
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
