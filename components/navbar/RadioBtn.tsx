'use client'

import { Button } from '@/components/ui/button'
import { Radio } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useGlowClass } from './hooks/useGlowClass'
import { useNavbarContext } from './context/NavbarContext'
import { FakeRadioPlayer } from './FakeRadioPlayer'

//* PROXY RADIO SOURCE, NOT USED RIGHT NOW BECAUSE OF THE SOURCE TIMEOUT ISSUE
//* Initially proxied to avoid ssl issues with the radio source
//* Instead of using a proxy, we use a fake radio player that simulates the radio experience 🔧📻🧠💀
// const RADIO_SOURCE = 'https://vault66-radio.onrender.com/radio'

function RadioBtn() {
  const { isRadioEnabled, setIsRadioEnabled } = useNavbarContext()

  const handleClick = () => {
    if (!isRadioEnabled) {
      setIsRadioEnabled(true)
    } else {
      setIsRadioEnabled(false)
    }
  }

  const isRadioOn = isRadioEnabled
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
        {<Radio />}
      </Button>

      {isRadioEnabled && (
        <FakeRadioPlayer
          onError={() => {
            setIsRadioEnabled(false)
          }}
        />
      )}
    </>
  )
}

export default RadioBtn
