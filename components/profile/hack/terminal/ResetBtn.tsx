import { Button } from "@/components/ui/button";
import { ResetBtnProps } from "@/types/profile";

function ResetBtn({ resetGame, setOnWordHover }: ResetBtnProps) {
  return (
    <Button
      onClick={() => {
        resetGame();
        setOnWordHover(null);
      }}
      size="sm"
      className="px-6 py-2 bg-primary text-black rounded hover:bg-primary/80 md:text-xl"
    >
      RETRY
    </Button>
  );
}

export default ResetBtn;
