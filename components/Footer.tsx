// components/Footer.tsx
"use client";

interface FooterProps {
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export default function Footer({
  backgroundColor = "#D96F28",
  textColor = "text-white",
  className = "",
}: FooterProps) {
  return (
    <footer className={`py-4 ${className}`} style={{ backgroundColor }}>
      <div className="container mx-auto px-4">
        <p className={`text-xs text-center ${textColor}`}>
          © RegistrationTeam.in by SaaScraft Studio (India) Pvt. Ltd. | All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
