import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hard Facility Management Services | INA TechFM India",
  description:
    "Leading hard facility management services across India. Expert electro-mechanical, HVAC, plumbing & sanitation, civil fabric, and fire life safety maintenance.",
  alternates: {
    canonical: "https://inatechfmglobal.com/services/hard-fm",
  },
  keywords: [
    "Hard Facility Management Services",
    "Hard FM Services in India",
    "Electro-Mechanical Maintenance",
    "HVAC Facility Management",
    "Plumbing and Sanitation Services",
    "Building Fabric Maintenance",
    "Fire Life Safety Systems India",
  ],
  openGraph: {
    title: "Hard Facility Management Services | INA TechFM India",
    description:
      "Comprehensive hard facility management services across India. Reliable upkeep of electro-mechanical, HVAC, civil, and fire systems.",
    url: "https://inatechfmglobal.com/services/hard-fm",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hard Facility Management Services - INA TechFM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hard Facility Management Services | INA TechFM India",
    description:
      "Specialized hard facility management services and engineering upkeep across India.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hard Facility Management Services",
  serviceType: "Hard Facility Management",
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
    "End-to-end hard facility management services covering plumbing & sanitation, civil building fabric, electro-mechanical, and fire safety systems across India.",
  url: "https://inatechfmglobal.com/services/hard-fm",
};

export default function HardFMLayout({
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

