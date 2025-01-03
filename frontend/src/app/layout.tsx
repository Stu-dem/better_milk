import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { FlashToaster } from "@/lib/flash-toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <Providers>
          <body className={inter.className}>{children}</body>
          <FlashToaster />
        </Providers>
      </html>
  );
}
