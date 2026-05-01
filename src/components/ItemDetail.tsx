import { useEffect, useState } from 'react'
import type { Ownership, Condition, Packaging, SerieItem, Line } from '../types'
import { LINES, effectiveLine, lineMeta } from '../utils/line'

type Props = {
  open: boolean
  itemKey: string | null
  item: SerieItem | null
  serieNome: string | null
  ownership: Ownership | undefined
  onClose: () => void
  onChange: (key: string, partial: Partial<Ownership>) => void
  onItemMetaChange: (key: string, partial: Partial<SerieItem>) => void
}

const CONDITIONS: { value: Condition; label: string }[] = [
  { value: 'mint', label: 'Mint' },
  { value: 'near-mint', label: 'Near Mint' },
  { value: 'good', label: 'Good' },
  { value: 'loose', label: 'Loose' },
  { value: 'damaged', label: 'Danificado' },
]

export default function ItemDetail({
  open, itemKey, item, serieNome, ownership, onClose, onChange, onItemMetaChange,
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

  return (
    <>
      <div className="detail-backdrop" onClick={onClose} />
      <aside className="detail-panel" aria-label="Detalhes do item">
        <div className="hd">
          <h3>Detalhes</h3>
          <button className="btn ghost" type="button" onClick={onClose}>Fechar</button>
        </div>
        <div className="detail-body">
          <div className="detail-head">
            {item.img && <img src={item.img} alt="" className="detail-thumb" />}
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
            <span>Linha</span>
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

          <div className="detail-toggles">
            <label className="toggle">
              <input
                type="checkbox"
                checked={!!draft.owned}
                onChange={(e) => update({ owned: e.target.checked, wishlist: e.target.checked ? false : draft.wishlist })}
              />
              <span>Tenho</span>
            </label>
            <label className="toggle">
              <input
                type="checkbox"
                checked={!!draft.wishlist}
                onChange={(e) => update({ wishlist: e.target.checked })}
              />
              <span>Quero (wishlist)</span>
            </label>
          </div>

          <div className="field-grid">
            <label className="field">
              <span>Quantidade</span>
              <input
                type="number"
                min={0}
                value={draft.qty ?? ''}
                onChange={(e) => update({ qty: num(e.target.value) })}
              />
            </label>

            <label className="field">
              <span>Estado</span>
              <select
                value={draft.condition || ''}
                onChange={(e) => update({ condition: (e.target.value || undefined) as Condition | undefined })}
              >
                <option value="">—</option>
                {CONDITIONS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </label>

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

            <label className="field">
              <span>Data da compra</span>
              <input
                type="date"
                value={draft.acquiredAt || ''}
                onChange={(e) => update({ acquiredAt: e.target.value || undefined })}
              />
            </label>

            <label className="field full">
              <span>Local da compra</span>
              <input
                type="text"
                placeholder="Mercado Livre, Walmart, presente…"
                value={draft.source || ''}
                onChange={(e) => update({ source: e.target.value || undefined })}
              />
            </label>

            <label className="field full">
              <span>Notas</span>
              <textarea
                rows={3}
                placeholder="Observações pessoais sobre esta peça"
                value={draft.notes || ''}
                onChange={(e) => update({ notes: e.target.value || undefined })}
              />
            </label>
          </div>
        </div>
      </aside>
    </>
  )
}
