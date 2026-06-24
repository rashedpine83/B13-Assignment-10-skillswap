import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { proposalId, taskTitle, freelancerEmail, amount } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: taskTitle,
              description: freelancerEmail,
            },

            unit_amount: Number(amount) * 100,
          },

          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?proposalId=${proposalId}`,

      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-cancel`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 },
    );
  }
}
