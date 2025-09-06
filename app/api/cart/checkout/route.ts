import { getQuizById } from 'database/quiz';
import { createCheckoutSession } from 'services/payment';
import Stripe from 'stripe';

function getStripeCheckoutParams(quizId: string, email: string, url: string) {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: 'EUR',
        unit_amount: 100,
        product_data: { name: 'IQ Test Results' },
      },
      quantity: 1,
    },
  ];

  const metadata: Stripe.Metadata = {
    quizId,
  };

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    submit_type: 'pay',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: lineItems,
    success_url: `${url}/payment/accepted?checkoutSessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url}/payment/rejected`,
    metadata,
  };

  return params;
}

export async function POST(req: Request) {
  try {
    const params: { quizId: string } = await req.json();

    const quiz = await getQuizById(params.quizId);
    if (!quiz) {
      return new Response(
        JSON.stringify({
          statusCode: 404,
          message: 'IQ Test not found',
        }),
        { status: 404 },
      );
    }

    if (!quiz.email) {
      return new Response(
        JSON.stringify({
          statusCode: 400,
          message: 'Email is required',
        }),
        { status: 400 },
      );
    }

    const checkoutSessionParams = getStripeCheckoutParams(
      params.quizId,
      quiz.email,
      req.headers.get('origin') || 'http://localhost:3000',
    );

    const checkoutSession = await createCheckoutSession(checkoutSessionParams);

    return Response.json({ sessionId: checkoutSession.id });
  } catch (err) {
    console.error('Error during checkout:', err);

    return new Response(
      JSON.stringify({
        statusCode: 500,
        message: err instanceof Error ? err.message : 'Internal server error',
      }),
      { status: 500 },
    );
  }
}
