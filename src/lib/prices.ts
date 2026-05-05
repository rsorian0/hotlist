type PriceResult = {
  median: number
  min: number
  max: number
  count: number
}

function median(arr: number[]): number {
  const s = [...arr].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

async function fetchML(query: string): Promise<number[]> {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(query)}&limit=20`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`ML ${res.status}`)
  const data = await res.json() as { results?: { price: number }[] }
  return (data.results ?? []).map((r) => r.price).filter((p) => p > 0)
}

export async function fetchMarketPrice(
  modelo: string,
  n?: string | number,
): Promise<PriceResult | null> {
  // tenta primeiro com modelo + código, depois só com modelo
  const queries = [
    ['hot wheels', n, modelo].filter(Boolean).join(' '),
    ['hot wheels', modelo].filter(Boolean).join(' '),
  ]

  for (const q of queries) {
    const prices = await fetchML(q)
    if (prices.length >= 3) {
      return {
        median: Math.round(median(prices) * 100) / 100,
        min:    Math.round(Math.min(...prices) * 100) / 100,
        max:    Math.round(Math.max(...prices) * 100) / 100,
        count:  prices.length,
      }
    }
  }
  return null
}
