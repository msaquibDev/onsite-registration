"use client";

import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface HeaderProps {
  showBackButton?: boolean;
  backButtonHref?: string;
  showSignOut?: boolean;
}

export default function Header({
  showBackButton = false,
  backButtonHref = "/dashboard",
  showSignOut = true,
}: HeaderProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");

    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });

    router.push("/login");
  };

  return (
    <header className="bg-gradient-to-r from-[#242367] to-[#D96F28] px-6 py-4">
      <div className="flex justify-between items-center">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              onClick={() => {
                if (window.history.length > 1) {
                  router.back();
                } else {
                  router.push(backButtonHref || "/dashboard");
                }
              }}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}

          <div className="w-24">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-auto brightness-0 invert"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
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
  );
}
