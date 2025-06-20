'use client'

import { useState } from 'react'
import { SubmitButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import { Card } from '@/components/ui/card'
import RatingInput from '@/components/reviews/RatingInput'
import TextAreaInput from '@/components/form/TextAreaInput'
import { Button } from '@/components/ui/button'
import { createReviewAction } from '@/utils/actions/review'
import { useUser } from '@clerk/nextjs' //* using useUser because this is a client component
import { useSoundPlayer } from '@/hooks/useSoundPlayer'

function SubmitReview({ productId }: { productId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)
  const { user } = useUser()
  const { playClick } = useSoundPlayer()

  return (
    <div>
      <Button
        size="lg"
        variant="default"
        className="capitalize mt-4 text-2xl"
        onClick={() => setIsReviewFormVisible((prev) => !prev)}
      >
        submit field report
      </Button>
      {isReviewFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="productId" value={productId} />
            <input type="hidden" name="authorName" value={user?.firstName || 'user'} />
            <input type="hidden" name="authorImageUrl" value={user?.imageUrl} />
            <RatingInput name="rating" />
            <TextAreaInput name="comment" labelText="field notes" />
            <SubmitButton
              className="mt-4 text-3xl"
              text="Submit Field Report"
              loadingText="Transmitting Review..."
              onClick={() => {
                playClick()
              }}
            />
          </FormContainer>
        </Card>
      )}
    </div>
  )
}

export default SubmitReview
