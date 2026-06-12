import { useState, useEffect } from 'react'

export function useDesktop(breakpoint = 768) {
  const [desktop, setDesktop] = useState(
    typeof window !== 'undefined' && window.innerWidth >= breakpoint
  )
  useEffect(() => {
    const fn = () => setDesktop(window.innerWidth >= breakpoint)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [breakpoint])
  return desktop
}
