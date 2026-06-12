import { useState } from 'react'
import type { Serie, ImportData, OwnershipMap } from '../../types'
import { load, save, LS_TAB } from '../../lib/storage'
import CollectionsTab from './CollectionsTab'
import BackupTab from './BackupTab'
import { X } from 'lucide-react'

type Props = {
  open: boolean
  series: Serie[]
  checks: OwnershipMap
  currentIndex: number
  onIndexChange: (i: number) => void
  onClose: () => void
  onAddSerie: (nome: string) => number
  onDeleteSerie: (i: number) => void
  onImport: (data: ImportData, mode: 'merge' | 'replace') => void
}

type Tab = 'tab-colecoes' | 'tab-backup'

export default function Editor({
  open, series, checks, currentIndex, onIndexChange, onClose,
  onAddSerie, onDeleteSerie, onImport,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>(() => load<Tab>(LS_TAB, 'tab-colecoes'))

  const switchTab = (tab: Tab) => {
    setActiveTab(tab)
    save(LS_TAB, tab)
  }

  if (!open) return null

  return (
    /* Backdrop */
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--s4)', background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Modal */}
      <div
        style={{
          width: '100%', maxWidth: 480, maxHeight: '90dvh',
          display: 'flex', flexDirection: 'column',
          background: 'var(--surface)', borderRadius: 'var(--r-xl)',
          border: '1px solid var(--border)',
          boxShadow: '0 24px 60px rgba(0,0,0,.3)',
          overflow: 'hidden',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Gerenciar</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, borderRadius: 'var(--r-md)', border: 0, background: 'var(--surface-2)', color: 'var(--subtle)', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          {(['tab-colecoes', 'tab-backup'] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => switchTab(t)}
              style={{
                flex: 1, padding: '10px 0', fontSize: 13, fontWeight: 600,
                background: 'transparent', border: 0, cursor: 'pointer',
                color: activeTab === t ? 'var(--text)' : 'var(--subtle)',
                borderBottom: activeTab === t ? '2px solid var(--text)' : '2px solid transparent',
                marginBottom: -1, fontFamily: 'var(--font-sans)',
                transition: 'color var(--dur-base) var(--ease)',
              }}
            >
              {t === 'tab-colecoes' ? 'Coleções' : 'Backup'}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {activeTab === 'tab-colecoes' ? (
            <CollectionsTab
              series={series}
              currentIndex={currentIndex}
              onIndexChange={onIndexChange}
              onAddSerie={onAddSerie}
              onDeleteSerie={onDeleteSerie}
            />
          ) : (
            <BackupTab
              series={series}
              checks={checks}
              onImport={onImport}
            />
          )}
        </div>
      </div>
    </div>
  )
}
