'use client'
import React, { createContext, useContext, useState } from 'react'
import { NavbarContextType } from '@/types/nav'

//* This context is to save radio button state when navigating between pages(nav search)
const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRadioEnabled, setIsRadioEnabled] = useState(false)
  return (
    <NavbarContext.Provider
      value={{
        isRadioEnabled,
        setIsRadioEnabled,
      }}
    >
      {children}
    </NavbarContext.Provider>
  )
}

export const useNavbarContext = () => {
  const context = useContext(NavbarContext)
  if (!context) {
    throw new Error('useNavbarContext must be used within a NavbarProvider')
  }
  return context
}
