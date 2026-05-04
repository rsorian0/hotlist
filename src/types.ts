export type Line =
  | 'mainline'
  | 'th'
  | 'sth'
  | 'silver-series'
  | 'premium'
  | 'rlc'
  | 'other'
  // legacy — mantidos para compatibilidade com dados existentes
  | 'premium-car-culture'
  | 'premium-boulevard'
  | 'premium-pop-culture'
  | 'premium-fast-furious'
  | 'premium-entertainment'
  | 'premium-team-transport'
  | 'convention'
  | 'mystery'

export type SerieItem = {
  n?: string | number
  barcode?: string
  modelo?: string
  img?: string
  line?: Line
}

export type Serie = {
  nome: string
  items: SerieItem[]
}

export type ModalFeedItem = {
  img: string
  alt: string
}

export type Condition = 'mint' | 'near-mint' | 'good' | 'loose' | 'damaged'
export type Packaging = 'carded' | 'loose'

export type Ownership = {
  owned: boolean
  qty?: number
  paidPrice?: number
  marketPrice?: number
  condition?: Condition
  packaging?: Packaging
  acquiredAt?: string
  source?: string
  notes?: string
  wishlist?: boolean
}

export type OwnershipMap = Record<string, Ownership>

export type ImportData = {
  version?: number
  exportedAt?: string
  series: Serie[]
  checks: Record<string, boolean | Ownership>
}

export type ViewFilter = 'all' | 'owned' | 'wishlist'
