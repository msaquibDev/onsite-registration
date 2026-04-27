// components/Header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  showSignOut?: boolean;
  backgroundColor?: string;
  logoClassName?: string;
  onSignOut?: () => void;
}

export default function Header({
  showSignOut = false,
  backgroundColor = "#D96F28",
  logoClassName = "",
  onSignOut,
}: HeaderProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
    if (onSignOut) {
      onSignOut();
    }
    router.push("/login");
  };

  return (
    <header className="py-4" style={{ backgroundColor }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="w-24">
            <img
              src="/logo.png"
              alt="Logo"
              className={`w-full h-auto ${logoClassName}`}
            />
          </div>
          {showSignOut && (
            <Button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
