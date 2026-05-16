import { useMemo } from 'react'
import type { Serie, OwnershipMap, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import { effectiveLine, lineMeta } from '../utils/line'
import { CAR_PLACEHOLDER } from '../utils/placeholder'
import EmptyState from './EmptyState'

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
    <div className="pt-3 px-3">
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-px bg-zinc-100 rounded-xl overflow-hidden">
      {items.map((it) => {
        const meta = lineMeta(it.line)
        return (
          <div
            key={it.key}
            className="relative bg-white flex flex-col cursor-pointer hover:bg-zinc-50 active:bg-zinc-100 transition-colors"
            onClick={() => onItemClick(it.key)}
          >
            <div className="relative aspect-square bg-zinc-50">
              <img
                src={it.img || CAR_PLACEHOLDER}
                alt={it.modelo}
                loading="lazy"
                className="w-full h-full object-contain"
              />
              {meta && it.line !== 'mainline' && (
                <span
                  className="absolute top-1 left-1 px-1 py-px text-[9px] font-bold text-white rounded leading-none"
                  style={{ background: meta.badgeBg || meta.color }}
                >
                  {meta.short}
                </span>
              )}
              {it.owned && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </div>
            <div className="px-2 py-1.5">
              <div className="text-[11px] font-medium text-zinc-700 truncate leading-tight">{it.modelo}</div>
              <div className="text-[10px] text-zinc-400 truncate">
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
