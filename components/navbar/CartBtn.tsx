import Link from "next/link";
import { Button } from "../ui/button";
import { LucideShoppingCart } from "lucide-react";
import { fetchCartItems } from "@/utils/actions/cart";

async function CartBtn() {
  const numItemsInCart = await fetchCartItems();

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
    >
      <Link
        href="/supply-bin"
        aria-label={`Cart with ${numItemsInCart} item${
          numItemsInCart !== 1 ? "s" : ""
        }`}
      >
        <LucideShoppingCart />

        <span
          aria-hidden="true"
          className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-2xl"
        >
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
}

export default CartBtn;
