import { useRef, useEffect } from 'react'
import { typingSoundsSrc, enterSoundSrc, spacebarSoundSrc } from '@/data/sounds/typing-sounds'

//* Typing user sounds for chat and nav search.
export function useTypingSounds() {
  const soundIndex = useRef(0)

  const enterSound = useRef<HTMLAudioElement | null>(null)
  const spacebarSound = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      enterSound.current = new Audio(enterSoundSrc)
      spacebarSound.current = new Audio(spacebarSoundSrc)
    }
  }, [])

  function playTypingSound() {
    if (typeof window === 'undefined') return
    const audio = new Audio(typingSoundsSrc[soundIndex.current])
    audio.volume = 0.4
    audio.play()

    soundIndex.current = (soundIndex.current + 1) % typingSoundsSrc.length
  }

  function playEnterSound() {
    if (!enterSound.current) return
    enterSound.current.volume = 0.4
    enterSound.current.currentTime = 0
    enterSound.current.play()
  }

  function playSpacebarSound() {
    if (!spacebarSound.current) return
    spacebarSound.current.volume = 0.4
    spacebarSound.current.currentTime = 0
    spacebarSound.current.play()
  }

  return { playTypingSound, playEnterSound, playSpacebarSound }
}
