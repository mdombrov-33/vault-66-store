'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState, useMemo } from 'react'

export function useGlowClass(isActive: boolean) {
  const [isMounted, setIsMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const glowClass = useMemo(() => {
    if (!isMounted || !isActive) return ''
    return resolvedTheme === 'dark' ? 'crt-glow-dark' : 'crt-glow-light'
  }, [isMounted, isActive, resolvedTheme])

  return glowClass
}
