import { useState } from 'react'
import type { Serie, ImportData, OwnershipMap } from '../../types'
import { load, save, LS_TAB } from '../../lib/storage'
import CollectionsTab from './CollectionsTab'
import BackupTab from './BackupTab'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
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
  toast: (msg: string) => void
}

type Tab = 'tab-colecoes' | 'tab-backup'

export default function Editor({
  open, series, checks, currentIndex, onIndexChange, onClose,
  onAddSerie, onDeleteSerie, onImport, toast,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>(() => load<Tab>(LS_TAB, 'tab-colecoes'))

  const switchTab = (tab: Tab) => {
    setActiveTab(tab)
    save(LS_TAB, tab)
  }

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) onClose() }}>
      <SheetContent
        side="right"
        hideClose
        className="p-0 flex flex-col bg-white w-full sm:max-w-sm overflow-hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between px-5 py-3 border-b border-zinc-100 shrink-0">
          <SheetTitle className="text-base font-semibold text-zinc-900">Gerenciar</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="text-zinc-500 hover:text-zinc-900"
          >
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>

        {/* Tabs */}
        <div className="flex border-b border-zinc-100 shrink-0">
          <button
            type="button"
            className={[
              'flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px',
              activeTab === 'tab-colecoes'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-700',
            ].join(' ')}
            onClick={() => switchTab('tab-colecoes')}
          >
            Coleções
          </button>
          <button
            type="button"
            className={[
              'flex-1 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px',
              activeTab === 'tab-backup'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-700',
            ].join(' ')}
            onClick={() => switchTab('tab-backup')}
          >
            Backup
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {activeTab === 'tab-colecoes' ? (
            <CollectionsTab
              series={series}
              currentIndex={currentIndex}
              onIndexChange={onIndexChange}
              onAddSerie={onAddSerie}
              onDeleteSerie={onDeleteSerie}
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
      </SheetContent>
    </Sheet>
  )
}
