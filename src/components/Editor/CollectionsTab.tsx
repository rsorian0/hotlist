import { useState } from 'react'
import type { Serie } from '../../types'

type Props = {
  series: Serie[]
  currentIndex: number
  onIndexChange: (i: number) => void
  onAddSerie: (nome: string) => number
  onDeleteSerie: (i: number) => void
  toast: (msg: string) => void
}

export default function CollectionsTab({
  series, currentIndex, onIndexChange, onAddSerie, onDeleteSerie, toast,
}: Props) {
  const [newNome, setNewNome] = useState('')

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
    </div>
  )
}
