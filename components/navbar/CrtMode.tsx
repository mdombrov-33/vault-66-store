'use client'

import { useCrt } from '@/context/CrtContext'
import { Button } from '@/components/ui/button'
import { TvIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useGlowClass } from './hooks/useGlowClass'
import { useTheme } from 'next-themes'

function CrtMode() {
  const { toggle, enabled } = useCrt()
  const { resolvedTheme } = useTheme()

  const glowClass = useGlowClass(enabled)

  if (resolvedTheme === 'dark') {
    return (
      <Button
        onClick={toggle}
        size="icon"
        variant="outline"
        aria-pressed={enabled}
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
