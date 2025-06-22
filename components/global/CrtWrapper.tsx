'use client'

import React from 'react'
import CRTEffect from 'vault66-crt-effect'
import 'vault66-crt-effect/dist/vault66-crt-effect.css'
import { useCrt } from '@/context/CrtContext'
import { useTheme } from 'next-themes'

interface CrtWrapperProps {
  children: React.ReactNode
}

export default function CrtWrapper({ children }: CrtWrapperProps) {
  const { enabled } = useCrt()
  const { theme, resolvedTheme } = useTheme()

  const isDarkMode = (theme === 'system' ? resolvedTheme : theme) === 'dark'

  const isCrtActive = enabled && isDarkMode

  return (
    <CRTEffect
      enabled={isCrtActive}
      sweepDuration={10}
      sweepThickness={8}
      enableScanlines={true}
      scanlineOpacity={0.2}
      enableSweep={true}
      enableGlow={false}
      enableFlicker={true}
      sweepStyle="classic"
    >
      {children}
    </CRTEffect>
  )
}
