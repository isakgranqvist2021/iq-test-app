import { iqQuiz } from './iq-quiz';

export const products = [{ id: '1', description: 'IQ Test Results' }];

export interface ImageOption {
  id: number;
  alt: string;
  imageUrl: string;
}

export interface TextOption {
  id: number;
  option: string;
}

export type Option = ImageOption | TextOption;

export type Question =
  | {
      type: 'images';
      id: number;
      description: string;
      imageUrl?: string;
      options: ImageOption[];
      correctAnswer: number;
    }
  | {
      type: 'text';
      id: number;
      description: string;
      imageUrl?: string;
      options: TextOption[];
      correctAnswer: number;
    };

export interface QuizModel {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
}

export const quizzes: Record<number, QuizModel> = {
  1: iqQuiz,
};
