import { get } from "http";
import { Transaction } from "./definitions";

export async function fetchTransactions(): Promise<Transaction[]> {
  try {
    let response = await fetch("http://localhost:3000/api/", { method: "GET" });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const { trans } = data;
    const [firstTransaction] = trans;
    const transactions: Transaction[] = trans.map(
      (transaction: Transaction) => ({
        id: transaction.id,
        time: transaction.time,
        amount: transaction.amount,
        bankAccountId: transaction.fromBankAccountId,
      })
    );
    // transactions.map((transaction) => console.log(transaction));
    return transactions;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logRawTransaction(response: { json: () => any }) {
  const data = await response.json();
  const { trans } = data;
  const [firstTransaction] = trans;
  const transactions: Transaction[] = trans.map((transaction: Transaction) => ({
    id: transaction.id,
    time: transaction.time,
    amount: transaction.amount,
    bankAccountId: transaction.fromBankAccountId,
  }));
}
