import { goatQuestions } from "@/data/profile/goat/goat-questions";
import { GoatBaseProps } from "@/types/profile";
import Image from "next/image";

function GoatQuestion({
  currentQuestionIndex,
  currentQuestion,
}: GoatBaseProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 -mt-16">
      <div>
        {/* HEADER QUESTION */}
        <div className="text-center space-y-4">
          <h4 className="text-xl font-[roboto-mono] text-muted-foreground">
            Question {currentQuestionIndex + 1} of {goatQuestions.length}
          </h4>
          <h3 className="text-3xl font-[roboto-mono]">
            {currentQuestion.question}
          </h3>
          {currentQuestion.image && (
            <div className="flex justify-center items-center">
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
      </div>
    </div>
  );
}
export default GoatQuestion;
