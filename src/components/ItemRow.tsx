import type { SerieItem, ModalFeedItem, Ownership } from '../types'
import { rarityColorFromName, isTH, isSuperTH } from '../utils/rarity'
import { useEffect, useRef } from 'react'

type Props = {
  item: SerieItem
  serieNome: string
  ownership?: Ownership
  galleryIndex: number
  onToggle: () => void
  onOpenModal: (index: number, feed: ModalFeedItem[]) => void
  onItemClick: () => void
  feed: ModalFeedItem[]
}

export default function ItemRow({
  item, serieNome, ownership, galleryIndex, onToggle, onOpenModal, onItemClick, feed,
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

  const nm = (item.modelo || '').toLowerCase()
  const checkKey = `${serieNome}__${item.n || ''}`
  const checked = !!ownership?.owned
  const wishlist = !!ownership?.wishlist
  const qty = ownership?.qty && ownership.qty > 1 ? ownership.qty : null

  return (
    <div
      className="row"
      style={{ '--accent-col': rarityColorFromName(item.modelo || '') } as React.CSSProperties}
    >
      <div className="thumb-wrap" onClick={() => onOpenModal(galleryIndex, feed)} style={{ cursor: 'pointer' }}>
        <img
          ref={imgRef}
          className="thumb"
          alt={item.modelo || ''}
          data-src={item.img || ''}
          loading="lazy"
        />
        {isTH(nm) && (
          <div className={`label${isSuperTH(nm) ? ' super' : ''}`}>
            {isSuperTH(nm) ? 'SUPER TH' : 'TH'}
          </div>
        )}
      </div>

      <div className="row-body" onClick={onItemClick} style={{ cursor: 'pointer' }}>
        <div className="muted">{item.n || ''}</div>
        <div className="title">
          {item.modelo || ''}
          {qty && <span className="qty-pill">x{qty}</span>}
          {wishlist && !checked && <span className="wish-pill">Quero</span>}
        </div>
      </div>

      <div
        className={`tick${checked ? ' checked' : ''}`}
        onClick={(e) => { e.stopPropagation(); onToggle() }}
        data-key={checkKey}
      >
        <svg viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  )
}
