"use client";

import React from "react";
import DashboardStatCard from "./DashboardStatCard";

const DashboardCards = () => {
  // Change these values as needed
  const stats = [
    { label: "For Sale", value: 24, percentage: 24, color: "#4CAF50" },
    { label: "For Rent", value: 18, percentage: 18, color: "#FF9800" },
    { label: "Total Customers", value: 150, percentage: 75, color: "#2196F3" },
    { label: "Total Cities", value: 10, percentage: 10, color: "#9C27B0" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <DashboardStatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardCards;
