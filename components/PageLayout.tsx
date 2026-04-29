// components/PageLayout.tsx
"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  backButtonHref?: string;
  showSignOut?: boolean;
}

export default function PageLayout({
  children,
  title,
  showBackButton = true,
  backButtonHref = "/dashboard",
  showSignOut = true,
}: PageLayoutProps) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#000000A6" }}>
      <div
        className="flex-1 flex flex-col w-full"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {/* Header */}
        <Header
          showBackButton={showBackButton}
          backButtonHref={backButtonHref}
          showSignOut={showSignOut}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Title + Line */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              <div className="w-40 h-[3px] bg-[#D96F28] mx-auto mt-3 rounded-full" />
            </div>

            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
