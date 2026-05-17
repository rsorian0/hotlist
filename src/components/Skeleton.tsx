export function SkeletonRow() {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
      <div className="w-12 h-12 rounded-md bg-neutral-200 dark:bg-neutral-700 animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-2 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded w-12" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded w-36" />
      </div>
    </div>
  )
}

export function SkeletonGroup({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-100 dark:border-neutral-800 mb-2">
      {Array.from({ length: rows }).map((_, i) => <SkeletonRow key={i} />)}
    </div>
  )
}

export function SkeletonGridCard() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
      <div className="aspect-square bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
      <div className="px-2 py-1.5 space-y-1.5">
        <div className="h-2.5 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded w-4/5" />
        <div className="h-2 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded w-3/5" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="pt-3 px-3 pb-3">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {Array.from({ length: count }).map((_, i) => <SkeletonGridCard key={i} />)}
      </div>
    </div>
  )
}
