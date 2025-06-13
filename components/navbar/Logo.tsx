'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { useSoundPlayer } from '@/hooks/useSoundPlayer'

function Logo() {
  const { playClick } = useSoundPlayer()

  return (
    <Button
      onClick={playClick}
      size="lg"
      asChild
      className="hidden sm:flex sm:items-center sm:justify-center"
    >
      <Link href="/">
        <span className="uppercase text-3xl">vault 66</span>
      </Link>
    </Button>
  )
}

export default Logo
