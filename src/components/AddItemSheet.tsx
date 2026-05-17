import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import type { SerieItem, Line, Ownership } from '../types'
import { LINES, lineMeta } from '../utils/line'
import { isUrl } from '../utils/url'
import { searchCatalog, getCatalogEntry, type CatalogEntry } from '../lib/catalog'
import { useToast } from '../contexts/ToastContext'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown, ScanLine, X } from 'lucide-react'

const BarcodeScannerModal = lazy(() => import('./BarcodeScannerModal'))

type Props = {
  open: boolean
  onClose: () => void
  onAdd: (serieNome: string, item: SerieItem, ownership?: Partial<Ownership>) => void
}

const ALL_LINES: Line[] = ['mainline', 'th', 'sth', 'silver-series', 'premium', 'rlc', 'other']
const DEFAULT_SERIE = 'Geral'

export default function AddItemSheet({ open, onClose, onAdd }: Props) {
  const toast = useToast()
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
    if (!modelo.trim()) { toast('Informe o nome do modelo.', 'error'); return }
    if (imgUrl && !isUrl(imgUrl)) { toast('URL da imagem inválida.', 'error'); return }

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
    toast('Peça adicionada', 'success')
    reset()
    onClose()
  }

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

      <Sheet open={open} onOpenChange={(v) => { if (!v) handleClose() }}>
        <SheetContent
          side="bottom"
          hideClose
          className="p-0 rounded-t-2xl max-h-[92dvh] flex flex-col bg-white dark:bg-neutral-900"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          </div>

          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between px-5 py-3 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
            <SheetTitle className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Adicionar peça</SheetTitle>
            <Button variant="ghost" size="icon" type="button" onClick={handleClose} className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
              <X className="h-4 w-4" />
            </Button>
          </SheetHeader>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

            {/* Categoria */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Categoria</span>
              <div className="flex flex-wrap gap-2">
                {displayLines.map((l) => (
                  <button
                    key={l.value}
                    type="button"
                    className={[
                      'px-3 py-1 text-xs font-semibold rounded-full border transition-colors',
                      line === l.value
                        ? 'text-white border-transparent'
                        : 'text-neutral-600 bg-neutral-100 border-neutral-200 hover:bg-neutral-200 dark:text-neutral-300 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700',
                    ].join(' ')}
                    style={line === l.value ? { background: l.badgeBg || l.color, borderColor: l.color } : {}}
                    onClick={() => setLine(line === l.value ? '' : l.value)}
                  >
                    {l.short}
                  </button>
                ))}
              </div>
            </div>

            {/* Modelo + autocomplete */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                Modelo *
              </label>
              <Input
                ref={modeloRef}
                placeholder="ex.: DMC DeLorean"
                value={modelo}
                onChange={(e) => handleModeloChange(e.target.value)}
                onBlur={() => setTimeout(() => setSuggestions([]), 150)}
                autoComplete="off"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg overflow-hidden">
                  {suggestions.map((s) => {
                    const m = s.line ? lineMeta(s.line) : null
                    return (
                      <li
                        key={s.n}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer"
                        onMouseDown={() => applyEntry(s)}
                      >
                        {s.img && (
                          <img src={s.img} alt="" className="w-8 h-8 object-contain rounded bg-neutral-100 dark:bg-neutral-700 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{s.modelo}</div>
                          <div className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
                            {s.n}
                            {m && (
                              <span
                                className="text-white rounded px-1 py-px font-bold leading-none"
                                style={{ background: m.badgeBg || m.color, fontSize: 9 }}
                              >
                                {m.short}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {/* Cód. referência + Cód. de barras */}
            <div className="flex gap-3">
              <div className="flex-1 space-y-1.5">
                <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                  Cód. referência
                </label>
                <Input
                  placeholder="ex.: FYF84"
                  value={ref}
                  onChange={(e) => { setRef(e.target.value); setCatalogHint(null) }}
                  onBlur={handleRefBlur}
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                  Cód. de barras
                </label>
                <div className="flex gap-1">
                  <Input
                    placeholder="Escaneie ou digite"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    title="Escanear"
                    onClick={() => setScannerOpen(true)}
                    className="shrink-0"
                  >
                    <ScanLine className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Hint do catálogo pelo cód. referência */}
            {catalogHint && (
              <div className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                {catalogHint.img && (
                  <img src={catalogHint.img} alt="" className="w-10 h-10 object-contain rounded bg-white dark:bg-neutral-700 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{catalogHint.modelo}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Encontrado no catálogo</div>
                </div>
                <Button type="button" size="sm" onClick={() => applyEntry(catalogHint)}>
                  Usar
                </Button>
                <Button type="button" variant="ghost" size="icon" onClick={() => setCatalogHint(null)} className="text-neutral-400 dark:text-neutral-500">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Expandable extras */}
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
              onClick={() => setExpanded((v) => !v)}
            >
              <ChevronDown
                className="h-4 w-4 transition-transform duration-200"
                style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
              />
              {expanded ? 'Menos opções' : 'Preço e imagem…'}
            </button>

            {expanded && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                    Preço pago (R$)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="12,90"
                    value={paidPrice}
                    onChange={(e) => setPaidPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                    URL da imagem
                  </label>
                  <Input
                    placeholder="https://..."
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 px-5 py-4 border-t border-neutral-100 dark:border-neutral-800">
            <Button type="button" className="w-full" onClick={handleAdd}>
              Adicionar
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
