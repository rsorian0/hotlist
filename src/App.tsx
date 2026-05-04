import { useState, useMemo } from 'react'
import { useAuth } from './hooks/useAuth'
import { useHotlist } from './hooks/useHotlist'
import { useModal } from './hooks/useModal'
import { useToast } from './hooks/useToast'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import { effectiveLine } from './utils/line'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import SeriesList from './components/SeriesList'
import GridView from './components/GridView'
import Stats from './components/Stats'
import Modal from './components/Modal'
import Toast from './components/Toast'
import Editor from './components/Editor/Editor'
import ItemDetail from './components/ItemDetail'
import AddItemSheet from './components/AddItemSheet'
import type { Line } from './types'

type ActiveTab = 'list' | 'grid' | 'stats' | 'manage'

export default function App() {
  const { user, signIn, signOut } = useAuth()
  const {
    series, checks, addSerie, addItemQuick, deleteSerie, addItem, updateItem,
    updateItemMetaByKey, removeItem, removeItemByKey, moveItemToSerie, setOwnership, importData,
  } = useHotlist(user)
  const { open: modalOpen, index: modalIndex, feed: modalFeed, openModal, closeModal, next, prev } = useModal()
  const { message: toastMsg, toast } = useToast()
  const { canInstall, install } = useInstallPrompt()

  const [filter, setFilter] = useState('')
  const [lineFilter, setLineFilter] = useState<Line | null>(null)
  const [activeTab, setActiveTab] = useState<ActiveTab>('list')
  const [addSheetOpen, setAddSheetOpen] = useState(false)
  const [currentSerieIndex, setCurrentSerieIndex] = useState<number>(() => (series.length > 0 ? 0 : -1))
  const [detailKey, setDetailKey] = useState<string | null>(null)

  const activeLines = useMemo<Line[]>(() => {
    const set = new Set<Line>()
    for (const s of series) {
      for (const it of s.items) {
        const l = effectiveLine(it)
        if (l) set.add(l)
      }
    }
    return Array.from(set)
  }, [series])

  const detail = useMemo(() => {
    if (!detailKey) return { item: null, serieNome: null }
    for (const s of series) {
      for (const it of s.items) {
        if (`${s.nome}__${it.n || ''}` === detailKey) return { item: it, serieNome: s.nome }
      }
    }
    return { item: null, serieNome: null }
  }, [detailKey, series])

  const handleAddSerie = (nome: string): number => {
    const idx = addSerie(nome)
    setCurrentSerieIndex(idx)
    return idx
  }

  const handleDeleteSerie = (i: number) => {
    deleteSerie(i)
    setCurrentSerieIndex((prev) => (series.length > 1 ? Math.max(0, prev - 1) : -1))
  }

  const showChips = activeTab === 'list' || activeTab === 'grid'

  return (
    <>
      <Header
        filter={filter}
        onFilterChange={setFilter}
        lineFilter={lineFilter}
        onLineFilterChange={setLineFilter}
        activeLines={showChips ? activeLines : []}
        user={user}
        onSignIn={signIn}
        onSignOut={signOut}
        canInstall={canInstall}
        onInstall={install}
      />

      <main>
        {activeTab === 'list' && (
          <SeriesList
            series={series}
            checks={checks}
            filter={filter}
            lineFilter={lineFilter}
            onOpenModal={openModal}
            onAddClick={() => setAddSheetOpen(true)}
            onItemClick={setDetailKey}
          />
        )}

        {activeTab === 'grid' && (
          <GridView
            series={series}
            checks={checks}
            filter={filter}
            lineFilter={lineFilter}
            onItemClick={setDetailKey}
            onAddClick={() => setAddSheetOpen(true)}
          />
        )}

        {activeTab === 'stats' && (
          <Stats series={series} checks={checks} />
        )}
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} />

      {(activeTab === 'list' || activeTab === 'grid') && (
        <button
          className="fab"
          type="button"
          aria-label="Adicionar peça"
          onClick={() => setAddSheetOpen(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      )}

      <Editor
        open={activeTab === 'manage'}
        series={series}
        checks={checks}
        currentIndex={currentSerieIndex}
        onIndexChange={setCurrentSerieIndex}
        onClose={() => setActiveTab('list')}
        onAddSerie={handleAddSerie}
        onDeleteSerie={handleDeleteSerie}
        onAddItem={addItem}
        onUpdateItem={updateItem}
        onRemoveItem={removeItem}
        onImport={importData}
        toast={toast}
      />

      <ItemDetail
        open={!!detailKey}
        itemKey={detailKey}
        item={detail.item}
        serieNome={detail.serieNome}
        series={series}
        ownership={detailKey ? checks[detailKey] : undefined}
        onClose={() => setDetailKey(null)}
        onChange={setOwnership}
        onItemMetaChange={updateItemMetaByKey}
        onDelete={removeItemByKey}
        onMove={(key, target) => { moveItemToSerie(key, target); setDetailKey(null) }}
      />

      <Modal
        open={modalOpen}
        feed={modalFeed}
        index={modalIndex}
        onClose={closeModal}
        onNext={next}
        onPrev={prev}
      />

      <Toast message={toastMsg} />

      <AddItemSheet
        open={addSheetOpen}
        onClose={() => setAddSheetOpen(false)}
        onAdd={addItemQuick}
      />
    </>
  )
}
