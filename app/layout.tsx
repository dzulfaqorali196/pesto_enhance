import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
// import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation";
import { Cursor } from "@/components/ui/cursor";
import type React from "react";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Pesto SDK - AI-Powered Trading Agents on Solana",
  description:
    "AI-Powered Trading Agents on Solana with On-Chain AI SDK for Institutional-Grade Trade Optimization.",
  icons: {
    icon: "/pesto-logo-ai.png",
    shortcut: "/pesto-logo-ai.png",
    apple: "/pesto-logo-ai.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable}`}>
      <body
        className={`${GeistSans.className} ${manrope.className} min-h-screen bg-black text-white cursor-none`}
        suppressHydrationWarning
      >
        <Navigation />
        <Cursor />
        <main>{children}</main>
      </body>
    </html>
  );
}
