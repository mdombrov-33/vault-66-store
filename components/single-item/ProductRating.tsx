import { fetchProductRating } from "@/utils/actions/review";
import { FaStar } from "react-icons/fa";

async function ProductRating({ productId }: { productId: string }) {
  const { rating, count } = await fetchProductRating(productId);

  const className = `flex gap-1 items-center text-2xl mt-1 mb-4`;
  const countValue = `(${count} reviews)`;
  return (
    <span className={className}>
      <FaStar role="img" aria-label="star" className="w-3 h-3" />
      {rating} {countValue}
    </span>
  );
}

export default ProductRating;
