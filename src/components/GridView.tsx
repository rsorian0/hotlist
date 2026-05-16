import { useMemo } from 'react'
import type { Serie, OwnershipMap, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import { effectiveLine, lineMeta } from '../utils/line'
import { CAR_PLACEHOLDER } from '../utils/placeholder'
import EmptyState from './EmptyState'
import { Check } from 'lucide-react'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  filter: string
  lineFilter: Line | null
  onItemClick: (key: string) => void
  onAddClick: () => void
}

export default function GridView({ series, checks, filter, lineFilter, onItemClick, onAddClick }: Props) {
  const items = useMemo(() => {
    const f = filter.toLowerCase().trim()
    const result: Array<{
      key: string
      serie: string
      modelo: string
      n?: string | number
      img?: string
      line?: Line
      owned: boolean
    }> = []

    for (const s of series) {
      for (const it of smartSortItems(s.items || [])) {
        const key = `${s.nome}__${it.n || ''}`
        const line = effectiveLine(it)
        if (lineFilter && line !== lineFilter) continue
        if (f && !`${it.modelo || ''} ${it.n || ''} ${s.nome}`.toLowerCase().includes(f)) continue
        result.push({ key, serie: s.nome, modelo: it.modelo || '', n: it.n, img: it.img, line, owned: !!checks[key]?.owned })
      }
    }
    return result
  }, [series, checks, filter, lineFilter])

  if (series.length === 0) return <EmptyState filtered={false} onAddClick={onAddClick} />
  if (items.length === 0) return <EmptyState filtered onAddClick={onAddClick} />

  return (
    <div className="pt-3 px-3 pb-3">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {items.map((it) => {
          const meta = lineMeta(it.line)
          return (
            <div
              key={it.key}
              className="relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden cursor-pointer border border-neutral-100 dark:border-neutral-800 shadow-sm dark:shadow-none transition-all duration-150 hover:shadow-md dark:hover:bg-neutral-800 active:scale-95"
              onClick={() => onItemClick(it.key)}
            >
              {/* Image */}
              <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <img
                  src={it.img || CAR_PLACEHOLDER}
                  alt={it.modelo}
                  loading="lazy"
                  className={[
                    'w-full h-full object-contain transition-all duration-200',
                    it.owned ? '' : 'opacity-40 grayscale',
                  ].join(' ')}
                />

                {/* Line badge — bottom left */}
                {meta && it.line !== 'mainline' && (
                  <span
                    className="absolute bottom-1 left-1 px-1 py-px text-[9px] font-bold text-white rounded leading-none"
                    style={{ background: meta.badgeBg || meta.color }}
                  >
                    {meta.short}
                  </span>
                )}

                {/* Owned checkmark — bottom right */}
                {it.owned && (
                  <div className="absolute bottom-1 right-1 w-[18px] h-[18px] rounded-full bg-emerald-500 flex items-center justify-center shadow-sm ring-1 ring-white/30">
                    <Check size={10} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="px-2 py-1.5">
                <div className={[
                  'text-[11px] font-medium truncate leading-tight',
                  it.owned ? 'text-neutral-800 dark:text-neutral-200' : 'text-neutral-400 dark:text-neutral-500',
                ].join(' ')}>
                  {it.modelo}
                </div>
                <div className="text-[10px] text-neutral-400 dark:text-neutral-600 truncate mt-px">
                  {it.serie !== 'Geral' ? it.serie : (it.n || '')}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
