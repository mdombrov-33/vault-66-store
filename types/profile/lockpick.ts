//* PROPS
export interface LockpickInfoPanelProps extends Pins, Skill, Resettable, Level {
  isCracked: boolean
}

//* Extend GreenZone here to see actual green zone arc
export interface LockpickLockProps extends Engagement, PinRotation, ScrewdriverRotation {
  svgRef: React.RefObject<SVGSVGElement | null>
  handleMouseMove: (e: React.MouseEvent<SVGSVGElement>) => void
  pressure: number
  isBreaking: boolean
  pinId: number
}

export type LockpickForcePanelProps = Force &
  Pick<Pins, 'remainingPins'> & {
    isCracked: boolean
  }
export type LockpickGameProps = Skill

//* BASE TYPES

//* Current lockpick skill numeric value of the user
type Skill = {
  lockpickSkill: number
}

//* Union of allowed lock levels by difficulty
export type Level = {
  lockLevel: 'Easy' | 'Medium' | 'Hard'
}

//* Pins state and logic
type Pins = {
  bobbyPins: number
  brokenPins: number
  remainingPins: number
}

//* Pins update logic, if needed in the future
// type PinsUpdate = {
//   setBrokenPins: Setter<number>
// }

//* Green zone for the pin debugging purposes
// type GreenZone = {
//   greenZoneStart: number
//   greenZoneEnd: number
// }

//* Rotation of the pin
type PinRotation = {
  pinAngle: number
}

type Setter<T> = React.Dispatch<React.SetStateAction<T>>

//* Track engagement state of the lock(are we currently turning it or not)
type Engagement = {
  isEngaged: boolean
  setIsEngaged: Setter<boolean>
}

//* Track screwdriver rotation angle
type ScrewdriverRotation = {
  screwdriverAngle: number
}

//* Reset game logic
type Resettable = {
  resetGame: () => void
}

//* Force logic based on lockpick skill and lock level
type Force = {
  forceChance: number
  onForceAttempt: () => void
}
