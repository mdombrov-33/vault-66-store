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

  //* Map lock level to fixed bobby pins count
  const attemptsByLockLevel: Record<LockLevel['lockLevel'], number> = {
    Easy: 5,
    Medium: 4,
    Hard: 3,
  }

  const [lockLevel, setLockLevel] = useState<LockLevel['lockLevel']>(getRandomLockLevel())

  //* Bobby pins derived from lock level only
  const bobbyPins = attemptsByLockLevel[lockLevel]

  //* numeric lock level for force chance or other logic
  const numericLockLevel = lockLevel === 'Easy' ? 1 : lockLevel === 'Medium' ? 2 : 3

  const forceChance = Math.max(0, lockpickSkill - numericLockLevel * 10)

  const resetGame = () => {
    setLockLevel(getRandomLockLevel())
  }

  return (
    <section className="grid grid-cols-3 gap-4 w-full h-dvh max-h-[60dvh] pb-22 lg:pb-0 ">
      <LockpickInfoPanel
        lockLevel={lockLevel}
        lockpickSkill={lockpickSkill}
        bobbyPins={bobbyPins}
      />
      {/* Pass skill and resetGame to lock for green zone and reset control */}
      <LockpickLock lockpickSkill={lockpickSkill} resetGame={resetGame} />
      <LockpickForcePanel forceChance={forceChance} />
    </section>
  )
}

export default LockpickGame
