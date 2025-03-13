"use client";

import { usePathname } from "next/navigation";
import Cards from "@/components/Cards";

const Page = () => {
  const pathname = usePathname();

  return pathname === "/properties" ? <Cards /> : null;
};

export default Page;
