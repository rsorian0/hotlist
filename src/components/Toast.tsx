type Props = { message: string | null }

export default function Toast({ message }: Props) {
  if (!message) return null

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-xl shadow-lg pointer-events-none"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom)' }}
    >
      {message}
    </div>
  )
}
