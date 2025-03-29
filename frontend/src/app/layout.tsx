// app/layout.tsx (Server Component)
import RootLayout from "@/components/RootLayout"; 
import "./globals.css";
import { siteMetadata } from "../../utils/metadata";

export const metadata = siteMetadata; 

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootLayout>{children}</RootLayout> 
      </body>
    </html>
  );
}
