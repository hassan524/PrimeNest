"use client"

import { Bar, BarChart, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  ForSale: {
    label: "ForSale",
    color: "#2563eb",
  },
  ForRent: {
    label: "ForRent",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function ListingsTrendChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[50vh] w-full bg-white">
      <BarChart accessibilityLayer data={chartData}>
        {/* <CartesianGrid vertical={false} />  */}
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="ForSale" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="ForRent" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
