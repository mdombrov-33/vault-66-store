import { Button } from "@/components/ui/button";
import { goatQuestions } from "@/data/profile/goat/goat-questions";
import { GoatAnswersProps } from "@/types/profile";

function GoatAnswers({
  setAnswers,
  currentQuestion,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setIsCompleted,
}: GoatAnswersProps) {
  const handleAnswer = (answerKey: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answerKey }));

    const isLastQuestion = currentQuestionIndex === goatQuestions.length - 1;
    if (isLastQuestion) {
      setIsCompleted(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
      {currentQuestion.answers.map((answer) => (
        <Button
          key={answer.id}
          onClick={() => handleAnswer(answer.id)} // ✅ Use the actual answer ID (e.g. 'A', 'B')
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
