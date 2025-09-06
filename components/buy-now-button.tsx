'use client';

import { useBuyNow } from 'hooks/use-buy-now';

interface BuyNowButtonProps extends React.ComponentProps<'button'> {
  quizId: string;
  text: string;
}

export function BuyNowButton(props: BuyNowButtonProps) {
  const { quizId, text, ...buttonProps } = props;

  const buyNow = useBuyNow(quizId);

  return (
    <button onClick={buyNow} className="btn btn-primary" {...buttonProps}>
      {text}
    </button>
  );
}
