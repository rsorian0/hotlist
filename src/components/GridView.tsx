import { useMemo, useState } from 'react'
import type { Serie, OwnershipMap, Line } from '../types'
import { smartSortItems } from '../utils/sort'
import { effectiveLine, lineMeta } from '../utils/line'
import { CAR_PLACEHOLDER } from '../utils/placeholder'
import EmptyState from './EmptyState'
import { SkeletonGrid } from './Skeleton'

type Props = {
  series: Serie[]
  checks: OwnershipMap
  filter: string
  lineFilter: Line | null
  syncing?: boolean
  onItemClick: (key: string) => void
  onAddClick: () => void
}

function GridImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={[
          'w-full h-full object-contain transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />
    </div>
  )
}

export default function GridView({ series, checks, filter, lineFilter, syncing, onItemClick, onAddClick }: Props) {
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

  if (series.length === 0) {
    if (syncing) return <SkeletonGrid count={12} />
    return <EmptyState filtered={false} onAddClick={onAddClick} />
  }
  if (items.length === 0) return <EmptyState filtered onAddClick={onAddClick} />

  return (
    <div className="pt-3 px-3 pb-3">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {items.map((it) => {
          const meta = lineMeta(it.line)
          return (
            <div
              key={it.key}
              className={[
                'relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden cursor-pointer border border-neutral-100 dark:border-neutral-800 shadow-sm dark:shadow-none transition-all duration-150 hover:shadow-md dark:hover:bg-neutral-800 active:scale-95',
              ].join(' ')}
              onClick={() => onItemClick(it.key)}
            >
              <div className="relative">
                <GridImage src={it.img || CAR_PLACEHOLDER} alt={it.modelo} />
                {/* Owned overlay: dim non-owned */}
                {!it.owned && (
                  <div className="absolute inset-0 bg-white/40 dark:bg-neutral-900/50 backdrop-grayscale" />
                )}
                {meta && it.line !== 'mainline' && (
                  <span
                    className="absolute bottom-1 left-1 px-1 py-px text-[9px] font-bold text-white rounded leading-none z-10"
                    style={{ background: meta.badgeBg || meta.color }}
                  >
                    {meta.short}
                  </span>
                )}
              </div>
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
