import { lazy, Suspense, useEffect, useState } from 'react'
import type { Ownership, Packaging, SerieItem, Line, Serie } from '../types'
import { LINES, effectiveLine, lineMeta } from '../utils/line'
import { CAR_PLACEHOLDER } from '../utils/placeholder'
import { getCatalogPrice } from '../lib/catalog'

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
      <div className="panel-backdrop" onClick={onClose} />
      <aside className="panel open" aria-label="Detalhes do item">

        {/* ── Header ── */}
        <div className="hd">
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Fechar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <h3>Detalhes</h3>
          <button className="btn ghost danger" type="button" onClick={handleDelete}>Excluir</button>
        </div>

        <div className="body detail-body">

          {/* ── Hero ── */}
          <div className="detail-hero">
            <img src={item.img || CAR_PLACEHOLDER} alt={item.modelo || ''} className="detail-hero-img" />
            <div className="detail-hero-overlay">
              {meta && (
                <span className="line-tag" style={{ background: meta.badgeBg || meta.color, marginBottom: 4 }}>
                  {meta.short}
                </span>
              )}
              <div className="detail-hero-title">{item.modelo || '—'}</div>
              <div className="detail-hero-sub">{serieNome}{item.n ? ` · ${item.n}` : ''}</div>
            </div>
          </div>

          {/* ── Coleção ── */}
          <div className="detail-section">
            <div className="detail-section-label">Coleção</div>
            <select
              className="detail-select"
              value={serieNome || ''}
              onChange={(e) => { if (e.target.value && e.target.value !== serieNome) onMove(itemKey, e.target.value) }}
            >
              {series.map((s) => (
                <option key={s.nome} value={s.nome}>{s.nome}</option>
              ))}
            </select>
          </div>

          {/* ── Identificação ── */}
          <div className="detail-section">
            <div className="detail-section-label">Identificação</div>
            <div className="detail-row">
              <label className="field flex1">
                <span>Cód. referência</span>
                <input
                  type="text"
                  placeholder="ex.: FYF84"
                  value={String(item.n || '')}
                  onChange={(e) => onItemMetaChange(itemKey, { n: e.target.value.trim() || undefined })}
                />
              </label>
              <label className="field flex1">
                <span>Cód. de barras</span>
                <div className="n-input-wrap">
                  <input
                    type="text"
                    placeholder="—"
                    value={item.barcode || ''}
                    onChange={(e) => onItemMetaChange(itemKey, { barcode: e.target.value.trim() || undefined })}
                  />
                  <button type="button" className="scan-btn" title="Escanear" onClick={() => setScannerOpen(true)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/>
                      <line x1="7" y1="12" x2="7" y2="12.01"/><line x1="10" y1="9" x2="10" y2="15"/>
                      <line x1="13" y1="7" x2="13" y2="17"/><line x1="16" y1="9" x2="16" y2="15"/>
                      <line x1="19" y1="12" x2="19" y2="12.01"/>
                    </svg>
                  </button>
                </div>
              </label>
            </div>
          </div>

          {/* ── Foto ── */}
          <div className="detail-section">
            <div className="detail-section-label">Foto</div>
            <div className="n-input-wrap">
              <input
                className="detail-input"
                type="url"
                placeholder="https://…"
                value={item.img || ''}
                onChange={(e) => onItemMetaChange(itemKey, { img: e.target.value.trim() || undefined })}
              />
              <a
                href={`https://www.google.com/search?tbm=isch&q=${searchQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="scan-btn"
                title="Buscar no Google Imagens"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Detalhes ── */}
          <div className="detail-section">
            <div className="detail-section-label">Detalhes</div>
            <div className="detail-row">
              <label className="field flex2">
                <span>Categoria / Linha</span>
                <select
                  value={item.line || ''}
                  onChange={(e) => onItemMetaChange(itemKey, { line: (e.target.value || undefined) as Line | undefined })}
                >
                  <option value="">Detectar automaticamente</option>
                  {LINES.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </label>
              <label className="field flex1">
                <span>Embalagem</span>
                <select
                  value={draft.packaging || ''}
                  onChange={(e) => update({ packaging: (e.target.value || undefined) as Packaging | undefined })}
                >
                  <option value="">—</option>
                  <option value="carded">Cartelada</option>
                  <option value="loose">Solto</option>
                </select>
              </label>
            </div>
          </div>

          {/* ── Preços ── */}
          <div className="detail-section">
            <div className="detail-section-label">Preços</div>
            <div className="detail-row">
              <label className="field flex1">
                <span>Pago (R$)</span>
                <input
                  type="number" min={0} step="0.01"
                  value={draft.paidPrice ?? ''}
                  onChange={(e) => update({ paidPrice: num(e.target.value) })}
                />
              </label>
              <div className="field flex1">
                <span>Valor de mercado</span>
                <div className={`price-value${catalogPrice ? '' : ' price-value--empty'}`}>
                  {catalogPrice
                    ? `R$ ${catalogPrice.marketPrice.toFixed(2)}`
                    : draft.marketPrice
                    ? `R$ ${draft.marketPrice.toFixed(2)}`
                    : '—'}
                </div>
              </div>
            </div>

            {catalogPrice && (
              <div className="price-ml-card">
                <div className="price-ml-row">
                  <span className="price-ml-source">Mercado Livre · mediana · {formatDate(catalogPrice.priceUpdatedAt)}</span>
                </div>
                <div className="price-ml-range">
                  <div className="price-ml-col">
                    <span className="price-ml-lbl">Mais barato</span>
                    <span className="price-ml-val">R$ {catalogPrice.priceMin?.toFixed(2) ?? '—'}</span>
                  </div>
                  <div className="price-ml-divider" />
                  <div className="price-ml-col">
                    <span className="price-ml-lbl">Mediana</span>
                    <span className="price-ml-val price-ml-val--main">R$ {catalogPrice.marketPrice.toFixed(2)}</span>
                  </div>
                  <div className="price-ml-divider" />
                  <div className="price-ml-col">
                    <span className="price-ml-lbl">Mais caro</span>
                    <span className="price-ml-val">R$ {catalogPrice.priceMax?.toFixed(2) ?? '—'}</span>
                  </div>
                </div>
                <div className="price-ml-count">{catalogPrice.priceCount} anúncios analisados</div>
              </div>
            )}
          </div>

        </div>
      </aside>
    </>
  )
}
