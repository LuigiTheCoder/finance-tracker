export type Transaction = {
  id: string;
  type: TransactionType;
  time: Date;
  amount: number;
  fromBankAccountId: string;
  description?: string;
  toBankAccountId?: string;
};

export type TransactionType = {
  transactionType: "expense" | "income" | "investment" | "rebasement";
};
