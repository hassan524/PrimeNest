"use client";

import React, { useEffect, useState } from "react";
import Cards from "@/components/Cards";
import { useAppContext } from "@/context/context";

const Page = () => {
  const { Properties, SetProperties } = useAppContext();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && Array.isArray(Properties) && Properties.length) {
      const saleProperties = Properties.filter((prop) => prop.propertyType === "For Sale");
      SetProperties(saleProperties); // Updating global state
    }
  }, [hydrated]);

  return hydrated ? <Cards /> : null;
};

export default Page;
