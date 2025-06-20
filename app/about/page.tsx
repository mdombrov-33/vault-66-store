'use client'

import { Button } from '@/components/ui/button'
import { useSoundPlayer } from '@/hooks/useSoundPlayer'
import Link from 'next/link'

function AboutPage() {
  const { playClick } = useSoundPlayer()

  return (
    <section className="max-w-4xl mx-auto p-8 space-y-16">
      <div>
        <h2 className="text-4xl font-bold uppercase mb-4">Welcome to Vault 66</h2>
        <p className="text-2xl leading-relaxed text-muted-foreground font-[roboto]">
          Vault 66 stands as a beacon of regulated prosperity in a world gone mad. Designed by
          Vault-Tec as a post-apocalyptic economic experiment, it remains one of the few vaults to
          maintain active trade relations with the Wasteland. Our mission is simple: ensure
          survival, foster commerce, and maybe make a few caps while we’re at it.
        </p>
      </div>

      <div>
        <h2 className="text-4xl font-bold uppercase mb-4">Our Role</h2>
        <p className="text-2xl leading-relaxed text-muted-foreground font-[roboto]">
          As a uniquely commerce-enabled vault, Vault 66 operates under the guiding principles of
          Vault-Tec’s Experimental Market Regulation Program (EMRP). Our dedicated dwellers manage
          inventory, conduct trade negotiations, and occasionally fend off raiders — all while
          upholding Vault-Tec’s gold standard of semi-ethical capitalism.
        </p>
      </div>

      <div>
        <h2 className="text-4xl font-bold uppercase mb-8">Meet the Vault Dwellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-primary/20 rounded-lg text-center">
            <img
              src="https://i.pravatar.cc/100?img=4"
              alt="Commander Lee"
              className="mx-auto rounded-full mb-2"
            />
            <h3 className="font-semibold text-3xl">Commander Lee</h3>
            <p className="text-lg italic font-[roboto]">
              Overseer of Vault 66, upholding order and quarterly profit reports with equal
              dedication. Leadership backed by Vault-Tec training and just a hint of paranoia.
            </p>
          </div>
          <div className="p-4 bg-primary/20 rounded-lg text-center">
            <img
              src="https://i.pravatar.cc/100?img=7"
              alt="Wanderer Kate"
              className="mx-auto rounded-full mb-2"
            />
            <h3 className="font-semibold text-3xl">Wanderer Kate</h3>
            <p className="text-lg italic font-[roboto]">
              Scavenger, scout, and part-time negotiator. Kate ensures our vault stays stocked with
              pre-War goods and keeps the caps flowing — when she's not dodging Deathclaws.
            </p>
          </div>
          <div className="p-4 bg-primary/20 rounded-lg text-center">
            <img
              src="https://i.pravatar.cc/100?img=15"
              alt="Ironclad"
              className="mx-auto rounded-full mb-2"
            />
            <h3 className="font-semibold text-3xl">Ironclad</h3>
            <p className="text-lg italic font-[roboto]">
              Veteran of multiple supply runs and master of power armor maintenance. Ironclad keeps
              our perimeter secure — and our enemies at a generous distance.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button asChild size="lg" className="text-2xl" onClick={playClick}>
          <Link href="/items">Check Our Inventory</Link>
        </Button>
      </div>
    </section>
  )
}

export default AboutPage
