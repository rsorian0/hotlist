import { useState, useEffect } from 'react'
import type { User } from 'firebase/auth'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRedirectResult(auth).catch(() => {})
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  const signIn = async () => {
    const provider = new GoogleAuthProvider()
    const isStandalone =
      window.matchMedia?.('(display-mode: standalone)')?.matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    try {
      if (isStandalone) { await signInWithRedirect(auth, provider); return }
      await signInWithPopup(auth, provider)
    } catch (e: unknown) {
      const err = e as { code?: string; message?: string }
      if (err?.code === 'auth/popup-blocked' || err?.code === 'auth/operation-not-supported-in-this-environment') {
        await signInWithRedirect(auth, provider)
      } else if (err?.code === 'auth/unauthorized-domain') {
        alert('Domínio não autorizado no Firebase. Adicione em Authentication → Settings → Authorized domains.')
      } else {
        alert('Falha ao entrar: ' + (err?.message || String(e)))
      }
    }
  }

  const signOutUser = () => signOut(auth)

  return { user, loading, signIn, signOut: signOutUser }
}
