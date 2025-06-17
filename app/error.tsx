'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ErrorPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center px-4 xl:mt-8 text-center">
      <Image
        src="/svg/brotherhood-error.svg"
        alt="Brotherhood error icon"
        width={264}
        height={264}
        className="mb-4"
      />
      <h1 className="xl:mt-6 text-4xl font-bold text-primary">
        System Alert: Core Integrity Compromised
      </h1>
      <p className="mt-2 text-xl text-muted-foreground max-w-md">
        Vault security protocols triggered an emergency lockdown.
        <br />
        Our tech specialists (and maybe a few Synths) are working to patch the issue.
        <br />
        Please stand by, or try rebooting your terminal.
      </p>
      <Button
        className="bg-primary text-2xl text-primary-foreground mt-6"
        size="lg"
        variant="default"
        onClick={() => router.push('/')}
      >
        Reboot Terminal
      </Button>
    </div>
  )
}
