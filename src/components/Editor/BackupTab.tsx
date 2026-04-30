import { useState, useRef } from 'react'
import type { Serie, ImportData, OwnershipMap } from '../../types'
import { exportJSON, validateImport } from '../../utils/io'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  onImport: (data: ImportData, mode: 'merge' | 'replace') => void
  toast: (msg: string) => void
}

export default function BackupTab({ series, checks, onImport, toast }: Props) {
  const [buffer, setBuffer] = useState<ImportData | null>(null)
  const [summary, setSummary] = useState('')
  const [mergeMode, setMergeMode] = useState<'merge' | 'replace'>('merge')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    exportJSON(series, checks)
    toast('Backup exportado (.json)')
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuffer(null)
    setSummary('')
    const f = e.target.files?.[0]
    if (!f) return
    try {
      const data = JSON.parse(await f.text())
      validateImport(data)
      setBuffer(data)
      const sc = Array.isArray(data.series) ? data.series.length : 0
      const ic = (data.series || []).reduce(
        (acc: number, s: { items?: unknown[] }) => acc + (Array.isArray(s.items) ? s.items.length : 0),
        0,
      )
      setSummary(`Arquivo válido • Coleções: ${sc} • Itens: ${ic} • Exportado em: ${data.exportedAt || '?'}`)
    } catch {
      setSummary('Arquivo inválido. Use um .json exportado pelo próprio app.')
    }
  }

  const handleApply = () => {
    if (!buffer) return
    if (mergeMode === 'replace') {
      if (!confirm('Isso vai substituir TODAS as coleções, itens e marcados pelos do arquivo. Continuar?')) return
    }
    onImport(buffer, mergeMode)
    setBuffer(null)
    setSummary('')
    if (fileRef.current) fileRef.current.value = ''
    toast(mergeMode === 'replace' ? 'Importado (substituído)' : 'Importado (mesclado)')
  }

  const handleClear = () => {
    setBuffer(null)
    setSummary('')
    if (fileRef.current) fileRef.current.value = ''
    toast('Seleção limpa')
  }

  return (
    <div className="pane active" id="tab-backup">
      <div className="group">
        <h4>Exportar</h4>
        <div className="stack">
          <button className="btn" type="button" onClick={handleExport}>Exportar agora</button>
          <div className="tiny">
            Baixa um <code>.json</code> com coleções, itens e marcados. Nome:{' '}
            <code>hotlist-backup-AAAAMMDD.json</code>.
          </div>
        </div>
      </div>

      <div className="group">
        <h4>Importar</h4>
        <div className="stack">
          <div className="file">
            <label className="fake" htmlFor="importFile">Escolher arquivo (.json)</label>
            <input
              ref={fileRef}
              id="importFile"
              type="file"
              accept="application/json"
              onChange={handleFileChange}
            />
            <div className="opts">
              <label className="tiny">
                <input type="radio" name="mergeMode" value="merge" checked={mergeMode === 'merge'} onChange={() => setMergeMode('merge')} />
                {' '}Mesclar
              </label>
              <label className="tiny">
                <input type="radio" name="mergeMode" value="replace" checked={mergeMode === 'replace'} onChange={() => setMergeMode('replace')} />
                {' '}Substituir tudo
              </label>
            </div>
          </div>
          {summary && <div className="tiny" id="importSummary">{summary}</div>}
          <div className="row actions">
            <button className="btn" type="button" disabled={!buffer} onClick={handleApply}>Aplicar importação</button>
            <button className="btn ghost" type="button" onClick={handleClear}>Limpar seleção</button>
          </div>
        </div>
      </div>
    </div>
  )
}
