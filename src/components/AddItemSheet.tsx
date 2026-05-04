import { useState, useRef, lazy, Suspense } from 'react'
import type { SerieItem, Line, Ownership } from '../types'
import { LINES } from '../utils/line'
import { isUrl } from '../utils/url'

const BarcodeScannerModal = lazy(() => import('./BarcodeScannerModal'))

type Props = {
  open: boolean
  onClose: () => void
  onAdd: (serieNome: string, item: SerieItem, ownership?: Partial<Ownership>) => void
}

const QUICK_LINES: Line[] = ['mainline', 'th', 'sth', 'silver-series', 'premium-car-culture', 'premium-boulevard', 'premium-pop-culture', 'rlc']
const DEFAULT_SERIE = 'Geral'

export default function AddItemSheet({ open, onClose, onAdd }: Props) {
  const [line, setLine] = useState<Line | ''>('')
  const [modelo, setModelo] = useState('')
  const [ref, setRef] = useState('')
  const [barcode, setBarcode] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const [paidPrice, setPaidPrice] = useState('')
  const [owned, setOwned] = useState(true)
  const [scannerOpen, setScannerOpen] = useState(false)
  const modeloRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setLine(''); setModelo(''); setRef(''); setBarcode('')
    setExpanded(false); setImgUrl(''); setPaidPrice(''); setOwned(true)
  }

  const handleClose = () => { reset(); onClose() }

  const handleAdd = () => {
    if (!modelo.trim()) { alert('Informe o nome do modelo.'); return }
    if (imgUrl && !isUrl(imgUrl)) { alert('URL da imagem inválida.'); return }

    const item: SerieItem = {
      modelo: modelo.trim(),
      n: ref.trim() || undefined,
      barcode: barcode.trim() || undefined,
      img: imgUrl.trim() || undefined,
      line: line || undefined,
    }

    const num = parseFloat(paidPrice.replace(',', '.'))
    const ownership: Partial<Ownership> | undefined = owned
      ? { owned: true, paidPrice: Number.isFinite(num) ? num : undefined }
      : undefined

    onAdd(DEFAULT_SERIE, item, ownership)
    reset()
    onClose()
  }

  if (!open) return null

  const quickLines = LINES.filter((l) => QUICK_LINES.includes(l.value))

  return (
    <>
      <Suspense fallback={null}>
        <BarcodeScannerModal
          open={scannerOpen}
          onResult={(code) => { setBarcode(code); setScannerOpen(false) }}
          onClose={() => setScannerOpen(false)}
        />
      </Suspense>
      <div className="sheet-backdrop" onClick={handleClose} />
      <div className="sheet">
        <div className="sheet-handle" />
        <div className="sheet-hd">
          <h3>Adicionar peça</h3>
          <button className="icon-btn" type="button" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="sheet-body">
          {/* Categoria */}
          <div className="sheet-section">
            <label className="sheet-label">Categoria</label>
            <div className="line-chips-wrap">
              {quickLines.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  className={`line-chip${line === l.value ? ' active' : ''}`}
                  style={line === l.value ? { background: l.badgeBg || l.color, borderColor: l.color } : {}}
                  onClick={() => setLine(line === l.value ? '' : l.value)}
                >
                  {l.short}
                </button>
              ))}
              <select
                className="line-chip-more"
                value={QUICK_LINES.includes(line as Line) || line === '' ? '' : line}
                onChange={(e) => setLine(e.target.value as Line | '')}
              >
                <option value="">Mais…</option>
                {LINES.filter((l) => !QUICK_LINES.includes(l.value)).map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Modelo */}
          <div className="sheet-section">
            <label className="sheet-field">
              <span className="sheet-label">Modelo *</span>
              <input
                ref={modeloRef}
                placeholder="ex.: DMC DeLorean"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              />
            </label>
          </div>

          {/* Cód. referência + Cód. de barras */}
          <div className="sheet-row">
            <label className="sheet-field flex1">
              <span className="sheet-label">Cód. referência</span>
              <input
                placeholder="ex.: FYF84"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
              />
            </label>
            <label className="sheet-field flex1">
              <span className="sheet-label">Cód. de barras</span>
              <div className="n-input-wrap">
                <input
                  placeholder="Escaneie ou digite"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
                <button
                  type="button"
                  className="scan-btn"
                  title="Escanear código de barras"
                  onClick={() => setScannerOpen(true)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/>
                    <line x1="7" y1="12" x2="7" y2="12.01"/>
                    <line x1="10" y1="9" x2="10" y2="15"/>
                    <line x1="13" y1="7" x2="13" y2="17"/>
                    <line x1="16" y1="9" x2="16" y2="15"/>
                    <line x1="19" y1="12" x2="19" y2="12.01"/>
                  </svg>
                </button>
              </div>
            </label>
          </div>

          {/* Owned toggle */}
          <label className="sheet-toggle">
            <input type="checkbox" checked={owned} onChange={(e) => setOwned(e.target.checked)} />
            <span>Marcar como "tenho"</span>
          </label>

          {/* Expandable extras */}
          <button
            type="button"
            className="sheet-expand-btn"
            onClick={() => setExpanded((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '.2s' }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
            {expanded ? 'Menos opções' : 'Série, preço e imagem…'}
          </button>

          {expanded && (
            <div className="sheet-extras">
              {owned && (
                <label className="sheet-field">
                  <span className="sheet-label">Preço pago (R$)</span>
                  <input type="number" min={0} step="0.01" placeholder="12,90" value={paidPrice} onChange={(e) => setPaidPrice(e.target.value)} />
                </label>
              )}

              <label className="sheet-field">
                <span className="sheet-label">URL da imagem</span>
                <input placeholder="https://..." value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
              </label>
            </div>
          )}
        </div>

        <div className="sheet-footer">
          <button className="btn" type="button" onClick={handleAdd}>Adicionar</button>
        </div>
      </div>
    </>
  )
}
