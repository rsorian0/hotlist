import type { ModalFeedItem } from '../types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      id="modal"
      onClick={(e) => { if ((e.target as HTMLElement).id === 'modal') onClose() }}
    >
      <div className="relative flex items-center justify-center w-full max-w-2xl px-4">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          title="Anterior"
          className="absolute left-0 text-white hover:text-white hover:bg-white/20 z-10"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <img
          alt={cur?.alt || ''}
          src={cur?.img || ''}
          className="max-h-[80dvh] max-w-full object-contain rounded-lg"
        />

        <Button
          variant="ghost"
          size="icon"
          type="button"
          title="Próxima"
          className="absolute right-0 text-white hover:text-white hover:bg-white/20 z-10"
          onClick={(e) => { e.stopPropagation(); onNext() }}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
