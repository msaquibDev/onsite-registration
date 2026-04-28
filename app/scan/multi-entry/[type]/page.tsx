//app/scan/multi-entry/[type]/page.tsx
import MultiScanClientPage from "./MultiScanClientPage";

export function generateStaticParams() {
  return [
    { type: "hall-1-entry" },
    { type: "hall-2-entry" },
    { type: "kids-area-entry" },
    { type: "auditorium-entry" },
    { type: "back-gate-entry" },
  ];
}

export default function Page({ params }: { params: { type: string } }) {
  return <MultiScanClientPage type={params.type} />;
}
