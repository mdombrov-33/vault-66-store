"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";
import { TypeAnimation } from "react-type-animation";

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl uppercase">
          Welcome to Vault-66 — Your Post-Apocalyptic Marketplace
        </h1>

        <TypeAnimation
          sequence={[
            `EXPLORE UNIQUE VAULT-THEMED PRODUCTS FROM THE POST-APOCALYPTIC WORLD. GEAR UP FOR THE WASTELAND WITH EXCLUSIVE ITEMS YOU WON’T FIND ANYWHERE ELSE. WHETHER YOU’RE A SEASONED SURVIVOR OR NEW TO THE WASTELAND, WE’VE GOT YOU COVERED.`,
            3000,
          ]}
          wrapper="p"
          className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground uppercase"
          cursor={false}
          repeat={Infinity}
          speed={85}
        />

        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;
