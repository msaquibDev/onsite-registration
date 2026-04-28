<<<<<<< HEAD
//app/certificate/page.tsx
=======
>>>>>>> ca619b680e6a91521bf5020c2d2a67f7ac270c58
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

const certificateDays = [
  { label: "Delegate Certificate with CME Points ", value: "delegate" },
  { label: "Faculty Certificate with CME Points", value: "faculty" },
  { label: "Free Paper Presentation Certificate", value: "free-paper" },
  { label: "Award Paper Presentation Certificate", value: "award-paper" },
  { label: "ePoster Presentation Certificate ", value: "eposter" },
];

export default function CertificateDayListPage() {
  const router = useRouter();

  return (
    <PageLayout title="Certificate Printing">
      <div className="max-w-2xl mx-auto space-y-4">
        {certificateDays.map((item, i) => (
          <div
            key={item.value}
            className={`flex justify-between items-center px-6 py-4 rounded-lg ${
              i === 0 ? "bg-[#D96F28] text-white" : "bg-[#EBD5C3]"
            }`}
          >
            <span className="font-medium">{item.label}</span>

            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-6"
              onClick={() => router.push(`/certificate/search/${item.value}`)}
            >
              Enter
            </Button>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
