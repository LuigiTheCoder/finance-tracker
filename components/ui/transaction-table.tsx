// pages/index.js
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Transaction } from "../../app/lib/definitions"; // Import your Transaction type
import { fetchTransactions } from "../../app/lib/data";

export default async function TransactionList() {
  const transactions = await fetchTransactions();

  //   console.log(transactionData);
  //   console.log(`transactions ${transactions}`);
  return (
    <div>
      {transactions ? (
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="bg-white p-4 rounded shadow-md">
              {/* Display transaction details */}
              <span className="text-gray-700">{transaction.id}</span>
              <br />
              <span className="text-gray-700">amount{transaction.amount}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>lol nothing here</div>
      )}
    </div>
  );
}
