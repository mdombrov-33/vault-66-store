import { useState } from 'react'
import GoatAnswers from './GoatAnswers'
import GoatQuestion from './GoatQuestion'
import { goatQuestions } from '@/data/profile/goat/goat-questions'
import { GoatTestProps } from '@/types/profile'

function GoatTest({ setStage, setAnswers }: GoatTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const currentQuestion = goatQuestions[currentQuestionIndex]

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }))
    const isLast = currentQuestionIndex === goatQuestions.length - 1

    if (isLast) {
      setStage('tagging')
    } else {
      setCurrentQuestionIndex((i) => i + 1)
    }
  }

  return (
    <section className="flex items-center justify-center px-4 pb-12 md:pb-6 min-h-[70dvh] -mt-8">
      <div className="w-full max-w-4xl flex flex-col items-center text-center gap-y-6">
        <GoatQuestion
          currentQuestion={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
        />
        <GoatAnswers currentQuestion={currentQuestion} onAnswer={handleAnswer} />
      </div>
    </section>
  )
}

export default GoatTest
