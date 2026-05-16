import type { SerieItem, ModalFeedItem, Ownership } from '../types'
import { effectiveLine, lineMeta } from '../utils/line'
import { CAR_PLACEHOLDER } from '../utils/placeholder'
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
      img.src = item.img
    }
  }, [item.img])

  const qty = ownership?.qty && ownership.qty > 1 ? ownership.qty : null
  const owned = !!ownership?.owned
  const line = effectiveLine(item)
  const meta = lineMeta(line)
  const showBadge = !!meta && line !== 'mainline'

  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-700 transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-0"
      onClick={onItemClick}
    >
      <div
        className="relative shrink-0 w-12 h-12 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onOpenModal(galleryIndex, feed) }}
      >
        <img
          ref={imgRef}
          className="w-full h-full object-contain"
          alt={item.modelo || ''}
          src={item.img ? undefined : CAR_PLACEHOLDER}
          data-src={item.img || undefined}
          loading="lazy"
        />
        {showBadge && (
          <span
            className="absolute bottom-0.5 left-0.5 px-1 py-px text-[9px] font-bold text-white rounded leading-none"
            style={{ background: meta!.badgeBg || meta!.color }}
          >
            {meta!.short}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-none mb-0.5">{item.n || ''}</div>
        <div className={['text-[13px] font-medium truncate leading-tight', owned ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'].join(' ')}>
          {item.modelo || ''}
          {qty && (
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-full">
              x{qty}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
