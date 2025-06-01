// components/RootLayout.tsx (Client Component)
'use client';

import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginDialog from "@/components/Login";
import SignupDialog from "@/components/Signup";
import { AppProvider } from "@/context/context";
import Sidebar from "@/components/Sidebar";
import SellPropertyDialog from "@/components/Sell";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "@/components/loading/authWrapper";
import MessagesLayout from "./MessagesLayout";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha384-uO3SXHaAtsLUcp/PLjrdtYQqUjFmvwPlz6zsl6lEiwmKn6G7da6E1ivp/3yFh0jI"
          crossOrigin="anonymous"
        />
      </Head>
      <SessionProvider>
        <AppProvider>
          <Navbar />
          <LoginDialog />
          
          <MessagesLayout>
            {children}
          </MessagesLayout>

          <SignupDialog />
          <AuthWrapper>{children}</AuthWrapper>
          <Sidebar />
          <SellPropertyDialog />
        </AppProvider>
      </SessionProvider>
      <Toaster position="bottom-right" />
    </>
  );
}
