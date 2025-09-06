'use client';

import { QuizModel } from 'data/products';
import { useRouter } from 'next/navigation';
import React from 'react';

interface StartQuizButtonProps {
  quizId: number;
}

export function useStartQuiz(quizId: number) {
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useRouter();

  const startQuiz = async () => {
    setIsLoading(true);

    await fetch('/api/quiz/start', {
      method: 'POST',
      body: JSON.stringify({ quizId }),
    })
      .then((res) => res.json())
      .then((id) => {
        navigate.push(`/quiz/${id}`);
      })
      .catch((error) => {
        console.error('Error starting test:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, startQuiz };
}

export function StartQuizButton({ quizId }: StartQuizButtonProps) {
  const { isLoading, startQuiz } = useStartQuiz(quizId);

  return (
    <a className="btn btn-neutral w-full" onClick={startQuiz}>
      Begin
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      {isLoading && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
    </a>
  );
}

export function StartQuizCard({
  quizId,
  quiz,
}: {
  quizId: number;
  quiz: QuizModel;
}) {
  const { startQuiz, isLoading } = useStartQuiz(quizId);

  return (
    <div className="card bg-base-100 card-xs shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{quiz.title}</h2>
        <p>{quiz.description}</p>
        <div className="justify-end card-actions">
          <button className="btn btn-ghost btn-sm" onClick={startQuiz}>
            Start Quiz
            {isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
