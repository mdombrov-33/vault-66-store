import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          We are changing the way people shop
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground uppercase">
            Explore unique vault-themed products from the post-apocalyptic
            world. Gear up for the wasteland with exclusive items you won’t find
            anywhere else. Whether you’re a seasoned survivor or new to the
            wasteland, we’ve got you covered.
          </p>
          <Button asChild size="lg" className="mt-10">
            <Link href="/products">Our Products</Link>
          </Button>
        </h1>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;
