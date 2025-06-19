import { useRef } from 'react'
import {
  loopWiggleSrc,
  pickBreakSrc,
  pickStartSrc,
  pickVariantsSrc,
  unlockSrc,
} from '@/data/sounds/lockpick-sounds'

export function useLockpickSounds() {
  const pickIndex = useRef(0)
  const wiggleTimerRef = useRef<NodeJS.Timeout | null>(null)

  function playPickStartSound() {
    const audio = new Audio(pickStartSrc)
    audio.volume = 0.6
    audio.play()
  }

  function playPickBreakSound() {
    const audio = new Audio(pickBreakSrc)
    audio.volume = 0.9
    audio.play()
  }

  function playUnlockSound() {
    const audio = new Audio(unlockSrc)
    audio.volume = 1
    audio.play()
  }

  function playRandomPickVariant() {
    const audio = new Audio(pickVariantsSrc[pickIndex.current])
    audio.volume = 0.3
    audio.play()
    pickIndex.current = (pickIndex.current + 1) % pickVariantsSrc.length
  }

  function startLoopWiggleSound() {
    if (wiggleTimerRef.current) return // already active

    wiggleTimerRef.current = setInterval(() => {
      const audio = new Audio(loopWiggleSrc)
      audio.volume = 0.3
      audio.play()
    }, 180) //* Tweak to 120–180ms range fo intensity
  }

  function stopLoopWiggleSound() {
    if (wiggleTimerRef.current) {
      clearInterval(wiggleTimerRef.current)
      wiggleTimerRef.current = null
    }
  }

  return {
    playPickStartSound,
    playPickBreakSound,
    playUnlockSound,
    playRandomPickVariant,
    startLoopWiggleSound,
    stopLoopWiggleSound,
  }
}
