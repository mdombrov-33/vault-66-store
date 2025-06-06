import Stripe from "stripe";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import db from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  try {
    const session = await stripe.checkout.sessions.retrieve(
      sessionId as string
    );

    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;

    if (session.status === "complete") {
      await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
        },
      });
    }

    await db.cart.delete({
      where: { id: cartId },
    });
  } catch (error) {
    console.log(error);
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
  redirect("/orders");
}
