import TransactionList from "../../components/ui/transaction-table";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <>
      <div>Finance Tracker</div>
      <Suspense>
        <TransactionList />
      </Suspense>
    </>
  );
}
