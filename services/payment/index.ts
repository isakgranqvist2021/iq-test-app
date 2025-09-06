import { env } from 'config';
import { updateStatus } from 'database/quiz';
import { createPayment, getPaymentByCheckoutSessionId } from 'database/payment';
import Stripe from 'stripe';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-05-28.basil',
});

export async function verifyAndCompletePayment(checkoutSessionId: string) {
  const paymentDocument =
    await getPaymentByCheckoutSessionId(checkoutSessionId);
  if (paymentDocument) return;

  const checkoutSession =
    await stripe.checkout.sessions.retrieve(checkoutSessionId);
  if (checkoutSession.payment_status !== 'paid') {
    throw new Error('Payment not completed');
  }

  if (!checkoutSession.metadata || !('quizId' in checkoutSession.metadata)) {
    throw new Error('No metadata found in checkout session');
  }

  const email =
    checkoutSession.customer_email ??
    checkoutSession.customer_details?.email ??
    null;
  const createPaymentDocumentResult = await createPayment({
    checkoutSessionId,
    email,
    amount: checkoutSession.amount_total ?? 0,
  });

  await updateStatus(checkoutSession.metadata.quizId, 'paid');

  if (!createPaymentDocumentResult?.acknowledged) {
    throw new Error('Payment document not created');
  }

  return checkoutSession.metadata.quizId;
}

export async function createCheckoutSession(
  params: Stripe.Checkout.SessionCreateParams,
) {
  const checkoutSession = await stripe.checkout.sessions.create(params);

  return checkoutSession;
}

export async function getCheckoutSession(
  checkoutSessionId: string,
): Promise<Stripe.Checkout.Session> {
  const checkoutSession =
    await stripe.checkout.sessions.retrieve(checkoutSessionId);

  if (!checkoutSession) {
    throw new Error('Checkout session not found');
  }

  return checkoutSession;
}
