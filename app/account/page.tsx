import { listPaymentsByEmail } from 'database/payment';
import { getSession } from 'lib/auth0';
import React from 'react';
import { formatCurrency, formatDate } from 'utils';

export const metadata = {
  title: 'Account',
};

async function PaymentsTable() {
  const session = await getSession();

  const payments = session.user.email
    ? await listPaymentsByEmail(session.user.email)
    : [];

  if (!payments.length) {
    return (
      <div className="mt-36 max-w-md mx-auto">
        <p className="text-center text-muted-foreground">
          You have no payments yet. Once you make a purchase, your payments will
          appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Created</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment._id}</td>
              <td>{formatDate(payment.createdAt)}</td>
              <td>{formatCurrency(payment.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function Account() {
  return (
    <section className="container mx-auto px-2 py-8">
      <PaymentsTable />
    </section>
  );
}
