import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const transactions = await prisma.transaction.findMany();
  return NextResponse.json({
    trans: transactions,
  });
}
