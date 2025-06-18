'use client'

import { LockLevel, LockpickLockProps } from '@/types/profile'
import React, { useRef, useState } from 'react'

function LockpickLock({ lockpickSkill, resetGame, lockLevel }: LockpickLockProps) {
  //* State to hold the current angle of the pin in degrees.
  //* Starts at 0° which means the pin is pointing straight up.
  const [pinAngle, setPinAngle] = useState(0)

  //* Reference to the SVG element so we can measure its position on the screen
  const svgRef = useRef<SVGSVGElement>(null)

  //* Randomly generate the start of the green zone (the area where the pin can be turned)
  const [greenZoneStart, setGreenZoneStart] = useState(() => {
    return Math.floor(Math.random() * 120 - 60) //* Random start between -60° and 60°
  })

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

  //* Handle mouse movement inside the SVG
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    if (!svg) return //* Safety check

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

  //* Converts polar angle (in degrees) to (x, y) position
  function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const angleRad = (angleDeg - 90) * (Math.PI / 180)
    return {
      x: cx + r * Math.cos(angleRad),
      y: cy + r * Math.sin(angleRad),
    }
  }

  //* Builds an SVG arc path string from start and end angles
  function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(cx, cy, r, endAngle)
    const end = polarToCartesian(cx, cy, r, startAngle)

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

    return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ')
  }

  return (
    <>
      <div className="flex items-center justify-center max-h-[30dvh]">
        <svg
          ref={svgRef} //* Bind the SVG to the ref so we can access its bounding box
          viewBox="0 0 200 200" //* SVG coordinate system from (0,0) to (200,200)
          width="200"
          height="100"
          onMouseMove={handleMouseMove} // Track mouse movement
          className="cursor-none bg-background rounded-t-full border-2 border-muted-foreground"
        >
          {/* 
          Draw the top half of a circle (the lock shape).
          This uses an SVG "arc" command: 
          - Starts at (0, 100)
          - Arcs with radius 100 to (200, 100)
          */}
          <path d="M 0 100 A 100 100 0 0 1 200 100" fill="none" stroke="#888" strokeWidth="10" />
          <path
            d={describeArc(100, 100, 90, greenZoneStart, greenZoneEnd)}
            fill="none"
            stroke="lime"
            strokeWidth="8"
          />

          {/* 
          Draw the pin as a line rotated around the lock's center.
          <g> (group) is rotated to rotate the whole pin.
          */}
          <g transform={`rotate(${pinAngle}, 100, 100)`}>
            <line
              x1="100"
              y1="100" //* Start of the pin at center
              x2="100"
              y2="40" //* End of the pin (upward)
              stroke="gold"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
      <div className="mt-2 text-xl font-bold text-center">
        {isSuccess ? (
          <span className="text-green-500">✅ Unlocked!</span>
        ) : (
          <span className="text-red-500">❌ Not aligned</span>
        )}
      </div>
    </>
  )
}

export default LockpickLock
