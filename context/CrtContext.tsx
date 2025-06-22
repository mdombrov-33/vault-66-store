'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

interface CrtContextType {
  enabled: boolean
  toggle: () => void
}

const CrtContext = createContext<CrtContextType | undefined>(undefined)

export const CrtProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, resolvedTheme } = useTheme()
  const [enabled, setEnabled] = useState(false)

  const isDarkMode = (theme === 'system' ? resolvedTheme : theme) === 'dark'

  useEffect(() => {
    if (!isDarkMode) {
      setEnabled(false)
    }
  }, [isDarkMode])

  const toggle = () => setEnabled((prev) => !prev)

  return <CrtContext.Provider value={{ enabled, toggle }}>{children}</CrtContext.Provider>
}

export function useCrt() {
  const context = useContext(CrtContext)
  if (!context) throw new Error('useCrt must be used within CrtProvider')
  return context
}
