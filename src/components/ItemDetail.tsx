import { lazy, Suspense, useEffect, useState } from 'react'
import type { Ownership, Packaging, SerieItem, Line, Serie } from '../types'
import { LINES, effectiveLine, lineMeta } from '../utils/line'
import { CAR_PLACEHOLDER } from '../utils/placeholder'

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


export default function ItemDetail({
  open, itemKey, item, serieNome, series, ownership, onClose, onChange, onItemMetaChange, onDelete, onMove,
}: Props) {
  const [draft, setDraft] = useState<Ownership>(ownership || { owned: false })
  const [scannerOpen, setScannerOpen] = useState(false)

  useEffect(() => {
    setDraft(ownership || { owned: false })
  }, [ownership, itemKey])

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
        <div className="hd">
          <h3>Detalhes</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn ghost danger"
              type="button"
              onClick={handleDelete}
              title="Remover item"
            >
              Excluir
            </button>
            <button className="btn ghost" type="button" onClick={onClose}>Fechar</button>
          </div>
        </div>
        <div className="body detail-body">
          <div className="detail-head">
            <img src={item.img || CAR_PLACEHOLDER} alt="" className="detail-thumb" />
            <div>
              <div className="muted">{serieNome} · {item.n || ''}</div>
              <div className="title">{item.modelo || ''}</div>
              {(() => {
                const meta = lineMeta(effectiveLine(item))
                return meta ? (
                  <span className="line-tag" style={{ background: meta.badgeBg || meta.color }}>{meta.short}</span>
                ) : null
              })()}
            </div>
          </div>

          <label className="field full" style={{ marginBottom: 14 }}>
            <span>Coleção</span>
            <select
              value={serieNome || ''}
              onChange={(e) => { if (e.target.value && e.target.value !== serieNome) onMove(itemKey, e.target.value) }}
            >
              {series.map((s) => (
                <option key={s.nome} value={s.nome}>{s.nome}</option>
              ))}
            </select>
          </label>

          <div className="field-grid" style={{ marginBottom: 14 }}>
            <label className="field">
              <span>Cód. referência</span>
              <input
                type="text"
                placeholder="ex.: FYF84"
                value={String(item.n || '')}
                onChange={(e) => onItemMetaChange(itemKey, { n: e.target.value.trim() || undefined })}
              />
            </label>
            <label className="field">
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
            <label className="field full">
              <span>URL da foto</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <input
                  type="url"
                  placeholder="https://…"
                  value={item.img || ''}
                  onChange={(e) => onItemMetaChange(itemKey, { img: e.target.value.trim() || undefined })}
                  style={{ flex: 1 }}
                />
                <a
                  href={`https://www.google.com/search?tbm=isch&q=hot+wheels+${encodeURIComponent([item.n, item.modelo].filter(Boolean).join(' '))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ghost"
                  title="Buscar foto no Google Imagens"
                  style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, padding: '0 10px' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  Buscar
                </a>
              </div>
            </label>
          </div>

          <label className="field full" style={{ marginBottom: 14 }}>
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


          <div className="field-grid">
            <label className="field">
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

            <label className="field">
              <span>Preço pago (R$)</span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={draft.paidPrice ?? ''}
                onChange={(e) => update({ paidPrice: num(e.target.value) })}
              />
            </label>

            <label className="field">
              <span>Valor estimado (R$)</span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={draft.marketPrice ?? ''}
                onChange={(e) => update({ marketPrice: num(e.target.value) })}
              />
            </label>
          </div>
        </div>
      </aside>
    </>
  )
}
