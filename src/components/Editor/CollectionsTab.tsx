import { useState } from 'react'
import type { Serie } from '../../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
    <div className="space-y-6">
      {/* Nova coleção */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Coleções</h4>
        <div className="space-y-2">
          <label className="text-sm text-zinc-700">Nova coleção</label>
          <Input
            placeholder="ex.: HW Art Cars"
            value={newNome}
            onChange={(e) => setNewNome(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSerie()}
          />
          <Button type="button" className="w-full" onClick={handleAddSerie}>
            Criar coleção
          </Button>
        </div>
      </div>

      {/* Excluir coleção */}
      {series.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm text-zinc-700">Excluir coleção</label>
          <select
            className="w-full h-9 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400"
            value={currentIndex >= 0 ? currentIndex : ''}
            onChange={(e) => onIndexChange(Number(e.target.value))}
          >
            <option value="">— selecione —</option>
            {series.map((s, i) => (
              <option key={s.nome} value={i}>{s.nome}</option>
            ))}
          </select>
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={handleDeleteSerie}
          >
            Excluir coleção selecionada
          </Button>
        </div>
      )}
    </div>
  )
}
