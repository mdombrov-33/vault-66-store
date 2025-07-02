'use client'

import { useEffect, useRef, useState } from 'react'

const RADIO_START_EPOCH = Date.UTC(2025, 6, 1, 0, 0, 0) / 1000

const playlist = [
  { url: '/audio/big_iron.mp3', duration: 237 },
  { url: '/audio/atom_bomb_baby.mp3', duration: 137 },
  { url: '/audio/uranium_fever.mp3', duration: 139 },
  { url: '/audio/civilization.mp3', duration: 183 },
  { url: '/audio/blue_moon.mp3', duration: 138 },
  { url: '/audio/anything_goes.mp3', duration: 191 },
  { url: '/audio/mighty_mighty_man.mp3', duration: 157 },
  { url: '/audio/world_on_fire.mp3', duration: 184 },
  { url: '/audio/way_back_home.mp3', duration: 182 },
  { url: '/audio/wonderful_guy.mp3', duration: 115 },
  { url: '/audio/crazy_he_sells_me.mp3', duration: 185 },
  { url: '/audio/easy_living.mp3', duration: 183 },
  { url: '/audio/happy_times.mp3', duration: 185 },
  { url: '/audio/into_each_live.mp3', duration: 190 },
  { url: '/audio/kick_in_the_head.mp3', duration: 147 },
  { url: '/audio/route66.mp3', duration: 171 },
]

export function FakeRadioPlayer({ onError }: { onError: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [seek, setSeek] = useState<number>(0)

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000)
    const elapsed = (now - RADIO_START_EPOCH) % playlist.reduce((a, b) => a + b.duration, 0)

    let cumulative = 0
    for (let i = 0; i < playlist.length; i++) {
      const track = playlist[i]
      if (elapsed < cumulative + track.duration) {
        setCurrentIndex(i)
        setSeek(elapsed - cumulative)
        break
      }
      cumulative += track.duration
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current || currentIndex === null) return

    const audio = audioRef.current
    audio.currentTime = seek
    audio.play().catch(onError)

    const handleEnded = () => {
      const nextIndex = (currentIndex + 1) % playlist.length
      setCurrentIndex(nextIndex)
      setSeek(0)
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', onError)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', onError)
    }
  }, [currentIndex, seek])

  if (currentIndex === null) return null

  return <audio ref={audioRef} src={playlist[currentIndex].url} autoPlay />
}
