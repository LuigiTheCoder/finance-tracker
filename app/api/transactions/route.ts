import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

export async function GET() {
  const transactions = await prisma.transaction.findMany();
  return NextResponse.json({
    initTransactions: "hello",
  });
}
