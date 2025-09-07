'use client';

import { QuizModel } from 'data/products';
import { useRouter } from 'next/navigation';
import React from 'react';

interface StartQuizButtonProps extends React.ComponentProps<'a'> {
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

export function StartQuizButton(props: StartQuizButtonProps) {
  const { children, quizId, ...rest } = props;

  const { isLoading, startQuiz } = useStartQuiz(quizId);

  return (
    <a className="btn btn-neutral w-full" onClick={startQuiz} {...rest}>
      {children}

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
