//app/attendance-scanning/search/[type]/page.tsx

import AttendanceSearchPage from "./AttendanceSearchPage";

export function generateStaticParams() {
  return [
    { type: "hall1-morning" },
    { type: "hall1-afternoon" },
    { type: "hall2-morning" },
    { type: "hall2-afternoon" },
    { type: "kids-morning" },
  ];
}

export default function Page({ params }: { params: { type: string } }) {
  return <AttendanceSearchPage type={params.type} />;
}
