/* eslint-disable @typescript-eslint/no-explicit-any */

// Runtime legado com a mesma UX do projeto original, agora modular.
// - Busca/ordenar, checks, modal (galeria), compartilhar (Web Share/WhatsApp),
// - Exportar/Importar JSON, Firebase Auth + Firestore Sync,
// - Compatível com Vite + GitHub Pages (BASE_URL no SW).

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

type SerieItem = { n?: string | number; modelo?: string; img?: string }
type Serie = { nome: string; items: SerieItem[] }

declare global {
  interface Window {
    __modalFeed?: Array<{ img: string; alt: string }>
    syncCloud?: () => Promise<void>
  }
}

export function initLegacyRuntime() {
  // ----- Firebase (envs VITE_*) -----
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)
  enableIndexedDbPersistence(db).catch(()=>{})

  // ----- DOM helpers -----
  const $ = <T extends Element = Element>(sel: string) => document.querySelector<T>(sel)!

  // elementos
  const listEl = $('#list')
  const q = $('#q') as HTMLInputElement
  const toastEl = $('#toast') as HTMLDivElement

  const btnIn = $('#btnSignIn') as HTMLButtonElement
  const btnOut = $('#btnSignOut') as HTMLButtonElement
  const userInfo = $('#userInfo') as HTMLDivElement
  const userName = $('#userName') as HTMLSpanElement
  const userPhoto = $('#userPhoto') as HTMLImageElement

  const addBtn = $('#addBtn') as HTMLButtonElement
  const editor = $('#editor') as HTMLDivElement

  const serieSel = $('#serieSel') as HTMLSelectElement
  const itensPreview = $('#itensPreview') as HTMLDivElement

  const panelExport = $('#panelExport') as HTMLButtonElement
  const shareAll = $('#shareAll') as HTMLButtonElement

  const importFile = $('#importFile') as HTMLInputElement
  const applyImport = $('#applyImport') as HTMLButtonElement
  const clearImport = $('#clearImport') as HTMLButtonElement
  const importSummary = $('#importSummary') as HTMLDivElement

  const prevImg = $('#prevImg') as HTMLButtonElement
  const nextImg = $('#nextImg') as HTMLButtonElement
  const modal = $('#modal') as HTMLDivElement
  const modalImg = $('#modalImg') as HTMLImageElement

  // ----- Utils / estado -----
  const LS_SERIES = 'hw_series_v1'
  const LS_CHECKS = 'hw_checklist_v3'
  const DB_TAB = 'hw_ui_tab_v7'

  const load = <T,>(k: string, d: T): T => {
    try { return (JSON.parse(localStorage.getItem(k) || 'null') ?? d) as T } catch { return d }
  }
  const save = (k: string, v: unknown) => localStorage.setItem(k, JSON.stringify(v))

  const isUrl = (u: string) => { try { const x = new URL(u); return x.protocol==='http:'||x.protocol==='https:' } catch { return false } }

  let SERIES: Serie[] = load(LS_SERIES, [])
  let checks: Record<string, boolean> = load(LS_CHECKS, {})
  let currentIndex = SERIES.length ? 0 : -1

  const toast = (msg: string) => {
    if (!toastEl) return
    toastEl.textContent = msg
    toastEl.classList.add('show')
    setTimeout(()=>toastEl.classList.remove('show'), 1600)
  }

  // ----- Ordenação inteligente (nº/den) -----
  function parseN(n: unknown){
    const s = String(n ?? '').trim()
    let m = s.match(/^(\d+)\s*[\/\-\|]\s*(\d+)\b/)
    if (m) return { has: true, num: +m[1], den: +m[2] }
    m = s.match(/^(\d+)/)
    if (m) return { has: true, num: +m[1], den: null as number|null }
    return { has: false, num: Number.POSITIVE_INFINITY, den: null as number|null }
  }
  const smartSortItems = (arr: SerieItem[]) =>
    (arr||[]).slice().sort((a,b)=>{
      const A = parseN(a?.n), B = parseN(b?.n)
      if (A.has!==B.has) return A.has ? -1 : 1
      if (A.num!==B.num) return A.num - B.num
      if (A.den!=null && B.den!=null && A.den!==B.den) return A.den - B.den
      return (a?.modelo||'').localeCompare(b?.modelo||'', 'pt-BR', { sensitivity:'base' })
    })

  // ----- Totais -----
  function updateTotalsInline(badgeEl: HTMLElement | null, seriesWrapEl: HTMLElement | null) {
    if (seriesWrapEl){
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

  // ----- Raridade (cores) -----
  const rarityColorFromName = (name = '') => {
    const n = name.toLowerCase()
    if (n.includes('super treasure')) return 'linear-gradient(0deg,#ffb703,#fb5607 60%,#ff006e)'
    if (n.includes('(th)') || n.includes('treasure')) return '#c82d6b'
    return 'transparent'
  }

  // ----- Lazy images -----
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

  // ----- Render lista principal -----
  function render(){
    if (!listEl) return
    listEl.innerHTML = ''
    const filter = (q?.value || '').toLowerCase().trim()
    let total = 0, done = 0
    const modalFeed: Array<{ img: string; alt: string }> = []

    ;(SERIES||[]).forEach((s)=>{
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
      let c=0, t=0

      smartSortItems(s.items||[]).forEach((it)=>{
        if (!(`${it.modelo||''} ${it.n||''} ${s.nome}`.toLowerCase().includes(filter))) return
        const row = document.createElement('div')
        row.className = 'row'
        row.style.setProperty('--accent-col', rarityColorFromName(it.modelo||''))

        // thumb + label
        const thumb = document.createElement('div')
        thumb.className = 'thumb-wrap'
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

        const galleryIndex = modalFeed.push({ img: it.img || '', alt: it.modelo || '' }) - 1
        thumb.addEventListener('click', ()=> openModal(galleryIndex))
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
          if (window.syncCloud) window.syncCloud()
        })
        row.appendChild(tick)

        wrap.appendChild(row)
        t++; total++; if (checks[key]) { c++; done++ }
      })

      grp.appendChild(wrap)
      const badge = grp.querySelector('#b-'+sid) as HTMLElement
      if (badge) badge.textContent = `${c}/${t}`
      listEl.appendChild(grp)
      setTimeout(()=>enableLazy(wrap), 0)
    })

    window.__modalFeed = modalFeed
    const allEl = $('#all'); const chkEl = $('#chk')
    if (allEl) allEl.textContent = String(total)
    if (chkEl) chkEl.textContent = String(done)
  }

  // ----- Galeria (modal) -----
  let modalIndex = 0
  function openModal(i:number){
    const feed = window.__modalFeed || []
    if (!feed.length) return
    modalIndex = Math.max(0, Math.min(i, feed.length-1))
    updateModal()
    modal.classList.add('open')
  }
  function updateModal(){
    const feed = window.__modalFeed || []
    if (!feed.length) return
    const cur = feed[modalIndex]
    modalImg.src = cur.img || ''
    modalImg.alt = cur.alt || ''
  }
  function closeModal(){ modal.classList.remove('open') }
  function nextModal(){ const f=window.__modalFeed||[]; if(!f.length) return; modalIndex=(modalIndex+1)%f.length; updateModal() }
  function prevModal(){ const f=window.__modalFeed||[]; if(!f.length) return; modalIndex=(modalIndex-1+f.length)%f.length; updateModal() }

  // ----- Compartilhar -----
  function getVisibleItems(){
    const filter = (q?.value || '').toLowerCase().trim()
    const visible: Array<{ serie:string; n?:string|number; modelo?:string; img?:string; checked:boolean }> = []
    ;(SERIES||[]).forEach((s)=>{
      smartSortItems(s.items||[]).forEach((it)=>{
        if (!(`${it.modelo||''} ${it.n||''} ${s.nome}`.toLowerCase().includes(filter))) return
        const key = s.nome + '__' + (it.n || '')
        visible.push({ serie:s.nome, n:it.n, modelo:it.modelo, img:it.img, checked:!!checks[key] })
      })
    })
    return visible
  }
  function shareChecklist(){
    const items = getVisibleItems()
    if (!items.length) { toast('Nada para compartilhar (lista vazia).'); return }
    const tem = items.filter(i=>i.checked), falta = items.filter(i=>!i.checked)
    const filter = (q?.value || '').trim()
    const header = filter ? `Minha Hotlist (filtro: "${filter}")` : 'Minha Hotlist'
    const MAX_LINES = 80
    const linesTem = tem.map(i=>`• ${i.serie} — ${i.n||''} ${i.modelo}`)
    const linesFalta = falta.map(i=>`• ${i.serie} — ${i.n||''} ${i.modelo}`)
    let a = linesTem.slice(0, Math.min(linesTem.length, Math.floor(MAX_LINES/2)))
    let b = linesFalta.slice(0, MAX_LINES - a.length - 6)
    if (a.length < linesTem.length) a.push(`…(+${linesTem.length - a.length} itens)`)
    if (b.length < linesFalta.length) b.push(`…(+${linesFalta.length - b.length} itens)`)
    const texto = ['📦 ' + header, `✅ Tenho: ${tem.length}`, a.join('\n'), '', `❌ Falta: ${falta.length}`, b.join('\n')].join('\n')

    if (navigator.share){
      navigator.share({ title:'Checklist Hot Wheels', text:texto }).catch(()=>{})
    } else {
      const url = `https://wa.me/?text=${encodeURIComponent(texto)}`
      window.open(url, '_blank')
    }
  }

  // ----- Painel / seletor / preview -----
  function syncSelect(){
    if (!serieSel) return
    serieSel.innerHTML = ''
    SERIES.forEach((s,i)=>{
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
            <input data-k="n" value="${String(it.n ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" placeholder="nº (ex.: 01/10)" disabled/>
            <input data-k="modelo" value="${String(it.modelo ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" placeholder="modelo" disabled/>
            <input data-k="img" value="${String(it.img ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" placeholder="URL da imagem" disabled/>
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
        if (vals.img && !isUrl(vals.img)) return alert('URL inválida. Use http(s)://')
        s.items[idx] = { n: vals.n, modelo: vals.modelo, img: vals.img }
        save(LS_SERIES, SERIES); renderPreview(); render(); toast('Item atualizado'); if (window.syncCloud) window.syncCloud()
      })
      rmBtn.addEventListener('click', ()=>{
        s.items.splice(idx,1); save(LS_SERIES, SERIES); renderPreview(); render(); toast('Item removido'); if (window.syncCloud) window.syncCloud()
      })

      itensPreview.appendChild(row)
    })
  }

  // ----- Eventos básicos UI -----
  q?.addEventListener('input', render)

  addBtn?.addEventListener('click', ()=>{
    editor.classList.add('open')
    addBtn.setAttribute('aria-expanded','true')
    editor.setAttribute('aria-hidden','false')
  })
  $('#closePanel')?.addEventListener('click', ()=>{
    editor.classList.remove('open')
    addBtn.setAttribute('aria-expanded','false')
    editor.setAttribute('aria-hidden','true')
  })
  ;[...document.querySelectorAll<HTMLButtonElement>('.tab-btn')].forEach(b=>{
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

  $('#addSerie')?.addEventListener('click', ()=>{
    const nomeInput = $('#serieNome') as HTMLInputElement
    const name = (nomeInput?.value || '').trim()
    if (!name) return alert('Dê um nome à coleção.')
    SERIES.push({ nome: name, items: [] })
    save(LS_SERIES, SERIES)
    if (nomeInput) nomeInput.value = ''
    currentIndex = SERIES.length - 1
    syncSelect(); render(); toast('Coleção criada'); if (window.syncCloud) window.syncCloud()
  })

  $('#delSerie')?.addEventListener('click', ()=>{
    if (currentIndex < 0 || !SERIES[currentIndex]) return alert('Escolha a coleção para excluir.')
    const nome = SERIES[currentIndex].nome
    if (!confirm(`Excluir a coleção "${nome}"? Isso também removerá os checks desta coleção.`)) return
    const pruned: Record<string, boolean> = {}
    Object.keys(checks).forEach(k => { if (!k.startsWith(nome + '__')) pruned[k] = checks[k] })
    checks = pruned; save(LS_CHECKS, checks)
    SERIES.splice(currentIndex, 1); save(LS_SERIES, SERIES)
    currentIndex = SERIES.length ? Math.max(0, currentIndex-1) : -1
    syncSelect(); render(); toast('Coleção excluída'); if (window.syncCloud) window.syncCloud()
  })

  $('#addItem')?.addEventListener('click', ()=>{
    if (currentIndex < 0 || !SERIES[currentIndex]) return alert('Crie e selecione uma coleção.')
    const n = (document.querySelector('#itemNumero') as HTMLInputElement)?.value?.trim() || ''
    const m = (document.querySelector('#itemNome') as HTMLInputElement)?.value?.trim() || ''
    const u = (document.querySelector('#itemImg') as HTMLInputElement)?.value?.trim() || ''
    if (!n || !m) return alert('Informe número e modelo.')
    if (u && !isUrl(u)) return alert('URL inválida. Use http(s)://')
    SERIES[currentIndex].items.push({ n, modelo: m, img: u })
    save(LS_SERIES, SERIES)
    ;(document.querySelector('#itemNumero') as HTMLInputElement).value = ''
    ;(document.querySelector('#itemNome') as HTMLInputElement).value = ''
    ;(document.querySelector('#itemImg') as HTMLInputElement).value = ''
    renderPreview(); render(); toast('Item adicionado'); if (window.syncCloud) window.syncCloud()
  })

  // ----- Export / Import -----
  function todayStr(){ const d=new Date(); const p=(n:number)=>String(n).padStart(2,'0'); return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}` }
  function exportData(){
    const payload = { version:1, exportedAt:new Date().toISOString(), series: JSON.parse(JSON.stringify(SERIES)), checks: JSON.parse(JSON.stringify(checks)) }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `hotlist-backup-${todayStr()}.json`
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(a.href)
    toast('Backup exportado (.json)')
  }
  function validateImport(data:any){
    if (typeof data !== 'object' || data===null) throw new Error('no object')
    if (!('series' in data) || !('checks' in data)) throw new Error('missing keys')
    if (!Array.isArray(data.series)) throw new Error('series not array')
    if (typeof data.checks !== 'object' || data.checks===null) throw new Error('checks not object')
  }
  panelExport?.addEventListener('click', exportData)

  let importBuffer: any = null
  clearImport?.addEventListener('click', ()=>{
    importBuffer = null
    if (importFile) importFile.value = ''
    if (applyImport) applyImport.disabled = true
    if (importSummary) importSummary.textContent = ''
    toast('Seleção limpa')
  })
  importFile?.addEventListener('change', async (ev: Event)=>{
    importBuffer = null
    if (applyImport) applyImport.disabled = true
    if (importSummary) importSummary.textContent = ''
    const f = (ev.target as HTMLInputElement).files?.[0]
    if (!f) return
    try {
      const text = await f.text()
      const data = JSON.parse(text)
      validateImport(data)
      importBuffer = data
      const sc = Array.isArray(data.series) ? data.series.length : 0
      const ic = (data.series || []).reduce((acc: number, s: any) => acc + (Array.isArray(s.items) ? s.items.length : 0), 0)
      if (importSummary) importSummary.textContent = `Arquivo válido • Coleções: ${sc} • Itens: ${ic} • Exportado em: ${data.exportedAt || '?'}`
      if (applyImport) applyImport.disabled = false
    } catch {
      if (importSummary) importSummary.textContent = 'Arquivo inválido. Use um .json exportado pelo próprio app.'
      if (applyImport) applyImport.disabled = true
    }
  })
  applyImport?.addEventListener('click', ()=>{
    if (!importBuffer) return
    const mode = (document.querySelector('input[name="mergeMode"]:checked') as HTMLInputElement)?.value || 'merge'
    if (mode === 'replace') {
      if (!confirm('Isso vai substituir TODAS as coleções, itens e marcados pelos do arquivo. Continuar?')) return
      SERIES = JSON.parse(JSON.stringify(importBuffer.series || []))
      checks = JSON.parse(JSON.stringify(importBuffer.checks || {}))
      save(LS_SERIES, SERIES); save(LS_CHECKS, checks)
      syncSelect(); render(); toast('Importado (substituído)'); if (window.syncCloud) window.syncCloud()
    } else {
      const byName = new Map<string, Serie>((SERIES||[]).map(s=>[s.nome, { nome:s.nome, items:[...(s.items||[])] }]))
      ;(importBuffer.series || []).forEach((ns:Serie)=>{
        if (!byName.has(ns.nome)) byName.set(ns.nome, { nome:ns.nome, items:[...(ns.items||[])] })
        else {
          const tgt = byName.get(ns.nome)!;
          const seen = new Set((tgt.items||[]).map(it=>String(it.n)+'|'+(it.modelo||'')))
          ;(ns.items||[]).forEach(it=>{ const k=String(it.n)+'|'+(it.modelo||''); if(!seen.has(k)){ tgt.items.push({...it}); seen.add(k) } })
        }
      })
      SERIES = [...byName.values()]
      checks = { ...(checks||{}), ...(importBuffer.checks||{}) }
      save(LS_SERIES, SERIES); save(LS_CHECKS, checks)
      syncSelect(); render(); toast('Importado (mesclado)'); if (window.syncCloud) window.syncCloud()
    }
    importBuffer = null
    if (importFile) importFile.value = ''
    if (applyImport) applyImport.disabled = true
    if (importSummary) importSummary.textContent = ''
  })

  // ----- Modal events / teclado -----
  modal?.addEventListener('click', (ev)=>{ if ((ev.target as HTMLElement).id === 'modal') closeModal() })
  nextImg?.addEventListener('click', nextModal)
  prevImg?.addEventListener('click', prevModal)
  const keydownHandler = (e: KeyboardEvent)=>{ if(!modal.classList.contains('open')) return; if(e.key==='Escape') closeModal(); if(e.key==='ArrowRight') nextModal(); if(e.key==='ArrowLeft') prevModal() }
  window.addEventListener('keydown', keydownHandler)

  // ----- Share -----
  shareAll?.addEventListener('click', shareChecklist)

  // ----- Auth + Sync -----
  const provider = new GoogleAuthProvider()
  const isStandalone = window.matchMedia?.('(display-mode: standalone)')?.matches || (window as any).navigator.standalone === true
  getRedirectResult(auth).catch(()=>{})

  btnIn?.addEventListener('click', async ()=>{
    try {
      if (isStandalone) { await signInWithRedirect(auth, provider); return }
      await signInWithPopup(auth, provider)
    } catch (e:any) {
      if (e?.code === 'auth/popup-blocked' || e?.code === 'auth/operation-not-supported-in-this-environment') {
        await signInWithRedirect(auth, provider)
      } else if (e?.code === 'auth/unauthorized-domain') {
        alert('Domínio não autorizado no Firebase Authentication. Adicione rsorian0.github.io em Authentication → Settings → Authorized domains.')
      } else {
        alert('Falha ao entrar: ' + (e?.message || e))
      }
    }
  })
  btnOut?.addEventListener('click', ()=> signOut(auth))

  let unsubSnap: null | (()=>void) = null

  onAuthStateChanged(auth, async (user)=>{
    if (user){
      btnIn.style.display = 'none'
      userInfo.style.display = 'flex'
      userName.textContent = user.displayName || user.email || 'Usuário'
      userPhoto.src = user.photoURL || ''
      const ref = doc(db, 'users', user.uid, 'app', 'hotlist')
      const local = { series: load<Serie[]>(LS_SERIES, []), checks: load<Record<string, boolean>>(LS_CHECKS, {}) }
      const snap = await getDoc(ref)
      if (snap.exists()){
        const remote = (snap.data() as any).state || { series: [], checks: {} }
        const byName = new Map<string, Serie>((remote.series||[]).map((s:Serie)=>[s.nome, {...s, items:[...(s.items||[])]}]))
        ;(local.series||[]).forEach(s=>{ if(!byName.has(s.nome)) byName.set(s.nome, {...s, items:[...(s.items||[])]}) })
        const mergedSeries = [...byName.values()]
        const mergedChecks = { ...(remote.checks||{}), ...(local.checks||{}) }
        save(LS_SERIES, mergedSeries); save(LS_CHECKS, mergedChecks)
      } else {
        await setDoc(ref, { state: local, updatedAt: serverTimestamp() }, { merge:true })
      }
      unsubSnap = onSnapshot(ref, (docSnap)=>{
        if (!docSnap.exists()) return
        const remote = (docSnap.data() as any).state || { series: [], checks: {} }
        save(LS_SERIES, remote.series||[])
        save(LS_CHECKS, remote.checks||{})
        window.dispatchEvent(new CustomEvent('hotlist:remote-updated'))
      })
    } else {
      btnIn.style.display = 'inline-block'
      userInfo.style.display = 'none'
      if (unsubSnap) { unsubSnap(); unsubSnap = null }
    }
  })

  window.syncCloud = async function(){
    const u = auth.currentUser
    if (!u) return
    const ref = doc(db, 'users', u.uid, 'app', 'hotlist')
    const payload = {
      state: { series: load<Serie[]>(LS_SERIES, []), checks: load<Record<string, boolean>>(LS_CHECKS, {}) },
      updatedAt: serverTimestamp(),
    }
    await setDoc(ref, payload, { merge: true })
  }

  // Re-render quando vier update remoto
  const remoteUpdated = () => { checks = load(LS_CHECKS, {}); SERIES = load(LS_SERIES, []); syncSelect(); toast('Sincronizado da nuvem') }
  window.addEventListener('hotlist:remote-updated', remoteUpdated)

  // ----- Inicialização -----
  syncSelect()

  // ----- Service Worker (BASE_URL: ok p/ GitHub Pages) -----
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=>{
      navigator.serviceWorker
        .register((import.meta as any).env.BASE_URL + 'service-worker.js')
        .catch(()=>{})
    })
  }

  // ----- Teardown -----
  return () => {
    window.removeEventListener('keydown', keydownHandler)
    window.removeEventListener('hotlist:remote-updated', remoteUpdated)
    if (unsubSnap) unsubSnap()
  }
}