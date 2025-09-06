'use client';

import {
  QuizModel,
  Question,
  Option,
  ImageOption,
  TextOption,
} from 'data/products';
import { QuizResultItem, QuizStringId } from 'database/quiz';
import React from 'react';

interface QuizProps {
  results: QuizStringId;
  quiz: QuizModel;
}

export function Quiz(props: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(
    props.results.result.length,
  );

  if (currentQuestionIndex >= props.quiz.questions.length) {
    return (
      <AddEmailForm
        email={props.results.email}
        id={props.results._id.toString()}
      />
    );
  }

  const question = props.quiz.questions[currentQuestionIndex];

  const selectOption = async (option: Option) => {
    const quizResultItem: QuizResultItem = {
      questionId: question.id,
      selectedOptionId: option.id,
    };

    await fetch(`/api/quiz/${props.results._id.toString()}`, {
      method: 'PUT',
      body: JSON.stringify(quizResultItem),
    });

    setCurrentQuestionIndex((prev) => prev + 1);

    if (currentQuestionIndex + 1 === props.quiz.questions.length) {
      await fetch(`/api/quiz/${props.results._id.toString()}/complete`, {
        method: 'PUT',
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PickOptionGrid question={question} onOptionClick={selectOption} />

      <p className="text-center">
        Question {currentQuestionIndex + 1} of {props.quiz.questions.length}
      </p>
    </div>
  );
}

function AddEmailForm(props: { id: string; email: string | null }) {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);
  const [lastEmailSentAt, setLastEmailSentAt] = React.useState<Date | null>();

  const sendEmail = async () => {
    if (isLoading) return;
    if (lastEmailSentAt) {
      const now = new Date();
      const secondsSinceLastSent =
        (now.getTime() - lastEmailSentAt.getTime()) / 1000;
      if (secondsSinceLastSent < 30) {
        alert(
          `Please wait ${30 - Math.floor(secondsSinceLastSent)} seconds before resending the email.`,
        );
        return;
      }
    }

    setIsLoading(true);

    await fetch(`/api/quiz/${props.id}/add-email`, {
      method: 'PUT',
      body: JSON.stringify({ email: props.email || email }),
    })
      .then(() => {
        setIsLoading(false);
        setIsSent(true);
        setLastEmailSentAt(new Date());
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const addEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    await sendEmail();
  };

  if (isSent || props.email) {
    return (
      <div className="hero bg-base-200 w-fit mx-auto p-5 rounded">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <p className="py-6">
              {isLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-36 mb-4 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-36 mb-4 mx-auto text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              )}
              Your results have been sent to
              <span className="text-secondary mx-1">
                {props.email || email}.
              </span>
              Check your inbox for the results!
            </p>

            <button className="btn btn-neutral" onClick={sendEmail}>
              Send again
              {isLoading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </button>

            <p className="text-sm text-gray-500 py-6">
              Please check your spam folder if you {"don't"} see the email in
              your inbox.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-2 max-w-md mx-auto">
      <img src="/giphy.gif" alt="" />
      <div>
        <h1 className="text-xl font-bold">Your results are ready!</h1>
        <p className="mt-2">Enter your email below to receive your results</p>
      </div>

      <form className="flex flex-col gap-2" onSubmit={addEmail}>
        <input
          className="input w-full"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        <button type="submit" className="btn btn-neutral btn-lg">
          Get Results
          {isLoading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
        </button>
      </form>
    </div>
  );
}

interface ImageOptionProps {
  option: ImageOption;
  onClick: (option: ImageOption) => void;
}

function ImageOptionCard(props: ImageOptionProps) {
  return (
    <div
      className="hover:cursor-pointer outline outline-transparent hover:outline-primary rounded"
      onClick={() => props.onClick(props.option)}
    >
      <img
        className="rounded h-[90px] w-[90px] md:h-[100px] md:w-[100px] lg:h-[120px] lg:w-[120px] xl:h-[140px] xl:w-[140px]"
        src={props.option.imageUrl}
        alt={props.option.alt}
      />
    </div>
  );
}

interface TextOptionProps {
  option: TextOption;
  onClick: (option: TextOption) => void;
}

function TextOptionCard(props: TextOptionProps) {
  return (
    <div
      className="hover:cursor-pointer bg-secondary p-2 w-96 text-white rounded hover:bg-transparent hover:text-secondary outline outline-transparent hover:outline-secondary"
      onClick={() => props.onClick(props.option)}
    >
      <p className="text-center">{props.option.option}</p>
    </div>
  );
}

interface PickOptionGridProps {
  question: Question;
  onOptionClick: (option: Option) => void;
}

function PickOptionGrid(props: PickOptionGridProps) {
  if (props.question.type === 'images') {
    return (
      <div>
        <h2 className="text-center text-xl font-medium mb-4">
          {props.question.description}
        </h2>

        {props.question.imageUrl && (
          <img className="rounded mx-auto mb-4" src={props.question.imageUrl} />
        )}

        <div className="grid grid-cols-2 w-fit mx-auto gap-2">
          {props.question.options.map((option) => (
            <ImageOptionCard
              key={option.id}
              option={option}
              onClick={props.onOptionClick}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-2 w-fit mx-auto items-center">
        <h2 className="text-center text-xl font-medium mb-4">
          {props.question.description}
        </h2>

        {props.question.imageUrl && (
          <img className="rounded mx-auto mb-4" src={props.question.imageUrl} />
        )}

        {props.question.options.map((option) => (
          <TextOptionCard
            key={option.id}
            option={option}
            onClick={props.onOptionClick}
          />
        ))}
      </div>
    );
  }
}
