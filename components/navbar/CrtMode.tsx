'use client'

import { Button } from '@/components/ui/button'
import { TvIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useGlowClass } from './hooks/useGlowClass'
import { useTheme } from 'next-themes'
import { useCrtMode } from './hooks/useCrtMode'

function CrtMode() {
  const { resolvedTheme } = useTheme()
  const { toggle, isEnabled } = useCrtMode()

  const glowClass = useGlowClass(isEnabled)

  if (resolvedTheme === 'dark') {
    return (
      <Button
        onClick={toggle}
        size="icon"
        variant="outline"
        aria-pressed={isEnabled}
        aria-label="Toggle CRT Mode"
        className={cn(glowClass)}
      >
        <span className="sr-only">CRT Mode Toggle</span>
        <TvIcon />
      </Button>
    )
  }
  return null
}

export default CrtMode
