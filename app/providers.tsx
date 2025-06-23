'use client'

import { ThemeProvider } from './theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { NavbarProvider } from '@/components/navbar/context/NavbarContext'

import React from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <NavbarProvider>{children}</NavbarProvider>
      </ThemeProvider>
    </>
  )
}
