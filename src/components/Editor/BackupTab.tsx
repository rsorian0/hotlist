import { useState, useRef } from 'react'
import type { Serie, ImportData, OwnershipMap } from '../../types'
import { exportJSON, validateImport } from '../../utils/io'
import { useToast } from '../../contexts/ToastContext'
import { useConfirm } from '../../contexts/ConfirmContext'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  onImport: (data: ImportData, mode: 'merge' | 'replace') => void
}

export default function BackupTab({ series, checks, onImport }: Props) {
  const [buffer, setBuffer] = useState<ImportData | null>(null)
  const [summary, setSummary] = useState('')
  const [mergeMode, setMergeMode] = useState<'merge' | 'replace'>('merge')
  const fileRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const confirm = useConfirm()

  const handleExport = () => {
    exportJSON(series, checks)
    toast('Backup exportado (.json)', 'success')
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

  const handleApply = async () => {
    if (!buffer) return
    if (mergeMode === 'replace') {
      const ok = await confirm({
        title: 'Substituir tudo',
        message: 'Isso vai substituir TODAS as coleções, itens e marcados pelos do arquivo. Esta ação não pode ser desfeita.',
        confirmLabel: 'Substituir',
        destructive: true,
      })
      if (!ok) return
    }
    onImport(buffer, mergeMode)
    setBuffer(null)
    setSummary('')
    if (fileRef.current) fileRef.current.value = ''
    toast(mergeMode === 'replace' ? 'Importado (substituído)' : 'Importado (mesclado)', 'success')
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
        <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Exportar</h4>
        <Button type="button" className="w-full" onClick={handleExport}>
          Exportar agora
        </Button>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Baixa um <code className="font-mono bg-neutral-100 dark:bg-neutral-800 rounded px-1">.json</code> com coleções, itens e marcados.
          Nome: <code className="font-mono bg-neutral-100 dark:bg-neutral-800 rounded px-1">hotlist-backup-AAAAMMDD.json</code>.
        </p>
      </div>

      <Separator className="dark:bg-neutral-800" />

      {/* Importar */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Importar</h4>

        <div className="space-y-2">
          <label
            htmlFor="importFile"
            className="flex items-center justify-center w-full h-9 rounded-md border border-dashed border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
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
          <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer">
            <input
              type="radio"
              name="mergeMode"
              value="merge"
              checked={mergeMode === 'merge'}
              onChange={() => setMergeMode('merge')}
              className="accent-neutral-900 dark:accent-neutral-100"
            />
            Mesclar
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer">
            <input
              type="radio"
              name="mergeMode"
              value="replace"
              checked={mergeMode === 'replace'}
              onChange={() => setMergeMode('replace')}
              className="accent-neutral-900 dark:accent-neutral-100"
            />
            Substituir tudo
          </label>
        </div>

        {summary && (
          <div className={[
            'text-xs rounded-lg px-3 py-2',
            summary.startsWith('Arquivo válido')
              ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900'
              : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900',
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
