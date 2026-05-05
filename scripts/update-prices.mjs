import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error('ERRO: variável FIREBASE_SERVICE_ACCOUNT não definida.')
  process.exit(1)
}

let serviceAccount
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
} catch (e) {
  console.error('ERRO: FIREBASE_SERVICE_ACCOUNT não é um JSON válido.', e.message)
  process.exit(1)
}

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

// Coleta itens do catálogo + de todos os usuários (sem duplicatas)
const items = new Map()

// 1. Catálogo compartilhado
const catalogSnap = await db.collection('catalog').get()
console.log(`Catálogo: ${catalogSnap.size} entradas`)
for (const d of catalogSnap.docs) {
  const data = d.data()
  if (data.modelo) {
    const key = data.n ? String(data.n) : `modelo:${data.modelo}`
    items.set(key, { id: d.id, n: data.n, modelo: data.modelo })
  }
}

// 2. Todos os documentos 'hotlist' via collection group query
// (users/{uid}/app/hotlist — o doc pai users/{uid} é vazio e não aparece em .get())
const hotlistSnap = await db.collectionGroup('app').get()
const hotlistDocs = hotlistSnap.docs.filter((d) => d.id === 'hotlist')
console.log(`Usuários com hotlist: ${hotlistDocs.length}`)
for (const hotlistDoc of hotlistDocs) {
  const state = hotlistDoc.data()?.state || {}
  let total = 0; let novos = 0
  for (const serie of state.series || []) {
    for (const item of serie.items || []) {
      total++
      const key = item.n ? String(item.n) : `modelo:${item.modelo}`
      if (item.modelo && !items.has(key)) {
        const id = item.n ? String(item.n) : item.modelo.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 60)
        items.set(key, { id, n: item.n, modelo: item.modelo })
        novos++
      }
    }
  }
  console.log(`  hotlist: ${total} itens, ${novos} novos no mapa`)
}

const entries = [...items.values()]
console.log(`Atualizando preços de ${entries.length} modelos…\n`)

let ok = 0
let skip = 0
let fail = 0

for (const entry of entries) {
  await sleep(300)

  try {
    const prices = await fetchPrices(entry.modelo, entry.n)
    if (prices.length === 0) {
      console.log(`— ${entry.modelo}: sem anúncios suficientes`)
      skip++
      continue
    }

    const med = Math.round(median(prices) * 100) / 100
    const update = {
      n:             entry.n,
      modelo:        entry.modelo,
      marketPrice:   med,
      priceMin:      Math.round(Math.min(...prices) * 100) / 100,
      priceMax:      Math.round(Math.max(...prices) * 100) / 100,
      priceCount:    prices.length,
      priceUpdatedAt: new Date().toISOString(),
    }
    await db.collection('catalog').doc(entry.id).set(update, { merge: true })
    console.log(`✓ ${entry.modelo}: R$ ${med.toFixed(2)} (${prices.length} anúncios)`)
    ok++
  } catch (e) {
    console.error(`✗ ${entry.modelo}: ${e.message}`)
    fail++
  }
}

console.log(`\nConcluído: ${ok} atualizados, ${skip} sem dados, ${fail} erros`)
