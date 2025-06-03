import Stripe from "stripe";
import { type NextRequest } from "next/server";
import db from "@/utils/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    // console.log("POST /api/payment called");

    const origin = req.headers.get("origin");
    const { orderId, cartId } = await req.json();
    // console.log("Received:", { orderId, cartId });

    const order = await db.order.findUnique({ where: { id: orderId } });
    const cart = await db.cart.findUnique({
      where: { id: cartId },
      include: { cartItems: { include: { product: true } } },
    });

    if (!order || !cart) {
      // console.log("Order or cart not found");
      return Response.json(
        { error: "Order or cart not found" },
        { status: 404 }
      );
    }

    const lineItems = cart.cartItems.map((item) => {
      const image = item.product.image;
      const price = item.product.price;

      if (!price || isNaN(price)) {
        throw new Error("Invalid product price");
      }

      return {
        quantity: item.amount,
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
            images: image ? [image] : [],
          },
          unit_amount: Math.round(price * 100),
        },
      };
    });

    // console.log("Line Items:", lineItems);

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: {
        orderId: order.id,
        cartId: cart.id,
      },
      line_items: lineItems,
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    // console.log("Stripe session created");
    return Response.json({ clientSecret: session.client_secret });
  } catch (err: any) {
    console.error("💥 Error in /api/payment:", err.message, err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
