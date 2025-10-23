"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search,
  Scan,
  Award,
  UserPlus,
  Users,
  LogOut,
  QrCode,
  FileSearch,
  Globe,
  IdCard,
  PhoneCall,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navigationCards = [
  {
    title: "Badge Printing - Search",
    description: "Search and print attendee badges",
    icon: Search,
    href: "/badge-printing/search",
    color: "bg-blue-500",
  },
  {
    title: "Single Entry Scan List",
    description: "Scan attendees for single entry",
    icon: Scan,
    href: "/scan/single-entry",
    color: "bg-green-500",
  },
  {
    title: "Multi Entry Scan List",
    description: "Scan attendees for multiple entries",
    icon: QrCode,
    href: "/scan/multi-entry",
    color: "bg-emerald-500",
  },
  {
    title: "Certificate Printing - Search",
    description: "Search and print certificates",
    icon: Award,
    href: "/certificate/search",
    color: "bg-purple-500",
  },
  {
    title: "Self Badge Printing",
    description: "Self-service badge printing",
    icon: IdCard,
    href: "/self-badge-printing",
    color: "bg-orange-500",
  },
  {
    title: "Self Certificate Printing",
    description: "Self-service certificate printing",
    icon: Award,
    href: "/self-certificate-printing",
    color: "bg-pink-500",
  },
  {
    title: "Visitor Registration & Scanning",
    description: "Register and scan visitors",
    icon: UserPlus,
    href: "/visitor-registration",
    color: "bg-teal-500",
  },
  {
    title: "Attendance Scanning",
    description: "Scan attendance for sessions",
    icon: Users,
    href: "/attendance-scanning",
    color: "bg-indigo-500",
  },
  {
    title: "Manual Search",
    description: "Manual attendee search",
    icon: FileSearch,
    href: "/manual-search",
    color: "bg-cyan-500",
  },
  {
    title: "Scan by Website",
    description: "Scan via web interface",
    icon: Globe,
    href: "/scan-by-website",
    color: "bg-amber-500",
  },
  {
    title: "Add Registration",
    description: "Add new registration",
    icon: UserPlus,
    href: "/add-registration",
    color: "bg-rose-500",
  },
];

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-blue-950 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          {/* Mobile Header */}
          <div className="flex md:hidden justify-between items-center">
            <div className="w-24">
              <img src="/logo.png" alt="Logo" className="w-full h-auto" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center gap-4">
            <div className="w-32">
              <img src="/logo.png" alt="Logo" className="w-full h-auto" />
            </div>
            <div className="text-center flex-1">
              <h1 className="text-xl lg:text-2xl font-bold text-primary text-white">
                Registration Team
              </h1>
              <p className="text-sm text-muted-foreground text-gray-300">
                Welcome, {user.email}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center text-sm text-muted-foreground">
                <PhoneCall className="w-4 h-4 text-gray-300" />
                <span className="ml-2 text-gray-300">+91 7331131070</span>
              </div>
              <Button variant="outline" onClick={signOut} className="gap-2">
                <LogOut className="w-4 h-4 " />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t">
              <div className="flex flex-col gap-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <PhoneCall className="w-4 h-4" />
                  <span className="ml-2">+91 7331131070</span>
                </div>
                <Button
                  variant="outline"
                  onClick={signOut}
                  className="gap-2 justify-start"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 lg:py-8">
        {/* Banner */}
        <div className="mb-6 lg:mb-8">
          <img
            src="/bannner.png"
            alt="banner"
            className="w-full h-auto rounded-lg shadow-sm"
          />
        </div>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {navigationCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-2 border-transparent hover:border-gray-200">
                  <CardHeader className="p-4 lg:p-6">
                    <div
                      className={`w-10 h-10 lg:w-12 lg:h-12 ${card.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <CardTitle className="text-base lg:text-lg leading-tight">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-xs lg:text-sm mt-1">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 border-t mt-8 lg:mt-12 py-4">
        <div className="container mx-auto px-4">
          <p className="text-xs lg:text-sm text-muted-foreground text-center px-2 text-gray-300">
            © 2023 Registration Team.in by SaaScraft Studio (India) Pvt. Ltd. |
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
