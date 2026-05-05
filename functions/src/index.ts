import { onCall, HttpsError } from 'firebase-functions/v2/https'

interface MLResult { price: number }
interface MLResponse { results?: MLResult[] }

export const mlPrices = onCall(
  { region: 'southamerica-east1', cors: true },
  async (request) => {
    const query = (request.data as { query?: string }).query
    if (!query || typeof query !== 'string') {
      throw new HttpsError('invalid-argument', 'query required')
    }

    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(query)}&limit=20`
    const res = await fetch(url)
    if (!res.ok) throw new HttpsError('unavailable', `ML ${res.status}`)

    const data = await res.json() as MLResponse
    const prices = (data.results ?? []).map((r) => r.price).filter((p) => p > 0)
    return { prices }
  },
)
