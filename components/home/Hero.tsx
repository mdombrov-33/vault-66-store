import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          We are changing the way people shop
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            beatae omnis autem, tenetur veritatis eius. Assumenda veniam sequi
            magnam id veritatis ipsum incidunt officiis, quas aliquid tempora
            sapiente. Dolor, eos? Labore dolore cupiditate ipsum aliquid
            provident minus, corporis consequuntur perferendis veniam laudantium
            esse dicta suscipit vel ratione vero enim rerum est quae temporibus
            modi sunt? Iste amet laborum beatae delectus?
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
