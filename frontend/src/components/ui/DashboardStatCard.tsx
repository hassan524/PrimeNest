// File: components/ui/DashboardStatCard.tsx
"use client";

import React from "react";
import { PieChart } from "react-minimal-pie-chart";

interface DashboardStatCardProps {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  label,
  value,
  percentage,
  color,
}) => {
  return (
    <div className="bg-white p-4 text-gray-900 flex items-center justify-between rounded-md">
      {/* Left: Label & Value */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm opacity-[0.7]">{label}</h3>
        <p className="text-2xl font font-semibold">{value}</p>
      </div>
      {/* Right: Circular Chart without inner label */}
      <div className="w-16 h-16">
        <PieChart
          data={[
            { title: label, value: percentage, color: color },
            { title: "Remaining", value: 100 - percentage, color: "#f8fafc" },
          ]}
          lineWidth={40}
          startAngle={-90}
          // Remove the label prop to not display any value inside the circle
          animate
        />
      </div>
    </div>
  );
};

export default DashboardStatCard;
