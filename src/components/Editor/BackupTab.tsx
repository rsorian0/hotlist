import { useState, useRef } from 'react'
import type { Serie, ImportData, OwnershipMap } from '../../types'
import { exportJSON, validateImport } from '../../utils/io'
import { fetchMLPrice } from '../../lib/catalog'
import { useToast } from '../../contexts/ToastContext'
import { useConfirm } from '../../contexts/ConfirmContext'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  onImport: (data: ImportData, mode: 'merge' | 'replace') => void
}

type LogEntry = {
  n: string
  modelo: string
  status: 'found' | 'not_found' | 'error'
  price?: number
  reason?: string
  ms: number
}

type RefreshState =
  | { status: 'idle' }
  | { status: 'running'; done: number; total: number; found: number; notFound: number; errors: number }
  | { status: 'done'; found: number; notFound: number; errors: number; log: LogEntry[]; ranAt: string }

const LS_LOG_KEY = 'hw_price_refresh_log'

function saveLog(log: LogEntry[], ranAt: string) {
  try {
    localStorage.setItem(LS_LOG_KEY, JSON.stringify({ ranAt, entries: log }))
  } catch { /* non-critical */ }
}

function loadLog(): { ranAt: string; entries: LogEntry[] } | null {
  try {
    const raw = localStorage.getItem(LS_LOG_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

const statusIcon: Record<LogEntry['status'], string> = {
  found: '✓',
  not_found: '—',
  error: '✗',
}

const statusColor: Record<LogEntry['status'], string> = {
  found: 'text-green-600 dark:text-green-500',
  not_found: 'text-neutral-400 dark:text-neutral-500',
  error: 'text-red-500',
}

export default function BackupTab({ series, checks, onImport }: Props) {
  const [buffer, setBuffer] = useState<ImportData | null>(null)
  const [summary, setSummary] = useState('')
  const [mergeMode, setMergeMode] = useState<'merge' | 'replace'>('merge')
  const [refresh, setRefresh] = useState<RefreshState>(() => {
    const saved = loadLog()
    if (!saved) return { status: 'idle' }
    const found    = saved.entries.filter((e) => e.status === 'found').length
    const notFound = saved.entries.filter((e) => e.status === 'not_found').length
    const errors   = saved.entries.filter((e) => e.status === 'error').length
    return { status: 'done', found, notFound, errors, log: saved.entries, ranAt: saved.ranAt }
  })
  const [showLog, setShowLog] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef(false)
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

  const handleRefreshPrices = async () => {
    const seen = new Set<string>()
    const items: { n: string; modelo: string }[] = []
    for (const s of series) {
      for (const it of s.items) {
        const n = String(it.n || '').trim()
        if (!n || seen.has(n)) continue
        seen.add(n)
        items.push({ n, modelo: it.modelo || '' })
      }
    }

    if (items.length === 0) {
      toast('Nenhum item com código de referência encontrado.', 'error')
      return
    }

    abortRef.current = false
    let found = 0; let notFound = 0; let errors = 0
    const log: LogEntry[] = []
    const ranAt = new Date().toISOString()

    setRefresh({ status: 'running', done: 0, total: items.length, found, notFound, errors })

    for (let i = 0; i < items.length; i++) {
      if (abortRef.current) break
      const { n, modelo } = items[i]
      const t0 = Date.now()
      try {
        const result = await fetchMLPrice(n, modelo)
        const ms = Date.now() - t0
        if (result.status === 'found') {
          found++
          log.push({ n, modelo, status: 'found', price: result.data.marketPrice, ms })
        } else if (result.status === 'not_found') {
          notFound++
          log.push({ n, modelo, status: 'not_found', ms })
        } else {
          errors++
          log.push({ n, modelo, status: 'error', reason: result.reason, ms })
        }
      } catch (e) {
        errors++
        log.push({ n, modelo, status: 'error', reason: e instanceof Error ? e.message : 'unknown', ms: Date.now() - t0 })
      }
      setRefresh({ status: 'running', done: i + 1, total: items.length, found, notFound, errors })
      if (i < items.length - 1 && !abortRef.current) await new Promise((r) => setTimeout(r, 800))
    }

    saveLog(log, ranAt)
    setRefresh({ status: 'done', found, notFound, errors, log, ranAt })
    toast(`Preços: ${found} encontrados, ${notFound} sem anúncios, ${errors} erros`, found > 0 ? 'success' : 'default')
  }

  const handleCopyLog = () => {
    if (refresh.status !== 'done') return
    const text = JSON.stringify({ ranAt: refresh.ranAt, entries: refresh.log }, null, 2)
    navigator.clipboard.writeText(text).then(
      () => toast('Log copiado', 'success'),
      () => toast('Não foi possível copiar', 'error'),
    )
  }

  return (
    <div className="space-y-6">
      {/* Preços */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">Preços Mercado Livre</h4>

        {refresh.status === 'idle' && (
          <>
            <Button type="button" variant="outline" className="w-full" onClick={handleRefreshPrices}>
              Atualizar todos os preços agora
            </Button>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Busca preços no ML para todos os itens com código de referência. Atualizado automaticamente a cada 7 dias.
            </p>
          </>
        )}

        {refresh.status === 'running' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
              <span>Atualizando… {refresh.done}/{refresh.total}</span>
              <button type="button" onClick={() => { abortRef.current = true }} className="text-red-500 hover:underline">Cancelar</button>
            </div>
            <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-neutral-900 dark:bg-neutral-100 transition-all duration-300"
                style={{ width: `${(refresh.done / refresh.total) * 100}%` }}
              />
            </div>
            <div className="flex gap-3 text-xs">
              <span className="text-green-600 dark:text-green-500">✓ {refresh.found} encontrados</span>
              <span className="text-neutral-400">— {refresh.notFound} sem anúncios</span>
              {refresh.errors > 0 && <span className="text-red-500">✗ {refresh.errors} erros</span>}
            </div>
          </div>
        )}

        {refresh.status === 'done' && (
          <div className="space-y-2">
            {/* Summary bar */}
            <div className={[
              'text-xs rounded-lg px-3 py-2 border',
              refresh.found > 0
                ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900'
                : refresh.errors > 0
                  ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900'
                  : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700',
            ].join(' ')}>
              {refresh.found} encontrados · {refresh.notFound} sem anúncios · {refresh.errors} erros
              <span className="ml-2 opacity-50">
                {new Date(refresh.ranAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Log toggle + copy */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowLog((v) => !v)}
                className="flex-1 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-1.5 transition-colors"
              >
                {showLog ? 'Ocultar log' : `Ver log (${refresh.log.length} itens)`}
              </button>
              <button
                type="button"
                onClick={handleCopyLog}
                className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-1.5 transition-colors"
              >
                Copiar JSON
              </button>
            </div>

            {/* Log list */}
            {showLog && (
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <div className="max-h-64 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
                  {refresh.log.map((entry, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 text-xs">
                      <span className={`w-3 shrink-0 font-bold ${statusColor[entry.status]}`}>
                        {statusIcon[entry.status]}
                      </span>
                      <span className="text-neutral-400 dark:text-neutral-500 w-16 shrink-0 truncate">{entry.n}</span>
                      <span className="flex-1 truncate text-neutral-700 dark:text-neutral-300">{entry.modelo}</span>
                      {entry.status === 'found' && (
                        <span className="text-green-600 dark:text-green-500 shrink-0">R$ {entry.price?.toFixed(2)}</span>
                      )}
                      {entry.reason && (
                        <span className="text-red-400 shrink-0">{entry.reason}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button type="button" variant="outline" className="w-full" onClick={handleRefreshPrices}>
              Atualizar novamente
            </Button>
          </div>
        )}
      </div>

      <Separator className="dark:bg-neutral-800" />

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
