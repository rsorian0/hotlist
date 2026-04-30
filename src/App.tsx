import { useState, useMemo } from 'react'
import { useAuth } from './hooks/useAuth'
import { useHotlist } from './hooks/useHotlist'
import { useModal } from './hooks/useModal'
import { useToast } from './hooks/useToast'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import { shareChecklist } from './utils/share'
import Header from './components/Header'
import Footer from './components/Footer'
import SeriesList from './components/SeriesList'
import Modal from './components/Modal'
import Toast from './components/Toast'
import Editor from './components/Editor/Editor'
import ItemDetail from './components/ItemDetail'
import type { ModalFeedItem, ViewFilter } from './types'

export default function App() {
  const { user, signIn, signOut } = useAuth()
  const {
    series, checks, addSerie, deleteSerie, addItem, updateItem, removeItem,
    toggleCheck, setOwnership, importData,
  } = useHotlist(user)
  const { open: modalOpen, index: modalIndex, feed: modalFeed, openModal, closeModal, next, prev } = useModal()
  const { message: toastMsg, toast } = useToast()
  const { canInstall, install } = useInstallPrompt()

  const [filter, setFilter] = useState('')
  const [view, setView] = useState<ViewFilter>('all')
  const [editorOpen, setEditorOpen] = useState(false)
  const [currentSerieIndex, setCurrentSerieIndex] = useState<number>(() => (series.length > 0 ? 0 : -1))
  const [detailKey, setDetailKey] = useState<string | null>(null)

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
        onAddClick={() => setEditorOpen(true)}
        user={user}
        onSignIn={signIn}
        onSignOut={signOut}
        canInstall={canInstall}
        onInstall={install}
      />

      <SeriesList
        series={series}
        checks={checks}
        filter={filter}
        view={view}
        onToggle={toggleCheck}
        onOpenModal={handleOpenModal}
        onAddClick={() => setEditorOpen(true)}
        onItemClick={setDetailKey}
      />

      <div className="spacer" />

      <Footer series={series} checks={checks} filter={filter} onShare={handleShare} />

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
      />
    </>
  )
}
