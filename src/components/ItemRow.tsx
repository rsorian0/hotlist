import type { SerieItem, ModalFeedItem, Ownership } from '../types'
import { effectiveLine } from '../utils/line'
import { CAR_PLACEHOLDER } from '../utils/placeholder'
import { useEffect, useRef, useState } from 'react'
import { DsItemRow } from './ds'

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
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined)

  useEffect(() => { setImgSrc(undefined) }, [item.img])

  useEffect(() => {
    if (!item.img) return
    if ('IntersectionObserver' in window) {
      const img = document.createElement('img')
      const io = new IntersectionObserver(
        (entries, obs) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              setImgSrc(item.img)
              obs.disconnect()
            }
          }
        },
        { rootMargin: '200px' },
      )
      if (imgRef.current) io.observe(imgRef.current)
      return () => io.disconnect()
    } else {
      setImgSrc(item.img)
    }
  }, [item.img])

  const qty = ownership?.qty && ownership.qty > 1 ? ownership.qty : null
  const owned = !!ownership?.owned
  const line = effectiveLine(item)

  const itemWithImg = { ...item, img: imgSrc || (item.img ? undefined : CAR_PLACEHOLDER), line }

  return (
    <div ref={imgRef}>
      <DsItemRow
        item={itemWithImg}
        owned={owned}
        qty={qty}
        onClick={onItemClick}
        onThumbClick={() => onOpenModal(galleryIndex, feed)}
      />
    </div>
  )
}
