import { useEffect, useRef } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from './ui/button'

type Props = {
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  destructive = false,
  onConfirm,
  onCancel,
}: Props) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    confirmRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 animate-in fade-in duration-150"
        onClick={onCancel}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-sm bg-white dark:bg-neutral-900 rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
        {destructive && (
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400" />
            </div>
          </div>
        )}

        {title && (
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 text-center mb-1.5">
            {title}
          </h3>
        )}

        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center leading-relaxed">
          {message}
        </p>

        <div className="flex gap-2 mt-5">
          <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            ref={confirmRef}
            type="button"
            variant={destructive ? 'destructive' : 'default'}
            className="flex-1"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
