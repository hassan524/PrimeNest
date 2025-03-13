"use client";

import React, { useEffect, useState } from "react";
import Cards from "@/components/Cards";
import { useAppContext } from "@/context/context";

interface Property {
  propertyType: string;
  // Add other expected fields here
}

const Page: React.FC = () => {
  const { Properties, SetProperties } = useAppContext();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (hydrated && Array.isArray(Properties) && Properties.length) {
      const rentProperties = Properties.filter((prop) => prop.propertyType === "For Rent");
      SetProperties(rentProperties);
    }
  }, [hydrated, Properties]);

  return hydrated ? <Cards /> : null; 
};

export default Page;
