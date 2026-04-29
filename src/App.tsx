import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useHotlist } from './hooks/useHotlist'
import { useModal } from './hooks/useModal'
import { useToast } from './hooks/useToast'
import { shareChecklist } from './utils/share'
import Header from './components/Header'
import Footer from './components/Footer'
import SeriesList from './components/SeriesList'
import Modal from './components/Modal'
import Toast from './components/Toast'
import Editor from './components/Editor/Editor'
import type { ModalFeedItem } from './types'

export default function App() {
  const { user, signIn, signOut } = useAuth()
  const { series, checks, addSerie, deleteSerie, addItem, updateItem, removeItem, toggleCheck, importData } =
    useHotlist(user)
  const { open: modalOpen, index: modalIndex, feed: modalFeed, openModal, closeModal, next, prev } = useModal()
  const { message: toastMsg, toast } = useToast()

  const [filter, setFilter] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [currentSerieIndex, setCurrentSerieIndex] = useState<number>(() => (series.length > 0 ? 0 : -1))

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
        onAddClick={() => setEditorOpen(true)}
        user={user}
        onSignIn={signIn}
        onSignOut={signOut}
      />

      <SeriesList
        series={series}
        checks={checks}
        filter={filter}
        onToggle={toggleCheck}
        onOpenModal={handleOpenModal}
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
    </>
  )
}
