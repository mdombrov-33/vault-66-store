"use client";

import { goatQuestions } from "@/data/profile/goat/goat-questions";
import { useState } from "react";
import GoatIntro from "./GoatIntro";
import GoatQuestion from "./GoatQuestion";
import GoatAnswers from "./GoatAnswers";
import GoatResults from "./GoatResults";
import { GoatResultProps } from "@/types/profile";

function GoatTest({ skills }: GoatResultProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const currentQuestion = goatQuestions[currentQuestionIndex];

  const handleStart = () => {
    setHasStarted(true);
  };

  if (!hasStarted) {
    return <GoatIntro handleStart={handleStart} />;
  }

  if (isCompleted) {
    return <GoatResults skills={skills} />;
  }

  return (
    <section>
      <GoatQuestion
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
      />
      <GoatAnswers
        setAnswers={setAnswers}
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        setIsCompleted={setIsCompleted}
      />
    </section>
  );
}

export default GoatTest;
