import { useState } from 'react'
import type { Serie, SerieItem, Line } from '../../types'
import { smartSortItems } from '../../utils/sort'
import { isUrl } from '../../utils/url'
import { LINES } from '../../utils/line'

type Props = {
  serie: Serie
  serieIndex: number
  onUpdate: (serieIndex: number, sortedItemIndex: number, item: SerieItem) => void
  onRemove: (serieIndex: number, sortedItemIndex: number) => void
  toast: (msg: string) => void
}

type EditState = { index: number; n: string; modelo: string; img: string; line: Line | '' } | null

export default function ItemPreviewList({ serie, serieIndex, onUpdate, onRemove, toast }: Props) {
  const [editing, setEditing] = useState<EditState>(null)
  const sorted = smartSortItems(serie.items || [])

  const startEdit = (idx: number, it: SerieItem) =>
    setEditing({ index: idx, n: String(it.n ?? ''), modelo: it.modelo ?? '', img: it.img ?? '', line: it.line ?? '' })

  const cancelEdit = () => setEditing(null)

  const saveEdit = () => {
    if (!editing) return
    if (!editing.n || !editing.modelo) { alert('Informe número e modelo.'); return }
    if (editing.img && !isUrl(editing.img)) { alert('URL inválida. Use http(s)://'); return }
    onUpdate(serieIndex, editing.index, { n: editing.n, modelo: editing.modelo, img: editing.img, line: editing.line || undefined })
    toast('Item atualizado')
    setEditing(null)
  }

  return (
    <div className="list" id="itensPreview" style={{ maxHeight: '40vh', overflow: 'auto' }}>
      {sorted.map((it, idx) => {
        const isEditing = editing?.index === idx
        return (
          <div className="mini" key={`${it.n}-${it.modelo}-${idx}`}>
            <img src={it.img || ''} alt="" />
            <div style={{ width: '100%' }}>
              <div style={{ display: 'grid', gap: 6, marginBottom: 6 }}>
                {isEditing ? (
                  <>
                    <input
                      placeholder="nº (ex.: 01/10)"
                      value={editing.n}
                      onChange={(e) => setEditing((s) => s && { ...s, n: e.target.value })}
                    />
                    <input
                      placeholder="modelo"
                      value={editing.modelo}
                      onChange={(e) => setEditing((s) => s && { ...s, modelo: e.target.value })}
                    />
                    <input
                      placeholder="URL da imagem"
                      value={editing.img}
                      onChange={(e) => setEditing((s) => s && { ...s, img: e.target.value })}
                    />
                    <select
                      value={editing.line}
                      onChange={(e) => setEditing((s) => s && { ...s, line: e.target.value as Line | '' })}
                    >
                      <option value="">Linha (detectar automaticamente)</option>
                      {LINES.map((l) => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <input placeholder="nº (ex.: 01/10)" value={String(it.n ?? '')} disabled readOnly />
                    <input placeholder="modelo" value={it.modelo ?? ''} disabled readOnly />
                    <input placeholder="URL da imagem" value={it.img ?? ''} disabled readOnly />
                  </>
                )}
              </div>
              {isEditing && (
                <div className="toolbar" style={{ display: 'flex', gap: 6 }}>
                  <button className="btn" type="button" style={{ flex: 1 }} onClick={saveEdit}>Salvar</button>
                  <button className="btn ghost" type="button" onClick={cancelEdit}>Cancelar</button>
                </div>
              )}
            </div>
            <div className="actions">
              {!isEditing && (
                <button className="btn ghost" type="button" title="Editar" onClick={() => startEdit(idx, it)}>✏️</button>
              )}
              <button
                className="btn ghost"
                type="button"
                title="Remover"
                onClick={() => { onRemove(serieIndex, idx); toast('Item removido') }}
              >🗑️</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
