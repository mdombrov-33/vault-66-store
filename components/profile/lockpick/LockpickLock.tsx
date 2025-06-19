'use client'

import { LockpickLockProps } from '@/types/profile'
import { describeArc } from '@/utils/geometry'

function LockpickLock({
  svgRef,
  isEngaged,
  setIsEngaged,
  greenZoneStart,
  greenZoneEnd,
  screwdriverAngle,
  pinAngle,
  handleMouseMove,
}: LockpickLockProps) {
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
          {/* Static outer circle (styled like original SVG) */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="var(--card)"
            stroke="var(--muted-foreground)"
            strokeWidth="4"
          />

          {/*  Outer ring */}
          <path
            d="M100 180C138.66 180 170 148.66 170 110C170 71.34 138.66 40 100 40C61.34 40 30 71.34 30 110C30 148.66 61.34 180 100 180Z"
            stroke="var(--muted-foreground)"
            strokeWidth="4"
            fill="none"
          />

          {/*Rotating inner keyhole */}
          <g transform={`rotate(${screwdriverAngle}, 100, 100)`}>
            <g transform="translate(-10, 0)">
              <path
                d="M114.4 118.3C113.9 116.8 113.7 116.2 113.8 115.7C113.9 115.1 114 114.8 114.2 114.4C114.4 114 115 113.5 116 112.6C118.5 110.3 120 107 120 103.5C120 97.7 115.3 93 109.5 93C103.7 93 99 97.7 99 103.5C99 107 100.5 110.3 103 112.6C104 113.5 104.6 114 104.8 114.4C105 114.8 105.1 115.1 105.2 115.7C105.3 116.2 105.1 116.8 104.6 118.3L100.8 130C100.2 131.8 99.9 132.7 100 133.3C100.2 134 100.7 134.6 101.3 135C102 135.5 103 135.5 105.1 135.5H114.9C117 135.5 118 135.5 118.7 135C119.3 134.6 119.8 134 120 133.3C120.1 132.7 119.8 131.8 119.2 130L115.4 118.3H114.4Z"
                stroke="var(--foreground)"
                strokeWidth="2"
                fill="var(--background)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>

          {/* Green zone arc overlaid */}
          <path
            d={describeArc(100, 100, 85, greenZoneStart, greenZoneEnd)}
            fill="none"
            stroke="lime"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Static center pin */}
          <g transform={`rotate(${pinAngle}, 100, 100)`}>
            <line
              x1="100"
              y1="105"
              x2="100"
              y2="45"
              stroke="var(--foreground)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* Screwdriver */}
          {isEngaged && (
            <g transform={`rotate(${screwdriverAngle}, 100, 100)`}>
              <g transform="translate(72, 165)">
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
                    <path
                      fill="#c28e3b"
                      d="M75.72,497.487l-61.208-61.208c-8.745-8.745-8.351-23.039,0.862-31.288L165.34,270.685l75.973,75.973 L107.01,496.625C98.759,505.838,84.465,506.231,75.72,497.487z"
                    />
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
