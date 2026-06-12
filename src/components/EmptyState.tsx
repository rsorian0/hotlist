import { DsEmptyState, DsButton } from './ds'

type Props = {
  filtered: boolean
  onAddClick: () => void
}

export default function EmptyState({ filtered, onAddClick }: Props) {
  if (filtered) {
    return (
      <DsEmptyState
        icon="SearchX"
        title="Nenhum resultado"
        subtitle="Tente outro modelo ou série."
      />
    )
  }
  return (
    <DsEmptyState
      icon="PackageOpen"
      title="Coleção vazia"
      subtitle="Nenhuma peça ainda. Adicione a primeira coleção."
      action={
        <DsButton variant="outline" size="sm" onClick={onAddClick}>
          Adicionar coleção
        </DsButton>
      }
    />
  )
}
