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

async function fetchWithTimeout(url: string, ms = 12_000): Promise<Response> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), ms)
  try {
    return await fetch(url, { signal: ctrl.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function fetchML(query: string): Promise<number[]> {
  const mlUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(query)}&limit=20`

  // tenta direto; se falhar por rede ou status ruim, tenta via proxy
  let res: Response | null = null
  try {
    res = await fetchWithTimeout(mlUrl)
    if (!res.ok) res = null
  } catch {
    // erro de rede — vai tentar proxy
  }

  if (!res) {
    const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(mlUrl)}`
    res = await fetchWithTimeout(proxyUrl)
  }

  if (!res.ok) throw new Error(`ML ${res.status}`)
  const data = await res.json() as { results?: { price: number }[] }
  return (data.results ?? []).map((r) => r.price).filter((p) => p > 0)
}

export async function fetchMarketPrice(
  modelo: string,
  n?: string | number,
): Promise<PriceResult | null> {
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
