import { iqQuiz, iqQuizAnswers } from 'data/iq-quiz';
import { QuizStringId } from 'database/quiz';

export function QuizResults(props: { result: QuizStringId }) {
  const totalCorrect = props.result.result.reduce((acc, resultItem, index) => {
    const answer = iqQuizAnswers[index];

    if (!answer) {
      return acc;
    }

    const correctAnswer = answer.answer[0];
    if (correctAnswer === resultItem.selectedOptionId) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const totalQuestions = props.result.result.length;
  const scorePercentage = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <section className="container mx-auto px-2 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Results</h1>

      <p className="mb-4">
        You answered {totalCorrect} out of {totalQuestions} questions correctly.
      </p>
      <p className="mb-4">Your score: {scorePercentage}%</p>

      <div className="overflow-x-auto">
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
              const answer = iqQuizAnswers[index];

              if (!answer) {
                return null;
              }

              const correctAnswer = answer.answer[0];

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
    </section>
  );
}
