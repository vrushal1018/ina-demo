import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facility Management Audits & Technical Assessments | INA TechFM",
  description:
    "Comprehensive facility management audits, engineering diagnostics, electrical safety checks, and statutory compliance assessments across India.",
  alternates: {
    canonical: "https://inatechfmglobal.com/services/audit-and-offerings",
  },
  keywords: [
    "Facility Management Audits",
    "FM Audits in India",
    "Building Safety Audits",
    "Energy and Compliance Audits",
    "Technical Facility Assessments",
    "Statutory Compliance Audits India",
  ],
  openGraph: {
    title: "Facility Management Audits & Technical Assessments | INA TechFM",
    description:
      "Diagnostic facility management audits and advisory solutions across commercial and industrial infrastructure in India.",
    url: "https://inatechfmglobal.com/services/audit-and-offerings",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Facility Management Audits - INA TechFM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facility Management Audits & Technical Assessments | INA TechFM",
    description:
      "Diagnostic facility management audits and advisory solutions across India.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Facility Management Audits",
  serviceType: "Technical Facility Audits & Assessments",
  provider: {
    "@type": "Corporation",
    name: "INA TechFM",
    url: "https://inatechfmglobal.com",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  description:
    "Comprehensive facility management audits, technical safety diagnostics, electrical audits, and regulatory compliance advisory for enterprises.",
  url: "https://inatechfmglobal.com/services/audit-and-offerings",
};

export default function AuditOfferingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

