'use client'

import { LineWithClickableWordsProps } from '@/types/profile'
import { cn } from '@/utils/cn'
import { useHackingSounds } from '../hooks/useHackingSounds'
import { useEffect } from 'react'

const allowedCharsRegex = /[^\&@]/g

//* Track last interaction globally
let lastInteractionWasKeyboard = false

function setupInteractionListeners() {
  if (typeof window !== 'undefined' && !(window as any)._hackingListenersAttached) {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') lastInteractionWasKeyboard = true
    })

    window.addEventListener('mousedown', () => {
      lastInteractionWasKeyboard = false
    })

    //* Prevent double-adding
    ;(window as any)._hackingListenersAttached = true
  }
}

function LineWithClickableWords({
  line,
  onGuess,
  setOnWordHover,
  gameOver,
}: LineWithClickableWordsProps) {
  const {
    playHackingHoverSound,
    playHackingClickSound,
    playHackingScrollSound,
    playHackingSuccessSound,
  } = useHackingSounds()

  useEffect(() => {
    setupInteractionListeners()
  }, [])

  const handleClick = (word: string) => {
    if (gameOver) return

    const isCorrect = onGuess(word)

    if (isCorrect) {
      playHackingSuccessSound()
    } else {
      playHackingClickSound()
    }
  }

  const handleMouseEnter = (word: string) => {
    if (gameOver) return
    setOnWordHover(word)
    playHackingHoverSound()
  }

  const handleMouseLeave = () => {
    if (gameOver) return
    setOnWordHover(null)
  }

  const handleFocus = (word: string) => {
    if (gameOver) return
    setOnWordHover(word)

    if (lastInteractionWasKeyboard) {
      playHackingScrollSound()
    }
  }

  return (
    <>
      {line.split(/(\[.*?\])/).map((part, idx) => {
        const isWord = part.startsWith('[') && part.endsWith(']')
        const word = part.slice(1, -1)

        return isWord ? (
          <button
            key={idx}
            onMouseEnter={() => handleMouseEnter(word)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleFocus(word)}
            onClick={() => handleClick(word)}
            className={cn(
              'all-none',
              !gameOver
                ? 'cursor-pointer focus:outline focus:outline-offset-1 hover:bg-[var(--terminal-hover-bg)] hover:text-[var(--terminal-hover-text)]'
                : 'focus:outline focus:outline-offset-1'
            )}
          >
            {word}
          </button>
        ) : (
          <span key={idx}>{part.match(allowedCharsRegex)?.join('')}</span>
        )
      })}
    </>
  )
}

export default LineWithClickableWords
