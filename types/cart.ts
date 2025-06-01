import { Prisma } from "@/lib/generated/prisma/client";
import { Mode } from "@/types/enums";

export type CartItem = {
  productId: string;
  image: string;
  title: string;
  price: string;
  amount: number;
  company: string;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};

export type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

//* Construct a new type that includes the product details for each cart item
//* If we just use CartItem prisma type, it won't include product details
export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;
