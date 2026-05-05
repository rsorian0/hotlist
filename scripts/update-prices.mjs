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

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'pt-BR,pt;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
}

// Extrai preços do HTML da página de busca do ML
function parsePricesFromHtml(html) {
  const prices = []

  // Tenta extrair do __PRELOADED_STATE__ (JSON embutido no HTML)
  const stateMatch = html.match(/__PRELOADED_STATE__\s*=\s*(\{.+?\});\s*window\./)
  if (stateMatch) {
    try {
      const state = JSON.parse(stateMatch[1])
      const results = state?.initialState?.results ?? state?.results ?? []
      for (const r of results) {
        const p = r?.price?.amount ?? r?.prices?.price?.amount
        if (p > 0) prices.push(p)
      }
      if (prices.length > 0) return prices
    } catch {}
  }

  // Fallback: regex nos metadados de preço no HTML
  const pricePattern = /"price"\s*:\s*(\d+(?:\.\d+)?)/g
  let m
  while ((m = pricePattern.exec(html)) !== null) {
    const p = parseFloat(m[1])
    if (p > 5 && p < 5000) prices.push(p) // filtra valores absurdos
  }

  return prices
}

async function fetchPrices(modelo, n) {
  const queries = [
    ['hot wheels', n, modelo].filter(Boolean).join(' '),
    ['hot wheels', modelo].filter(Boolean).join(' '),
  ]
  for (const q of queries) {
    const slug = q.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const url = `https://lista.mercadolivre.com.br/${slug}`
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) throw new Error(`ML ${res.status}`)
    const html = await res.text()
    const prices = parsePricesFromHtml(html).filter((p) => p > 0)
    if (prices.length >= 3) return prices
  }
  return []
}

// Coleta itens do catálogo + de todos os usuários (sem duplicatas)
const items = new Map()

const catalogSnap = await db.collection('catalog').get()
console.log(`Catálogo: ${catalogSnap.size} entradas`)
for (const d of catalogSnap.docs) {
  const data = d.data()
  if (data.modelo) {
    const key = data.n ? String(data.n) : `modelo:${data.modelo}`
    items.set(key, { id: d.id, n: data.n, modelo: data.modelo })
  }
}

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
console.log(`\nAtualizando preços de ${entries.length} modelos…\n`)

let ok = 0
let skip = 0
let fail = 0

for (const entry of entries) {
  // Delay generoso para não acionar rate limit
  await sleep(2000)

  try {
    const prices = await fetchPrices(entry.modelo, entry.n)
    if (prices.length === 0) {
      console.log(`— ${entry.modelo}: sem anúncios suficientes`)
      skip++
      continue
    }

    const med = Math.round(median(prices) * 100) / 100
    await db.collection('catalog').doc(entry.id).set({
      n:              entry.n,
      modelo:         entry.modelo,
      marketPrice:    med,
      priceMin:       Math.round(Math.min(...prices) * 100) / 100,
      priceMax:       Math.round(Math.max(...prices) * 100) / 100,
      priceCount:     prices.length,
      priceUpdatedAt: new Date().toISOString(),
    }, { merge: true })
    console.log(`✓ ${entry.modelo}: R$ ${med.toFixed(2)} (${prices.length} anúncios)`)
    ok++
  } catch (e) {
    console.error(`✗ ${entry.modelo}: ${e.message}`)
    fail++
  }
}

console.log(`\nConcluído: ${ok} atualizados, ${skip} sem dados, ${fail} erros`)
