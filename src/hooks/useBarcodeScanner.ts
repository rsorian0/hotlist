import { useState, useRef, useCallback } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { NotFoundException } from '@zxing/library'

export type ScannerState = 'idle' | 'starting' | 'scanning' | 'error'

export function useBarcodeScanner(onResult: (code: string) => void) {
  const [state, setState] = useState<ScannerState>('idle')
  const [error, setError] = useState<string | null>(null)
  const readerRef = useRef<BrowserMultiFormatReader | null>(null)
  const controlsRef = useRef<{ stop: () => void } | null>(null)

  const start = useCallback(async (videoEl: HTMLVideoElement) => {
    setState('starting')
    setError(null)
    try {
      const reader = new BrowserMultiFormatReader()
      readerRef.current = reader

      const devices = await BrowserMultiFormatReader.listVideoInputDevices()
      // Prefer back camera on mobile
      const back = devices.find((d) =>
        /back|rear|environment/i.test(d.label)
      )
      const deviceId = back?.deviceId || devices[0]?.deviceId

      setState('scanning')
      const controls = await reader.decodeFromVideoDevice(
        deviceId,
        videoEl,
        (result, err) => {
          if (result) {
            const code = result.getText()
            stop()
            onResult(code)
          } else if (err && !(err instanceof NotFoundException)) {
            // NotFoundException fires constantly while scanning — ignore it
          }
        },
      )
      controlsRef.current = controls
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      if (msg.includes('Permission') || msg.includes('permission') || msg.includes('NotAllowed')) {
        setError('Permissão de câmera negada. Verifique as configurações do navegador.')
      } else if (msg.includes('NotFound') || msg.includes('no camera')) {
        setError('Nenhuma câmera encontrada neste dispositivo.')
      } else {
        setError('Erro ao acessar a câmera: ' + msg)
      }
      setState('error')
    }
  }, [onResult])

  const stop = useCallback(() => {
    controlsRef.current?.stop()
    controlsRef.current = null
    readerRef.current = null
    setState('idle')
    setError(null)
  }, [])

  return { state, error, start, stop }
}
