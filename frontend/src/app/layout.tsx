'use client'

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginDialog from "@/components/Login";
import SignupDialog from "@/components/Signup";
import { AppProvider } from "@/context/context";
import Sidebar from "@/components/Sidebar";
import SellPropertyDialog from "@/components/Sell";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "@/components/loading/authWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">

      <body>
        <SessionProvider>

          <AppProvider>

            <Navbar />

            <LoginDialog />
            <SignupDialog />

            <AuthWrapper>
              {children}
            </AuthWrapper>

            <Sidebar />
            <SellPropertyDialog />

          </AppProvider>
        </SessionProvider>
        <Toaster position="bottom-right" />

      </body>

    </html>

  );
}
