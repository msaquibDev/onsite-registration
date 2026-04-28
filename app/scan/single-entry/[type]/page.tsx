//app/scan/single-entry/[type]/page.tsx

import ScanClientPage from "./ScanClientPage";

export function generateStaticParams() {
  return [
    { type: "day-1-breakfast" },
    { type: "day-1-lunch" },
    { type: "day-1-dinner" },
    { type: "kit-bag" },
    { type: "cme-book" },
  ];
}

export default function Page({ params }: { params: { type: string } }) {
  return <ScanClientPage type={params.type} />;
}
