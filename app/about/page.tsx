import { Button } from "@/components/ui/button";
import Link from "next/link";

function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto p-8 space-y-16">
      <div>
        <h2 className="text-3xl font-bold uppercase mb-4">Our Story</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          After the bombs fell, Vault 66 became a beacon for survivors seeking
          quality gear and trusted advice. We’re not just a store — we’re your
          companions in the wasteland. Whether it’s Power Armor or Nuka-Cola,
          we’ve got your back.
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-bold uppercase mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          To provide authentic, lore-accurate, and quality vault-themed gear
          that helps every survivor stand tall in the harsh wasteland.
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-bold uppercase mb-8">
          Meet the Vault Dwellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-primary/20 rounded-lg text-center">
            <img
              src="https://i.pravatar.cc/100?img=4"
              alt="Commander Lee"
              className="mx-auto rounded-full mb-2"
            />
            <h3 className="font-semibold">Commander Lee</h3>
            <p className="text-sm italic">
              The no-nonsense leader making sure everything runs smooth in Vault
              66.
            </p>
          </div>
          <div className="p-4 bg-primary/20 rounded-lg text-center">
            <img
              src="https://i.pravatar.cc/100?img=7"
              alt="Wanderer Kate"
              className="mx-auto rounded-full mb-2"
            />
            <h3 className="font-semibold">Wanderer Kate</h3>
            <p className="text-sm italic">
              Explorer and scavenger, always hunting down rare vault gear.
            </p>
          </div>
          <div className="p-4 bg-primary/20 rounded-lg text-center">
            <img
              src="https://i.pravatar.cc/100?img=15"
              alt="Ironclad"
              className="mx-auto rounded-full mb-2"
            />
            <h3 className="font-semibold">Ironclad</h3>
            <p className="text-sm italic">
              Power Armor specialist, makes sure you’re ready for anything out
              there.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Button asChild size="lg">
          <Link href="/products">Gear Up Now</Link>
        </Button>
      </div>
    </section>
  );
}

export default AboutPage;
