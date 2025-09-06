import { Quiz } from 'components/quiz';
import { quizzes } from 'data/products';
import { getQuizById } from 'database/quiz';
import React from 'react';
import { PageProps } from 'types/page';

export default async function QuizPage(props: PageProps<{ id: string }>) {
  const params = await props.params;

  if (!params.id) {
    return <div>Invalid quiz ID</div>;
  }

  const results = await getQuizById(params.id);

  if (!results) {
    return <div>Quiz not found</div>;
  }

  return (
    <section className="container mx-auto px-2 py-8">
      <Quiz quiz={quizzes[results.quizId]} results={results} />
    </section>
  );
}
