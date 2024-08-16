import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { logRawTransaction } from "../lib/data";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export async function GET() {
  const transactions = await prisma.transaction.findMany();
  console.log("debuggg GET /api");
  return NextResponse.json({
    trans: transactions,
  });
}
