type LockpickSkill = {
  lockpickSkill: number
}

export type LockLevel = {
  lockLevel: 'Easy' | 'Medium' | 'Hard'
}

export type LockpickGameProps = LockpickSkill

type LockpickGameState = {
  lockLevel: LockLevel['lockLevel']
  resetGame: () => void
}

type PinsCount = {
  bobbyPins: number
  brokenPins: number
  remainingPins: number
}

export interface LockpickInfoPanelProps extends LockpickSkill, PinsCount, LockpickGameState {}

export interface LockpickLockProps
  extends LockpickSkill,
    Omit<PinsCount, 'remainingPins'>,
    Pick<LockLevel, 'lockLevel'> {
  setBrokenPins: React.Dispatch<React.SetStateAction<number>>
}

export interface LockpickForcePanelProps {
  forceChance: number
}
