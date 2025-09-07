import { iqQuiz } from 'data/iq-quiz';
import { QuizStringId } from 'database/quiz';
import { StartQuizButton } from './start-quiz-button';

export function QuizResults(props: { result: QuizStringId }) {
  const totalQuestions = props.result.result.length;
  const totalCorrect = props.result.result.reduce((acc, curr, index) => {
    const correctAnswer = iqQuiz.questions[index].correctAnswer;
    return acc + (curr.selectedOptionId === correctAnswer ? 1 : 0);
  }, 0);
  const scorePercentage = Math.round((totalCorrect / totalQuestions) * 100);

  const estimatedIQ = 90 + (scorePercentage - 50) * 2;

  return (
    <section className="container mx-auto px-4 md:py-8 py-4">
      <StartQuizButton
        className="link mb-4 block w-fit"
        quizId={props.result.quizId}
      >
        Start over
      </StartQuizButton>

      <h1 className="text-2xl font-bold mb-4">Your Results</h1>

      <p className="mb-4">
        You answered {totalCorrect} out of {totalQuestions} questions correctly.
      </p>

      <div className="flex gap-4 mb-6">
        <div className="badge badge-primary">
          Your score: {scorePercentage}%
        </div>
        <div className="badge badge-secondary">Estimated IQ: {estimatedIQ}</div>
      </div>

      <div className="overflow-x-auto hidden md:block">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Correct Answer</th>
              <th>Correct</th>
            </tr>
          </thead>
          <tbody>
            {props.result.result.map((resultItem, index) => {
              const correctAnswer = iqQuiz.questions[index].correctAnswer;

              return (
                <tr key={index} className="hover">
                  <td>{index + 1}</td>
                  <td>{iqQuiz.questions[index].description}</td>
                  <td>{resultItem.selectedOptionId}</td>
                  <td>{correctAnswer}</td>
                  <td>
                    {correctAnswer === resultItem.selectedOptionId
                      ? 'Yes'
                      : 'No'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden join join-vertical bg-base-100">
        {props.result.result.map((resultItem, index) => {
          return (
            <div
              className="collapse collapse-plus bg-base-100 border border-base-300 join-item"
              key={index}
            >
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">
                {iqQuiz.questions[index].description}
              </div>
              <div className="collapse-content text-sm">
                Your answer: {resultItem.selectedOptionId}
                <br />
                Correct answer: {iqQuiz.questions[index].correctAnswer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
