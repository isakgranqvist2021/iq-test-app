import getStripe from 'services/stripe';

export function useBuyNow(quizId: string) {
  return async () => {
    const stripe = await getStripe();
    if (!stripe) {
      console.error(`Stripe is ${stripe}`);
      return;
    }

    const body = JSON.stringify({
      quizId,
    });

    const res = await fetch('/api/cart/checkout', {
      body,
      method: 'POST',
    }).then((res) => res.json());

    await stripe.redirectToCheckout({ sessionId: res.sessionId });
  };
}
