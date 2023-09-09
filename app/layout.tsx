import "./globals.css";

import AuthProvider from "@/components/providers/auth-provider";
import StoreProvider from "@/components/providers/store-provider";

import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Admin",
  description: "React Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={interTight.className}>
        <AuthProvider>
          <StoreProvider>{children} </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
