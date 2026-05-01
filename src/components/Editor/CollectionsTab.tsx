import { useState } from 'react'
import type { Serie, SerieItem, Line } from '../../types'
import { isUrl } from '../../utils/url'
import { LINES } from '../../utils/line'
import ItemPreviewList from './ItemPreviewList'

type Props = {
  series: Serie[]
  currentIndex: number
  onIndexChange: (i: number) => void
  onAddSerie: (nome: string) => void
  onDeleteSerie: (i: number) => void
  onAddItem: (serieIndex: number, item: SerieItem) => void
  onUpdateItem: (si: number, ii: number, item: SerieItem) => void
  onRemoveItem: (si: number, ii: number) => void
  toast: (msg: string) => void
}

export default function CollectionsTab({
  series, currentIndex, onIndexChange, onAddSerie, onDeleteSerie,
  onAddItem, onUpdateItem, onRemoveItem, toast,
}: Props) {
  const [newNome, setNewNome] = useState('')
  const [itemN, setItemN] = useState('')
  const [itemModelo, setItemModelo] = useState('')
  const [itemImg, setItemImg] = useState('')
  const [itemLine, setItemLine] = useState<Line | ''>('')

  const handleAddSerie = () => {
    const nome = newNome.trim()
    if (!nome) { alert('Dê um nome à coleção.'); return }
    const idx = series.findIndex((s) => s.nome === nome)
    if (idx !== -1) { alert('Já existe uma coleção com esse nome.'); return }
    const newIdx = onAddSerie(nome)
    setNewNome('')
    onIndexChange(newIdx as unknown as number)
    toast('Coleção criada')
  }

  const handleDeleteSerie = () => {
    if (currentIndex < 0 || !series[currentIndex]) { alert('Escolha a coleção para excluir.'); return }
    const nome = series[currentIndex].nome
    if (!confirm(`Excluir a coleção "${nome}"? Isso também removerá os checks desta coleção.`)) return
    onDeleteSerie(currentIndex)
    toast('Coleção excluída')
  }

  const handleAddItem = () => {
    if (currentIndex < 0 || !series[currentIndex]) { alert('Crie e selecione uma coleção.'); return }
    const n = itemN.trim()
    const modelo = itemModelo.trim()
    const img = itemImg.trim()
    if (!n || !modelo) { alert('Informe número e modelo.'); return }
    if (img && !isUrl(img)) { alert('URL inválida. Use http(s)://'); return }
    onAddItem(currentIndex, { n, modelo, img, line: itemLine || undefined })
    setItemN(''); setItemModelo(''); setItemImg(''); setItemLine('')
    toast('Item adicionado')
  }

  return (
    <div className="pane active" id="tab-colecoes">
      <div className="group">
        <h4>Criar/Excluir coleções</h4>
        <div className="stack">
          <label>Nova coleção</label>
          <input
            id="serieNome"
            placeholder="ex.: HW Art Cars"
            value={newNome}
            onChange={(e) => setNewNome(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSerie()}
          />
          <button className="btn" type="button" onClick={handleAddSerie}>Adicionar coleção</button>
        </div>
        <div className="stack" style={{ marginTop: 10 }}>
          <label>Selecionar coleção para gerenciar</label>
          <select
            id="serieSel"
            value={currentIndex >= 0 ? currentIndex : ''}
            onChange={(e) => onIndexChange(Number(e.target.value))}
          >
            {series.map((s, i) => (
              <option key={s.nome} value={i}>{s.nome}</option>
            ))}
          </select>
          <div className="tiny">A lista principal exibe sempre todas as coleções. Este seletor define onde adicionar/excluir.</div>
          <button className="btn ghost" type="button" onClick={handleDeleteSerie}>Excluir coleção</button>
        </div>
      </div>

      <div className="group">
        <h4>Itens da coleção</h4>
        <div className="stack">
          <label>Adicionar item à coleção selecionada</label>
          <input id="itemNumero" placeholder="número (ex.: 01/10) ou 1/10, 1, etc." value={itemN} onChange={(e) => setItemN(e.target.value)} />
          <input id="itemNome" placeholder="modelo (ex.: DMC DeLorean)" value={itemModelo} onChange={(e) => setItemModelo(e.target.value)} />
          <input id="itemImg" placeholder="URL da imagem (https://...)" value={itemImg} onChange={(e) => setItemImg(e.target.value)} />
          <select id="itemLine" value={itemLine} onChange={(e) => setItemLine(e.target.value as Line | '')}>
            <option value="">Linha (detectar automaticamente)</option>
            {LINES.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          <button className="btn" type="button" onClick={handleAddItem}>Adicionar item</button>
        </div>

        {currentIndex >= 0 && series[currentIndex] && (
          <div className="stack" style={{ marginTop: 10 }}>
            <label>Pré-visualização (clique em Editar para alterar rapidamente)</label>
            <ItemPreviewList
              serie={series[currentIndex]}
              serieIndex={currentIndex}
              onUpdate={onUpdateItem}
              onRemove={onRemoveItem}
              toast={toast}
            />
            <div className="tiny">Ordena por número (1 → 999). Sem número: vão ao fim por ordem alfabética.</div>
          </div>
        )}
      </div>
    </div>
  )
}
