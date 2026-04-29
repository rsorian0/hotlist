export type SerieItem = {
  n?: string | number
  modelo?: string
  img?: string
}

export type Serie = {
  nome: string
  items: SerieItem[]
}

export type ModalFeedItem = {
  img: string
  alt: string
}

export type ImportData = {
  version?: number
  exportedAt?: string
  series: Serie[]
  checks: Record<string, boolean>
}
