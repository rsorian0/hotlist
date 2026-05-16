import { lazy, Suspense, useEffect, useState } from 'react'
import type { Ownership, Packaging, SerieItem, Line, Serie } from '../types'
import { LINES, effectiveLine, lineMeta } from '../utils/line'
import { CAR_PLACEHOLDER } from '../utils/placeholder'
import { getCatalogPrice, contributeMarketPrice } from '../lib/catalog'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScanLine, Search, Trash2, X } from 'lucide-react'

const BarcodeScannerModal = lazy(() => import('./BarcodeScannerModal'))

type Props = {
  open: boolean
  itemKey: string | null
  item: SerieItem | null
  serieNome: string | null
  series: Serie[]
  ownership: Ownership | undefined
  onClose: () => void
  onChange: (key: string, partial: Partial<Ownership>) => void
  onItemMetaChange: (key: string, partial: Partial<SerieItem>) => void
  onDelete: (key: string) => void
  onMove: (key: string, targetSerie: string) => void
}

type CatalogPrice = {
  marketPrice: number
  priceMin?: number
  priceMax?: number
  priceCount?: number
  priceUpdatedAt?: string
  priceSource?: string
}

export default function ItemDetail({
  open, itemKey, item, serieNome, series, ownership, onClose, onChange, onItemMetaChange, onDelete, onMove,
}: Props) {
  const [draft, setDraft] = useState<Ownership>(ownership || { owned: false })
  const [scannerOpen, setScannerOpen] = useState(false)
  const [catalogPrice, setCatalogPrice] = useState<CatalogPrice | null>(null)

  useEffect(() => {
    setDraft(ownership || { owned: false })
    setCatalogPrice(null)
    if (item?.n) {
      getCatalogPrice(item.n).then((p) => setCatalogPrice(p)).catch(() => {})
    }
  }, [ownership, itemKey, item?.n])

  if (!open || !itemKey || !item) return null

  const update = (partial: Partial<Ownership>) => {
    const next = { ...draft, ...partial }
    setDraft(next)
    onChange(itemKey, partial)
  }

  const num = (s: string): number | undefined => {
    if (s.trim() === '') return undefined
    const n = Number(s.replace(',', '.'))
    return Number.isFinite(n) ? n : undefined
  }

  const handleDelete = () => {
    if (!confirm(`Remover "${item.modelo || itemKey}" da coleção?`)) return
    onDelete(itemKey)
    onClose()
  }

  const formatDate = (iso?: string) => {
    if (!iso) return ''
    const d = new Date(iso)
    const hoje = new Date()
    const diff = Math.floor((hoje.getTime() - d.getTime()) / 86_400_000)
    if (diff === 0) return 'hoje'
    if (diff === 1) return 'ontem'
    return `há ${diff} dias`
  }

  const meta = lineMeta(effectiveLine(item))
  const searchQuery = encodeURIComponent(['hot wheels', item.n, item.modelo].filter(Boolean).join(' '))

  return (
    <>
      <Suspense fallback={null}>
        <BarcodeScannerModal
          open={scannerOpen}
          onResult={(code) => { onItemMetaChange(itemKey, { barcode: code }); setScannerOpen(false) }}
          onClose={() => setScannerOpen(false)}
        />
      </Suspense>

      <Sheet open={open} onOpenChange={(v) => { if (!v) onClose() }}>
        <SheetContent
          side="right"
          hideClose
          className="p-0 flex flex-col bg-white w-full sm:max-w-md overflow-hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between px-5 py-3 border-b border-zinc-100 shrink-0">
            <Button variant="ghost" size="icon" type="button" onClick={onClose} aria-label="Fechar" className="text-zinc-500 hover:text-zinc-900">
              <X className="h-4 w-4" />
            </Button>
            <SheetTitle className="text-base font-semibold text-zinc-900">Detalhes</SheetTitle>
            <Button variant="ghost" size="sm" type="button" onClick={handleDelete} className="text-red-500 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-1" />
              Excluir
            </Button>
          </SheetHeader>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto">

            {/* Hero */}
            <div className="relative bg-zinc-100 h-48 flex items-center justify-center overflow-hidden">
              <img
                src={item.img || CAR_PLACEHOLDER}
                alt={item.modelo || ''}
                className="h-full w-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                {meta && (
                  <span
                    className="inline-block text-[10px] font-bold text-white rounded px-1.5 py-px mb-1 leading-none"
                    style={{ background: meta.badgeBg || meta.color }}
                  >
                    {meta.short}
                  </span>
                )}
                <div className="text-white font-semibold text-base leading-tight">{item.modelo || '—'}</div>
                <div className="text-white/70 text-xs mt-0.5">{serieNome}{item.n ? ` · ${item.n}` : ''}</div>
              </div>
            </div>

            <div className="px-5 py-4 space-y-5">

              {/* Coleção */}
              <div className="space-y-1.5">
                <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Coleção</div>
                <select
                  className="w-full h-9 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  value={serieNome || ''}
                  onChange={(e) => { if (e.target.value && e.target.value !== serieNome) onMove(itemKey, e.target.value) }}
                >
                  {series.map((s) => (
                    <option key={s.nome} value={s.nome}>{s.nome}</option>
                  ))}
                </select>
              </div>

              {/* Identificação */}
              <div className="space-y-1.5">
                <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Identificação</div>
                <div className="flex gap-3">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs text-zinc-500">Cód. referência</label>
                    <Input
                      type="text"
                      placeholder="ex.: FYF84"
                      value={String(item.n || '')}
                      onChange={(e) => onItemMetaChange(itemKey, { n: e.target.value.trim() || undefined })}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-xs text-zinc-500">Cód. de barras</label>
                    <div className="flex gap-1">
                      <Input
                        type="text"
                        placeholder="—"
                        value={item.barcode || ''}
                        onChange={(e) => onItemMetaChange(itemKey, { barcode: e.target.value.trim() || undefined })}
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
              </div>

              {/* Foto */}
              <div className="space-y-1.5">
                <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Foto</div>
                <div className="flex gap-1">
                  <Input
                    type="url"
                    placeholder="https://…"
                    value={item.img || ''}
                    onChange={(e) => onItemMetaChange(itemKey, { img: e.target.value.trim() || undefined })}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="shrink-0"
                  >
                    <a
                      href={`https://www.google.com/search?tbm=isch&q=${searchQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Buscar no Google Imagens"
                    >
                      <Search className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Detalhes */}
              <div className="space-y-1.5">
                <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Detalhes</div>
                <div className="flex gap-3">
                  <div className="flex-[2] space-y-1">
                    <label className="text-xs text-zinc-500">Categoria / Linha</label>
                    <select
                      className="w-full h-9 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                      value={item.line || ''}
                      onChange={(e) => onItemMetaChange(itemKey, { line: (e.target.value || undefined) as Line | undefined })}
                    >
                      <option value="">Detectar automaticamente</option>
                      {LINES.map((l) => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-xs text-zinc-500">Embalagem</label>
                    <select
                      className="w-full h-9 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                      value={draft.packaging || ''}
                      onChange={(e) => update({ packaging: (e.target.value || undefined) as Packaging | undefined })}
                    >
                      <option value="">—</option>
                      <option value="carded">Cartelada</option>
                      <option value="loose">Solto</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preços */}
              <div className="space-y-1.5">
                <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Preços</div>
                <div className="flex gap-3">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs text-zinc-500">Pago (R$)</label>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      value={draft.paidPrice ?? ''}
                      onChange={(e) => update({ paidPrice: num(e.target.value) })}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-xs text-zinc-500">Valor de mercado</label>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder={catalogPrice ? `R$ ${catalogPrice.marketPrice.toFixed(2)}` : '—'}
                      value={draft.marketPrice ?? ''}
                      onChange={(e) => update({ marketPrice: num(e.target.value) })}
                      onBlur={() => {
                        if (item?.n && item?.modelo && draft.marketPrice && draft.marketPrice > 0) {
                          contributeMarketPrice(item.n, item.modelo, draft.marketPrice).catch(() => {})
                        }
                      }}
                    />
                  </div>
                </div>

                {catalogPrice && (
                  <div className="mt-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                    <div className="text-[11px] text-zinc-500 mb-2">
                      {catalogPrice.priceSource === 'community'
                        ? `Comunidade · ${formatDate(catalogPrice.priceUpdatedAt)}`
                        : `Mercado Livre · mediana · ${formatDate(catalogPrice.priceUpdatedAt)}`}
                    </div>
                    <div className="flex divide-x divide-zinc-200">
                      <div className="flex-1 flex flex-col items-center px-2">
                        <span className="text-[10px] text-zinc-400 mb-0.5">Mais barato</span>
                        <span className="text-sm font-medium text-zinc-700">R$ {catalogPrice.priceMin?.toFixed(2) ?? '—'}</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center px-2">
                        <span className="text-[10px] text-zinc-400 mb-0.5">Mediana</span>
                        <span className="text-sm font-bold text-zinc-900">R$ {catalogPrice.marketPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center px-2">
                        <span className="text-[10px] text-zinc-400 mb-0.5">Mais caro</span>
                        <span className="text-sm font-medium text-zinc-700">R$ {catalogPrice.priceMax?.toFixed(2) ?? '—'}</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-zinc-400 text-center mt-2">{catalogPrice.priceCount} anúncios analisados</div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
