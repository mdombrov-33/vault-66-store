"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";

function Hero() {
  const [isAnimationPlayed, setIsAnimationPlayed] = useState(false);

  useEffect(() => {
    const isPlayed = sessionStorage.getItem("heroAnimationPlayed");
    if (isPlayed) setIsAnimationPlayed(true);
  }, []);

  const finalSentence = "surface conditions: unknown. stock up accordingly";

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-5xl uppercase">
          Welcome to Vault 66 — Your Post-Apocalyptic Marketplace
        </h1>

        {isAnimationPlayed ? (
          <p className="mt-8 max-w-xl text-2xl leading-8 text-muted-foreground uppercase min-h-16">
            {finalSentence}
          </p>
        ) : (
          <TypeAnimation
            sequence={[
              "vault 66 online. initiating supply catalog...",
              4000,
              "remember: a prepared survivor is a safe survivor",
              3000,
              "all products approved by vault-tec",
              3000,
              finalSentence,
              3000,
              () => {
                setIsAnimationPlayed(true);
                sessionStorage.setItem("heroAnimationPlayed", "true");
              },
            ]}
            wrapper="p"
            className="mt-8 min-h-16 max-w-xl text-2xl leading-8 text-muted-foreground uppercase"
            repeat={0}
            speed={90}
            cursor={false}
          />
        )}

        <Button
          asChild
          size="lg"
          className="mt-10 text-2xl uppercase text-primary-foreground shadow-primary-glow hover:shadow-[0_0_15px_var(--shadow-glow-primary)] transition-all duration-300 ease-in-out "
        >
          <Link href="/products">access inventory</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;
