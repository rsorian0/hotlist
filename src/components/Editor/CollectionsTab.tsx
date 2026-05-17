import { useState } from 'react'
import type { Serie } from '../../types'
import { useToast } from '../../contexts/ToastContext'
import { useConfirm } from '../../contexts/ConfirmContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  series: Serie[]
  currentIndex: number
  onIndexChange: (i: number) => void
  onAddSerie: (nome: string) => number
  onDeleteSerie: (i: number) => void
}

export default function CollectionsTab({
  series, currentIndex, onIndexChange, onAddSerie, onDeleteSerie,
}: Props) {
  const [newNome, setNewNome] = useState('')
  const toast = useToast()
  const confirm = useConfirm()

  const handleAddSerie = () => {
    const nome = newNome.trim()
    if (!nome) { toast('Dê um nome à coleção.', 'error'); return }
    if (series.find((s) => s.nome === nome)) { toast('Já existe uma coleção com esse nome.', 'error'); return }
    onAddSerie(nome)
    setNewNome('')
    toast('Coleção criada', 'success')
  }

  const handleDeleteSerie = async () => {
    if (currentIndex < 0 || !series[currentIndex]) { toast('Escolha a coleção para excluir.', 'error'); return }
    const nome = series[currentIndex].nome
    const ok = await confirm({
      title: 'Excluir coleção',
      message: `Excluir "${nome}" e todos os seus itens? Esta ação não pode ser desfeita.`,
      confirmLabel: 'Excluir',
      destructive: true,
    })
    if (!ok) return
    onDeleteSerie(currentIndex)
    toast('Coleção excluída')
  }

  return (
    <div className="space-y-6">
      {/* Nova coleção */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Coleções</h4>
        <div className="space-y-2">
          <label className="text-sm text-neutral-700 dark:text-neutral-300">Nova coleção</label>
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
          <label className="text-sm text-neutral-700 dark:text-neutral-300">Excluir coleção</label>
          <select
            className="w-full h-9 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-500"
            value={currentIndex >= 0 ? currentIndex : ''}
            onChange={(e) => onIndexChange(Number(e.target.value))}
          >
            <option value="">— selecione —</option>
            {series.map((s, i) => (
              <option key={s.nome} value={i}>{s.nome}</option>
            ))}
          </select>
          <Button type="button" variant="destructive" className="w-full" onClick={handleDeleteSerie}>
            Excluir coleção selecionada
          </Button>
        </div>
      )}
    </div>
  )
}
