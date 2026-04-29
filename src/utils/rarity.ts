export function rarityColorFromName(name: string): string {
  const n = (name || '').toLowerCase()
  if (n.includes('super treasure')) return 'linear-gradient(0deg,#ffb703,#fb5607 60%,#ff006e)'
  if (n.includes('(th)') || n.includes('treasure')) return '#c82d6b'
  return 'transparent'
}

export function isTH(name: string): boolean {
  const n = (name || '').toLowerCase()
  return n.includes('(th)') || n.includes('treasure')
}

export function isSuperTH(name: string): boolean {
  return (name || '').toLowerCase().includes('super treasure')
}
