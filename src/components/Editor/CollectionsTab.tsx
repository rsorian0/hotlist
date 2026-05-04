import { useState } from 'react'
import type { Serie } from '../../types'
import { smartSortItems } from '../../utils/sort'

type Props = {
  series: Serie[]
  currentIndex: number
  onIndexChange: (i: number) => void
  onAddSerie: (nome: string) => number
  onDeleteSerie: (i: number) => void
  onMoveItem: (key: string, targetSerie: string) => void
  toast: (msg: string) => void
}

export default function CollectionsTab({
  series, currentIndex, onIndexChange, onAddSerie, onDeleteSerie, onMoveItem, toast,
}: Props) {
  const [newNome, setNewNome] = useState('')
  const [selectedKey, setSelectedKey] = useState('')
  const [targetSerie, setTargetSerie] = useState('')
  const [newTargetNome, setNewTargetNome] = useState('')

  const handleAddSerie = () => {
    const nome = newNome.trim()
    if (!nome) { alert('Dê um nome à coleção.'); return }
    if (series.find((s) => s.nome === nome)) { alert('Já existe uma coleção com esse nome.'); return }
    onAddSerie(nome)
    setNewNome('')
    toast('Coleção criada')
  }

  const handleDeleteSerie = () => {
    if (currentIndex < 0 || !series[currentIndex]) { alert('Escolha a coleção para excluir.'); return }
    const nome = series[currentIndex].nome
    if (!confirm(`Excluir a coleção "${nome}"?`)) return
    onDeleteSerie(currentIndex)
    toast('Coleção excluída')
  }

  const handleMove = () => {
    if (!selectedKey) { alert('Escolha uma mini.'); return }
    const destino = newTargetNome.trim() || targetSerie
    if (!destino) { alert('Escolha ou crie uma coleção de destino.'); return }
    onMoveItem(selectedKey, destino)
    setSelectedKey('')
    setTargetSerie('')
    setNewTargetNome('')
    toast('Mini vinculada à coleção')
  }

  // All items across all series, flattened
  const allItems = series.flatMap((s) =>
    smartSortItems(s.items).map((it) => ({
      key: `${s.nome}__${it.n || ''}`,
      label: `${it.modelo || '—'}${it.n ? ` · ${it.n}` : ''} (${s.nome})`,
      currentSerie: s.nome,
    }))
  )

  const serieNames = series.map((s) => s.nome)

  return (
    <div className="pane active" id="tab-colecoes">
      <div className="group">
        <h4>Coleções</h4>
        <div className="stack">
          <label>Nova coleção</label>
          <input
            placeholder="ex.: HW Art Cars"
            value={newNome}
            onChange={(e) => setNewNome(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSerie()}
          />
          <button className="btn" type="button" onClick={handleAddSerie}>Criar coleção</button>
        </div>

        {series.length > 0 && (
          <div className="stack" style={{ marginTop: 12 }}>
            <label>Excluir coleção</label>
            <select
              value={currentIndex >= 0 ? currentIndex : ''}
              onChange={(e) => onIndexChange(Number(e.target.value))}
            >
              <option value="">— selecione —</option>
              {series.map((s, i) => (
                <option key={s.nome} value={i}>{s.nome}</option>
              ))}
            </select>
            <button className="btn ghost danger" type="button" onClick={handleDeleteSerie}>
              Excluir coleção selecionada
            </button>
          </div>
        )}
      </div>

      <div className="group">
        <h4>Vincular mini a uma coleção</h4>
        <div className="stack">
          <label>Mini cadastrada <span className="tiny">(opcional)</span></label>
          <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
            <option value="">— todas as minis —</option>
            {allItems.map((it) => (
              <option key={it.key} value={it.key}>{it.label}</option>
            ))}
          </select>

          <label style={{ marginTop: 8 }}>Coleção destino</label>
          <select
            value={targetSerie}
            onChange={(e) => { setTargetSerie(e.target.value); setNewTargetNome('') }}
          >
            <option value="">— selecione existente —</option>
            {serieNames.map((nome) => (
              <option key={nome} value={nome}>{nome}</option>
            ))}
          </select>

          <label style={{ marginTop: 8 }}>Ou criar nova coleção</label>
          <input
            placeholder="Nome da nova coleção"
            value={newTargetNome}
            onChange={(e) => { setNewTargetNome(e.target.value); setTargetSerie('') }}
          />

          <button className="btn" type="button" onClick={handleMove} style={{ marginTop: 4 }}>
            Vincular
          </button>
        </div>
      </div>
    </div>
  )
}
