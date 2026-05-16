import { Button } from '@/components/ui/button'

type Props = {
  filtered: boolean
  onAddClick: () => void
}

export default function EmptyState({ filtered, onAddClick }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="text-5xl">{filtered ? '🔍' : '🚗'}</span>
      <p className="text-base font-semibold text-zinc-800">
        {filtered ? 'Nenhum resultado' : 'Coleção vazia'}
      </p>
      <p className="text-sm text-zinc-400 max-w-xs">
        {filtered
          ? 'Tente outro modelo ou série.'
          : 'Nenhuma peça ainda. Adicione a primeira coleção.'}
      </p>
      {!filtered && (
        <Button variant="outline" size="sm" onClick={onAddClick} className="mt-2">
          Adicionar coleção
        </Button>
      )}
    </div>
  )
}
