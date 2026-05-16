import { useState, useRef } from 'react'
import type { Serie, ImportData, OwnershipMap } from '../../types'
import { exportJSON, validateImport } from '../../utils/io'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

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
    <div className="space-y-6">
      {/* Exportar */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Exportar</h4>
        <Button type="button" className="w-full" onClick={handleExport}>
          Exportar agora
        </Button>
        <p className="text-xs text-zinc-500">
          Baixa um <code className="font-mono bg-zinc-100 rounded px-1">.json</code> com coleções, itens e marcados.
          Nome: <code className="font-mono bg-zinc-100 rounded px-1">hotlist-backup-AAAAMMDD.json</code>.
        </p>
      </div>

      <Separator />

      {/* Importar */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Importar</h4>

        <div className="space-y-2">
          <label
            htmlFor="importFile"
            className="flex items-center justify-center w-full h-9 rounded-md border border-dashed border-zinc-300 bg-zinc-50 text-sm text-zinc-600 cursor-pointer hover:bg-zinc-100 transition-colors"
          >
            Escolher arquivo (.json)
          </label>
          <input
            ref={fileRef}
            id="importFile"
            type="file"
            accept="application/json"
            className="sr-only"
            onChange={handleFileChange}
          />
        </div>

        {/* Merge mode */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-zinc-700 cursor-pointer">
            <input
              type="radio"
              name="mergeMode"
              value="merge"
              checked={mergeMode === 'merge'}
              onChange={() => setMergeMode('merge')}
              className="accent-zinc-900"
            />
            Mesclar
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700 cursor-pointer">
            <input
              type="radio"
              name="mergeMode"
              value="replace"
              checked={mergeMode === 'replace'}
              onChange={() => setMergeMode('replace')}
              className="accent-zinc-900"
            />
            Substituir tudo
          </label>
        </div>

        {summary && (
          <div className={[
            'text-xs rounded-lg px-3 py-2',
            summary.startsWith('Arquivo válido')
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200',
          ].join(' ')}>
            {summary}
          </div>
        )}

        <div className="flex gap-2">
          <Button type="button" className="flex-1" disabled={!buffer} onClick={handleApply}>
            Aplicar importação
          </Button>
          <Button type="button" variant="outline" onClick={handleClear}>
            Limpar
          </Button>
        </div>
      </div>
    </div>
  )
}
