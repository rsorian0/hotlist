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
import { useToast } from '../contexts/ToastContext'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    // Captura resultado de redirect (fallback iOS PWA ou sessão anterior)
    getRedirectResult(auth).catch(() => {})
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  const signIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (e: unknown) {
      const err = e as { code?: string; message?: string }
      // Usuário fechou o popup — sem ação
      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') return
      // Popup bloqueado ou não suportado (ex.: iOS PWA) → fallback redirect
      if (err?.code === 'auth/popup-blocked' || err?.code === 'auth/operation-not-supported-in-this-environment') {
        try {
          await signInWithRedirect(auth, provider)
        } catch {
          toast('Não foi possível abrir a janela de login.', 'error')
        }
        return
      }
      if (err?.code === 'auth/unauthorized-domain') {
        toast('Domínio não autorizado. Adicione em Firebase → Authentication → Authorized domains.', 'error')
        return
      }
      toast('Falha ao entrar. Tente novamente.', 'error')
    }
  }

  const signOutUser = () => signOut(auth)

  return { user, loading, signIn, signOut: signOutUser }
}
