import { Button } from "@/components/ui/button";
import Link from "next/link";

function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto p-8 space-y-16">
      <div>
        <h2 className="text-4xl font-bold uppercase mb-4">
          Welcome to Vault 66
        </h2>
        <p className="text-2xl leading-relaxed text-muted-foreground font-[roboto]">
          Vault 66 stands as a beacon of hope in the harsh wasteland, designed
          to maintain trade and supplies with the outside world. Our mission is
          simple: ensure the survival of our dwellers and provide trusted goods
          for travelers brave enough to venture beyond the vault doors.
        </p>
      </div>

      <div>
        <h2 className="text-4xl font-bold uppercase mb-4">Our Role</h2>
        <p className="text-2xl leading-relaxed text-muted-foreground font-[roboto]">
          As one of the few vaults maintaining open commerce with the Wasteland,
          Vault 66 serves as a crucial hub for supplies, trade, and knowledge.
          Our Overseer and dedicated dwellers work tirelessly to keep the vault
          safe, stocked, and ready for whatever dangers lurk beyond.
        </p>
      </div>

      <div>
        <h2 className="text-4xl font-bold uppercase mb-8">
          Meet the Vault Dwellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-primary/20 rounded-lg text-center">
            <img
              src="https://i.pravatar.cc/100?img=4"
              alt="Commander Lee"
              className="mx-auto rounded-full mb-2"
            />
            <h3 className="font-semibold text-3xl">Commander Lee</h3>
            <p className="text-lg italic font-[roboto]">
              Overseer of Vault 66, guiding our community through uncertain
              times with steady leadership.
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
              Scout and trader, keeping Vault 66 connected with the outside
              world to ensure a steady flow of goods.
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
              Power Armor expert, ready to defend the vault and lead expeditions
              into the wasteland.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button asChild size="lg" className="text-2xl">
          <Link href="/products">Check Our Inventory</Link>
        </Button>
      </div>
    </section>
  );
}

export default AboutPage;
