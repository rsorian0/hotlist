import { useState, useMemo } from 'react'
import { useAuth } from './hooks/useAuth'
import { useHotlist } from './hooks/useHotlist'
import { useModal } from './hooks/useModal'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import { useTheme } from './hooks/useTheme'
import type { Serie } from './types'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import Modal from './components/Modal'
import Editor from './components/Editor/Editor'
import ItemDetail from './components/ItemDetail'
import AddItemSheet from './components/AddItemSheet'
import LoginScreen from './components/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import CollectionScreen from './screens/CollectionScreen'
import CollectionDetailScreen from './screens/CollectionDetailScreen'
import ListScreen from './screens/ListScreen'
import StatsScreen from './screens/StatsScreen'
import ExploreScreen from './screens/ExploreScreen'
import { Plus } from 'lucide-react'

type ActiveTab = 'home' | 'collection' | 'list' | 'explore' | 'stats'

export default function App() {
  const { user, loading, signIn, signOut } = useAuth()
  const {
    series, checks, syncing, addSerie, addItemQuick, deleteSerie,
    updateItemMetaByKey, removeItemByKey, moveItemToSerie, setOwnership, importData,
  } = useHotlist(user)
  const { open: modalOpen, index: modalIndex, feed: modalFeed, openModal, closeModal, next, prev } = useModal()
  const { canInstall, install } = useInstallPrompt()
  const { theme, toggle: toggleTheme } = useTheme()

  const [filter, setFilter] = useState('')
  const [activeTab, setActiveTab] = useState<ActiveTab>('home')
  const [editorOpen, setEditorOpen] = useState(false)
  const [addSheetOpen, setAddSheetOpen] = useState(false)
  const [currentSerieIndex, setCurrentSerieIndex] = useState<number>(() => (series.length > 0 ? 0 : -1))
  const [detailKey, setDetailKey] = useState<string | null>(null)
  const [selectedSerie, setSelectedSerie] = useState<Serie | null>(null)

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

  const handleToggle = (key: string, owned: boolean) => {
    setOwnership(key, { owned })
  }

  const handleSerieClick = (serie: Serie) => {
    setSelectedSerie(serie)
  }

  const handleLineFilter = (line: string) => {
    setFilter(line)
    setActiveTab('list')
  }

  const showFab = !selectedSerie && (activeTab === 'list' || activeTab === 'collection')

  if (loading) return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: 'var(--bg)' }}>
      <img src="/logo-black.svg" alt="Hotlist" style={{ height: 28, width: 'auto' }} className="dark:invert" />
      <div className="w-5 h-5 rounded-full border-2 border-neutral-200 dark:border-neutral-700 border-t-neutral-900 dark:border-t-neutral-100 animate-spin" />
    </div>
  )
  if (!user) return <LoginScreen onSignIn={signIn} />

  return (
    <div className="flex min-h-dvh overflow-x-hidden" style={{ background: 'var(--bg)' }}>
      <Sidebar
        active={activeTab}
        onChange={(tab) => { setActiveTab(tab); setSelectedSerie(null) }}
        user={user}
        onSignIn={signIn}
        onSignOut={signOut}
        onManage={() => setEditorOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
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

        <main className="flex-1 pb-[calc(3.75rem+env(safe-area-inset-bottom)+1.5rem)] md:pb-6" style={{ flex: 1 }}>

          {/* CollectionDetail sobrepõe o conteúdo da tab collection */}
          {selectedSerie && (
            <CollectionDetailScreen
              serie={selectedSerie}
              checks={checks}
              onItemClick={setDetailKey}
              onToggle={handleToggle}
              onBack={() => setSelectedSerie(null)}
            />
          )}

          {!selectedSerie && activeTab === 'home' && (
            <HomeScreen
              user={user}
              series={series}
              checks={checks}
              onAddClick={() => setAddSheetOpen(true)}
              onItemClick={setDetailKey}
              onToggle={(key, owned) => setOwnership(key, { owned })}
              onSerieClick={(nome) => {
                const s = series.find((s) => s.nome === nome)
                if (s) setSelectedSerie(s)
              }}
            />
          )}

          {!selectedSerie && activeTab === 'collection' && (
            <CollectionScreen
              series={series}
              checks={checks}
              onSerieClick={handleSerieClick}
            />
          )}

          {!selectedSerie && activeTab === 'list' && (
            <ListScreen
              series={series}
              checks={checks}
              filter={filter}
              setFilter={setFilter}
              syncing={syncing}
              onItemClick={setDetailKey}
              onToggle={handleToggle}
              onAddClick={() => setAddSheetOpen(true)}
              onOpenModal={openModal}
            />
          )}

          {!selectedSerie && activeTab === 'explore' && (
            <ExploreScreen
              series={series}
              checks={checks}
              onLineFilter={handleLineFilter}
              onItemClick={setDetailKey}
            />
          )}

{!selectedSerie && activeTab === 'stats' && (
            <StatsScreen series={series} checks={checks} />
          )}
        </main>

        <BottomNav active={activeTab} onChange={(tab) => { setActiveTab(tab); setSelectedSerie(null) }} />

        {showFab && (
          <button
            type="button"
            aria-label="Adicionar peça"
            onClick={() => setAddSheetOpen(true)}
            className="fixed right-4 z-30 flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all md:w-14 md:h-14 md:bottom-6 bottom-[calc(3.75rem+env(safe-area-inset-bottom)+0.75rem)]"
            style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}
          >
            <Plus size={24} />
          </button>
        )}
      </div>

      <Editor
        open={editorOpen}
        series={series}
        checks={checks}
        currentIndex={currentSerieIndex}
        onIndexChange={setCurrentSerieIndex}
        onClose={() => setEditorOpen(false)}
        onAddSerie={handleAddSerie}
        onDeleteSerie={handleDeleteSerie}
        onImport={importData}
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
        onDelete={(key) => { removeItemByKey(key); setDetailKey(null) }}
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

      <AddItemSheet
        open={addSheetOpen}
        onClose={() => setAddSheetOpen(false)}
        onAdd={addItemQuick}
      />
    </div>
  )
}
