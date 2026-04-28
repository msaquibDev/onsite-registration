// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  LogOut,
  Scan,
  Award,
  Users,
  QrCode,
  Printer,
  Search,
  UserPlus,
  FileSearch,
  Globe,
  IdCard,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

// Kiosk Card Component
const KioskCard = ({
  icon: Icon,
  title,
  href,
  bgColor,
}: {
  icon: any;
  title: string;
  href: string;
  bgColor: string;
}) => {
  return (
    <Link href={href}>
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 overflow-hidden"
        style={{ backgroundColor: "#F4F4F4" }}
      >
        <CardContent className="p-6 text-center">
          <div
            className={`${bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-center text-sm text-gray-700">
            {title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
    router.push("/login");
  };

  const kiosks = [
    {
      icon: Printer,
      title: "Badge Printing",
      href: "/badge-printing/search",
      bgColor: "bg-blue-500",
    },
    {
      icon: Scan,
      title: "Single Scan",
      href: "/scan/single-entry",
      bgColor: "bg-green-500",
    },
    {
      icon: QrCode,
      title: "Multi Scan",
      href: "/scan/multi-entry",
      bgColor: "bg-teal-500",
    },
    {
      icon: Award,
      title: "Certificate Printing",
      href: "/certificate/search",
      bgColor: "bg-purple-500",
    },
    {
      icon: Printer,
      title: "Badge Printing Kiosk",
      href: "/self-badge-printing",
      bgColor: "bg-orange-500",
    },
    {
      icon: Award,
      title: "Certificate Printing Kiosk",
      href: "/self-certificate-printing",
      bgColor: "bg-pink-500",
    },
    {
      icon: Users,
      title: "Attendance Scanning Kiosk",
      href: "/attendance-scanning",
      bgColor: "bg-indigo-500",
    },
    {
      icon: UserPlus,
      title: "Add Registration",
      href: "/add-registration",
      bgColor: "bg-rose-500",
    },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#000000A6" }}>
      <div
        className="flex-1 flex flex-col w-full lg:w-2/3"
        style={{
          backgroundColor: "#000000A6",
        }}
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-[#242367] to-[#D96F28] px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="w-24">
              <img src="/logo.png" alt="Logo" className="w-full h-auto" />
            </div>
            <Button
              onClick={handleSignOut}
              className="bg-white hover:bg-gray-100 text-[#D96F28]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Banner Image */}
          <div className="max-w-7xl mx-auto mb-6">
            <img
              src="/bannner.png"
              alt="Conference Banner"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Kiosks Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {kiosks.map((kiosk, index) => (
                <KioskCard key={index} {...kiosk} />
              ))}
            </div>
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
