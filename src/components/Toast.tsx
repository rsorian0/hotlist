import type { ToastVariant } from '../contexts/ToastContext'

type Props = { message: string; variant?: ToastVariant }

export default function Toast({ message, variant = 'default' }: Props) {
  const bgMap: Record<ToastVariant, string> = {
    default: 'var(--surface-2)',
    success: 'var(--accent)',
    error:   'var(--destructive)',
  }
  const colorMap: Record<ToastVariant, string> = {
    default: 'var(--text)',
    success: 'var(--accent-fg)',
    error:   '#fff',
  }
  const borderMap: Record<ToastVariant, string> = {
    default: 'var(--border-2)',
    success: 'var(--accent)',
    error:   'var(--destructive)',
  }
  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--s2)',
        background: bgMap[variant],
        border: `1px solid ${borderMap[variant]}`,
        borderRadius: 'var(--r-full)', padding: '8px 16px',
        fontSize: 13, fontWeight: 'var(--fw-semibold)', color: colorMap[variant],
        boxShadow: 'var(--shadow-sheet)', whiteSpace: 'nowrap',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {message}
    </div>
  )
}
