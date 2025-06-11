import { goatQuestions } from "@/data/profile/goat/goat-questions";
import { GoatBaseProps } from "@/types/profile";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function GoatQuestion({
  currentQuestionIndex,
  currentQuestion,
}: GoatBaseProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 -mt-20 flex flex-col justify-center">
      <div className="text-center space-y-4">
        <h4 className="text-xl font-[roboto-mono] text-muted-foreground">
          Question {currentQuestionIndex + 1} of {goatQuestions.length}
        </h4>

        <h3 className="text-xl lg:text-3xl font-[roboto-mono]">
          {currentQuestion.question}
        </h3>

        <div className="flex justify-center items-center">
          <AnimatePresence mode="wait">
            {currentQuestion.image && (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="inline-block"
              >
                <Image
                  src={currentQuestion.image}
                  alt="Question image"
                  width={400}
                  height={400}
                  className="rounded-md shadow-lg border border-muted object-contain"
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default GoatQuestion;
