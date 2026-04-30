import type { Ownership, OwnershipMap } from '../types'

export const EMPTY: Ownership = { owned: false }

export function toOwnership(v: boolean | Ownership | undefined): Ownership {
  if (v == null) return EMPTY
  if (typeof v === 'boolean') return { owned: v }
  return { ...v, owned: !!v.owned }
}

export function migrateOwnershipMap(raw: Record<string, boolean | Ownership> | undefined): OwnershipMap {
  const out: OwnershipMap = {}
  if (!raw) return out
  for (const [k, v] of Object.entries(raw)) out[k] = toOwnership(v)
  return out
}

export function isMeaningful(o: Ownership): boolean {
  return (
    !!o.owned ||
    !!o.wishlist ||
    !!o.notes ||
    o.qty != null ||
    o.paidPrice != null ||
    o.marketPrice != null ||
    !!o.condition ||
    !!o.packaging ||
    !!o.acquiredAt ||
    !!o.source
  )
}

export function pruneEmpty(map: OwnershipMap): OwnershipMap {
  const out: OwnershipMap = {}
  for (const [k, v] of Object.entries(map)) if (isMeaningful(v)) out[k] = v
  return out
}

export function ownedCount(map: OwnershipMap, key: string): number {
  const o = map[key]
  if (!o?.owned) return 0
  return Math.max(1, o.qty ?? 1)
}
