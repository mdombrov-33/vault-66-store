'use client'

import { LockLevel, LockpickGameProps } from '@/types/profile'
import LockpickInfoPanel from './LockpickInfoPanel'
import LockpickForcePanel from './LockpickForcePanel'
import LockpickLock from './LockpickLock'
import { useState } from 'react'

function LockpickGame({ lockpickSkill }: LockpickGameProps) {
  const getRandomLockLevel = (): LockLevel['lockLevel'] => {
    const levels: LockLevel['lockLevel'][] = ['Easy', 'Medium', 'Hard']
    return levels[Math.floor(Math.random() * levels.length)]
  }

  const [brokenPins, setBrokenPins] = useState(0) //* Track number of broken pins

  //* Map lock level to fixed bobby pins count
  const attemptsByLockLevel: Record<LockLevel['lockLevel'], number> = {
    Easy: 5,
    Medium: 4,
    Hard: 3,
  }

  const [lockLevel, setLockLevel] = useState<LockLevel['lockLevel']>(getRandomLockLevel())

  //* Bobby pins derived from lock level only
  const bobbyPins = attemptsByLockLevel[lockLevel]
  const remainingPins = bobbyPins - brokenPins

  //* numeric lock level for force chance
  const numericLockLevel = lockLevel === 'Easy' ? 1 : lockLevel === 'Medium' ? 2 : 3

  const forceChance = Math.max(0, lockpickSkill - numericLockLevel * 10)

  const resetGame = () => {
    setLockLevel(getRandomLockLevel())
    setBrokenPins(0)
  }

  return (
    <section className="grid grid-cols-3 gap-4 w-full h-dvh max-h-[60dvh] pb-22 lg:pb-0 ">
      <LockpickInfoPanel
        lockLevel={lockLevel}
        lockpickSkill={lockpickSkill}
        bobbyPins={bobbyPins}
        brokenPins={brokenPins}
        resetGame={resetGame}
        remainingPins={remainingPins}
      />
      <LockpickLock
        bobbyPins={bobbyPins}
        brokenPins={brokenPins}
        lockLevel={lockLevel}
        lockpickSkill={lockpickSkill}
        setBrokenPins={setBrokenPins}
      />
      <LockpickForcePanel forceChance={forceChance} />
    </section>
  )
}

export default LockpickGame
