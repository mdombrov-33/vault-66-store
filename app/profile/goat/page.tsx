"use client";

import { useState } from "react";
import { goatQuestions } from "@/data/profile/goat/goat-questions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

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
      <div className="flex flex-col items-center justify-center text-center gap-6">
        <Image
          width={300}
          height={200}
          src="/images/goat/welcome.png"
          alt="Vault 66 Welcome"
          className="shadow-lg rounded-lg"
        />
        <h2 className="text-6xl font-bold font-vault">Welcome to Vault-66</h2>
        <p className="text-3xl font-mono text-muted-foreground max-w-2xl">
          To take part in Vault life, you must pass the Generalized Occupational
          Aptitude Test (G.O.A.T).
        </p>
        <Button className="text-2xl px-8 py-4" onClick={handleStart}>
          Start the GOAT Test
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 -mt-16">
      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
          variant="outline"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentQuestionIndex === goatQuestions.length - 1}
        >
          Next
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted h-2 rounded">
        <div
          className="bg-primary h-2 rounded"
          style={{
            width: `${
              ((currentQuestionIndex + 1) / goatQuestions.length) * 100
            }%`,
          }}
        />
      </div>

      <div className="min-h-[500px] space-y-10">
        {/* Question Header */}
        <div className="text-center space-y-4">
          <span className="text-xl font-mono text-muted-foreground">
            Question {currentQuestionIndex + 1} of {goatQuestions.length}
          </span>
          <h3 className="text-3xl font-bold font-[roboto-mono]">
            {currentQuestion.question}
          </h3>
          {currentQuestion.image && (
            <div className="flex justify-center">
              <Image
                width={400}
                height={400}
                src={currentQuestion.image}
                alt="Question image"
                className="rounded-md shadow-lg border border-muted"
              />
            </div>
          )}
        </div>

        {/* Answers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(currentQuestion.answers).map(([key, answer]) => {
            const isSelected = answers[currentQuestionIndex] === key;
            return (
              <Button
                key={key}
                onClick={() => handleAnswer(key)}
                variant={isSelected ? "default" : "outline"}
                className={cn(
                  "text-left justify-start text-base h-auto p-4 font-mono whitespace-normal break-words",
                  isSelected && "ring-2 ring-primary"
                )}
              >
                {answer.text}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
    </div>
  );
}
