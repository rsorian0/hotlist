import { useState, useCallback, useRef, useEffect } from 'react'
import type { User } from 'firebase/auth'
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'
import type { Serie, SerieItem } from '../types'
import { load, save, LS_SERIES, LS_CHECKS } from '../lib/storage'
import { db } from '../lib/firebase'
import { normalizeState, stableJSON } from '../utils/normalize'
import { smartSortItems } from '../utils/sort'
import { mergeSeries } from '../utils/io'

export function useHotlist(user: User | null) {
  const [series, setSeries] = useState<Serie[]>(() => load<Serie[]>(LS_SERIES, []))
  const [checks, setChecks] = useState<Record<string, boolean>>(() => load<Record<string, boolean>>(LS_CHECKS, {}))

  const syncTimer = useRef<number | null>(null)
  const lastPushed = useRef('')
  const seriesRef = useRef(series)
  const checksRef = useRef(checks)

  useEffect(() => { seriesRef.current = series }, [series])
  useEffect(() => { checksRef.current = checks }, [checks])

  const persistSeries = useCallback((next: Serie[]) => {
    save(LS_SERIES, next)
    setSeries(next)
    seriesRef.current = next
  }, [])

  const persistChecks = useCallback((next: Record<string, boolean>) => {
    save(LS_CHECKS, next)
    setChecks(next)
    checksRef.current = next
  }, [])

  const pushToCloud = useCallback(async () => {
    if (!user) return
    const ref = doc(db, 'users', user.uid, 'app', 'hotlist')
    const normalized = normalizeState({ series: seriesRef.current, checks: checksRef.current })
    lastPushed.current = stableJSON(normalized)
    await setDoc(ref, { state: normalized, updatedAt: serverTimestamp() }, { merge: true })
  }, [user])

  const scheduleSync = useCallback((delay = 600) => {
    if (syncTimer.current) window.clearTimeout(syncTimer.current)
    syncTimer.current = window.setTimeout(pushToCloud, delay)
  }, [pushToCloud])

  // Firebase bootstrap + realtime listener
  useEffect(() => {
    if (!user) return
    const ref = doc(db, 'users', user.uid, 'app', 'hotlist')

    let unsub: (() => void) | null = null

    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        const remote = (snap.data() as { state?: { series?: Serie[]; checks?: Record<string, boolean> } }).state || { series: [], checks: {} }
        const merged = {
          series: mergeSeries(seriesRef.current, remote.series || []),
          checks: { ...(remote.checks || {}), ...checksRef.current },
        }
        persistSeries(merged.series)
        persistChecks(merged.checks)
      } else {
        const normalized = normalizeState({ series: seriesRef.current, checks: checksRef.current })
        setDoc(ref, { state: normalized, updatedAt: serverTimestamp() }, { merge: true })
      }

      unsub = onSnapshot(ref, (docSnap) => {
        if (!docSnap.exists() || docSnap.metadata.hasPendingWrites) return
        const remote = (docSnap.data() as { state?: { series?: Serie[]; checks?: Record<string, boolean> } }).state || { series: [], checks: {} }
        const remoteNorm = normalizeState({ series: remote.series || [], checks: remote.checks || {} })
        const remoteStr = stableJSON(remoteNorm)

        if (remoteStr === lastPushed.current) return
        const localStr = stableJSON(normalizeState({ series: seriesRef.current, checks: checksRef.current }))
        if (remoteStr === localStr) return

        persistSeries(remoteNorm.series)
        persistChecks(remoteNorm.checks)
      })
    })

    return () => { unsub?.() }
  }, [user, persistSeries, persistChecks])

  // Service Worker
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}service-worker.js`).catch(() => {})
    })
  }, [])

  // ── CRUD ──

  const addSerie = useCallback((nome: string): number => {
    const next = [...seriesRef.current, { nome, items: [] }]
    persistSeries(next)
    scheduleSync()
    return next.length - 1
  }, [persistSeries, scheduleSync])

  const deleteSerie = useCallback((index: number) => {
    const nome = seriesRef.current[index]?.nome
    if (!nome) return
    const pruned: Record<string, boolean> = {}
    for (const [k, v] of Object.entries(checksRef.current)) {
      if (!k.startsWith(`${nome}__`)) pruned[k] = v
    }
    persistChecks(pruned)
    const next = seriesRef.current.filter((_, i) => i !== index)
    persistSeries(next)
    scheduleSync()
  }, [persistSeries, persistChecks, scheduleSync])

  const addItem = useCallback((serieIndex: number, item: SerieItem) => {
    const next = seriesRef.current.map((s, i) =>
      i === serieIndex ? { ...s, items: [...s.items, item] } : s,
    )
    persistSeries(next)
    scheduleSync()
  }, [persistSeries, scheduleSync])

  const updateItem = useCallback((serieIndex: number, sortedItemIndex: number, item: SerieItem) => {
    const next = seriesRef.current.map((s, si) => {
      if (si !== serieIndex) return s
      const sorted = smartSortItems(s.items)
      const target = sorted[sortedItemIndex]
      const newItems = s.items.map((it) => (it === target ? item : it))
      return { ...s, items: newItems }
    })
    persistSeries(next)
    scheduleSync()
  }, [persistSeries, scheduleSync])

  const removeItem = useCallback((serieIndex: number, sortedItemIndex: number) => {
    const next = seriesRef.current.map((s, si) => {
      if (si !== serieIndex) return s
      const sorted = smartSortItems(s.items)
      const target = sorted[sortedItemIndex]
      return { ...s, items: s.items.filter((it) => it !== target) }
    })
    persistSeries(next)
    scheduleSync()
  }, [persistSeries, scheduleSync])

  const toggleCheck = useCallback((key: string) => {
    const next = { ...checksRef.current, [key]: !checksRef.current[key] }
    persistChecks(next)
    scheduleSync()
  }, [persistChecks, scheduleSync])

  const importData = useCallback(
    (data: { series: Serie[]; checks: Record<string, boolean> }, mode: 'merge' | 'replace') => {
      if (mode === 'replace') {
        persistSeries(JSON.parse(JSON.stringify(data.series)))
        persistChecks(JSON.parse(JSON.stringify(data.checks)))
      } else {
        persistSeries(mergeSeries(seriesRef.current, data.series))
        persistChecks({ ...checksRef.current, ...(data.checks || {}) })
      }
      scheduleSync()
    },
    [persistSeries, persistChecks, scheduleSync],
  )

  return { series, checks, addSerie, deleteSerie, addItem, updateItem, removeItem, toggleCheck, importData }
}
