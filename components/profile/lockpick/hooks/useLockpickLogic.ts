import { useState, useEffect, useRef, useCallback } from 'react'
import { LockLevel } from '@/types/profile'

export function useLockpickLogic(lockpickSkill: number, lockLevel: LockLevel['lockLevel']) {
  //* State to hold the current angle of the pin in degrees.
  //* Starts at 0° which means the pin is pointing straight up.
  const [pinAngle, setPinAngle] = useState(0)

  //* Reference to the SVG element so we can measure its position on the screen
  const svgRef = useRef<SVGSVGElement>(null)

  //* Pressure of the pin pin, which is accumulated as the player turns the lock outside the green zone
  //* This is used to determine if the pin will break when turning too hard
  const pressureRef = useRef(0)

  //* Randomly generate the start of the green zone (the area where the pin can be turned)
  const [greenZoneStart] = useState(() => {
    return Math.floor(Math.random() * 120 - 60) //* Random start between -60° and 60°
  })

  const [isEngaged, setIsEngaged] = useState(false) //* Track if the lock is engaged
  const [screwdriverAngle, setScrewdriverAngle] = useState(0) //* Track screwdriver angle
  const [isTurningLock, setIsTurningLock] = useState(false) //* Track if the lock is being turned
  const [isCracked, setIsCracked] = useState(false) //* Track if the lock is cracked
  const [brokenPins, setBrokenPins] = useState(0) //* Track number of broken pins

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCracked) return
      if (isEngaged && e.key.toLowerCase() === 'a') {
        setIsTurningLock(true) //* Start turning the lock on 'A' key press
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (isCracked) return
      if (e.key.toLowerCase() === 'a') {
        setIsTurningLock(false) //* Stop turning the lock on 'A' key release
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isEngaged, isCracked]) //* Only add listener when engaged

  //* Map lock levels to difficulty modifiers
  const difficultyModifier: Record<LockLevel['lockLevel'], number> = {
    Easy: 1,
    Medium: 0.7,
    Hard: 0.4,
  }

  //* Calculate the size of the green zone based on the lockpick skill
  function getGreenZoneSize(skill: number) {
    const minZone = 8
    const maxZone = 30
    const maxSkill = 80

    const normalizedSkill = Math.min(skill, maxSkill)

    //* Scale the skill with sqrt for smoothness
    return Math.floor(minZone + (maxZone - minZone) * Math.sqrt(normalizedSkill / maxSkill))
  }

  const greenZoneBased = getGreenZoneSize(lockpickSkill)
  const greenZoneSize = greenZoneBased * difficultyModifier[lockLevel]
  const greenZoneEnd = greenZoneStart + greenZoneSize //* Calculate end of the green zone

  const isSuccess = pinAngle >= greenZoneStart && pinAngle <= greenZoneEnd //* Check if pin is in the green zone

  //* Calculate distance from the green zone edges
  const getDistanceFromGreenZone = useCallback(
    (angle: number) => {
      if (angle < greenZoneStart) return greenZoneStart - angle
      if (angle > greenZoneEnd) return angle - greenZoneEnd
      return 0 //* Inside green zone
    },
    [greenZoneStart, greenZoneEnd]
  )

  //* === Screwdriver turning animation ===
  useEffect(() => {
    let animationFrame: number

    const update = () => {
      if (isCracked) return //* Stop all motion if lock is cracked

      if (isTurningLock) {
        const maxAngle = isSuccess ? 90 : 20
        setScrewdriverAngle((prev) => {
          const next = Math.min(prev + 1.5, maxAngle)
          if (next === 90 && isSuccess && !isCracked) {
            setIsCracked(true)
          }
          return next
        })
      } else {
        //* Gradually return to 0° if not turning and not cracked
        setScrewdriverAngle((prev) => {
          if (prev > 0) {
            return Math.max(prev - 2, 0)
          }
          return prev
        })
      }

      if (isTurningLock && !isSuccess) {
        const distance = getDistanceFromGreenZone(pinAngle)
        const dangerRatio = Math.min(distance / 90, 1) //* Normalized danger level (0 to 1)

        //* Increase pressure based on distance from green zone
        pressureRef.current += 0.5 + 1.5 * dangerRatio //* Base pressure + danger factor
        const breakingThreshold = 100 + Math.random() * 50 //*Normalized breaking threshold

        if (pressureRef.current >= breakingThreshold) {
          console.log('💥 PIN BROKE')
          setBrokenPins((prev) => prev + 1) //* Increment broken pins count
          setPinAngle(0) //* Reset pin angle
          setScrewdriverAngle(0) //* Reset screwdriver angle
          pressureRef.current = 0 //* Reset pressure
          return //* Stop further processing if pin broke
        }
      }

      if (!isTurningLock || isSuccess) {
        //* Slowly decay pressure over time to forgive light mistakes
        pressureRef.current = Math.max(pressureRef.current - 0.8, 0)
      }

      animationFrame = requestAnimationFrame(update)
    }

    animationFrame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animationFrame)
  }, [isTurningLock, isSuccess, isCracked, getDistanceFromGreenZone, pinAngle])

  //* === Handle mouse movement inside the SVG ===
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    if (!svg) return //* Safety check
    if (isCracked) return

    //* Get SVG bounding box
    const rect = svg.getBoundingClientRect()

    //* Mouse position relative to SVG
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    //* Lock center coordinates inside SVG (200x200)
    const centerX = 100
    const centerY = 100

    //* Vector from center to mouse
    const dx = mouseX - centerX
    const dy = mouseY - centerY

    //* Angle in radians between center and mouse pointer
    const radians = Math.atan2(dy, dx)

    //* Convert to degrees, adjust so 0° points up
    let degrees = radians * (180 / Math.PI) + 90

    //* === Calculate distance to green zone edges ===

    //* greenZoneStart and greenZoneEnd are available in the closure (state)
    let distance: number
    if (degrees < greenZoneStart) {
      distance = greenZoneStart - degrees
    } else if (degrees > greenZoneEnd) {
      distance = degrees - greenZoneEnd
    } else {
      distance = 0 //* inside green zone
    }

    //* Maximum distance for full "no rotation" effect
    const maxDistance = 90

    //* Calculate rotation strength: 1 = full rotation allowed, 0 = no rotation allowed
    const strength = Math.max(0, 1 - distance / maxDistance)

    //* Maximum rotation pin can have (full range is 90 degrees left/right)
    const maxRotation = 90

    //* Calculate allowed rotation range depending on strength
    const allowedRotation = strength * maxRotation

    //* Clamp degrees to the dynamic allowed range
    degrees = Math.max(-allowedRotation, Math.min(allowedRotation, degrees))

    //* Save the final angle to state
    setPinAngle(degrees)
  }

  return {
    svgRef,
    pinAngle,
    greenZoneStart,
    greenZoneEnd,
    isEngaged,
    setIsEngaged,
    screwdriverAngle,
    isTurningLock,
    setIsTurningLock,
    setIsCracked,
    isSuccess,
    difficultyModifier,
    handleMouseMove,
    brokenPins,
  }
}
