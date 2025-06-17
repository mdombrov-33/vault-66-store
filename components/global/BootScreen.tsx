'use client'

import React, { useEffect, useState } from 'react'

export default function BootScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500) //* start fade after 1.5s
    const hideTimer = setTimeout(() => setVisible(false), 3000) //* hide after 2s
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      id="vault-loader"
      style={{
        position: 'fixed',
        textAlign: 'center',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background, black)',
        color: 'var(--foreground, white)',
        fontFamily: 'VT323, monospace',
        fontSize: '2.5rem',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        userSelect: 'none',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      [Booting Vault-Tec Systems...]
    </div>
  )
}
