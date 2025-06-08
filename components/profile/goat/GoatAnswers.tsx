import { Button } from "@/components/ui/button";
import { GoatAnswersProps } from "@/types/profile";

function GoatAnswers({ currentQuestion, onAnswer }: GoatAnswersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
      {currentQuestion.answers.map((answer) => (
        <Button
          key={answer.id}
          onClick={() => onAnswer(answer.id)} // just call parent callback
          variant="ghost"
          className="text-center text-lg md:text-xl h-auto p-4 font-[roboto-mono] whitespace-normal break-words"
        >
          {answer.text}
        </Button>
      ))}
    </div>
  );
}

export default GoatAnswers;
