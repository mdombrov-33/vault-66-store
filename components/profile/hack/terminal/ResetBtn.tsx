import { Button } from "@/components/ui/button";

function ResetBtn({ resetGame }: { resetGame: () => void }) {
  return (
    <Button
      onClick={resetGame}
      size="lg"
      className="px-6 py-2 bg-primary text-black rounded hover:bg-primary/80 text-lg md:text-xl"
    >
      RETRY
    </Button>
  );
}

export default ResetBtn;
