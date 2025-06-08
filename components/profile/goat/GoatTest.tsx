import { useState } from "react";
import GoatAnswers from "./GoatAnswers";
import GoatQuestion from "./GoatQuestion";
import { goatQuestions } from "@/data/profile/goat/goat-questions";
import { GoatTestProps } from "@/types/profile";

export default function GoatTest({ setStage, setAnswers }: GoatTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = goatQuestions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
    const isLast = currentQuestionIndex === goatQuestions.length - 1;

    if (isLast) {
      setStage("tagging");
    } else {
      setCurrentQuestionIndex((i) => i + 1);
    }
  };

  return (
    <section>
      <GoatQuestion
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
      />
      <GoatAnswers currentQuestion={currentQuestion} onAnswer={handleAnswer} />
    </section>
  );
}
