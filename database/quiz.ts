import { ObjectId, WithoutId } from 'mongodb';

import { getCollection } from './database';

const COLLECTION = 'quizzes';

export interface QuizResultItem {
  questionId: number;
  selectedOptionId: number;
}

export interface QuizDocument {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;

  quizId: number;

  completedAt: number | null;

  email: string | null;

  result: QuizResultItem[];

  status: 'paid' | 'unpaid';
}

type CreateQuizDocument = Pick<QuizDocument, 'email' | 'quizId'>;

export async function createIndexes() {
  const collection = await getCollection<QuizDocument>(COLLECTION);
  if (!collection) {
    throw new Error(`Collection is ${collection}`);
  }

  await collection.createIndex({
    email: 1,
  });
}

export async function createQuiz(params: CreateQuizDocument) {
  const collection = await getCollection<WithoutId<QuizDocument>>(COLLECTION);
  if (!collection) {
    throw new Error(`Collection is ${collection}`);
  }

  return collection.insertOne({
    createdAt: Date.now(),
    updatedAt: Date.now(),
    completedAt: null,
    email: params.email,
    result: [],
    status: 'unpaid',
    quizId: params.quizId,
  });
}

export async function updateQuizResult(id: string, result: QuizResultItem) {
  const collection = await getCollection<QuizDocument>(COLLECTION);
  if (!collection) {
    throw new Error(`Collection is ${collection}`);
  }

  return collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $push: { result },
      $set: { updatedAt: Date.now() },
    },
  );
}

export async function completeQuiz(id: string) {
  const collection = await getCollection<QuizDocument>(COLLECTION);
  if (!collection) {
    throw new Error(`Collection is ${collection}`);
  }

  return collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: { completedAt: Date.now() },
    },
  );
}

export async function updateStatus(id: string, status: 'paid' | 'unpaid') {
  const collection = await getCollection<QuizDocument>(COLLECTION);
  if (!collection) {
    throw new Error(`Collection is ${collection}`);
  }

  return collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: { status },
    },
  );
}

export async function addEmailToQuiz(id: string, email: string) {
  const collection = await getCollection<QuizDocument>(COLLECTION);
  if (!collection) {
    throw new Error(`Collection is ${collection}`);
  }

  return collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: { email },
    },
  );
}

export interface QuizStringId {
  _id: string;
  email: string | null;
  createdAt: number;
  updatedAt: number;
  quizId: number;
  completedAt: number | null;
  status: 'paid' | 'unpaid';
  result: QuizResultItem[];
}
export async function getQuizById(id: string): Promise<QuizStringId | null> {
  const collection = await getCollection<QuizDocument>(COLLECTION);
  if (!collection) {
    throw new Error(`Collection is ${collection}`);
  }

  const quiz = await collection.findOne({ _id: new ObjectId(id) });
  if (!quiz) {
    return null;
  }

  return {
    ...quiz,
    _id: quiz._id.toString(),
  };
}
