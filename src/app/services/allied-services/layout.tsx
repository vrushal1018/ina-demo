import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allied Facility Management Services | INA TechFM India",
  description:
    "Professional allied facility management services across India. Support operations, guest room maintenance, Ken Fixit rapid response teams, and workplace support services.",
  alternates: {
    canonical: "https://inatechfmglobal.com/services/allied-services",
  },
  keywords: [
    "Allied Facility Management Services",
    "Allied FM Services in India",
    "Facility Support Services",
    "Ken Fixit Maintenance Teams",
    "Workplace Support Services",
    "Guest Room PPM Services",
  ],
  openGraph: {
    title: "Allied Facility Management Services | INA TechFM India",
    description:
      "Professional allied facility management services designed to complement and enhance day-to-day facility operations across India.",
    url: "https://inatechfmglobal.com/services/allied-services",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Allied Facility Management Services - INA TechFM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Allied Facility Management Services | INA TechFM India",
    description:
      "Professional allied facility management services across India.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Allied Facility Management Services",
  serviceType: "Allied Facility Management",
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
    "End-to-end allied facility management services including Ken Fixit response teams, guest room PPM, and specialized operations support across India.",
  url: "https://inatechfmglobal.com/services/allied-services",
};

export default function AlliedServicesLayout({
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

