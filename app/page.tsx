// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    setTimeout(() => {
      if (isLoggedIn) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
      setLoading(false);
    }, 500);
  }, [router]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#000000A6" }}
      >
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="text-lg text-gray-700 font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  return null;
}
