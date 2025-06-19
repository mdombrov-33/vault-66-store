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
          ref={svgRef}
          viewBox="0 0 200 200"
          width="200"
          height="200"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsEngaged(true)}
          onMouseLeave={() => setIsEngaged(false)}
          className="cursor-none bg-terminal-background rounded-full border-[6px] border-muted shadow-inner"
        >
          {/* Outer lock casing */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="var(--card)"
            stroke="var(--muted-foreground)"
            strokeWidth="4"
          />

          {/* Inner ring for depth */}
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="var(--background)"
            stroke="var(--muted)"
            strokeWidth="2"
          />

          {/* Center hole */}
          <circle cx="100" cy="100" r="10" fill="var(--foreground)" />

          {/* Green zone arc */}
          <path
            d={describeArc(100, 100, 85, greenZoneStart, greenZoneEnd)}
            fill="none"
            stroke="lime"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* PIN */}
          <g transform={`rotate(${pinAngle}, 100, 100)`}>
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="40"
              stroke="gold"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* Screwdriver - New implementation */}
          {isEngaged && (
            <g transform={`rotate(${screwdriverAngle}, 100, 100)`}>
              {/* Start screwdriver below center */}
              <g transform="translate(75, 145)">
                {/* Rotate tip to point up into center */}
                <g transform="rotate(-60)">
                  <svg
                    width="52"
                    height="52"
                    viewBox="0 0 512 512"
                    style={{
                      overflow: 'visible',
                      display: 'block',
                    }}
                  >
                    {/* Handle */}
                    <path
                      fill="#c28e3b"
                      d="M75.72,497.487l-61.208-61.208c-8.745-8.745-8.351-23.039,0.862-31.288L165.34,270.685l75.973,75.973 L107.01,496.625C98.759,505.838,84.465,506.231,75.72,497.487z"
                    />
                    {/* Metal Shaft */}
                    <path
                      fill="#9e9ca1"
                      d="M500.283,35.68L476.32,11.716c-4.079-4.079-10.48-4.687-15.253-1.448l-43.15,29.278 c-4.571,3.101-6.441,8.919-4.533,14.103l3.021,8.209L213.113,265.149l33.736,33.736L450.141,95.594l8.209,3.021 c5.184,1.908,11.002,0.038,14.103-4.533l29.277-43.15C504.97,46.159,504.362,39.758,500.283,35.68z"
                    />
                  </svg>
                </g>
              </g>
            </g>
          )}
        </svg>
      </div>
    </>
  )
}

export default LockpickLock
