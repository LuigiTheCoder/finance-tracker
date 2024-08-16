import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const {
      name,
      transactionTypeId,
      amount,
      fromBankAccountId,
      toBankAccountId,
      notes,
    } = await request.json();

    // Validate required fields
    if (!name || !transactionTypeId || !amount || !fromBankAccountId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for required entities in parallel
    const [transactionType, fromAccount, toAccount] = await Promise.all([
      prisma.transactionType.findUnique({ where: { id: transactionTypeId } }),
      prisma.bankAccount.findUnique({ where: { id: fromBankAccountId } }),
      toBankAccountId
        ? prisma.bankAccount.findUnique({ where: { id: toBankAccountId } })
        : null,
    ]);

    // Handle errors for missing entities
    if (!transactionType) {
      return NextResponse.json(
        { error: "TransactionType not found" },
        { status: 404 }
      );
    }

    if (!fromAccount) {
      return NextResponse.json(
        { error: "From BankAccount not found" },
        { status: 404 }
      );
    }

    if (toBankAccountId && !toAccount) {
      return NextResponse.json(
        { error: "To BankAccount not found" },
        { status: 404 }
      );
    }

    // Create the transaction inside a transaction block
    const transaction = await prisma.$transaction(async (tx) => {
      const newTransaction = await tx.transaction.create({
        data: {
          name,
          transactionTypeId,
          amount,
          time: new Date(),
          fromBankAccountId,
          toBankAccountId,
          notes,
        },
      });

      // Update bank account balances if needed
      // Optionally: await tx.bankAccount.update({...});

      return newTransaction;
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);

    return NextResponse.json(
      {
        error: "An error occurred while creating the transaction",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
