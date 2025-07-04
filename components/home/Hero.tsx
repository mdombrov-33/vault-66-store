'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import HeroCarousel from './HeroCarousel'
import { TypeAnimation } from 'react-type-animation'
import { useSoundPlayer } from '@/hooks/useSoundPlayer'

function Hero() {
  const { playClick } = useSoundPlayer()

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start">
        <h1 className="max-w-2xl font-medium text-4xl sm:text-6xl tracking-tight text-center lg:text-start uppercase">
          Welcome to Vault 66
        </h1>
        <p className="mt-2 max-w-2xl text-2xl sm:text-3xl tracking-tight text-center lg:text-start text-muted-foreground">
          Your Post-Apocalyptic Marketplace
        </p>

        <TypeAnimation
          sequence={[
            'vault 66 online. initiating supply catalog...',
            4000,
            'remember: a prepared survivor is a safe survivor',
            3000,
            'all products approved by vault-tec',
            3000,
            'surface conditions: unknown. stock up accordingly',
            5000,
          ]}
          wrapper="p"
          className="mt-8 min-h-16 max-w-xl md:text-2xl text-lg leading-8 text-muted-foreground uppercase"
          repeat={Infinity}
          speed={90}
          cursor={true}
        />

        <Button
          onClick={playClick}
          asChild
          size="lg"
          className="mt-10 text-2xl uppercase text-primary-foreground shadow-primary-glow hover:shadow-[0_0_15px_var(--shadow-glow-primary)] transition-all duration-300 ease-in-out "
        >
          <Link href="/items">access inventory</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  )
}

export default Hero
