import StoreProvider from "@/redux/store-provider";
import "./globals.css";
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
      <StoreProvider>
        <body className={interTight.className}>{children}</body>
      </StoreProvider>
    </html>
  );
}
