import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Energy Management Services & Sustainability Solutions | INA TechFM",
  description:
    "Expert energy management services and sustainable facility solutions across India. Power consumption optimization, carbon footprint reduction, green audits, and ESG compliance.",
  alternates: {
    canonical: "https://inatechfmglobal.com/services/sustainability-services",
  },
  keywords: [
    "Energy Management Services",
    "Sustainability Services India",
    "Energy Audits for Buildings",
    "Carbon Reduction Facility Management",
    "Green Building Services",
    "ESG Facility Management India",
  ],
  openGraph: {
    title: "Energy Management Services & Sustainability Solutions | INA TechFM",
    description:
      "Enterprise energy management services and sustainability solutions for modern facilities across India.",
    url: "https://inatechfmglobal.com/services/sustainability-services",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Energy Management Services - INA TechFM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Energy Management Services & Sustainability Solutions | INA TechFM",
    description:
      "Enterprise energy management services and sustainability solutions across India.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Energy Management Services",
  serviceType: "Energy & Sustainability Management",
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
    "Comprehensive energy management services and sustainability solutions that optimize building energy consumption, lower utility costs, and drive carbon reduction.",
  url: "https://inatechfmglobal.com/services/sustainability-services",
};

export default function SustainabilityServicesLayout({
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

