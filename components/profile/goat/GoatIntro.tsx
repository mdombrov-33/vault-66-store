import { Button } from "@/components/ui/button";
import { useSoundPlayer } from "@/hooks/useSoundPlayer";
import { GoatIntroProps } from "@/types/profile";
import Image from "next/image";

function GoatIntro({ handleStart }: GoatIntroProps) {
  const { playClick } = useSoundPlayer();

  return (
    <section className="flex flex-col items-center justify-center text-center gap-6 pb-4">
      <Image
        width={400}
        height={400}
        src="/images/goat/welcome.png"
        alt="Vault 66 Welcome"
        className="shadow-lg rounded-lg border border-muted"
        priority
      />
      <h2 className="md:text-6xl text-5xl">Welcome to Vault 66</h2>
      <p className="md:text-3xl text-lg font-[roboto-mono] text-muted-foreground max-w-2xl">
        To take part in Vault life, you must pass the Generalized Occupational
        Aptitude Test (G.O.A.T).
      </p>
      <Button
        className="text-2xl px-8 py-4"
        onClick={() => {
          playClick();
          handleStart();
        }}
      >
        Start the GOAT Test
      </Button>
    </section>
  );
}

export default GoatIntro;
