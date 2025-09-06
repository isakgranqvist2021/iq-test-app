import { StartQuizCard } from 'components/start-quiz-button';
import { quizzes } from 'data/products';
import React from 'react';

export const metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <main
      className="container mx-auto px-2 py-8"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
      }}
    >
      {Object.entries(quizzes).map(([quizId, quiz]) => (
        <StartQuizCard key={quizId} quizId={parseInt(quizId, 10)} quiz={quiz} />
      ))}
    </main>
  );
}
