import { StartQuizButton } from 'components/start-quiz-button';
import { quizzes } from 'data/products';
import React from 'react';
import { PageProps } from 'types/page';

export const metadata = {
  title: 'Home',
};

export default async function StartQuizPage(props: PageProps<{ id: string }>) {
  const params = await props.params;

  if (!params.id) {
    return <div>Invalid quiz ID</div>;
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return <div>Invalid quiz ID</div>;
  }

  if (!quizzes[id]) {
    return <div>Quiz not found</div>;
  }

  const difficulty = quizzes[id].difficulty;
  const badgeVariant =
    difficulty === 'hard'
      ? 'badge-error'
      : difficulty === 'easy'
        ? 'badge-success'
        : 'badge-info';

  return (
    <main
      className="h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: 'url("/pexels-pixabay-356079.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-base-100 rounded-xl shadow-xl p-4">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <div className={`badge capitalize mb-2 ${badgeVariant}`}>
              {`Difficulty:`} {difficulty}
            </div>

            <h1 className="text-4xl font-bold text-secondary mb-2">
              {quizzes[id].title}
            </h1>
            <p className="py-4 text-lg text-base-content mb-2">
              {quizzes[id].description}
            </p>

            <StartQuizButton quizId={id} />
          </div>
        </div>
      </div>
    </main>
  );
}
