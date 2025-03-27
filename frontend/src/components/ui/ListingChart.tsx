"use client";

import { Bar, BarChart, XAxis, ResponsiveContainer } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", ForSale: 186, ForRent: 80 },
  { month: "February", ForSale: 305, ForRent: 200 },
  { month: "March", ForSale: 237, ForRent: 120 },
  { month: "April", ForSale: 73, ForRent: 190 },
  { month: "May", ForSale: 209, ForRent: 130 },
  { month: "June", ForSale: 214, ForRent: 140 },
];

const chartConfig = {
  ForSale: {
    label: "ForSale",
    color: "#2563eb", 
  },
  ForRent: {
    label: "ForRent",
    color: "#60a5fa", 
  },
} satisfies ChartConfig;

export function ListingsTrendChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[50vh] w-full bg-white">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="ForSale" fill={chartConfig.ForSale.color} radius={4} />
          <Bar dataKey="ForRent" fill={chartConfig.ForRent.color} radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
