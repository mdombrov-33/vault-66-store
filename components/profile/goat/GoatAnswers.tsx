import { Button } from "@/components/ui/button";
import { GoatAnswersProps } from "@/types/profile";
import { useSoundPlayer } from "@/hooks/useSoundPlayer";

function GoatAnswers({ currentQuestion, onAnswer }: GoatAnswersProps) {
  const { playClick, playHover } = useSoundPlayer();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2 ">
      {currentQuestion.answers.map((answer) => (
        <Button
          key={answer.id}
          onClick={() => {
            playClick();
            onAnswer(answer.id);
          }}
          onMouseEnter={playHover}
          variant="ghost"
          className="text-center text-lg md:text-xl h-auto p-4 font-[roboto-mono] whitespace-normal break-words hover:text-foreground"
        >
          {answer.text}
        </Button>
      ))}
    </div>
  );
}

export default GoatAnswers;
