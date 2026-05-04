import type { SerieItem, ModalFeedItem, Ownership } from '../types'
import { effectiveLine, lineMeta } from '../utils/line'
import { useEffect, useRef } from 'react'

type Props = {
  item: SerieItem
  serieNome: string
  ownership?: Ownership
  galleryIndex: number
  onOpenModal: (index: number, feed: ModalFeedItem[]) => void
  onItemClick: () => void
  feed: ModalFeedItem[]
}

export default function ItemRow({
  item, ownership, galleryIndex, onOpenModal, onItemClick, feed,
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img || !item.img) return
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries, obs) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              img.src = img.dataset.src || ''
              delete img.dataset.src
              obs.unobserve(img)
            }
          }
        },
        { rootMargin: '200px' },
      )
      io.observe(img)
      return () => io.unobserve(img)
    } else {
      img.src = item.img || ''
    }
  }, [item.img])

  const qty = ownership?.qty && ownership.qty > 1 ? ownership.qty : null
  const line = effectiveLine(item)
  const meta = lineMeta(line)
  const accent = meta?.color || 'transparent'
  const showBadge = !!meta && line !== 'mainline'

  return (
    <div
      className="row"
      style={{ '--accent-col': accent } as React.CSSProperties}
      onClick={onItemClick}
    >
      <div className="thumb-wrap" onClick={(e) => { e.stopPropagation(); onOpenModal(galleryIndex, feed) }}>
        <img
          ref={imgRef}
          className="thumb"
          alt={item.modelo || ''}
          data-src={item.img || ''}
          loading="lazy"
        />
        {showBadge && (
          <div className="line-badge" style={{ background: meta!.badgeBg || meta!.color }}>
            {meta!.short}
          </div>
        )}
      </div>

      <div className="row-body">
        <div className="muted">{item.n || ''}</div>
        <div className="title">
          {item.modelo || ''}
          {qty && <span className="qty-pill">x{qty}</span>}
        </div>
      </div>
    </div>
  )
}
