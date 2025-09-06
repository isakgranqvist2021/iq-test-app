import type { Document } from 'mongodb';
import clientPromise from 'services/mongodb';

export type WithStringId<T> = Omit<T, '_id'> & { _id: string };

export async function getCollection<T extends Document>(
  collectionName: string,
) {
  const client = await clientPromise;

  return client.db().collection<T>(collectionName);
}
