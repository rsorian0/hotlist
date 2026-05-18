import type { FC } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { ToastVariant } from '../contexts/ToastContext'

type Props = { message: string; variant?: ToastVariant }

const styles: Record<ToastVariant, string> = {
  default: 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900',
  success: 'bg-green-600 dark:bg-green-700 text-white',
  error:   'bg-red-600 dark:bg-red-700 text-white',
}

const icons: Record<ToastVariant, FC<{ className?: string }> | null> = {
  default: null,
  success: CheckCircle2,
  error:   XCircle,
}

export default function Toast({ message, variant = 'default' }: Props) {
  const Icon = icons[variant]
  return (
    <div
      className={[
        'flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium',
        'animate-in slide-in-from-bottom-2 fade-in duration-200',
        styles[variant],
      ].join(' ')}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {message}
    </div>
  )
}
