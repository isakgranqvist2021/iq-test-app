import { redirect, RedirectType } from 'next/navigation';
import React from 'react';
import { verifyAndCompletePayment } from 'services/payment';
import type { PageProps } from 'types/page';

export const metadata = {
  title: 'Payment Accepted',
};

export default async function Accepted(
  props: PageProps<undefined, { checkoutSessionId: string }>,
) {
  const searchParams = await props.searchParams;

  const checkoutSessionId = searchParams.checkoutSessionId;
  if (typeof checkoutSessionId !== 'string') {
    throw new Error('Invalid checkout session id');
  }

  const quizId = await verifyAndCompletePayment(checkoutSessionId);

  if (quizId) {
    return redirect(`/quiz/${quizId}/results`, RedirectType.replace);
  }

  return <p>payment accepted</p>;
}
