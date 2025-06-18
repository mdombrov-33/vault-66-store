'use client'

import { LockpickLockProps } from '@/types/profile'
import { useLockpickLogic } from './hooks/useLockpickLogic'
import { describeArc } from '@/utils/geometry'

function LockpickLock({
  lockpickSkill,
  lockLevel,
  setBrokenPins,
  bobbyPins,
  brokenPins,
}: LockpickLockProps) {
  const {
    pinAngle,
    svgRef,
    greenZoneStart,
    greenZoneEnd,
    isEngaged,
    setIsEngaged,
    screwdriverAngle,
    handleMouseMove,
  } = useLockpickLogic(lockpickSkill, lockLevel, setBrokenPins, brokenPins, bobbyPins)

  return (
    <>
      <div className="flex items-center justify-center max-h-[30dvh]">
        <svg
          ref={svgRef} //* Bind the SVG to the ref so we can access its bounding box
          viewBox="0 0 200 200" //* SVG coordinate system from (0,0) to (200,200)
          width="200"
          height="100"
          onMouseMove={handleMouseMove} //* Track mouse movement
          onMouseEnter={() => setIsEngaged(true)} //* Engage lock on mouse enter
          onMouseLeave={() => setIsEngaged(false)} //* Disengage lock on mouse leave
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
          {/* Screwdriver */}
          {isEngaged && (
            <g transform={`rotate(${screwdriverAngle}, 140, 100)`}>
              <g transform="translate(140, 100)">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="40"
                  stroke="gray"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </g>
            </g>
          )}
        </svg>
      </div>
    </>
  )
}

export default LockpickLock
