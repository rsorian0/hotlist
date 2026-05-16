import { useState, useMemo } from 'react'
import { useAuth } from './hooks/useAuth'
import { useHotlist } from './hooks/useHotlist'
import { useModal } from './hooks/useModal'
import { useToast } from './hooks/useToast'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import { useTheme } from './hooks/useTheme'
import { effectiveLine } from './utils/line'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import SeriesList from './components/SeriesList'
import GridView from './components/GridView'
import Stats from './components/Stats'
import Modal from './components/Modal'
import Toast from './components/Toast'
import Editor from './components/Editor/Editor'
import ItemDetail from './components/ItemDetail'
import AddItemSheet from './components/AddItemSheet'
import LoginScreen from './components/LoginScreen'
import type { Line } from './types'
import { Plus } from 'lucide-react'

type ActiveTab = 'list' | 'grid' | 'stats' | 'manage'

export default function App() {
  const { user, loading, signIn, signOut } = useAuth()
  const {
    series, checks, addSerie, addItemQuick, deleteSerie,
    updateItemMetaByKey, removeItemByKey, moveItemToSerie, setOwnership, importData,
  } = useHotlist(user)
  const { open: modalOpen, index: modalIndex, feed: modalFeed, openModal, closeModal, next, prev } = useModal()
  const { message: toastMsg, toast } = useToast()
  const { canInstall, install } = useInstallPrompt()
  const { theme, toggle: toggleTheme } = useTheme()

  const [filter, setFilter] = useState('')
  const [activeTab, setActiveTab] = useState<ActiveTab>('list')
  const [addSheetOpen, setAddSheetOpen] = useState(false)
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

  const handleAddSerie = (nome: string): number => {
    const idx = addSerie(nome)
    setCurrentSerieIndex(idx)
    return idx
  }

  const handleDeleteSerie = (i: number) => {
    deleteSerie(i)
    setCurrentSerieIndex((prev) => (series.length > 1 ? Math.max(0, prev - 1) : -1))
  }

  const showFab = activeTab === 'list' || activeTab === 'grid'

  if (loading) return null
  if (!user) return <LoginScreen onSignIn={signIn} />

  return (
    <div className="flex min-h-dvh bg-zinc-50 dark:bg-neutral-950 overflow-x-hidden">
      <Sidebar
        active={activeTab}
        onChange={setActiveTab}
        user={user}
        onSignIn={signIn}
        onSignOut={signOut}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <Header
          filter={filter}
          onFilterChange={setFilter}
          user={user}
          onSignOut={signOut}
          canInstall={canInstall}
          onInstall={install}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="flex-1 pb-20 md:pb-6">
          {activeTab === 'list' && (
            <SeriesList
              series={series}
              checks={checks}
              filter={filter}
              lineFilter={null}
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
              lineFilter={null}
              onItemClick={setDetailKey}
              onAddClick={() => setAddSheetOpen(true)}
            />
          )}

          {activeTab === 'stats' && (
            <Stats series={series} checks={checks} />
          )}
        </main>

        <BottomNav active={activeTab} onChange={setActiveTab} />

        {showFab && (
          <button
            type="button"
            aria-label="Adicionar peça"
            onClick={() => setAddSheetOpen(true)}
            className="fixed right-4 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 text-white shadow-md hover:bg-zinc-700 active:scale-95 transition-all md:w-14 md:h-14"
            style={{ bottom: 'calc(3.75rem + env(safe-area-inset-bottom) + 0.75rem)' }}
          >
            <Plus size={24} />
          </button>
        )}
      </div>

      <Editor
        open={activeTab === 'manage'}
        series={series}
        checks={checks}
        currentIndex={currentSerieIndex}
        onIndexChange={setCurrentSerieIndex}
        onClose={() => setActiveTab('list')}
        onAddSerie={handleAddSerie}
        onDeleteSerie={handleDeleteSerie}
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
    </div>
  )
}
