/* eslint-disable @typescript-eslint/no-explicit-any */
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

declare global {
  interface Window {
    __modalFeed?: Array<{ img: string; alt: string }>
    syncCloud?: () => Promise<void>
  }
}

type SerieItem = { n?: string | number; modelo?: string; img?: string }
type Serie = { nome: string; items: SerieItem[] }

export function initLegacyRuntime() {
  // ===== Firebase (via .env local + Vite) =====
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
  enableIndexedDbPersistence(db).catch(() => {})

  // ===== DOM =====
  const $ = <T extends Element = Element>(sel: string) => document.querySelector<T>(sel)!

  const listEl = $('#list')
  const q = $('#q') as HTMLInputElement
  const addBtn = $('#addBtn') as HTMLButtonElement
  const editor = $('#editor') as HTMLDivElement
  const closePanel = $('#closePanel') as HTMLButtonElement

  const serieSel = $('#serieSel') as HTMLSelectElement
  const itensPreview = $('#itensPreview') as HTMLDivElement

  const panelExport = $('#panelExport') as HTMLButtonElement
  const shareAll = $('#shareAll') as HTMLButtonElement

  const importFile = $('#importFile') as HTMLInputElement
  const applyImport = $('#applyImport') as HTMLButtonElement
  const clearImport = $('#clearImport') as HTMLButtonElement
  const importSummary = $('#importSummary') as HTMLDivElement

  const btnIn = $('#btnSignIn') as HTMLButtonElement
  const btnOut = $('#btnSignOut') as HTMLButtonElement
  const userInfo = $('#userInfo') as HTMLDivElement
  const userName = $('#userName') as HTMLSpanElement
  const userPhoto = $('#userPhoto') as HTMLImageElement

  const prevImg = $('#prevImg') as HTMLButtonElement
  const nextImg = $('#nextImg') as HTMLButtonElement
  const modal = $('#modal') as HTMLDivElement
  const modalImg = $('#modalImg') as HTMLImageElement
  const toastEl = $('#toast') as HTMLDivElement

  // ===== Storage Keys =====
  const LS_SERIES = 'hw_series_v1'
  const LS_CHECKS = 'hw_checklist_v3'
  const DB_TAB = 'hw_ui_tab_v7'

  // ===== Utils =====
  const load = <T,>(k: string, d: T): T => {
    try { return (JSON.parse(localStorage.getItem(k) || 'null') ?? d) as T } catch { return d }
  }
  const save = (k: string, v: unknown) => localStorage.setItem(k, JSON.stringify(v))
  const toast = (msg: string) => { if (!toastEl) return; toastEl.textContent = msg; toastEl.classList.add('show'); setTimeout(() => toastEl.classList.remove('show'), 1600) }
  const isUrl = (u: string) => { try { const x = new URL(u); return x.protocol === 'http:' || x.protocol === 'https:' } catch { return false } }

  let checks: Record<string, boolean> = load(LS_CHECKS, {})
  let SERIES: Serie[] = load(LS_SERIES, [])
  let currentIndex = SERIES.length ? 0 : -1
  let unsubSnap: null | (() => void) = null

  const RARITY_COLORS: Record<string, string> = {
    base: 'transparent',
    th: '#c82d6b',
    super: 'linear-gradient(0deg,#ffb703,#fb5607 60%,#ff006e)',
  }
  const rarityFromName = (name = '') => {
    const n = name.toLowerCase()
    if (n.includes('super treasure')) return 'super'
    if (n.includes('(th)') || n.includes('treasure')) return 'th'
    return 'base'
  }
  const rarityColorFromName = (name: string) => RARITY_COLORS[rarityFromName(name)] || RARITY_COLORS.base

  function parseN(n: unknown){ const s = String(n ?? '').trim(); let m = s.match(/^(\d+)\s*[\/\-\|]\s*(\d+)\b/); if (m) return { has:true, num:+m[1], den:+m[2] }; m = s.match(/^(\d+)\b/); if (m) return { has:true, num:+m[1], den:null }; return { has:false, num:Number.POSITIVE_INFINITY, den:null } }
  function smartSortItems(arr: SerieItem[]){ return (arr||[]).slice().sort((a,b)=>{ const A=parseN(a?.n), B=parseN(b?.n); if(A.has!==B.has) return A.has?-1:1; if(A.num!==B.num) return A.num-B.num; if(A.den!=null&&B.den!=null&&A.den!==B.den) return A.den-B.den; return (a?.modelo||'').localeCompare(b?.modelo||'','pt-BR',{sensitivity:'base'}) }) }
  function sortAll(){ SERIES.forEach(s => s.items = smartSortItems(s.items||[])); save(LS_SERIES, SERIES) }

  function updateTotalsInline(badgeEl: HTMLElement | null, seriesWrapEl: HTMLElement | null){
    if (seriesWrapEl){ const t = seriesWrapEl.querySelectorAll('.row').length; const c = seriesWrapEl.querySelectorAll('.row .tick.checked').length; if (badgeEl) badgeEl.textContent = `${c}/${t}` }
    const all = document.querySelectorAll('#list .row').length
    const chk = document.querySelectorAll('#list .row .tick.checked').length
    const allEl = $('#all'); const chkEl = $('#chk')
    if (allEl) allEl.textContent = String(all)
    if (chkEl) chkEl.textContent = String(chk)
  }

  // ===== Render principal =====
  function render(){
    sortAll()
    if (!listEl) return
    listEl.innerHTML = ''
    let total = 0, done = 0
    const filter = (q?.value || '').toLowerCase().trim()
    const modalFeed: Array<{ img: string; alt: string }> = []

    ;(SERIES||[]).forEach(s=>{
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
      let c = 0, t = 0

      smartSortItems(s.items||[]).forEach(it=>{
        if (!(`${it.modelo||''} ${it.n||''} ${s.nome}`.toLowerCase().includes(filter))) return
        const row = document.createElement('div')
        row.className = 'row'
        row.style.setProperty('--accent-col', rarityColorFromName(it.modelo||''))

        // thumb + modal
        const thumbWrap = document.createElement('div')
        thumbWrap.className = 'thumb-wrap'
        const img = document.createElement('img')
        img.className = 'thumb'
        img.alt = it.modelo || ''
        img.setAttribute('data-src', it.img || '')
        ;(img as any).loading = 'lazy'
        thumbWrap.appendChild(img)
        const nm = (it.modelo||'').toLowerCase()
        if (nm.includes('(th)') || nm.includes('treasure')){
          const lab = document.createElement('div')
          const isSuper = nm.includes('super')
          lab.className = 'label' + (isSuper ? ' super' : '')
          lab.textContent = isSuper ? 'SUPER TH' : 'TH'
          thumbWrap.appendChild(lab)
        }
        const gidx = modalFeed.push({ img: it.img || '', alt: it.modelo || '' }) - 1
        thumbWrap.addEventListener('click', ()=> openModal(gidx))
        row.appendChild(thumbWrap)

        // meta
        const meta = document.createElement('div')
        meta.innerHTML = `<div class='muted'>${it.n||''}</div><div class='title'>${it.modelo||''}</div>`
        row.appendChild(meta)

        // check
        const key = s.nome + '__' + (it.n || '')
        const tick = document.createElement('div')
        tick.className = 'tick' + (checks[key] ? ' checked' : '')
        tick.innerHTML = `<svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>`
        const badgeElRef = () => grp.querySelector('#b-'+sid) as HTMLElement | null
        tick.addEventListener('click', ()=>{
          checks[key] = !checks[key]
          tick.classList.toggle('checked')
          save(LS_CHECKS, checks)
          updateTotalsInline(badgeElRef(), wrap)
          if (window.syncCloud) window.syncCloud()
        })
        row.appendChild(tick)

        wrap.appendChild(row)
        t++; total++; if (checks[key]) { c++; done++ }
      })

      grp.appendChild(wrap)
      const badge = grp.querySelector('#b-'+sid) as HTMLElement | null
      if (badge) badge.textContent = `${c}/${t}`
      listEl.appendChild(grp)
      setTimeout(()=>enableLazy(wrap), 0)
    })

    window.__modalFeed = modalFeed
    const allEl = $('#all'); const chkEl = $('#chk')
    if (allEl) allEl.textContent = String(total)
    if (chkEl) chkEl.textContent = String(done)
  }

  // ===== Lazy images =====
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

  // ===== Modal (galeria) =====
  let modalIndex = 0
  function openModal(i: number){ const feed = window.__modalFeed||[]; if(!feed.length) return; modalIndex = Math.max(0, Math.min(i, feed.length-1)); updateModal(); modal.classList.add('open') }
  function updateModal(){ const feed = window.__modalFeed||[]; if(!feed.length) return; const cur = feed[modalIndex]; modalImg.src = cur.img||''; modalImg.alt = cur.alt||'' }
  function closeModal(){ modal.classList.remove('open') }
  function nextModal(){ const feed = window.__modalFeed||[]; if(!feed.length) return; modalIndex = (modalIndex+1) % feed.length; updateModal() }
  function prevModal(){ const feed = window.__modalFeed||[]; if(!feed.length) return; modalIndex = (modalIndex-1+feed.length) % feed.length; updateModal() }

  // ===== Compartilhar =====
  function getVisibleItems(){
    const filter = (q?.value || '').toLowerCase().trim()
    const out: Array<{ serie: string; n?: string | number; modelo?: string; img?: string; checked:boolean }> = []
    ;(SERIES||[]).forEach(s=>{
      smartSortItems(s.items||[]).forEach(it=>{
        if (!(`${it.modelo||''} ${it.n||''} ${s.nome}`.toLowerCase().includes(filter))) return
        const key = s.nome + '__' + (it.n || '')
        out.push({ serie: s.nome, n: it.n, modelo: it.modelo, img: it.img, checked: !!checks[key] })
      })
    })
    return out
  }
  function shareChecklist(){
    const items = getVisibleItems()
    if (items.length === 0) { toast('Nada para compartilhar (lista vazia).'); return }
    const tem = items.filter(i => i.checked)
    const falta = items.filter(i => !i.checked)
    const filter = (q?.value || '').trim()
    const header = filter ? `Minha Hotlist (filtro: "${filter}")` : 'Minha Hotlist'
    const linesTem = tem.map(i => `• ${i.serie} — ${i.n||''} ${i.modelo}`)
    const linesFalta = falta.map(i => `• ${i.serie} — ${i.n||''} ${i.modelo}`)

    const MAX_LINES = 80
    let trimmedTem = linesTem.slice(0, Math.min(linesTem.length, Math.floor(MAX_LINES/2)))
    let trimmedFalta = linesFalta.slice(0, MAX_LINES - trimmedTem.length - 6)
    if (trimmedTem.length < linesTem.length) trimmedTem.push(`…(+${linesTem.length - trimmedTem.length} itens)`)
    if (trimmedFalta.length < linesFalta.length) trimmedFalta.push(`…(+${linesFalta.length - trimmedFalta.length} itens)`)

    const texto = ['📦 '+header, `✅ Tenho: ${tem.length}`, trimmedTem.join('\n'), '', `❌ Falta: ${falta.length}`, trimmedFalta.join('\n')].join('\n')

    if (navigator.share) {
      navigator.share({ title: 'Checklist Hot Wheels', text: texto }).catch(()=>{})
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank')
    }
  }

  // ===== UI básica =====
  q?.addEventListener('input', render)
  addBtn?.addEventListener('click', ()=>{ editor.classList.add('open'); addBtn.setAttribute('aria-expanded','true'); editor.setAttribute('aria-hidden','false') })
  closePanel?.addEventListener('click', ()=>{ editor.classList.remove('open'); addBtn.setAttribute('aria-expanded','false'); editor.setAttribute('aria-hidden','true') })
  shareAll?.addEventListener('click', shareChecklist)

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

  serieSel?.addEventListener('change', ()=>{ currentIndex = parseInt(serieSel.value, 10); renderPreview() })
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

  function syncSelect(){ if(!serieSel) return; serieSel.innerHTML = ''; SERIES.forEach((s,i)=>{ const o=document.createElement('option'); o.value=String(i); o.textContent=s.nome; serieSel.appendChild(o) }); if(SERIES.length===0) currentIndex=-1; if(currentIndex<0&&SERIES.length) currentIndex=0; if(currentIndex>=0&&SERIES[currentIndex]) serieSel.value=String(currentIndex); renderPreview(); render() }

  // ===== Import/Export =====
  function todayStr(){ const d=new Date(); const pad=(n:number)=>String(n).padStart(2,'0'); return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}` }
  function exportData(){
    const payload = { version:1, exportedAt:new Date().toISOString(), series:JSON.parse(JSON.stringify(SERIES)), checks:JSON.parse(JSON.stringify(checks)) }
    const blob = new Blob([JSON.stringify(payload,null,2)], { type:'application/json' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `hotlist-backup-${todayStr()}.json`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(a.href); toast('Backup exportado (.json)')
  }
  panelExport?.addEventListener('click', exportData)

  let importBuffer: any = null
  clearImport?.addEventListener('click', ()=>{ importBuffer=null; if(importFile) importFile.value=''; if(applyImport) applyImport.disabled=true; if(importSummary) importSummary.textContent=''; toast('Seleção limpa') })
  importFile?.addEventListener('change', async (ev: Event)=>{
    importBuffer = null; if(applyImport) applyImport.disabled = true; if(importSummary) importSummary.textContent = ''
    const f = (ev.target as HTMLInputElement).files?.[0]; if(!f) return
    try {
      const text = await f.text()
      const data = JSON.parse(text)
      if (typeof data !== 'object' || data === null || !Array.isArray(data.series) || typeof data.checks !== 'object') throw new Error('invalid')
      importBuffer = data
      const sc = data.series.length
      const ic = data.series.reduce((acc: number, s: any) => acc + (Array.isArray(s.items) ? s.items.length : 0), 0)
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
    if (mode === 'replace'){
      if (!confirm('Isso vai substituir TODAS as coleções, itens e marcados pelos do arquivo. Continuar?')) return
      SERIES = JSON.parse(JSON.stringify(importBuffer.series))
      checks = JSON.parse(JSON.stringify(importBuffer.checks))
      save(LS_SERIES, SERIES); save(LS_CHECKS, checks); syncSelect(); render(); toast('Importado (substituído)'); if (window.syncCloud) window.syncCloud()
    } else {
      const byName = new Map<string, Serie>(SERIES.map(s => [s.nome, s]))
      ;(importBuffer.series||[]).forEach((ns: Serie)=>{
        if (!byName.has(ns.nome)){
          byName.set(ns.nome, { nome: ns.nome, items: JSON.parse(JSON.stringify(ns.items||[])) })
        } else {
          const tgt = byName.get(ns.nome)!; const seen = new Set((tgt.items||[]).map(it => String(it.n)+'|'+(it.modelo||'')))
          ;(ns.items||[]).forEach((it)=>{ const key = String(it.n)+'|'+(it.modelo||''); if(!seen.has(key)){ tgt.items.push(JSON.parse(JSON.stringify(it))); seen.add(key) } })
        }
      })
      SERIES = Array.from(byName.values()); checks = { ...checks, ...(importBuffer.checks||{}) }
      save(LS_SERIES, SERIES); save(LS_CHECKS, checks); syncSelect(); render(); toast('Importado (mesclado)'); if (window.syncCloud) window.syncCloud()
    }
    importBuffer = null; if(importFile) importFile.value=''; if(applyImport) applyImport.disabled=true; if(importSummary) importSummary.textContent=''
  })

  // ===== Auth + Sync =====
  const provider = new GoogleAuthProvider()
  const isStandalone = window.matchMedia?.('(display-mode: standalone)')?.matches || (window as any).navigator.standalone === true
  getRedirectResult(auth).catch(()=>{})

  btnIn?.addEventListener('click', async ()=>{
    try {
      if (isStandalone) { await signInWithRedirect(auth, provider); return }
      await signInWithPopup(auth, provider)
    } catch (e: any) {
      if (e?.code === 'auth/popup-blocked' || e?.code === 'auth/operation-not-supported-in-this-environment') {
        await signInWithRedirect(auth, provider)
      } else if (e?.code === 'auth/unauthorized-domain') {
        alert('Domínio não autorizado no Firebase Authentication. Adicione seu domínio em Authentication → Settings → Authorized domains.')
      } else {
        alert('Falha ao entrar: ' + (e?.message || e))
      }
    }
  })
  btnOut?.addEventListener('click', ()=> signOut(auth))

  async function syncCloud(){
    const u = auth.currentUser; if (!u) return
    const ref = doc(db, 'users', u.uid, 'app', 'hotlist')
    const payload = { state: { series: load<Serie[]>(LS_SERIES, []), checks: load<Record<string, boolean>>(LS_CHECKS, {}) }, updatedAt: serverTimestamp() }
    await setDoc(ref, payload, { merge: true })
  }
  window.syncCloud = syncCloud

  onAuthStateChanged(auth, async (user)=>{
    if (user){
      if (btnIn) btnIn.style.display = 'none'
      if (userInfo) userInfo.style.display = 'flex'
      if (userName) userName.textContent = user.displayName || user.email || 'Usuário'
      if (userPhoto) userPhoto.src = user.photoURL || ''
      const ref = doc(db, 'users', user.uid, 'app', 'hotlist')
      const snap = await getDoc(ref)
      if (snap.exists()){
        const remote = (snap.data() as any).state || { series: [], checks: {} }
        const byName = new Map<string, Serie>((remote.series||[]).map((s:Serie)=>[s.nome, {...s, items:[...(s.items||[])]}]))
        ;(SERIES||[]).forEach(s=>{ if(!byName.has(s.nome)) byName.set(s.nome, {...s, items:[...(s.items||[])]}) })
        SERIES = [...byName.values()]
        checks = { ...(remote.checks||{}), ...(checks||{}) }
        save(LS_SERIES, SERIES); save(LS_CHECKS, checks); syncSelect(); render()
      } else {
        await setDoc(ref, { state: { series: SERIES, checks }, updatedAt: serverTimestamp() }, { merge:true })
      }
      unsubSnap = onSnapshot(ref, (docSnap)=>{
        if (!docSnap.exists()) return
        const remote = (docSnap.data() as any).state || { series: [], checks: {} }
        SERIES = remote.series || []
        checks = remote.checks || {}
        save(LS_SERIES, SERIES); save(LS_CHECKS, checks); syncSelect(); render()
      })
    } else {
      if (btnIn) btnIn.style.display = 'inline-block'
      if (userInfo) userInfo.style.display = 'none'
      if (unsubSnap) { unsubSnap(); unsubSnap = null }
    }
  })

  // ===== Inicialização =====
  const tabSaved = load(DB_TAB, 'tab-colecoes')
  if (tabSaved && tabSaved !== 'tab-colecoes') {
    document.querySelector<HTMLButtonElement>(`.tab-btn[data-tab="${tabSaved}"]`)?.click()
  }
  syncSelect()

  // Service Worker — usa BASE_URL para /hotlist/
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=>{
      const swUrl = `${import.meta.env.BASE_URL}service-worker.js`
      navigator.serviceWorker.register(swUrl).catch(()=>{})
    })
  }

  // Teardown
  return () => { if (unsubSnap) unsubSnap() }
}