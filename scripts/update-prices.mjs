import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function median(arr) {
  const s = [...arr].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

async function fetchPrices(modelo, n) {
  const queries = [
    ['hot wheels', n, modelo].filter(Boolean).join(' '),
    ['hot wheels', modelo].filter(Boolean).join(' '),
  ]
  for (const q of queries) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}&limit=20`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`ML ${res.status}`)
    const data = await res.json()
    const prices = (data.results ?? []).map((r) => r.price).filter((p) => p > 0)
    if (prices.length >= 3) return prices
  }
  return []
}

const snapshot = await db.collection('catalog').get()
const entries = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))

console.log(`Atualizando preços de ${entries.length} modelos no catálogo…\n`)

let ok = 0
let skip = 0
let fail = 0

for (const entry of entries) {
  await sleep(300) // respeita rate limit do ML

  try {
    const prices = await fetchPrices(entry.modelo, entry.n)
    if (prices.length === 0) {
      console.log(`— ${entry.modelo}: sem anúncios suficientes`)
      skip++
      continue
    }

    const med = Math.round(median(prices) * 100) / 100
    await db.collection('catalog').doc(entry.id).update({
      marketPrice:     med,
      priceMin:        Math.round(Math.min(...prices) * 100) / 100,
      priceMax:        Math.round(Math.max(...prices) * 100) / 100,
      priceCount:      prices.length,
      priceUpdatedAt:  new Date().toISOString(),
    })
    console.log(`✓ ${entry.modelo}: R$ ${med.toFixed(2)} (${prices.length} anúncios)`)
    ok++
  } catch (e) {
    console.error(`✗ ${entry.modelo}: ${e.message}`)
    fail++
  }
}

console.log(`\nConcluído: ${ok} atualizados, ${skip} sem dados, ${fail} erros`)
