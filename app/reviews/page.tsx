import { deleteReviewAction, fetchProductReviewsByUser } from "@/utils/actions";
import ReviewCard from "@/components/reviews/ReviewCard";
import SectionTitle from "@/components/global/SectionTitle";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";

async function ReviewsPage() {
  const reviews = await fetchProductReviewsByUser();

  if (!reviews) return <SectionTitle text="No reviews found" />;

  return (
    <>
      <SectionTitle text="Your Reviews" />
      <section className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image } = review.product;
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          };

          return (
            <ReviewCard reviewInfo={reviewInfo} key={review.id}></ReviewCard>
          );
        })}
      </section>
    </>
  );
}

export default ReviewsPage;
