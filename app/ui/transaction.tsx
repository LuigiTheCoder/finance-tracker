export default function Transaction() {
  return <div>one Transaction</div>;
}

export async function getContacts() {
  return fetchTransactions();
}

const fetchTransactions = async () => {
  try {
    const response = await fetch("/api/transactions");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log(data); // Handle the data here
    return data;
  } catch (error) {
    console.error(error);
  }
};
