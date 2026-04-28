<<<<<<< HEAD
import CertificateSearchPage from "./CertificateSearchPage";
=======
//app/certificate/search/[day]/page.tsx

import CertificateSearchPage from "../page";
>>>>>>> ca619b680e6a91521bf5020c2d2a67f7ac270c58

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
