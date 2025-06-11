import { goatQuestions } from "@/data/profile/goat/goat-questions";
import { GoatBaseProps } from "@/types/profile";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function GoatQuestion({
  currentQuestionIndex,
  currentQuestion,
}: GoatBaseProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-xl font-[roboto-mono] text-muted-foreground">
          Question {currentQuestionIndex + 1} of {goatQuestions.length}
        </h4>
        <h3 className="text-2xl lg:text-3xl font-[roboto-mono] mt-2">
          {currentQuestion.question}
        </h3>
      </div>

      <AnimatePresence mode="wait">
        {currentQuestion.image && (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image
              src={currentQuestion.image}
              alt="Question image"
              width={400}
              height={400}
              sizes="(max-width: 768px) 80vw, 400px"
              className="rounded-md shadow-lg border border-muted object-contain mx-auto max-w-full h-auto"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GoatQuestion;
