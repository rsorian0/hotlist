import { useState, useMemo } from 'react'
import { useAuth } from './hooks/useAuth'
import { useHotlist } from './hooks/useHotlist'
import { useModal } from './hooks/useModal'
import { useToast } from './hooks/useToast'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import { shareChecklist } from './utils/share'
import { effectiveLine } from './utils/line'
import Header from './components/Header'
import Footer from './components/Footer'
import SeriesList from './components/SeriesList'
import GridView from './components/GridView'
import Modal from './components/Modal'
import Toast from './components/Toast'
import Editor from './components/Editor/Editor'
import ItemDetail from './components/ItemDetail'
import Stats from './components/Stats'
import AddItemSheet from './components/AddItemSheet'
import type { ModalFeedItem, ViewFilter, Line } from './types'

export default function App() {
  const { user, signIn, signOut } = useAuth()
  const {
    series, checks, addSerie, addItemQuick, deleteSerie, addItem, updateItem,
    updateItemMetaByKey, removeItem, toggleCheck, setOwnership, importData,
  } = useHotlist(user)
  const { open: modalOpen, index: modalIndex, feed: modalFeed, openModal, closeModal, next, prev } = useModal()
  const { message: toastMsg, toast } = useToast()
  const { canInstall, install } = useInstallPrompt()

  const [filter, setFilter] = useState('')
  const [view, setView] = useState<ViewFilter>('all')
  const [lineFilter, setLineFilter] = useState<Line | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [editorOpen, setEditorOpen] = useState(false)
  const [statsOpen, setStatsOpen] = useState(false)
  const [addSheetOpen, setAddSheetOpen] = useState(false)
  const [currentSerieIndex, setCurrentSerieIndex] = useState<number>(() => (series.length > 0 ? 0 : -1))
  const [detailKey, setDetailKey] = useState<string | null>(null)

  // Lines that actually appear in the collection
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

  const handleOpenModal = (index: number, feed: ModalFeedItem[]) => openModal(index, feed)

  const handleShare = () => {
    const ok = shareChecklist(series, checks, filter)
    if (!ok) toast('Nada para compartilhar (lista vazia).')
  }

  const handleAddSerie = (nome: string): number => {
    const idx = addSerie(nome)
    setCurrentSerieIndex(idx)
    return idx
  }

  const handleDeleteSerie = (i: number) => {
    deleteSerie(i)
    setCurrentSerieIndex((prev) => (series.length > 1 ? Math.max(0, prev - 1) : -1))
  }

  return (
    <>
      <Header
        filter={filter}
        onFilterChange={setFilter}
        view={view}
        onViewChange={setView}
        lineFilter={lineFilter}
        onLineFilterChange={setLineFilter}
        activeLines={activeLines}
        viewMode={viewMode}
        onViewModeToggle={() => setViewMode((m) => m === 'list' ? 'grid' : 'list')}
        onAddClick={() => setAddSheetOpen(true)}
        user={user}
        onSignIn={signIn}
        onSignOut={signOut}
        canInstall={canInstall}
        onInstall={install}
      />

      {viewMode === 'list' ? (
        <SeriesList
          series={series}
          checks={checks}
          filter={filter}
          view={view}
          lineFilter={lineFilter}
          onToggle={toggleCheck}
          onOpenModal={handleOpenModal}
          onAddClick={() => setAddSheetOpen(true)}
          onItemClick={setDetailKey}
        />
      ) : (
        <GridView
          series={series}
          checks={checks}
          filter={filter}
          view={view}
          lineFilter={lineFilter}
          onToggle={toggleCheck}
          onItemClick={setDetailKey}
          onAddClick={() => setAddSheetOpen(true)}
        />
      )}

      <div className="spacer" />

      <Footer
        series={series}
        checks={checks}
        filter={filter}
        onShare={handleShare}
        onStats={() => setStatsOpen(true)}
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

      <Editor
        open={editorOpen}
        series={series}
        checks={checks}
        currentIndex={currentSerieIndex}
        onIndexChange={setCurrentSerieIndex}
        onClose={() => setEditorOpen(false)}
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
        ownership={detailKey ? checks[detailKey] : undefined}
        onClose={() => setDetailKey(null)}
        onChange={setOwnership}
        onItemMetaChange={updateItemMetaByKey}
      />

      <Stats
        open={statsOpen}
        series={series}
        checks={checks}
        onClose={() => setStatsOpen(false)}
      />

      <AddItemSheet
        open={addSheetOpen}
        series={series}
        onClose={() => setAddSheetOpen(false)}
        onAdd={addItemQuick}
      />
    </>
  )
}
