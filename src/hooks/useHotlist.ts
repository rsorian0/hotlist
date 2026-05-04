import { useState, useCallback, useRef, useEffect } from 'react'
import type { User } from 'firebase/auth'
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'
import type { Serie, SerieItem, Ownership, OwnershipMap } from '../types'
import { load, save, LS_SERIES, LS_CHECKS } from '../lib/storage'
import { db } from '../lib/firebase'
import { normalizeState, stableJSON } from '../utils/normalize'
import { mergeSeries } from '../utils/io'
import { migrateOwnershipMap, toOwnership, isMeaningful } from '../utils/ownership'

export function useHotlist(user: User | null) {
  const [series, setSeries] = useState<Serie[]>(() => load<Serie[]>(LS_SERIES, []))
  const [checks, setChecks] = useState<OwnershipMap>(() =>
    migrateOwnershipMap(load<Record<string, boolean | Ownership>>(LS_CHECKS, {})),
  )

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

  const persistChecks = useCallback((next: OwnershipMap) => {
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
        const remote = (snap.data() as { state?: { series?: Serie[]; checks?: Record<string, boolean | Ownership> } }).state || { series: [], checks: {} }
        const merged = {
          series: mergeSeries(seriesRef.current, remote.series || []),
          checks: { ...migrateOwnershipMap(remote.checks), ...checksRef.current } as OwnershipMap,
        }
        persistSeries(merged.series)
        persistChecks(merged.checks)
      } else {
        const normalized = normalizeState({ series: seriesRef.current, checks: checksRef.current })
        setDoc(ref, { state: normalized, updatedAt: serverTimestamp() }, { merge: true })
      }

      unsub = onSnapshot(ref, (docSnap) => {
        if (!docSnap.exists() || docSnap.metadata.hasPendingWrites) return
        const remote = (docSnap.data() as { state?: { series?: Serie[]; checks?: Record<string, boolean | Ownership> } }).state || { series: [], checks: {} }
        const remoteNorm = normalizeState({ series: remote.series || [], checks: migrateOwnershipMap(remote.checks) })
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
    const pruned: OwnershipMap = {}
    for (const [k, v] of Object.entries(checksRef.current)) {
      if (!k.startsWith(`${nome}__`)) pruned[k] = v
    }
    persistChecks(pruned)
    const next = seriesRef.current.filter((_, i) => i !== index)
    persistSeries(next)
    scheduleSync()
  }, [persistSeries, persistChecks, scheduleSync])

  const updateItemMetaByKey = useCallback((key: string, partial: Partial<SerieItem>) => {
    const next = seriesRef.current.map((s) => {
      if (!key.startsWith(`${s.nome}__`)) return s
      return {
        ...s,
        items: s.items.map((it) => {
          if (`${s.nome}__${it.n || ''}` !== key) return it
          return { ...it, ...partial }
        }),
      }
    })
    persistSeries(next)
    scheduleSync()
  }, [persistSeries, scheduleSync])

  const removeItemByKey = useCallback((key: string) => {
    const next = seriesRef.current.map((s) => {
      if (!key.startsWith(`${s.nome}__`)) return s
      return { ...s, items: s.items.filter((it) => `${s.nome}__${it.n || ''}` !== key) }
    })
    persistSeries(next)
    const nextChecks = { ...checksRef.current }
    delete nextChecks[key]
    persistChecks(nextChecks)
    scheduleSync()
  }, [persistSeries, persistChecks, scheduleSync])

  const moveItemToSerie = useCallback((key: string, targetSerie: string) => {
    let movedItem: SerieItem | null = null
    const ownership = checksRef.current[key]

    // Remove from current série
    let next = seriesRef.current.map((s) => {
      if (!key.startsWith(`${s.nome}__`)) return s
      const item = s.items.find((it) => `${s.nome}__${it.n || ''}` === key)
      if (item) movedItem = item
      return { ...s, items: s.items.filter((it) => `${s.nome}__${it.n || ''}` !== key) }
    })

    if (!movedItem) return

    // Create target série if it doesn't exist
    if (!next.find((s) => s.nome === targetSerie)) {
      next = [...next, { nome: targetSerie, items: [] }]
    }

    // Add to target série
    next = next.map((s) =>
      s.nome === targetSerie ? { ...s, items: [...s.items, movedItem!] } : s,
    )

    persistSeries(next)

    // Migrate ownership key
    const newKey = `${targetSerie}__${(movedItem as SerieItem).n || ''}`
    const nextChecks = { ...checksRef.current }
    delete nextChecks[key]
    if (ownership) nextChecks[newKey] = ownership
    persistChecks(nextChecks)
    scheduleSync()
  }, [persistSeries, persistChecks, scheduleSync])

  const setOwnership = useCallback((key: string, partial: Partial<Ownership>) => {
    const current = checksRef.current[key] || { owned: false }
    const merged: Ownership = { ...current, ...partial }
    const next = { ...checksRef.current }
    if (isMeaningful(merged)) next[key] = merged
    else delete next[key]
    persistChecks(next)
    scheduleSync()
  }, [persistChecks, scheduleSync])

  const importData = useCallback(
    (data: { series: Serie[]; checks: Record<string, boolean | Ownership> }, mode: 'merge' | 'replace') => {
      const incoming = migrateOwnershipMap(data.checks)
      if (mode === 'replace') {
        persistSeries(JSON.parse(JSON.stringify(data.series)))
        persistChecks(JSON.parse(JSON.stringify(incoming)))
      } else {
        persistSeries(mergeSeries(seriesRef.current, data.series))
        const merged: OwnershipMap = { ...checksRef.current }
        for (const [k, v] of Object.entries(incoming)) {
          merged[k] = { ...merged[k], ...toOwnership(v) }
        }
        persistChecks(merged)
      }
      scheduleSync()
    },
    [persistSeries, persistChecks, scheduleSync],
  )

  const addItemQuick = useCallback(
    (serieNome: string, item: SerieItem, ownership?: Partial<Ownership>) => {
      let next = seriesRef.current
      if (!next.find((s) => s.nome === serieNome)) {
        next = [...next, { nome: serieNome, items: [] }]
      }
      next = next.map((s) =>
        s.nome === serieNome ? { ...s, items: [...s.items, item] } : s,
      )
      persistSeries(next)
      if (ownership && isMeaningful({ owned: false, ...ownership })) {
        const key = `${serieNome}__${item.n || ''}`
        const merged: Ownership = { owned: false, ...ownership }
        const nextChecks = { ...checksRef.current, [key]: merged }
        persistChecks(nextChecks)
      }
      scheduleSync()
    },
    [persistSeries, persistChecks, scheduleSync],
  )

  return {
    series,
    checks,
    addSerie,
    addItemQuick,
    deleteSerie,
    updateItemMetaByKey,
    removeItemByKey,
    moveItemToSerie,
    setOwnership,
    importData,
  }
}
