'use client'

import { LockpickLockProps } from '@/types/profile'
import React, { useRef, useState } from 'react'

function LockpickLock({ lockpickSkill, resetGame }: LockpickLockProps) {
  //* State to hold the current angle of the pin in degrees.
  //* Starts at 0° which means the pin is pointing straight up.
  const [pinAngle, setPinAngle] = useState(0)

  //* Reference to the SVG element so we can measure its position on the screen
  const svgRef = useRef<SVGSVGElement>(null)

  //* Randomly generate the start of the green zone (the area where the pin can be turned)
  const [greenZoneStart, setGreenZoneStart] = useState(() => {
    return Math.floor(Math.random() * 120 - 60) //* Random start between -60° and 60°
  })

  const greenZoneSize = 20 //* Green zone is 20° wide
  const greenZoneEnd = greenZoneStart + greenZoneSize //* Calculate end of the green zone

  //* Handle mouse movement inside the SVG
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    if (!svg) return //* Safety check

    //* Get the SVG's position and size on the screen
    const rect = svg.getBoundingClientRect()

    //* Calculate mouse position relative to the SVG itself
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    //* Our lock is centered at (100, 100) inside the 200x200 SVG
    const centerX = 100
    const centerY = 100

    //* Distance from center of lock to the mouse
    const dx = mouseX - centerX
    const dy = mouseY - centerY

    //* Calculate angle in radians between center and mouse position
    const radians = Math.atan2(dy, dx)

    //* Convert radians to degrees
    //* Add 90 so 0° means "up", just like in Fallout (SVG default is right-facing 0°)
    let degrees = radians * (180 / Math.PI) + 90

    //* Clamp angle between -90° (left limit) and 90° (right limit)
    //* Prevents the pin from rotating behind the lock
    degrees = Math.max(-90, Math.min(90, degrees))

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
  )
}

export default LockpickLock
