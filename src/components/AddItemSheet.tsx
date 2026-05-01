import { useState, useRef } from 'react'
import type { SerieItem, Line, Ownership, Serie } from '../types'
import { LINES } from '../utils/line'
import { isUrl } from '../utils/url'

type Props = {
  open: boolean
  series: Serie[]
  onClose: () => void
  onAdd: (serieNome: string, item: SerieItem, ownership?: Partial<Ownership>) => void
}

const QUICK_LINES: Line[] = ['mainline', 'th', 'sth', 'premium-car-culture', 'premium-boulevard', 'premium-pop-culture', 'rlc']

export default function AddItemSheet({ open, series, onClose, onAdd }: Props) {
  const [line, setLine] = useState<Line | ''>('')
  const [modelo, setModelo] = useState('')
  const [n, setN] = useState('')
  const [serieNome, setSerieNome] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const [paidPrice, setPaidPrice] = useState('')
  const [owned, setOwned] = useState(true)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const serieRef = useRef<HTMLInputElement>(null)

  const serieSuggestions = series
    .map((s) => s.nome)
    .filter((nome) => nome.toLowerCase().includes(serieNome.toLowerCase()) && serieNome.trim() !== '')

  const reset = () => {
    setLine(''); setModelo(''); setN(''); setSerieNome('')
    setExpanded(false); setImgUrl(''); setPaidPrice(''); setOwned(true)
    setShowSuggestions(false)
  }

  const handleClose = () => { reset(); onClose() }

  const handleAdd = () => {
    if (!modelo.trim()) { alert('Informe o nome do modelo.'); return }
    if (!serieNome.trim()) { alert('Informe a série (pode ser um nome novo).'); return }
    if (imgUrl && !isUrl(imgUrl)) { alert('URL da imagem inválida.'); return }

    const item: SerieItem = {
      modelo: modelo.trim(),
      n: n.trim() || undefined,
      img: imgUrl.trim() || undefined,
      line: line || undefined,
    }

    const num = parseFloat(paidPrice.replace(',', '.'))
    const ownership: Partial<Ownership> | undefined = owned
      ? { owned: true, paidPrice: Number.isFinite(num) ? num : undefined }
      : undefined

    onAdd(serieNome.trim(), item, ownership)
    reset()
    onClose()
  }

  if (!open) return null

  const quickLines = LINES.filter((l) => QUICK_LINES.includes(l.value))

  return (
    <>
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
          {/* Linha */}
          <div className="sheet-section">
            <label className="sheet-label">Linha</label>
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

          {/* Modelo + Número */}
          <div className="sheet-row">
            <label className="sheet-field flex2">
              <span className="sheet-label">Modelo *</span>
              <input
                placeholder="ex.: DMC DeLorean"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && serieRef.current?.focus()}
              />
            </label>
            <label className="sheet-field">
              <span className="sheet-label">Número</span>
              <input
                placeholder="01/10"
                value={n}
                onChange={(e) => setN(e.target.value)}
              />
            </label>
          </div>

          {/* Série */}
          <div className="sheet-section" style={{ position: 'relative' }}>
            <label className="sheet-label">Série *</label>
            <input
              ref={serieRef}
              placeholder="ex.: Car Culture 2024 (crie nova ou escolha existente)"
              value={serieNome}
              onChange={(e) => { setSerieNome(e.target.value); setShowSuggestions(true) }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
            {showSuggestions && serieSuggestions.length > 0 && (
              <ul className="serie-suggestions">
                {serieSuggestions.map((s) => (
                  <li key={s} onMouseDown={() => { setSerieNome(s); setShowSuggestions(false) }}>{s}</li>
                ))}
              </ul>
            )}
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
            {expanded ? 'Menos opções' : 'Mais opções (imagem, preço…)'}
          </button>

          {expanded && (
            <div className="sheet-extras">
              <label className="sheet-field">
                <span className="sheet-label">URL da imagem</span>
                <input placeholder="https://..." value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
              </label>
              {owned && (
                <label className="sheet-field">
                  <span className="sheet-label">Preço pago (R$)</span>
                  <input type="number" min={0} step="0.01" placeholder="12,90" value={paidPrice} onChange={(e) => setPaidPrice(e.target.value)} />
                </label>
              )}
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
