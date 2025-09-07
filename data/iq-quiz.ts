import { QuizModel } from './products';

export const iqQuiz: QuizModel = {
  title: 'IQ Test',
  description: 'A standard IQ test to measure your intelligence quotient.',
  difficulty: 'medium',
  questions: [
    {
      id: 1,
      correctAnswer: 1,
      description:
        'What number should come next in the series? 1, 4, 9, 16, 25, ...',
      options: [
        { id: 1, option: '36' },
        { id: 2, option: '49' },
        { id: 3, option: '64' },
      ],
      type: 'text',
    },
    {
      id: 2,
      correctAnswer: 3,
      description:
        'Which one of the five is least like the other four? Dog, Mouse, Lion, Snake, Elephant',
      options: [
        { id: 1, option: 'Mouse' },
        { id: 2, option: 'Lion' },
        { id: 3, option: 'Snake' },
        { id: 4, option: 'Elephant' },
        { id: 5, option: 'Dog' },
      ],
      type: 'text',
    },
    {
      id: 3,
      correctAnswer: 2,
      description:
        'What is the missing number in the sequence? 2, 3, 5, 7, 11, ?',
      options: [
        { id: 1, option: '12' },
        { id: 2, option: '13' },
        { id: 3, option: '14' },
      ],
      type: 'text',
    },
    {
      id: 4,
      correctAnswer: 4,
      description:
        'Which one of the five choices makes the best comparison? PEACH is to HCAEP as 46251 is to:',
      options: [
        { id: 1, option: '15264' },
        { id: 2, option: '12654' },
        { id: 3, option: '51462' },
        { id: 4, option: '15246' },
      ],
      type: 'text',
    },
  ],
};
