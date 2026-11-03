import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facility Transition Management & Site Mobilization | INA TechFM",
  description:
    "Structured facility transition management and site mobilization across India. Ensuring seamless operational takeover, asset tagging, risk mitigation, and SLA continuity.",
  alternates: {
    canonical: "https://inatechfmglobal.com/services/transition-services",
  },
  keywords: [
    "Facility Transition Management",
    "Facility Transition Services",
    "Site Mobilization Services",
    "FM Handover India",
    "Operational Mobilization",
    "Asset Handover Management",
  ],
  openGraph: {
    title: "Facility Transition Management & Site Mobilization | INA TechFM",
    description:
      "Structured facility transition management services ensuring smooth takeover and operational continuity across facilities in India.",
    url: "https://inatechfmglobal.com/services/transition-services",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Facility Transition Management - INA TechFM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facility Transition Management & Site Mobilization | INA TechFM",
    description:
      "Structured facility transition management services ensuring seamless operational continuity across India.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Facility Transition Management",
  serviceType: "Facility Transition Services",
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
    "Comprehensive facility transition management covering site mobilization, asset verification, team onboarding, and SLA assurance for enterprise clients.",
  url: "https://inatechfmglobal.com/services/transition-services",
};

export default function TransitionServicesLayout({
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

