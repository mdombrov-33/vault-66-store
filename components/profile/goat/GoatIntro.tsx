import { Button } from "@/components/ui/button";
import { GoatIntroProps } from "@/types/profile";
import Image from "next/image";

function GoatIntro({ handleStart }: GoatIntroProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6">
      <Image
        width={500}
        height={500}
        src="/images/goat/welcome.png"
        alt="Vault 66 Welcome"
        className="shadow-lg rounded-lg border border-muted"
      />
      <h2 className="text-6xl">Welcome to Vault-66</h2>
      <p className="text-3xl font-[roboto-mono] text-muted-foreground max-w-2xl">
        To take part in Vault life, you must pass the Generalized Occupational
        Aptitude Test (G.O.A.T).
      </p>
      <Button className="text-2xl px-8 py-4" onClick={handleStart}>
        Start the GOAT Test
      </Button>
    </div>
  );
}

export default GoatIntro;
