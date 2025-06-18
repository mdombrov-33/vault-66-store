'use client'

import { Button } from '@/components/ui/button'
import { useSoundPlayer } from '@/hooks/useSoundPlayer'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NotFoundPage() {
  const router = useRouter()
  const { playClick } = useSoundPlayer()

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 -mt-20  text-center">
      <Image
        src="/images/not-found.png"
        alt="Vault Boy searching with a magnifying glass"
        width={280}
        height={280}
        className="mb-6"
        priority
      />
      <h1 className="text-5xl font-extrabold text-primary mb-2">Error 404: Location Not Found</h1>
      <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed">
        Looks like even Vault Boy can’t find this place.
        <br />
        Maybe it’s a hidden vault, or the wasteland swallowed it whole.
        <br />
        Try heading back to safer ground.
      </p>
      <Button
        size="lg"
        variant="default"
        className="bg-primary text-primary-foreground text-2xl"
        onClick={() => {
          playClick()
          router.push('/')
        }}
        aria-label="Go back to homepage"
      >
        Return to Vault
      </Button>
    </div>
  )
}
