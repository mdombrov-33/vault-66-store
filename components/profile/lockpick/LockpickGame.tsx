'use client'

import { Level, LockpickGameProps } from '@/types/profile'
import LockpickInfoPanel from './LockpickInfoPanel'
import LockpickForcePanel from './LockpickForcePanel'
import LockpickLock from './LockpickLock'
import { useState } from 'react'
import { useLockpickLogic } from './hooks/useLockpickLogic'
import { toast } from 'sonner'
import { useLockpickSounds } from './hooks/useLockpickSounds'

function LockpickGame({ lockpickSkill }: LockpickGameProps) {
  //* === Helper Functions ===
  //* Randomly pick a lock difficulty level from predefined options
  const getRandomLockLevel = (): Level['lockLevel'] => {
    const levels: Level['lockLevel'][] = ['Easy', 'Medium', 'Hard']
    return levels[Math.floor(Math.random() * levels.length)]
  }

  const onPinBroken = () => {
    setBrokenPins((prev) => prev + 1)
    setTotalBrokenPins((prev) => {
      const next = prev + 1
      localStorage.setItem('vault66_totalBrokenPins', next.toString())
      return next
    })
  }

  //* === Component State ===
  const [brokenPins, setBrokenPins] = useState(0) //* Tracks number of broken bobby pins
  const [resetCount, setResetCount] = useState(0) //* Tracks number of game resets
  const [lockLevel, setLockLevel] = useState<Level['lockLevel']>(getRandomLockLevel()) //* Current lock difficulty
  //* Total broken pins count
  const [totalBrokenPins, setTotalBrokenPins] = useState(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('vault66_totalBrokenPins') ?? '0')
    }
    return 0
  })

  //* === Constants and Derived State ===
  //* Bobby pin attempts allowed per lock difficulty level
  const attemptsByLockLevel: Record<Level['lockLevel'], number> = {
    Easy: 5,
    Medium: 4,
    Hard: 3,
  }
  const bobbyPins = attemptsByLockLevel[lockLevel] //* Allowed attempts based on difficulty
  const remainingPins = bobbyPins - brokenPins //* Remaining attempts

  const { playUnlockSound, playPickBreakSound } = useLockpickSounds()

  //* Numeric value representing lock difficulty for force chance calculation
  const numericLockLevel = lockLevel === 'Easy' ? 1 : lockLevel === 'Medium' ? 2 : 3

  //* Player’s chance to force open lock (skill vs difficulty)
  const forceChance = Math.max(0, lockpickSkill - numericLockLevel * 10)

  //* === Game Control Functions ===
  //* Reset the game state: choose new lock level, reset broken pins and increase reset count
  const resetGame = () => {
    setLockLevel(getRandomLockLevel())
    setResetCount((prev) => prev + 1)
    setBrokenPins(0)
  }

  //* Handle brute-force attempt to open the lock
  const handleForceAttempt = () => {
    if (isCracked || isGameOver) return

    const roll = Math.random() * 100
    if (roll <= forceChance) {
      setIsCracked(true)
      playUnlockSound()
      toast.success('You brute-forced the lock successfully!', {
        description: <span className="text-muted-foreground">The lock is now open.</span>,
        action: {
          label: 'Nice!',
          onClick: () => {},
        },
        icon: <img src="/toaster/happy-condition.png" alt="Success" />,
      })
    } else {
      onPinBroken()
      playPickBreakSound()
      toast.error('Attempt failed - pin broken.', {
        description: <span className="text-muted-foreground">Pins left: {remainingPins - 1}</span>,
        action: {
          label: 'Bummer',
          onClick: () => {},
        },
        icon: <img src="/toaster/sad-condition.png" alt="Failed" />,
      })
    }
  }

  //* === Custom Hook for Lockpick Logic ===
  //* Extract greenZoneStart and greenZoneEnd to see the actual green zone arc

  const {
    pinAngle,
    svgRef,
    isEngaged,
    setIsEngaged,
    screwdriverAngle,
    handleMouseMove,
    pressure,
    isCracked,
    setIsCracked,
    isBreaking,
    pinId,
    isGameOver,
  } = useLockpickLogic(lockpickSkill, lockLevel, onPinBroken, brokenPins, bobbyPins, resetCount)

  //* === Render ===
  return (
    <section className="grid grid-cols-3 gap-4 w-full h-dvh max-h-[60dvh] pb-22 lg:pb-0">
      {/* Info panel showing pins, lock level, and controls */}
      <LockpickInfoPanel
        brokenPins={brokenPins}
        bobbyPins={bobbyPins}
        isCracked={isCracked}
        resetGame={resetGame}
        remainingPins={remainingPins}
        lockpickSkill={lockpickSkill}
        lockLevel={lockLevel}
        totalBrokenPins={totalBrokenPins}
      />

      {/* Main lock UI with pin and screwdriver */}
      {/* Pass to props greenZoneStart greenZoneEnd to see actual green zone arc */}
      <LockpickLock
        svgRef={svgRef}
        isEngaged={isEngaged}
        setIsEngaged={setIsEngaged}
        screwdriverAngle={screwdriverAngle}
        pinAngle={pinAngle}
        handleMouseMove={handleMouseMove}
        pressure={pressure}
        isBreaking={isBreaking}
        pinId={pinId}
      />

      {/* Force panel showing chance to force lock open */}
      <LockpickForcePanel
        isCracked={isCracked}
        remainingPins={remainingPins}
        onForceAttempt={handleForceAttempt}
        forceChance={forceChance}
      />
    </section>
  )
}

export default LockpickGame
