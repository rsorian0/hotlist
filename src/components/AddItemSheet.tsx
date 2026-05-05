import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import type { SerieItem, Line, Ownership } from '../types'
import { LINES, lineMeta } from '../utils/line'
import { isUrl } from '../utils/url'
import { searchCatalog, getCatalogEntry, type CatalogEntry } from '../lib/catalog'

const BarcodeScannerModal = lazy(() => import('./BarcodeScannerModal'))

type Props = {
  open: boolean
  onClose: () => void
  onAdd: (serieNome: string, item: SerieItem, ownership?: Partial<Ownership>) => void
}

const ALL_LINES: Line[] = ['mainline', 'th', 'sth', 'silver-series', 'premium', 'rlc', 'other']
const DEFAULT_SERIE = 'Geral'

export default function AddItemSheet({ open, onClose, onAdd }: Props) {
  const [line, setLine] = useState<Line | ''>('')
  const [modelo, setModelo] = useState('')
  const [ref, setRef] = useState('')
  const [barcode, setBarcode] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const [paidPrice, setPaidPrice] = useState('')
  const [scannerOpen, setScannerOpen] = useState(false)

  const [suggestions, setSuggestions] = useState<CatalogEntry[]>([])
  const [catalogHint, setCatalogHint] = useState<CatalogEntry | null>(null)

  const modeloRef = useRef<HTMLInputElement>(null)
  const searchTimer = useRef<number | null>(null)

  useEffect(() => {
    if (!open) { setSuggestions([]); setCatalogHint(null) }
  }, [open])

  const reset = () => {
    setLine(''); setModelo(''); setRef(''); setBarcode('')
    setExpanded(false); setImgUrl(''); setPaidPrice('')
    setSuggestions([]); setCatalogHint(null)
  }

  const applyEntry = (entry: CatalogEntry) => {
    setModelo(entry.modelo)
    setRef(entry.n)
    if (entry.line) setLine(entry.line)
    if (entry.img)  setImgUrl(entry.img)
    setSuggestions([])
    setCatalogHint(null)
  }

  const handleModeloChange = (val: string) => {
    setModelo(val)
    setCatalogHint(null)
    if (searchTimer.current) clearTimeout(searchTimer.current)
    if (val.length < 2) { setSuggestions([]); return }
    searchTimer.current = window.setTimeout(async () => {
      const results = await searchCatalog(val).catch(() => [])
      setSuggestions(results)
    }, 300)
  }

  const handleRefBlur = async () => {
    const n = ref.trim()
    if (!n || modelo) return
    const entry = await getCatalogEntry(n).catch(() => null)
    if (entry) setCatalogHint(entry)
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
    const ownership: Partial<Ownership> = {
      owned: true,
      paidPrice: Number.isFinite(num) ? num : undefined,
    }

    onAdd(DEFAULT_SERIE, item, ownership)
    reset()
    onClose()
  }

  if (!open) return null

  const displayLines = LINES.filter((l) => ALL_LINES.includes(l.value as Line))

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
              {displayLines.map((l) => (
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
            </div>
          </div>

          {/* Modelo + autocomplete */}
          <div className="sheet-section" style={{ position: 'relative' }}>
            <label className="sheet-field">
              <span className="sheet-label">Modelo *</span>
              <input
                ref={modeloRef}
                placeholder="ex.: DMC DeLorean"
                value={modelo}
                onChange={(e) => handleModeloChange(e.target.value)}
                onBlur={() => setTimeout(() => setSuggestions([]), 150)}
                autoComplete="off"
              />
            </label>
            {suggestions.length > 0 && (
              <ul className="catalog-suggestions">
                {suggestions.map((s) => {
                  const m = s.line ? lineMeta(s.line) : null
                  return (
                    <li key={s.n} className="catalog-suggestion" onMouseDown={() => applyEntry(s)}>
                      {s.img && <img src={s.img} alt="" className="catalog-suggestion-img" />}
                      <div className="catalog-suggestion-info">
                        <span className="catalog-suggestion-name">{s.modelo}</span>
                        <span className="catalog-suggestion-meta">
                          {s.n}
                          {m && <span className="line-tag" style={{ background: m.badgeBg || m.color, fontSize: 9, padding: '1px 5px', marginLeft: 4 }}>{m.short}</span>}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Cód. referência + Cód. de barras */}
          <div className="sheet-row">
            <label className="sheet-field flex1">
              <span className="sheet-label">Cód. referência</span>
              <input
                placeholder="ex.: FYF84"
                value={ref}
                onChange={(e) => { setRef(e.target.value); setCatalogHint(null) }}
                onBlur={handleRefBlur}
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
                <button type="button" className="scan-btn" title="Escanear" onClick={() => setScannerOpen(true)}>
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

          {/* Hint do catálogo pelo cód. referência */}
          {catalogHint && (
            <div className="catalog-hint">
              {catalogHint.img && <img src={catalogHint.img} alt="" className="catalog-hint-img" />}
              <div className="catalog-hint-text">
                <span className="catalog-hint-name">{catalogHint.modelo}</span>
                <span className="catalog-hint-sub">Encontrado no catálogo</span>
              </div>
              <button type="button" className="btn" style={{ fontSize: 13, padding: '6px 12px' }} onClick={() => applyEntry(catalogHint)}>
                Usar
              </button>
              <button type="button" className="icon-btn" onClick={() => setCatalogHint(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          )}

          {/* Expandable extras */}
          <button type="button" className="sheet-expand-btn" onClick={() => setExpanded((v) => !v)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '.2s' }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
            {expanded ? 'Menos opções' : 'Preço e imagem…'}
          </button>

          {expanded && (
            <div className="sheet-extras">
              <label className="sheet-field">
                <span className="sheet-label">Preço pago (R$)</span>
                <input type="number" min={0} step="0.01" placeholder="12,90" value={paidPrice} onChange={(e) => setPaidPrice(e.target.value)} />
              </label>
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
