"use client";

import { useState } from "react";
import { goatQuestions } from "@/data/profile/goat/goat-questions";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function GoatPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = goatQuestions[currentQuestionIndex];

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleAnswer = (answerKey: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answerKey }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < goatQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    }
  };

  if (!hasStarted) {
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <Image
          width={500}
          height={800}
          src="/images/goat/welcome.png"
          alt="Vault 66 Welcome"
          className="shadow-lg rounded-lg"
        />
        <h2 className="text-6xl">Welcome to Vault-66</h2>
        <p className="text-3xl font-[roboto-mono] text-muted-foreground">
          To take part in Vault life, you must pass the GOAT test.
        </p>
        <Button className="text-3xl" size="lg" onClick={handleStart}>
          Start the GOAT Test
        </Button>
      </div>
    );
  }

  return (
    <div className="goat-test">
      <div className="question-header">
        <span>
          Question {currentQuestionIndex + 1} of {goatQuestions.length}
        </span>
        <h3>{currentQuestion.question}</h3>
        {currentQuestion.image && (
          <img src={currentQuestion.image} alt="Question image" />
        )}
      </div>

      <div className="answers">
        {Object.entries(currentQuestion.answers).map(([key, answer]) => (
          <button
            key={key}
            onClick={() => handleAnswer(key)}
            className={answers[currentQuestionIndex] === key ? "selected" : ""}
          >
            {answer}
          </button>
        ))}
      </div>

      <div className="navigation">
        <button onClick={handleBack} disabled={currentQuestionIndex === 0}>
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === goatQuestions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
