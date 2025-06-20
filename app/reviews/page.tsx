import { deleteReviewAction, fetchProductReviewsByUser } from '@/utils/actions/review'
import ReviewCard from '@/components/reviews/ReviewCard'
import SectionTitle from '@/components/global/SectionTitle'
import FormContainer from '@/components/form/FormContainer'
import { IconButton } from '@/components/form/Buttons'

//! FIXME: We don't see toaster notifications in this page after removing reviews.
//! Probably something to do with component unmounting or with using client components in a server component.
async function ReviewsPage() {
  const reviews = await fetchProductReviewsByUser()

  if (reviews.length === 0) return <SectionTitle text=":: NO FIELD REPORTS FOUND ::" />

  return (
    <>
      <SectionTitle text="FIELD REPORTS" />
      <section className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const { comment, rating } = review
          const { name, image } = review.product
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          }

          return (
            <ReviewCard reviewInfo={reviewInfo} key={review.id}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          )
        })}
      </section>
    </>
  )
}

function DeleteReview({ reviewId }: { reviewId: string }) {
  const deleteReview = deleteReviewAction.bind(null, { reviewId })
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  )
}

export default ReviewsPage
