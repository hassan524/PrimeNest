"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Dropdown from "./ui/dropdown";
import { AppContext } from "@/context/context";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { SetIsSidebarOpen, SetIsSignOpen, SetIsLoginOpen } = useContext(AppContext);

  // Hide Navbar for /message routes
  if (pathname.startsWith("/message")) {
    return null;
  }

  return (
    <header className="h-[11vh] lg:px-20 px-3 flex items-center bg-white relative z-50">
      <nav className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="Logo flex items-center cursor-pointer">
          <div className="w-9 h-9">
            <img src="/logo.png" alt="PrimeNest Logo" />
          </div>
          <span className="text-lg font-semibold">PrimeNest</span>
        </div>

        {/* Navigation Links */}
        <div className="lg:flex hidden gap-[2rem] opacity-[0.9] items-center text-lg">
          <Link href="/">Home</Link>
          <Link href="/for-sale">For sale</Link>
          <Link href="/to-rent">To rent</Link>
          <Link href="/house-prices">House prices</Link>
        </div>

        {/* Icons & Dropdown */}
        <div className="flex items-center justify-end sm:gap-[1.8rem] gap-[1.3rem]">
          {session ? (
            <>
              <button
                className="opacity-[0.9]"
                onClick={() => router.push("/messages")}
              >
                <i className="bi bi-chat-dots sm:text-[28px] text-[24px] text-gray-900"></i>
              </button>

              <button
                className="opacity-[0.9] lg:hidden flex"
                onClick={() => SetIsSidebarOpen(true)}
              >
                <i className="bi bi-list sm:text-[35px] text-[31px] text-gray-900"></i>
              </button>

              <Dropdown />
            </>
          ) : (
            <>
              <button onClick={() => SetIsLoginOpen(true)}>Login</button>
              <Button onClick={() => SetIsSignOpen(true)}>Sign up</Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
