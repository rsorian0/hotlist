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
      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-zinc-50 active:bg-zinc-100 transition-colors border-b border-zinc-100 last:border-0"
      onClick={onItemClick}
    >
      <div
        className="relative shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-zinc-100 cursor-pointer"
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
        <div className="text-[11px] text-zinc-400">{item.n || ''}</div>
        <div className={['text-sm font-medium truncate', owned ? 'text-zinc-900' : 'text-zinc-500'].join(' ')}>
          {item.modelo || ''}
          {qty && (
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold bg-zinc-200 text-zinc-600 rounded-full">
              x{qty}
            </span>
          )}
        </div>
      </div>

      <div className={['shrink-0 w-2 h-2 rounded-full', owned ? 'bg-emerald-500' : 'bg-zinc-200'].join(' ')} />
    </div>
  )
}
