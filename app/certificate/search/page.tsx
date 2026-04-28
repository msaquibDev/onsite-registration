"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";

const certificateTypes = [
  { label: "Delegate", value: "delegate" },
  { label: "Faculty", value: "faculty" },
  { label: "Free Paper", value: "free-paper" },
  { label: "Award Paper", value: "award-paper" },
  { label: "E-Poster", value: "eposter" },
];

export default function CertificateTypeListPage() {
  const router = useRouter();

  return (
    <PageLayout title="Certificate Types">
      <div className="max-w-2xl mx-auto space-y-4">
        {certificateTypes.map((item, i) => (
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
