"use client";

import React from "react";
import DashboardStatCard from "./DashboardStatCard";
import { useAppContext } from "@/context/context";

const DashboardCards = () => {
  const { Properties, Users } = useAppContext();
  console.log(Properties, Users)
  
  const totalProperties = Properties?.length || 0;
  const forSale = Properties?.filter(p => p.propertyType === "For Sale").length || 0;
  const forRent = Properties?.filter(p => p.propertyType === "For Rent").length || 0;
  const totalUsers = Users?.length || 0;
  const totalCities = 14; 

  const maxUsers = 100;
  const userPercentage = Math.min((totalUsers / maxUsers) * 100, 100);

  const stats = [
    { label: "For Sale", value: forSale, percentage: totalProperties ? (forSale / totalProperties) * 100 : 0, color: "#4CAF50" },
    { label: "For Rent", value: forRent, percentage: totalProperties ? (forRent / totalProperties) * 100 : 0, color: "#FF9800" },
    { label: "Total Customers", value: totalUsers, percentage: userPercentage, color: "#2196F3" },
    { label: "Total Cities", value: totalCities, percentage: (totalCities / 50) * 100, color: "#9C27B0" }, 
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
