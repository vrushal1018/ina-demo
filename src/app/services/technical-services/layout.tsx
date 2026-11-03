import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Facility Management Services & Engineering Maintenance | INA TechFM",
  description:
    "Leading provider of technical facility management services and engineering maintenance services across India. 24x7 MEP infrastructure, HVAC, high-voltage substations, and predictive maintenance.",
  alternates: {
    canonical: "https://inatechfmglobal.com/services/technical-services",
  },
  keywords: [
    "Technical Facility Management Services",
    "Engineering Maintenance Services",
    "Technical FM India",
    "MEP Engineering Maintenance",
    "24x7 Technical Operations",
    "Facility Engineering Maintenance",
    "Preventive Maintenance Services India",
  ],
  openGraph: {
    title: "Technical Facility Management Services & Engineering Maintenance | INA TechFM",
    description:
      "Enterprise technical facility management and engineering maintenance services across India. Unmatched uptime and asset lifecycle protection.",
    url: "https://inatechfmglobal.com/services/technical-services",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Technical Facility Management Services - INA TechFM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Facility Management Services & Engineering Maintenance | INA TechFM",
    description:
      "Enterprise technical facility management and engineering maintenance services across India.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Technical Facility Management Services & Engineering Maintenance",
  serviceType: "Technical Facility Management",
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
    "Comprehensive technical facility management services and engineering maintenance services ensuring 24x7 operational continuity, MEP systems upkeep, and critical infrastructure management.",
  url: "https://inatechfmglobal.com/services/technical-services",
};

export default function TechnicalServicesLayout({
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

