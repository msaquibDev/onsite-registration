// components/PageLayout.tsx
"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, LogOut } from "lucide-react";

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

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#000000A6" }}>
      <div
        className="flex-1 flex flex-col w-full"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-[#242367] to-[#D96F28] px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {showBackButton && (
                <Link href={backButtonHref}>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </Link>
              )}
              <div className="w-24">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-full h-auto brightness-0 invert"
                />
              </div>
            </div>
            {showSignOut && (
              <Button
                onClick={handleSignOut}
                className="bg-white hover:bg-gray-100 text-[#D96F28]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        </header>

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
        <footer
          className="border-t py-4 px-6"
          style={{ backgroundColor: "#D96F28" }}
        >
          <p className="text-xs text-white text-center">
            © RegistrationTeam.in by SaaScraft Studio (India) Pvt. Ltd. | All
            Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
