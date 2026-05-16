import { useEffect, useRef } from 'react'
import { useBarcodeScanner } from '../hooks/useBarcodeScanner'

type Props = {
  open: boolean
  onResult: (code: string) => void
  onClose: () => void
}

export default function BarcodeScannerModal({ open, onResult, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleResult = (code: string) => {
    onResult(code)
    onClose()
  }

  const { state, error, start, stop } = useBarcodeScanner(handleResult)

  useEffect(() => {
    if (open && videoRef.current) {
      start(videoRef.current)
    }
    return () => {
      if (open) stop()
    }
  }, [open])  // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    stop()
    onClose()
  }

  if (!open) return null

  return (
    <div className="scanner-overlay">
      <div className="scanner-hd">
        <span className="scanner-title">Escanear código de barras</span>
        <button className="icon-btn scanner-close" type="button" onClick={handleClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="scanner-viewport">
        <video ref={videoRef} className="scanner-video" autoPlay muted playsInline />

        {state === 'scanning' && (
          <>
            <div className="scanner-frame">
              <span className="scanner-corner tl" />
              <span className="scanner-corner tr" />
              <span className="scanner-corner bl" />
              <span className="scanner-corner br" />
            </div>
            <div className="scanner-line" />
          </>
        )}

        {state === 'starting' && (
          <div className="scanner-msg">
            <div className="scanner-spinner" />
            <span>Iniciando câmera…</span>
          </div>
        )}

        {state === 'error' && (
          <div className="scanner-msg scanner-msg-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>

      <p className="scanner-hint">
        Aponte para o código de barras na cartela
      </p>
    </div>
  )
}
