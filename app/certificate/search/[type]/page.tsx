//app/certificate/search/[day]/page.tsx

import CertificateSearchPage from "../page";

export function generateStaticParams() {
  return [
    { type: "delegate" },
    { type: "faculty" },
    { type: "free-paper" },
    { type: "award-paper" },
    { type: "eposter" },
  ];
}

export default function Page({ params }: { params: { type: string } }) {
  return <CertificateSearchPage type={params.type} />;
}
