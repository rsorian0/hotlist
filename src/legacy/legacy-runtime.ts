/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Hotlist — Legacy Runtime (compat)
 * Mantém o comportamento do HTML original dentro do app React/Vite.
 */

import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  enableIndexedDbPersistence,
  serverTimestamp,
} from 'firebase/firestore'

/* -------------------- Tipos -------------------- */
type SerieItem = { n?: string | number; modelo?: string; img?: string }
type Serie = { nome: string; items: SerieItem[] }
type BackupPayload = {
  version: number
  exportedAt?: string
  series: Serie[]
  checks: Record<string, boolean>
}

declare global {
  interface Window {
    __modalFeed?: Array<{ img: string; alt: string }>
    syncCloud?: () => Promise<void>
  }
}

/* -------------------- Helpers -------------------- */
const $ = <T extends Element = Element>(sel: string) => document.querySelector<T>(sel)!
const load = <T,>(k: string, d: T): T => {
  try { return (JSON.parse(localStorage.getItem(k) || 'null') ?? d) as T } catch { return d }
}
const save = (k: string, v: unknown) => localStorage.setItem(k, JSON.stringify(v))
const isHttpUrl = (u: string) => { try { const x = new URL(u); return x.protocol === 'http:' || x.protocol === 'https:' } catch { return false } }
const todayStr = () => {
  const d = new Date(), p = (n:number)=>String(n).padStart(2,'0')
  return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}`
}
const isFirebaseConfigured = () => {
  const cfg = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }
  return Object.values(cfg).every(v => typeof v === 'string' && v.trim().length > 0)
}

/* -------------------- Chaves localStorage -------------------- */
const LS_SERIES = 'hw_series_v1'
const LS_CHECKS = 'hw_checklist_v3'
const DB_TAB = 'hw_ui_tab_v7'

/* -------------------- Ordenação inteligente -------------------- */
const parseN = (n: unknown) => {
  const s = String(n ?? '').trim()
  let m = s.match(/^(\d+)\s*[\/\-\|]\s*(\d+)/); if (m) return { has: true, num: +m[1], den: +m[2] }
  m = s.match(/^(\d+)/); if (m) return { has: true, num: +m[1], den: null }
  return { has: false, num: Number.POSITIVE_INFINITY, den: null }
}
const smartSortItems = (arr: SerieItem[]) =>
  (arr || []).slice().sort((a, b) => {
    const A = parseN(a?.n), B = parseN(b?.n)
    if (A.has !== B.has) return A.has ? -1 : 1
    if (A.num !== B.num) return A.num - B.num
    if (A.den!=null && B.den!=null && A.den !== B.den) return A.den - B.den
    return (a?.modelo||'').localeCompare(b?.modelo||'', 'pt-BR', { sensitivity:'base' })
  })

/* -------------------- Runtime principal -------------------- */
export function initLegacyRuntime() {
  /* ===== Firebase (.env) — não quebra se faltar ===== */
  let auth: ReturnType<typeof getAuth> | null = null
  let db: ReturnType<typeof getFirestore> | null = null
  if (isFirebaseConfigured()) {
    const app = initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    })
    auth = getAuth(app)
    db = getFirestore(app)
    enableIndexedDbPersistence(db).catch(()=>{})
    getRedirectResult(auth).catch(()=>{})
  }

  /* ===== DOM refs ===== */
  const listEl = $('#list')
  const q = $('#q') as HTMLInputElement
  const addBtn = $('#addBtn') as HTMLButtonElement
  const editor = $('#editor') as HTMLDivElement
  const closePanel = $('#closePanel') as HTMLButtonElement
  const serieSel = $('#serieSel') as HTMLSelectElement
  const painelExport = $('#panelExport') as HTMLButtonElement
  const addSerieBtn = $('#addSerie') as HTMLButtonElement
  const delSerieBtn = $('#delSerie') as HTMLButtonElement
  const addItemBtn = $('#addItem') as HTMLButtonElement
  const itensPreview = $('#itensPreview') as HTMLDivElement

  const btnIn = $('#btnSignIn') as HTMLButtonElement
  const btnOut = $('#btnSignOut') as HTMLButtonElement
  const userInfo = $('#userInfo') as HTMLDivElement
  const userName = $('#userName') as HTMLSpanElement
  const userPhoto = $('#userPhoto') as HTMLImageElement

  const toastEl = $('#toast') as HTMLDivElement
  const shareAll = $('#shareAll') as HTMLButtonElement

  const importFile = $('#importFile') as HTMLInputElement
  const importSummary = $('#importSummary') as HTMLDivElement
  const applyImportBtn = $('#applyImport') as HTMLButtonElement
  const clearImportBtn = $('#clearImport') as HTMLButtonElement

  const modal = $('#modal') as HTMLDivElement
  const modalImg = $('#modalImg') as HTMLImageElement
  const prevImg = $('#prevImg') as HTMLButtonElement
  const nextImg = $('#nextImg') as HTMLButtonElement

  /* ===== Estado ===== */
  let SERIES: Serie[] = load(LS_SERIES, [])
  let checks: Record<string, boolean> = load(LS_CHECKS, {})
  let currentIndex = SERIES.length ? 0 : -1
  let unsubSnap: null | (()=>void) = null

  const toast = (msg: string) => {
    if (!toastEl) return
    toastEl.textContent = msg
    toastEl.classList.add('show')
    setTimeout(() => toastEl.classList.remove('show'), 1400)
  }
  const rarityColorFromName = (name = '') => {
    const n = name.toLowerCase()
    if (n.includes('super treasure')) return 'linear-gradient(0deg,#ffb703,#fb5607 60%,#ff006e)'
    if (n.includes('(th)') || n.includes('treasure')) return '#c82d6b'
    return 'transparent'
  }

  /* ===== Render ===== */
  function updateTotalsInline(badgeEl: HTMLElement | null, seriesWrapEl: HTMLElement | null) {
    if (seriesWrapEl) {
      const t = seriesWrapEl.querySelectorAll('.row').length
      const c = seriesWrapEl.querySelectorAll('.row .tick.checked').length
      if (badgeEl) badgeEl.textContent = `${c}/${t}`
    }
    const all = document.querySelectorAll('#list .row').length
    const chk = document.querySelectorAll('#list .row .tick.checked').length
    const allEl = $('#all'); const chkEl = $('#chk')
    if (allEl) allEl.textContent = String(all)
    if (chkEl) chkEl.textContent = String(chk)
  }

  function enableLazy(scope: Element) {
    const imgs = [...scope.querySelectorAll('img.thumb[data-src]')] as HTMLImageElement[]
    if (!('IntersectionObserver' in window)) {
      imgs.forEach((img)=>{ img.src = img.getAttribute('data-src')||''; img.removeAttribute('data-src') })
      return
    }
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(e=>{
        if (e.isIntersecting){
          const el = e.target as HTMLImageElement
          el.src = el.getAttribute('data-src') || ''
          el.removeAttribute('data-src')
          obs.unobserve(el)
        }
      })
    }, { rootMargin: '200px' })
    imgs.forEach(img=>io.observe(img))
  }

  function render(){
    if (!listEl) return
    listEl.innerHTML = ''
    const filter = (q?.value || '').toLowerCase().trim()
    let total = 0, done = 0
    const modalFeed: Array<{ img: string; alt: string }> = []

    SERIES.forEach((s)=>{
      const grp = document.createElement('details')
      grp.className = 'series'
      grp.open = true
      const sid = Math.random().toString(36).slice(2)
      grp.innerHTML = `<summary>
        <svg class='chev' width='16' height='16' viewBox='0 0 24 24'><path d='M9 6l6 6-6 6' stroke='currentColor' stroke-width='2' fill='none'/></svg>
        <div class='title'>${s.nome}</div>
        <span class='badge' id='b-${sid}'></span>
      </summary>`
      const wrap = document.createElement('div')
      wrap.className = 'items'

      smartSortItems(s.items||[]).forEach((it)=>{
        if (!(`${it.modelo||''} ${it.n||''} ${s.nome}`.toLowerCase().includes(filter))) return
        const row = document.createElement('div')
        row.className = 'row'
        row.style.setProperty('--accent-col', rarityColorFromName(it.modelo||''))

        // THUMB COMO BOTÃO + MODAL
        const thumb = document.createElement('button')
        thumb.type = 'button'
        thumb.className = 'thumb-wrap'
        thumb.style.all = 'unset'
        thumb.style.cursor = 'zoom-in'
        thumb.setAttribute('aria-label', `Ver imagem de ${it.modelo || ''}`)

        const img = document.createElement('img')
        img.className = 'thumb'
        img.alt = it.modelo || ''
        img.setAttribute('data-src', it.img || '')
        ;(img as any).loading = 'lazy'
        thumb.appendChild(img)

        const nm = (it.modelo||'').toLowerCase()
        if (nm.includes('(th)') || nm.includes('treasure')){
          const lab = document.createElement('div')
          lab.className = 'label' + (nm.includes('super') ? ' super' : '')
          lab.textContent = nm.includes('super') ? 'SUPER TH' : 'TH'
          thumb.appendChild(lab)
        }

        const idx = modalFeed.push({ img: it.img || '', alt: it.modelo || '' }) - 1
        thumb.addEventListener('click', ()=>openModal(idx))
        row.appendChild(thumb)

        const meta = document.createElement('div')
        meta.innerHTML = `<div class='muted'>${it.n||''}</div><div class='title'>${it.modelo||''}</div>`
        row.appendChild(meta)

        const key = s.nome + '__' + (it.n || '')
        const tick = document.createElement('div')
        tick.className = 'tick' + (checks[key] ? ' checked' : '')
        tick.innerHTML = `<svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>`
        tick.addEventListener('click', ()=>{
          checks[key] = !checks[key]
          tick.classList.toggle('checked')
          save(LS_CHECKS, checks)
          updateTotalsInline(grp.querySelector('#b-'+sid) as HTMLElement, wrap)
          void window.syncCloud?.()
        })
        row.appendChild(tick)

        wrap.appendChild(row)
        total++; if (checks[key]) done++
      })

      grp.appendChild(wrap)
      const badge = grp.querySelector('#b-'+sid) as HTMLElement
      updateTotalsInline(badge, wrap)
      listEl.appendChild(grp)
      setTimeout(()=>enableLazy(wrap), 0)
    })

    window.__modalFeed = modalFeed
    const allEl = $('#all'); const chkEl = $('#chk')
    if (allEl) allEl.textContent = String(total)
    if (chkEl) chkEl.textContent = String(done)
  }

  function syncSelect(){
    if (!serieSel) return
    serieSel.innerHTML = ''
    SERIES.forEach((s, i)=>{
      const o = document.createElement('option')
      o.value = String(i); o.textContent = s.nome
      serieSel.appendChild(o)
    })
    if (SERIES.length === 0) currentIndex = -1
    if (currentIndex < 0 && SERIES.length) currentIndex = 0
    if (currentIndex >= 0 && SERIES[currentIndex]) serieSel.value = String(currentIndex)
    renderPreview()
    render()
  }

  function renderPreview(){
    if (!itensPreview) return
    itensPreview.innerHTML = ''
    if (currentIndex < 0 || !SERIES[currentIndex]) return
    const s = SERIES[currentIndex]
    smartSortItems(s.items||[]).forEach((it, idx)=>{
      const row = document.createElement('div')
      row.className = 'mini'
      row.innerHTML = `
        <img src="${it.img||''}" alt=""/>
        <div style="width:100%">
          <div style="display:grid;gap:6px;margin-bottom:6px">
            <input data-k="n" value="${String(it.n ?? '')}" placeholder="nº (ex.: 01/10)" disabled/>
            <input data-k="modelo" value="${String(it.modelo ?? '')}" placeholder="modelo" disabled/>
            <input data-k="img" value="${String(it.img ?? '')}" placeholder="URL da imagem" disabled/>
          </div>
          <div class="toolbar" style="display:none;gap:6px">
            <button class="btn" data-act="save" type="button" style="flex:1">Salvar</button>
            <button class="btn ghost" data-act="cancel" type="button">Cancelar</button>
          </div>
        </div>`
      const actions = document.createElement('div')
      actions.className = 'actions'
      const editBtn = document.createElement('button')
      editBtn.className = 'btn ghost'; editBtn.textContent = '✏️'; editBtn.type = 'button'
      const rmBtn = document.createElement('button')
      rmBtn.className = 'btn ghost'; rmBtn.textContent = '🗑️'; rmBtn.type = 'button'
      actions.append(editBtn, rmBtn); row.appendChild(actions)

      const inputs = () => [...row.querySelectorAll<HTMLInputElement>('input[data-k]')]
      const toolbar = () => row.querySelector<HTMLDivElement>('.toolbar')!

      const setEditing = (on:boolean)=>{
        inputs().forEach(inp => inp.disabled = !on)
        toolbar().style.display = on ? 'flex' : 'none'
        editBtn.style.display = on ? 'none' : 'inline-flex'
      }
      editBtn.addEventListener('click', ()=>setEditing(true))
      toolbar().querySelector('[data-act="cancel"]')!.addEventListener('click', ()=>{ setEditing(false); renderPreview() })
      toolbar().querySelector('[data-act="save"]')!.addEventListener('click', ()=>{
        const vals: Record<string, string> = {}
        inputs().forEach(inp => vals[inp.dataset.k!] = inp.value.trim())
        if (!vals.n || !vals.modelo) return alert('Informe número e modelo.')
        if (vals.img && !/^https?:\/\//i.test(vals.img)) return alert('URL inválida. Use http(s)://')
        s.items[idx] = { n: vals.n, modelo: vals.modelo, img: vals.img }
        save(LS_SERIES, SERIES); renderPreview(); render(); toast('Item atualizado'); void window.syncCloud?.()
      })
      rmBtn.addEventListener('click', ()=>{
        s.items.splice(idx,1); save(LS_SERIES, SERIES); renderPreview(); render(); toast('Item removido'); void window.syncCloud?.()
      })

      itensPreview.appendChild(row)
    })
  }

  /* ===== Busca / Tabs / Painel ===== */
  q?.addEventListener('input', render)

  addBtn?.addEventListener('click', ()=>{
    editor.classList.add('open')
    addBtn.setAttribute('aria-expanded','true')
    editor.setAttribute('aria-hidden','false')
  })
  closePanel?.addEventListener('click', ()=>{
    editor.classList.remove('open')
    addBtn.setAttribute('aria-expanded','false')
    editor.setAttribute('aria-hidden','true')
  })

  document.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      const id = b.dataset.tab!
      document.querySelectorAll('.tab-btn').forEach(t=>t.classList.toggle('active', (t as HTMLButtonElement).dataset.tab===id))
      document.querySelectorAll('.pane').forEach(p=>p.classList.toggle('active', (p as HTMLDivElement).id===id))
      save(DB_TAB, id)
    })
  })
  const initialTab = load(DB_TAB, 'tab-colecoes')
  document.querySelector<HTMLButtonElement>(`.tab-btn[data-tab="${initialTab}"]`)?.click()

  serieSel?.addEventListener('change', ()=>{
    currentIndex = parseInt(serieSel.value, 10)
    renderPreview()
  })

  addSerieBtn?.addEventListener('click', ()=>{
    const nomeInput = $('#serieNome') as HTMLInputElement
    const name = (nomeInput?.value || '').trim()
    if (!name) return alert('Dê um nome à coleção.')
    SERIES.push({ nome: name, items: [] })
    save(LS_SERIES, SERIES)
    if (nomeInput) nomeInput.value = ''
    currentIndex = SERIES.length - 1
    syncSelect(); render(); toast('Coleção criada'); void window.syncCloud?.()
  })

  delSerieBtn?.addEventListener('click', ()=>{
    if (currentIndex < 0 || !SERIES[currentIndex]) return alert('Escolha a coleção para excluir.')
    const nome = SERIES[currentIndex].nome
    if (!confirm(`Excluir a coleção "${nome}"? Isso também removerá os checks desta coleção.`)) return
    const pruned: Record<string, boolean> = {}
    Object.keys(checks).forEach(k => { if (!k.startsWith(nome + '__')) pruned[k] = checks[k] })
    checks = pruned; save(LS_CHECKS, checks)
    SERIES.splice(currentIndex, 1); save(LS_SERIES, SERIES)
    currentIndex = SERIES.length ? Math.max(0, currentIndex-1) : -1
    syncSelect(); render(); toast('Coleção excluída'); void window.syncCloud?.()
  })

  addItemBtn?.addEventListener('click', ()=>{
    if (currentIndex < 0 || !SERIES[currentIndex]) return alert('Crie e selecione uma coleção.')
    const n = (document.querySelector('#itemNumero') as HTMLInputElement)?.value?.trim() || ''
    const m = (document.querySelector('#itemNome') as HTMLInputElement)?.value?.trim() || ''
    const u = (document.querySelector('#itemImg') as HTMLInputElement)?.value?.trim() || ''
    if (!n || !m) return alert('Informe número e modelo.')
    if (u && !isHttpUrl(u)) return alert('URL inválida. Use http(s)://')

    SERIES[currentIndex].items.push({ n, modelo: m, img: u })
    save(LS_SERIES, SERIES)
    ;(document.querySelector('#itemNumero') as HTMLInputElement).value = ''
    ;(document.querySelector('#itemNome') as HTMLInputElement).value = ''
    ;(document.querySelector('#itemImg') as HTMLInputElement).value = ''
    renderPreview(); render(); toast('Item adicionado'); void window.syncCloud?.()
  })

  /* ===== Exportar (.json) com múltiplos fallbacks ===== */
  painelExport?.addEventListener('click', async () => {
    try {
      const payload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        series: JSON.parse(JSON.stringify(SERIES)),
        checks: JSON.parse(JSON.stringify(checks)),
      }
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
      const filename = `hotlist-backup-${todayStr()}.json`

      // Save File Picker (se disponível)
      // @ts-ignore
      if (typeof window.showSaveFilePicker === 'function') {
        // @ts-ignore
        const handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
        })
        const writable = await handle.createWritable()
        await writable.write(blob); await writable.close()
        toast('Backup exportado (salvo no disco)')
        return
      }

      // Web Share com arquivo
      const file = new File([blob], filename, { type: 'application/json' })
      // @ts-ignore
      if (navigator.canShare?.({ files: [file] })) {
        // @ts-ignore
        await navigator.share({ files: [file], title: 'Hotlist Backup', text: 'Backup da minha hotlist' })
        toast('Backup compartilhado')
        return
      }

      // Fallback universal (download)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = filename; a.rel = 'noopener'; a.target = '_blank'
      document.body.appendChild(a); a.click(); a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 2000)
      toast('Backup exportado (.json)')
    } catch (e: any) {
      console.error(e); alert('Não foi possível exportar o backup.\n' + (e?.message || e))
    }
  })

  /* ===== Importar (.json) ===== */
  let pendingImport: BackupPayload | null = null
  const validateBackup = (obj:any): obj is BackupPayload =>
    obj && typeof obj === 'object' && typeof obj.version === 'number' &&
    Array.isArray(obj.series) && obj.checks && typeof obj.checks === 'object'

  importFile?.addEventListener('change', async ()=>{
    importSummary.textContent = ''; applyImportBtn.disabled = true; pendingImport = null
    const f = importFile.files?.[0]; if (!f) return
    try {
      const text = await f.text()
      const json = JSON.parse(text)
      if (!validateBackup(json)) throw new Error('Formato inválido: chaves esperadas são {version, series, checks}.')

      json.series = (json.series || []).map((s: any) => ({
        nome: String(s?.nome ?? ''),
        items: Array.isArray(s?.items) ? s.items.map((it: any) => ({
          n: it?.n, modelo: it?.modelo, img: it?.img
        })) : []
      }))

      pendingImport = json as BackupPayload
      const seriesCount = pendingImport.series.length
      const itemCount = pendingImport.series.reduce((a:number,s:Serie)=>a+(s.items?.length||0),0)
      const checksCount = Object.keys(pendingImport.checks||{}).length
      importSummary.innerHTML = `Arquivo ok • Coleções: ${seriesCount} • Itens: ${itemCount} • Checks: ${checksCount}`
      applyImportBtn.disabled = false
      toast('Backup pronto para importar')
    } catch (e:any) {
      console.error(e)
      importSummary.textContent = 'Arquivo inválido. Use um .json exportado pelo app.'
    }
  })

  applyImportBtn?.addEventListener('click', ()=>{
    if (!pendingImport) return
    const mode = (document.querySelector('input[name="mergeMode"]:checked') as HTMLInputElement)?.value || 'merge'
    if (mode === 'replace') {
      SERIES = JSON.parse(JSON.stringify(pendingImport.series))
      checks = JSON.parse(JSON.stringify(pendingImport.checks))
    } else {
      const byName = new Map<string, Serie>(SERIES.map(s=>[s.nome,{...s,items:[...(s.items||[])]}]))
      const seen = new Set<string>(
        SERIES.flatMap(s => (s.items||[]).map(it => `${s.nome}::${String(it.n??'')}::${String(it.modelo??'')}`.toLowerCase()))
      )
      for (const s of pendingImport.series) {
        if (!byName.has(s.nome)) byName.set(s.nome, { nome:s.nome, items: [] })
        const tgt = byName.get(s.nome)!
        for (const it of (s.items||[])) {
          const key = `${s.nome}::${String(it.n??'')}::${String(it.modelo??'')}`.toLowerCase()
          if (!seen.has(key)) { tgt.items.push({ n: it.n, modelo: it.modelo, img: it.img }); seen.add(key) }
        }
      }
      SERIES = [...byName.values()]
      checks = { ...(pendingImport.checks||{}), ...(checks||{}) }
    }
    save(LS_SERIES, SERIES); save(LS_CHECKS, checks)
    pendingImport = null; applyImportBtn.disabled = true; importSummary.textContent = ''; importFile.value = ''
    syncSelect(); render(); toast('Importação concluída'); void window.syncCloud?.()
  })

  clearImportBtn?.addEventListener('click', ()=>{
    pendingImport = null; importSummary.textContent = ''; applyImportBtn.disabled = true; importFile.value = ''
    toast('Seleção limpa')
  })

  /* ===== Compartilhar (texto) com fallbacks ===== */
  function getVisibleItems() {
    const filter = (q?.value || '').toLowerCase().trim()
    const visible: Array<{ serie: string; n?: string | number; modelo?: string; img?: string; checked: boolean }> = []
    ;(SERIES || []).forEach((s) => {
      smartSortItems(s.items || []).forEach((it) => {
        if (!(`${it.modelo || ''} ${it.n || ''} ${s.nome}`.toLowerCase().includes(filter))) return
        const key = s.nome + '__' + (it.n || '')
        visible.push({ serie: s.nome, n: it.n, modelo: it.modelo, img: it.img, checked: !!checks[key] })
      })
    })
    return visible
  }
  function fallbackShare(texto: string) {
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`
    const w = window.open(url, '_blank')
    if (w && !w.closed) return
    navigator.clipboard?.writeText(texto).then(
      ()=> toast('Texto copiado. Cole onde quiser.'),
      ()=> window.prompt('Copie o conteúdo para compartilhar:', texto)
    )
  }
  function shareChecklist() {
    const items = getVisibleItems()
    if (items.length === 0) { toast('Nada para compartilhar (lista vazia).'); return }
    const tem = items.filter(i => i.checked)
    const falta = items.filter(i => !i.checked)
    const filtro = (q?.value || '').trim()
    const header = filtro ? `Minha Hotlist (filtro: "${filtro}")` : 'Minha Hotlist'
    const MAX = 80
    const lt = tem.map(i => `• ${i.serie} — ${i.n || ''} ${i.modelo}`.trim())
    const lf = falta.map(i => `• ${i.serie} — ${i.n || ''} ${i.modelo}`.trim())
    let outT = lt.slice(0, Math.min(lt.length, Math.floor(MAX/2)))
    let outF = lf.slice(0, MAX - outT.length - 6)
    if (outT.length < lt.length) outT.push(`…(+${lt.length-outT.length} itens)`)
    if (outF.length < lf.length) outF.push(`…(+${lf.length-outF.length} itens)`)
    const texto = ['📦 ' + header, `✅ Tenho: ${tem.length}`, outT.join('\n'), '', `❌ Falta: ${falta.length}`, outF.join('\n')]
      .filter(Boolean).join('\n')

    if (navigator.share) {
      navigator.share({ title: 'Checklist Hot Wheels', text: texto })
        .then(()=> toast('Compartilhado'))
        .catch(err => { if (!String(err).toLowerCase().includes('abort')) fallbackShare(texto) })
    } else {
      fallbackShare(texto)
    }
  }
  shareAll?.addEventListener('click', shareChecklist)

  /* ===== Modal (galeria) ===== */
  let modalIndex = 0
  function openModal(i: number) {
    const feed = window.__modalFeed || []
    if (!feed.length) return
    modalIndex = Math.max(0, Math.min(i, feed.length - 1))
    updateModal()
    modal.classList.add('open')
  }
  function updateModal() {
    const feed = window.__modalFeed || []
    if (!feed.length) return
    const cur = feed[modalIndex]
    modalImg.src = cur.img || ''
    modalImg.alt = cur.alt || ''
  }
  function closeModal() { modal.classList.remove('open') }
  function nextModal() {
    const feed = window.__modalFeed || []
    if (!feed.length) return
    modalIndex = (modalIndex + 1) % feed.length
    updateModal()
  }
  function prevModal() {
    const feed = window.__modalFeed || []
    if (!feed.length) return
    modalIndex = (modalIndex - 1 + feed.length) % feed.length
    updateModal()
  }
  modal?.addEventListener('click', (ev)=>{ if ((ev.target as HTMLElement).id === 'modal') closeModal() })
  nextImg?.addEventListener('click', nextModal)
  prevImg?.addEventListener('click', prevModal)
  window.addEventListener('keydown', (e)=>{
    if (!modal.classList.contains('open')) return
    if (e.key === 'Escape') closeModal()
    if (e.key === 'ArrowRight') nextModal()
    if (e.key === 'ArrowLeft') prevModal()
  })

  /* ===== Auth + Sync (só liga se houver Firebase) ===== */
  if (auth && db) {
    const provider = new GoogleAuthProvider()
    const isStandalone = window.matchMedia?.('(display-mode: standalone)')?.matches || (window as any).navigator.standalone === true

    btnIn?.addEventListener('click', async ()=>{
      try {
        if (isStandalone) { await signInWithRedirect(auth!, provider); return }
        await signInWithPopup(auth!, provider)
      } catch (e: any) {
        if (e?.code === 'auth/popup-blocked' || e?.code === 'auth/operation-not-supported-in-this-environment') {
          await signInWithRedirect(auth!, provider)
        } else if (e?.code === 'auth/unauthorized-domain') {
          alert('Domínio não autorizado no Firebase Authentication. Adicione seu domínio em Authentication → Settings → Authorized domains.')
        } else {
          console.error(e); alert('Falha ao entrar: ' + (e?.message || e))
        }
      }
    })
    btnOut?.addEventListener('click', ()=> signOut(auth!))

    window.syncCloud = async function () {
      const u = auth!.currentUser
      if (!u) return
      const ref = doc(db!, 'users', u.uid, 'app', 'hotlist')
      const payload = {
        state: { series: load<Serie[]>(LS_SERIES, []), checks: load<Record<string, boolean>>(LS_CHECKS, {}) },
        updatedAt: serverTimestamp(),
      }
      await setDoc(ref, payload, { merge: true })
    }

    onAuthStateChanged(auth!, async (user)=>{
      if (user){
        btnIn.style.display = 'none'
        userInfo.style.display = 'flex'
        userName.textContent = user.displayName || user.email || 'Usuário'
        userPhoto.src = user.photoURL || ''
        const ref = doc(db!, 'users', user.uid, 'app', 'hotlist')
        const snap = await getDoc(ref)
        if (snap.exists()){
          const remote = (snap.data() as any).state || { series: [], checks: {} }
          const byName = new Map<string, Serie>((remote.series||[]).map((s:Serie)=>[s.nome, {...s, items:[...(s.items||[])]}]))
          ;(SERIES||[]).forEach(s=>{
            if(!byName.has(s.nome)) byName.set(s.nome, {...s, items:[...(s.items||[])]})
          })
          SERIES = [...byName.values()]
          checks = { ...(remote.checks||{}), ...(checks||{}) }
          save(LS_SERIES, SERIES); save(LS_CHECKS, checks)
          syncSelect(); render()
        } else {
          await setDoc(ref, { state: { series: SERIES, checks }, updatedAt: serverTimestamp() }, { merge:true })
        }
        unsubSnap = onSnapshot(ref, (docSnap)=>{
          if (!docSnap.exists()) return
          const remote = (docSnap.data() as any).state || { series: [], checks: {} }
          SERIES = remote.series || []
          checks = remote.checks || {}
          save(LS_SERIES, SERIES); save(LS_CHECKS, checks)
          syncSelect(); render()
        })
      } else {
        btnIn.style.display = 'inline-block'
        userInfo.style.display = 'none'
        if (unsubSnap) { unsubSnap(); unsubSnap = null }
      }
    })
  } else {
    // Sem Firebase: esconde UI de usuário e garante que não quebre
    btnIn?.addEventListener('click', ()=> alert('Login indisponível: Firebase não configurado.'))
    btnOut?.addEventListener('click', ()=> {})
    userInfo.style.display = 'none'
  }

  /* ===== Inicialização ===== */
  const tabSaved = load(DB_TAB, 'tab-colecoes')
  if (tabSaved && tabSaved !== 'tab-colecoes') {
    document.querySelector<HTMLButtonElement>(`.tab-btn[data-tab="${tabSaved}"]`)?.click()
  }
  syncSelect()

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=>{
      navigator.serviceWorker.register('/service-worker.js').catch(()=>{})
    })
  }

  /* ===== Teardown ===== */
  return () => { if (unsubSnap) unsubSnap() }
}