import Stripe from "stripe";
import { type NextRequest } from "next/server";
import db from "@/utils/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const reqHeaders = req.headers;
  const origin = reqHeaders.get("origin");

  const { orderId, cartId } = await req.json();

  const order = await db.order.findUnique({
    where: { id: orderId },
  });

  const cart = await db.cart.findUnique({
    where: { id: cartId },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order || !cart) {
    return Response.json(null, {
      status: 404,
      statusText: "Order or Cart not found",
    });
  }

  //* Stripe special format for line items. Properties should have the exact this format:
  //* Example is for one product in the cart, but we have an array
  //   return {
  //   quantity: 1,
  //   price_data: {
  //     currency: 'usd',
  //     product_data: {
  //       name: 'product name',
  //       images: ['product image url'],
  //     },
  //     unit_amount: cartItem.product.price * 100, // price in cents
  //   },
  // };

  const lineItems = cart.cartItems.map((cartItem) => {
    return {
      quantity: cartItem.amount,
      price_data: {
        currency: "usd",
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image],
        },
        unit_amount: cartItem.product.price * 100, // price in cents
      },
    };
  });

  try {
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
    return Response.json({
      clientSecret: session.client_secret,
    });
  } catch (error) {
    console.log(error);
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
