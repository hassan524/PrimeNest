// components/AuthWrapper.tsx
"use client";

import { useSession } from "next-auth/react";
import LoadingScreen from "../LoadingScreen";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  // If session is still loading, show the loading screen
  if (status === "loading") {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
