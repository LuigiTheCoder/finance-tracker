"use client";

import { Bar, BarChart } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { month: "January", income: 186, expense: 80 },
  { month: "February", income: 305, expense: 200 },
  { month: "March", income: 237, expense: 120 },
  { month: "April", income: 73, expense: 190 },
  { month: "May", income: 209, expense: 130 },
  { month: "June", income: 214, expense: 140 },
];

const chartConfig = {
  income: {
    label: "income",
    color: "#2563eb",
  },
  expense: {
    label: "expense",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function SpendingsChart() {
  return (
    <div className="flex justify-center">
      <ChartContainer config={chartConfig} className="max-h-[500px] w-1/2">
        <BarChart accessibilityLayer data={chartData}>
          <Bar dataKey="income" fill="var(--color-income)" radius={4} />
          <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
