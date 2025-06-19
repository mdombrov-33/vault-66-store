'use client'

import { Level, LockpickGameProps } from '@/types/profile'
import LockpickInfoPanel from './LockpickInfoPanel'
import LockpickForcePanel from './LockpickForcePanel'
import LockpickLock from './LockpickLock'
import { useState } from 'react'
import { useLockpickLogic } from './hooks/useLockpickLogic'

function LockpickGame({ lockpickSkill }: LockpickGameProps) {
  //* === Helper Functions ===
  //* Randomly pick a lock difficulty level from predefined options
  const getRandomLockLevel = (): Level['lockLevel'] => {
    const levels: Level['lockLevel'][] = ['Easy', 'Medium', 'Hard']
    return levels[Math.floor(Math.random() * levels.length)]
  }

  //* === Component State ===
  const [brokenPins, setBrokenPins] = useState(0) //* Tracks number of broken bobby pins
  const [resetCount, setResetCount] = useState(0) //* Tracks number of game resets
  const [lockLevel, setLockLevel] = useState<Level['lockLevel']>(getRandomLockLevel()) //* Current lock difficulty

  //* === Constants and Derived State ===
  //* Bobby pin attempts allowed per lock difficulty level
  const attemptsByLockLevel: Record<Level['lockLevel'], number> = {
    Easy: 5,
    Medium: 4,
    Hard: 3,
  }
  const bobbyPins = attemptsByLockLevel[lockLevel] //* Allowed attempts based on difficulty
  const remainingPins = bobbyPins - brokenPins //* Remaining attempts

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
    isBreaking,
    pinId,
  } = useLockpickLogic(lockpickSkill, lockLevel, setBrokenPins, brokenPins, bobbyPins, resetCount)

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
      <LockpickForcePanel forceChance={forceChance} />
    </section>
  )
}

export default LockpickGame
