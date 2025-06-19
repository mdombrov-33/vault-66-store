import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Level } from '@/types/profile'
import { useLockpickSounds } from './useLockpickSounds'

export function useLockpickLogic(
  lockpickSkill: number,
  lockLevel: Level['lockLevel'],
  setBrokenPins: React.Dispatch<React.SetStateAction<number>>,
  brokenPins: number,
  bobbyPins: number,
  resetCount: number
) {
  //* ==============================================
  //* REFS — persistent, non-reactive values
  //* ==============================================

  const svgRef = useRef<SVGSVGElement>(null) //* SVG element for positioning
  const pressureRef = useRef(0) //* Current "danger pressure"
  const hasLoopStartedRef = useRef(false) //* Whether wiggle loop is playing
  const lastVariantPlayRef = useRef(0) //* Last random pick sound timestamp
  const hasPlayedStartSoundRef = useRef(false) //* Not currently used, but here if needed later

  //* ==============================================
  //* SOUND HOOK
  //* ==============================================

  const {
    playPickStartSound,
    playPickBreakSound,
    playUnlockSound,
    playRandomPickVariant,
    startLoopWiggleSound,
    stopLoopWiggleSound,
  } = useLockpickSounds()

  //* ==============================================
  //* STATE — reactive values
  //* ==============================================

  const [pinAngle, setPinAngle] = useState(0) //* Lockpick angle in degrees (0 is up)
  const [screwdriverAngle, setScrewdriverAngle] = useState(0) //* Rotation attempt
  const [isEngaged, setIsEngaged] = useState(false) //* Has the lock been touched?
  const [isTurningLock, setIsTurningLock] = useState(false) //* Is the screwdriver rotating?
  const [isCracked, setIsCracked] = useState(false) //* Has the lock been successfully opened?
  const isGameOver = brokenPins >= bobbyPins || isCracked //* Is the game over?

  //* ==============================================
  //* GREEN ZONE SETUP — based on skill + difficulty
  //* ==============================================

  const difficultyModifier: Record<Level['lockLevel'], number> = {
    Easy: 1,
    Medium: 0.7,
    Hard: 0.4,
  }

  function getGreenZoneSize(skill: number) {
    const minZone = 8
    const maxZone = 30
    const maxSkill = 80
    const normalizedSkill = Math.min(skill, maxSkill)

    return Math.floor(minZone + (maxZone - minZone) * Math.sqrt(normalizedSkill / maxSkill))
  }

  const greenZoneBased = getGreenZoneSize(lockpickSkill)
  const greenZoneSize = greenZoneBased * difficultyModifier[lockLevel]
  const [greenZoneStart] = useState(() => Math.floor(Math.random() * 90 - 45))
  const greenZoneEnd = greenZoneStart + greenZoneSize

  const isSuccess = pinAngle >= greenZoneStart && pinAngle <= greenZoneEnd

  //* ==============================================
  //* UTILITY: distance from green zone
  //* ==============================================

  const getDistanceFromGreenZone = useCallback(
    (angle: number) => {
      if (angle < greenZoneStart) return greenZoneStart - angle
      if (angle > greenZoneEnd) return angle - greenZoneEnd
      return 0
    },
    [greenZoneStart, greenZoneEnd]
  )

  //* ==============================================
  //* RESET on attempt restart
  //* ==============================================

  useEffect(() => {
    setPinAngle(0)
    setScrewdriverAngle(0)
    setIsCracked(false)
    setIsTurningLock(false)
    setIsEngaged(false)
    pressureRef.current = 0
    hasPlayedStartSoundRef.current = false
    lastVariantPlayRef.current = 0
  }, [resetCount])

  //* ==============================================
  //* KEYBOARD: turn lock on "A" press
  //* ==============================================

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return

      if (isEngaged && e.key.toLowerCase() === 'a' && !isTurningLock) {
        setIsTurningLock(true)

        if (!hasPlayedStartSoundRef.current) {
          playPickStartSound()
          hasPlayedStartSoundRef.current = true
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (isGameOver) return

      if (e.key.toLowerCase() === 'a') {
        setIsTurningLock(false)
        hasPlayedStartSoundRef.current = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [
    isEngaged,
    isCracked,
    brokenPins,
    bobbyPins,
    isTurningLock,
    pinAngle,
    playPickStartSound,
    getDistanceFromGreenZone,
    isGameOver,
  ])

  //* ==============================================
  //* MAIN ANIMATION LOOP (screwdriver + danger)
  //* ==============================================

  useEffect(() => {
    let animationFrame: number

    const update = () => {
      if (isCracked) return

      if (isGameOver) {
        setIsTurningLock(false)
        stopLoopWiggleSound()
        hasLoopStartedRef.current = false
        return
      }

      if (isTurningLock) {
        const distance = getDistanceFromGreenZone(pinAngle)
        const strength = Math.max(0, 1 - distance / 90)
        const adjustedStrength = strength ** 2
        const maxAngle = 5 + adjustedStrength * 85

        setScrewdriverAngle((prev) => {
          const next = Math.min(prev + 1.5, maxAngle)
          if (next >= 90 && isSuccess && !isCracked) {
            setIsCracked(true)
            playUnlockSound()
          }
          return next
        })
      } else {
        setScrewdriverAngle((prev) => (prev > 0 ? Math.max(prev - 2, 0) : 0))
      }

      if (isTurningLock && !isSuccess) {
        const distance = getDistanceFromGreenZone(pinAngle)
        const dangerRatio = Math.min(distance / 90, 1)

        pressureRef.current += 0.5 + 1.5 * dangerRatio
        const breakingThreshold = 180 + Math.random() * 50

        if (pressureRef.current >= breakingThreshold) {
          setBrokenPins((prev) => prev + 1)
          setPinAngle(0)
          setScrewdriverAngle(0)
          pressureRef.current = 0
          stopLoopWiggleSound()
          hasLoopStartedRef.current = false
          playPickBreakSound()
          return
        }
      }

      if (!isTurningLock || isSuccess) {
        pressureRef.current = Math.max(pressureRef.current - 0.8, 0)
      }

      if (pressureRef.current >= 70 && !hasLoopStartedRef.current) {
        startLoopWiggleSound()
        hasLoopStartedRef.current = true
      }

      if ((!isTurningLock || pressureRef.current < 50) && hasLoopStartedRef.current) {
        stopLoopWiggleSound()
        hasLoopStartedRef.current = false
      }

      animationFrame = requestAnimationFrame(update)
    }

    animationFrame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animationFrame)
  }, [
    isTurningLock,
    isSuccess,
    isCracked,
    getDistanceFromGreenZone,
    pinAngle,
    setBrokenPins,
    startLoopWiggleSound,
    stopLoopWiggleSound,
    playPickBreakSound,
    playUnlockSound,
    isGameOver,
  ])

  //* ==============================================
  //* MOUSE MOVEMENT: Rotate pin with cursor
  //* ==============================================

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (brokenPins >= bobbyPins || isCracked) return

    const now = Date.now()
    if (now - lastVariantPlayRef.current > 300) {
      playRandomPickVariant()
      lastVariantPlayRef.current = now
    }

    const svg = svgRef.current
    if (!svg) return

    const rect = svg.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const centerX = 100
    const centerY = 100
    const dx = mouseX - centerX
    const dy = mouseY - centerY

    let degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90

    const distance =
      degrees < greenZoneStart
        ? greenZoneStart - degrees
        : degrees > greenZoneEnd
          ? degrees - greenZoneEnd
          : 0

    const strength = Math.max(0, 1 - distance / 90)
    const allowedRotation = strength * 90

    degrees = Math.max(-allowedRotation, Math.min(allowedRotation, degrees))
    setPinAngle(degrees)
  }

  //* ==============================================
  //* RETURN
  //* ==============================================

  return {
    svgRef,
    pinAngle,
    greenZoneStart,
    greenZoneEnd,
    isEngaged,
    isCracked,
    setIsEngaged,
    screwdriverAngle,
    isTurningLock,
    setIsTurningLock,
    setIsCracked,
    isSuccess,
    difficultyModifier,
    handleMouseMove,
  }
}
