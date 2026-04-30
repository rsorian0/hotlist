import type { ModalFeedItem } from '../types'

type Props = {
  open: boolean
  feed: ModalFeedItem[]
  index: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function Modal({ open, feed, index, onClose, onNext, onPrev }: Props) {
  const cur = feed[index]

  return (
    <div className={`overlay${open ? ' open' : ''}`} id="modal" onClick={(e) => { if ((e.target as HTMLElement).id === 'modal') onClose() }}>
      <div className="stage">
        <button className="nav-btn nav-left" type="button" title="Anterior" onClick={(e) => { e.stopPropagation(); onPrev() }}>◀</button>
        <img alt={cur?.alt || ''} src={cur?.img || ''} />
        <button className="nav-btn nav-right" type="button" title="Próxima" onClick={(e) => { e.stopPropagation(); onNext() }}>▶</button>
      </div>
    </div>
  )
}
