"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import DashboardCards from "@/components/ui/dashboardCard";
import { ListingsTrendChart } from "@/components/ui/ListingChart";
import Favourate from "@/components/Favourate";
import { useAppContext } from "@/context/context";

const Page = () => {
  
       const { SetIsPropertyOpen } = useAppContext();

  return (

    <main className="bg-slate-50 min-h-screen w-full lg:px-20 px-3 text-gray-900 flex flex-col gap-[2rem]">

      <div className="flex items-center justify-between pt-[2rem]">

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl tracking-tight">Dashboard</h1>
          <span className="text-gray-700 text-sm">Hi hassan 👋</span>
        </div>

        <Button onClick={() => SetIsPropertyOpen(true)}>Sell Property</Button>

      </div>

      <DashboardCards />

      <ListingsTrendChart />

      <Favourate />

    </main>

  );
};

export default Page;
