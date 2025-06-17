import { goatQuestions } from '@/data/profile/goat/goat-questions'
import { GoatBaseProps } from '@/types/profile'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

function GoatQuestion({ currentQuestionIndex, currentQuestion }: GoatBaseProps) {
  return (
    <div className="w-full space-y-6">
      <div>
        <h4 className="text-3xl text-muted-foreground">
          Question {currentQuestionIndex + 1} of {goatQuestions.length}
        </h4>
        <h3 className="text-2xl lg:text-3xl font-[roboto-mono] mt-2">{currentQuestion.question}</h3>
      </div>

      {/* Only render image if it exists */}
      <AnimatePresence mode="wait">
        {currentQuestion.image && (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: 'easeIn' }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md ">
              <Image
                src={currentQuestion.image}
                alt="Question image"
                width={400}
                height={400}
                sizes="(max-width: 768px) 80vw, 450px"
                className="object-contain border border-muted rounded-lg shadow-lg"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GoatQuestion
