// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NSI Conference | Onsite Registration System",
  description:
    "Neurological Society of India - Private Practitioners Forum Conference Registration System",
  keywords: [
    "NSI",
    "Neurological Society",
    "Conference",
    "Registration",
    "Badge Printing",
    "Certificate",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
