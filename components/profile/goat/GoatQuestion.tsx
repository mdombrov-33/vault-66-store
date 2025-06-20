import { goatQuestions } from '@/data/profile/goat/goat-questions'
import { GoatBaseProps } from '@/types/profile'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

function GoatQuestion({ currentQuestionIndex, currentQuestion }: GoatBaseProps) {
  return (
    <div className="w-full flex flex-col space-y-8">
      {/* Question number + text */}
      <div className="flex flex-col items-center space-y-2 px-4">
        <h4 className="text-xl md:text-3xl text-muted-foreground font-light">
          Question {currentQuestionIndex + 1} of {goatQuestions.length}
        </h4>
        <h3 className="text-2xl lg:text-3xl font-[roboto-mono] font-semibold text-center max-w-3xl">
          {currentQuestion.question}
        </h3>
      </div>

      {/* Image container with fixed height */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-md h-[420px]">
          <AnimatePresence mode="wait">
            {currentQuestion.image && (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, ease: 'easeIn' }}
                className="absolute inset-0"
              >
                <Image
                  src={currentQuestion.image}
                  alt="Question image"
                  fill
                  sizes="(max-width: 768px) 80vw, 450px"
                  className="object-contain"
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default GoatQuestion
