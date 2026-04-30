type Props = {
  filtered: boolean
  onAddClick: () => void
}

export default function EmptyState({ filtered, onAddClick }: Props) {
  if (filtered) {
    return (
      <section id="list">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p className="empty-title">Nenhum resultado</p>
          <p className="empty-sub">Tente buscar por outro modelo ou série.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="list">
      <div className="empty-state">
        <div className="empty-icon">🚗</div>
        <p className="empty-title">Sua coleção está vazia</p>
        <p className="empty-sub">Adicione sua primeira série para começar a marcar seus Hot Wheels.</p>
        <button className="btn" type="button" onClick={onAddClick}>
          Adicionar série
        </button>
      </div>
    </section>
  )
}
