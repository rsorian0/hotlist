import { useState, useCallback, useEffect } from 'react'
import type { ModalFeedItem } from '../types'

export function useModal() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [feed, setFeed] = useState<ModalFeedItem[]>([])

  const openModal = useCallback((i: number, feedItems: ModalFeedItem[]) => {
    setFeed(feedItems)
    setIndex(Math.max(0, Math.min(i, feedItems.length - 1)))
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => setOpen(false), [])

  const next = useCallback(() => setIndex((i) => (i + 1) % feed.length), [feed.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + feed.length) % feed.length), [feed.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); closeModal() }
      else if (e.key === 'ArrowRight') { e.preventDefault(); next() }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeModal, next, prev])

  return { open, index, feed, openModal, closeModal, next, prev }
}
