import { Button } from '@/components/ui/button'
import { useSoundPlayer } from '@/hooks/useSoundPlayer'
import { GoatIntroProps } from '@/types/profile'
import Image from 'next/image'

function GoatIntro({ handleStart }: GoatIntroProps) {
  const { playClick } = useSoundPlayer()
  return (
    <section className="flex flex-col items-center justify-between max-h-[70dvh] py-12 px-6 max-w-xl mx-auto text-center gap-8">
      <div className="relative w-full max-w-md aspect-square overflow-hidden">
        <Image
          src="/images/goat/welcome.png"
          alt="Vault 66 Welcome"
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 400px"
          className="object-contain"
          priority
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-5xl md:text-6xl font-bold leading-tight">Welcome to Vault 66</h2>
        <p className="text-lg md:text-2xl font-[roboto-mono] text-muted-foreground leading-relaxed max-w-lg mx-auto">
          To take part in Vault life, you must pass the Generalized Occupational Aptitude Test
          (G.O.A.T).
        </p>
      </div>

      <Button
        className="text-2xl px-10 py-4"
        onClick={() => {
          playClick()
          handleStart()
        }}
      >
        Start the GOAT Test
      </Button>
    </section>
  )
}

export default GoatIntro
