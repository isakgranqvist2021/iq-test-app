import { BuyResults } from 'components/buy-results';
import { QuizResults } from 'components/quiz-results';
import { getQuizById } from 'database/quiz';
import React from 'react';
import { PageProps } from 'types/page';

export default async function QuizResultsPage(
  props: PageProps<{ id: string }>,
) {
  const params = await props.params;

  if (!params.id) {
    return <div>Invalid test ID</div>;
  }

  const result = await getQuizById(params.id);

  if (!result) {
    return <div>Result not found</div>;
  }

  if (result.status === 'paid') {
    return <QuizResults result={result} />;
  }

  return <BuyResults id={params.id} />;
}
