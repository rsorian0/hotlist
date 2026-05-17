import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'

export type ConfirmOptions = {
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
}

export type ConfirmFn = (opts: ConfirmOptions | string) => Promise<boolean>

const Ctx = createContext<ConfirmFn>(async () => false)

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ opts: ConfirmOptions; resolve: (v: boolean) => void } | null>(null)

  const confirm = useCallback<ConfirmFn>((opts) => {
    const options = typeof opts === 'string' ? { message: opts } : opts
    return new Promise((resolve) => setState({ opts: options, resolve }))
  }, [])

  const handle = (value: boolean) => {
    state?.resolve(value)
    setState(null)
  }

  return (
    <Ctx.Provider value={confirm}>
      {children}
      {state && (
        <ConfirmDialog
          {...state.opts}
          onConfirm={() => handle(true)}
          onCancel={() => handle(false)}
        />
      )}
    </Ctx.Provider>
  )
}

export const useConfirm = () => useContext(Ctx)
