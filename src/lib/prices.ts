import { getFunctions, httpsCallable } from 'firebase/functions'
import { app } from './firebase'

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

const functions = getFunctions(app, 'southamerica-east1')
const mlPrices = httpsCallable<{ query: string }, { prices: number[] }>(functions, 'mlPrices')

async function fetchML(query: string): Promise<number[]> {
  const result = await mlPrices({ query })
  return result.data.prices
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
