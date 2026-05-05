import { useEffect, useState } from 'react'
import type { Ownership, Packaging, SerieItem, Line, Serie } from '../types'
import { LINES, effectiveLine, lineMeta } from '../utils/line'
import { CAR_PLACEHOLDER } from '../utils/placeholder'

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
              <input
                type="text"
                placeholder="—"
                value={item.barcode || ''}
                onChange={(e) => onItemMetaChange(itemKey, { barcode: e.target.value.trim() || undefined })}
              />
            </label>
            <label className="field full">
              <span>URL da foto</span>
              <input
                type="url"
                placeholder="https://…"
                value={item.img || ''}
                onChange={(e) => onItemMetaChange(itemKey, { img: e.target.value.trim() || undefined })}
              />
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
