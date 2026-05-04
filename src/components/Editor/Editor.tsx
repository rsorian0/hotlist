import { useState } from 'react'
import type { Serie, SerieItem, ImportData, OwnershipMap } from '../../types'
import { load, save, LS_TAB } from '../../lib/storage'
import CollectionsTab from './CollectionsTab'
import BackupTab from './BackupTab'

type Props = {
  open: boolean
  series: Serie[]
  checks: OwnershipMap
  currentIndex: number
  onIndexChange: (i: number) => void
  onClose: () => void
  onAddSerie: (nome: string) => number
  onDeleteSerie: (i: number) => void
  onAddItem: (si: number, item: SerieItem) => void
  onUpdateItem: (si: number, ii: number, item: SerieItem) => void
  onRemoveItem: (si: number, ii: number) => void
  onMoveItem: (key: string, targetSerie: string) => void
  onImport: (data: ImportData, mode: 'merge' | 'replace') => void
  toast: (msg: string) => void
}

type Tab = 'tab-colecoes' | 'tab-backup'

export default function Editor({
  open, series, checks, currentIndex, onIndexChange, onClose,
  onAddSerie, onDeleteSerie, onAddItem, onUpdateItem, onRemoveItem, onMoveItem, onImport, toast,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>(() => load<Tab>(LS_TAB, 'tab-colecoes'))

  const switchTab = (tab: Tab) => {
    setActiveTab(tab)
    save(LS_TAB, tab)
  }

  return (
    <aside className={`panel${open ? ' open' : ''}`} id="editor" aria-hidden={!open}>
      <div className="hd">
        <h3>Gerenciar</h3>
        <button className="btn ghost" type="button" onClick={onClose}>Fechar</button>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn${activeTab === 'tab-colecoes' ? ' active' : ''}`}
          data-tab="tab-colecoes"
          type="button"
          onClick={() => switchTab('tab-colecoes')}
        >
          Coleções
        </button>
        <button
          className={`tab-btn${activeTab === 'tab-backup' ? ' active' : ''}`}
          data-tab="tab-backup"
          type="button"
          onClick={() => switchTab('tab-backup')}
        >
          Backup
        </button>
      </div>

      <div className="body">
        <div className="panes">
          {activeTab === 'tab-colecoes' ? (
            <CollectionsTab
              series={series}
              currentIndex={currentIndex}
              onIndexChange={onIndexChange}
              onAddSerie={onAddSerie}
              onDeleteSerie={onDeleteSerie}
              onMoveItem={onMoveItem}
              toast={toast}
            />
          ) : (
            <BackupTab
              series={series}
              checks={checks}
              onImport={onImport}
              toast={toast}
            />
          )}
        </div>
      </div>
    </aside>
  )
}
