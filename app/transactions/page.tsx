import { columns } from "./columns";
import { Transaction } from "../lib/definitions";
import { DataTable } from "./data-table";
import { fetchTransactions } from "../lib/data";
import CreateTransaction from "./CreateTransaction";

async function getData(): Promise<Transaction[]> {
  // Fetch data from your API here.
  return fetchTransactions();
  // ...
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <CreateTransaction />
    </div>
  );
}
