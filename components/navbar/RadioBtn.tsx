'use client'

import { Button } from '@/components/ui/button'
import { Radio, Cog } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/utils/cn'
import { useGlowClass } from './hooks/useGlowClass'
import { useNavbarContext } from './context/NavbarContext'

const RADIO_SOURCE = 'https://fallout.fm:8444/falloutfm1.ogg'

function RadioBtn() {
  const { isRadioEnabled, setIsRadioEnabled } = useNavbarContext()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    if (!isRadioEnabled) {
      setIsLoading(true)
      setIsRadioEnabled(true)
    } else {
      setIsRadioEnabled(false)
      setIsLoading(false)
    }
  }

  const handleCanPlay = () => {
    setIsLoading(false)
  }

  const isRadioOn = isRadioEnabled && !isLoading
  const glowClass = useGlowClass(isRadioOn)
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={handleClick}
        className={cn(glowClass)}
        aria-pressed={isRadioEnabled}
        aria-label="Toggle Radio"
      >
        {isLoading ? <Cog className="animate-spin" aria-hidden="true" /> : <Radio />}
      </Button>

      {isRadioEnabled && (
        <audio
          src={RADIO_SOURCE}
          autoPlay
          onPlaying={handleCanPlay}
          onError={() => {
            setIsRadioEnabled(false)
            setIsLoading(false)
          }}
        />
      )}
    </>
  )
}

export default RadioBtn
