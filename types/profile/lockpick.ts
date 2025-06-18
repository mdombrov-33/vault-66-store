type LockpickSkill = {
  lockpickSkill: number
}

export type LockLevel = {
  lockLevel: 'Easy' | 'Medium' | 'Hard'
}

export type LockpickGameProps = LockpickSkill

export interface LockpickInfoPanelProps extends LockpickSkill {
  bobbyPins: number
  lockLevel: LockLevel['lockLevel']
}

export interface LockpickLockProps extends LockpickSkill {
  resetGame: () => void
  lockLevel: LockLevel['lockLevel']
}

export interface LockpickForcePanelProps {
  forceChance: number
}
