import type { User } from 'firebase/auth'

type Props = {
  filter: string
  onFilterChange: (v: string) => void
  onAddClick: () => void
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
  canInstall?: boolean
  onInstall?: () => void
}

export default function Header({ filter, onFilterChange, onAddClick, user, onSignIn, onSignOut, canInstall, onInstall }: Props) {
  return (
    <header>
      <div className="wrap">
        <div className="toolbar">
          <div className="search">
            <input
              autoComplete="off"
              id="q"
              placeholder="Buscar por modelo, série ou número…"
              type="search"
              aria-label="Buscar"
              value={filter}
              onChange={(e) => onFilterChange(e.target.value)}
            />
          </div>

          <button className="btn" type="button" onClick={onAddClick}>
            Adicionar
          </button>

          {canInstall && (
            <button className="btn ghost icon" type="button" onClick={onInstall} title="Instalar app">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v13M7 11l5 5 5-5" />
                <path d="M3 19h18" />
              </svg>
              Instalar
            </button>
          )}

          <div id="authBar" style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 'auto' }}>
            {!user ? (
              <button className="btn ghost" onClick={onSignIn}>
                Entrar com Google
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                    style={{ width: 28, height: 28, borderRadius: '50%' }}
                  />
                )}
                <span style={{ fontSize: 14, opacity: 0.8 }}>{user.displayName || user.email || 'Usuário'}</span>
                <button className="btn ghost" onClick={onSignOut}>Sair</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
