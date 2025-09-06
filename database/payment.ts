import type { ObjectId, WithoutId } from 'mongodb';

import { type WithStringId, getCollection } from './database';
import { getCheckoutSession } from 'services/payment';
import { products } from 'data/products';

const COLLECTION = 'payments';

export interface PaymentDocument {
  _id: ObjectId;
  createdAt: number;

  amount: number;
  checkoutSessionId: string;
  email: string | null;
}

type CreatePaymentDocument = Pick<
  PaymentDocument,
  'amount' | 'checkoutSessionId' | 'email'
>;

export async function createIndexes() {
  const collection = await getCollection<PaymentDocument>(COLLECTION);
  if (!collection) {
    throw new Error(`Collection is ${collection}`);
  }

  await collection.createIndex({
    email: 1,
    checkoutSessionId: 2,
  });
}

export async function createPayment(params: CreatePaymentDocument) {
  const collection =
    await getCollection<WithoutId<PaymentDocument>>(COLLECTION);
  if (!collection) {
    throw new Error(`Collection is ${collection}`);
  }

  return collection.insertOne({
    amount: params.amount,
    createdAt: Date.now(),
    email: params.email,
    checkoutSessionId: params.checkoutSessionId,
  });
}

export async function getPaymentByCheckoutSessionId(checkoutSessionId: string) {
  const collection = await getCollection<PaymentDocument>(COLLECTION);
  if (!collection) {
    throw new Error(`Collection is ${collection}`);
  }

  return collection.findOne({ checkoutSessionId });
}

export async function listPaymentsByEmail(
  email: string,
): Promise<WithStringId<PaymentDocument>[]> {
  const collection = await getCollection<PaymentDocument>(COLLECTION);
  if (!collection) {
    throw new Error(`Collection is ${collection}`);
  }

  const payments = await collection
    .find({ email }, { sort: { createdAt: -1 } })
    .toArray();

  return payments.map(
    (payment): WithStringId<PaymentDocument> => ({
      ...payment,
      _id: payment._id.toHexString(),
    }),
  );
}

export async function getProductsFromPayment(
  payment: WithStringId<PaymentDocument>,
) {
  const checkoutSession = await getCheckoutSession(payment.checkoutSessionId);
  const ids = Object.keys(checkoutSession.metadata || {});

  return ids
    .map((id) => products.find((product) => product.id === id))
    .filter((product) => !!product);
}
