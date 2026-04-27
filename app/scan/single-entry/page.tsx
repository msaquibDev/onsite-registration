"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";

const scanTypes = [
  { label: "Day 1 Breakfast", value: "day-1-breakfast" },
  { label: "Day 1 Lunch", value: "day-1-lunch" },
  { label: "Day 1 Dinner", value: "day-1-dinner" },
  { label: "Kit Bag", value: "kit-bag" },
  { label: "CME Book", value: "cme-book" },
];

export default function ScanEntryListPage() {
  const router = useRouter();

  return (
    <PageLayout title="Single Entry Scan List">
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
              onClick={() => router.push(`/scan/single-entry/${item.value}`)}
            >
              Enter
            </Button>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
