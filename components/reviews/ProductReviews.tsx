import { fetchProductReviews } from "@/utils/actions";
import SectionTitle from "@/components/global/SectionTitle";
import ReviewCard from "./ReviewCard";

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId);

  return (
    <div className="mt-16">
      <SectionTitle text="product reviews" />
      {reviews.map((review) => {
        const { comment, rating, authorImageUrl, authorName } = review;
        const reviewInfo = {
          comment,
          rating,
          image: authorImageUrl,
          name: authorName,
        };
        return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
      })}
    </div>
  );
}

export default ProductReviews;
