'use client'

import React from 'react'
import NukaIcon from '@/public/svg/nukaicon.svg'

export default function NukaColaSpinner() {
  return (
    <div
      aria-label="Loading"
      role="status"
      style={{ perspective: '100px', display: 'inline-block' }}
    >
      <img
        src={NukaIcon}
        alt=""
        className="animate-spin-slow w-24 h-24"
        aria-hidden="true"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
