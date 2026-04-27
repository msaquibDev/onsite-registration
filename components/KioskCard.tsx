// components/KioskCard.tsx
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface KioskCardProps {
  title: string;
  href: string;
  iconImage: string; // Path to the image in public folder
  bgColor?: string;
}

export default function KioskCard({
  title,
  href,
  iconImage,
  bgColor = "#F4F4F4",
}: KioskCardProps) {
  return (
    <Link href={href}>
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {/* Left Side - Circle with Image */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <img
                  src={iconImage}
                  alt={title}
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
              </div>
            </div>

            {/* Right Side - Title */}
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-700 leading-tight">
                {title}
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
