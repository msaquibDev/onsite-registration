"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

const scanTypes = [
  { label: "Hall 1 Entry", value: "hall-1-entry" },
  { label: "Hall 2 Entry", value: "hall-2-entry" },
  { label: "Kids Area Entry", value: "kids-area-entry" },
  { label: "Auditorium Entry", value: "auditorium-entry" },
  { label: "Back Gate Entry", value: "back-gate-entry" },
];

export default function MultiScanEntryListPage() {
  const router = useRouter();

  return (
    <PageLayout title="Multi Entry Scan List">
      <div className="max-w-2xl mx-auto space-y-4">
        {scanTypes.map((item, i) => (
          <div
            key={item.value}
            className={`flex justify-between items-center px-6 py-4 rounded-lg ${
              i === 0 ? "bg-[#D96F28] text-white" : "bg-[#EBD5C3]"
            }`}
          >
            <span className="font-medium">{item.label}</span>

            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-6"
              onClick={() => router.push(`/scan/multi-entry/${item.value}`)}
            >
              Enter
            </Button>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
