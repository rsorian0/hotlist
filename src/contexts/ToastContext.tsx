import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'
import Toast from '../components/Toast'

export type ToastVariant = 'default' | 'success' | 'error'

type ToastItem = { id: number; message: string; variant: ToastVariant }
export type ToastFn = (msg: string, variant?: ToastVariant) => void

const Ctx = createContext<ToastFn>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const counter = useRef(0)

  const toast = useCallback<ToastFn>((msg, variant = 'default') => {
    const id = ++counter.current
    setItems((prev) => [...prev.slice(-2), { id, message: msg, variant }])
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 2400)
  }, [])

  return (
    <Ctx.Provider value={toast}>
      {children}
      <div
        className="fixed z-[100] left-1/2 -translate-x-1/2 flex flex-col-reverse items-center gap-2 pointer-events-none"
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        {items.map((item) => (
          <Toast key={item.id} message={item.message} variant={item.variant} />
        ))}
      </div>
    </Ctx.Provider>
  )
}

export const useToast = () => useContext(Ctx)
