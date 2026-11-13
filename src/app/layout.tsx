import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";
import DiwaliTheme from "@/components/DiwaliTheme";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inatechfmglobal.com"),
  title: {
    default: "Integrated Facility Management Services in India | INA TechFM",
    template: "%s | INA TechFM",
  },
  description:
    "Leading facility management company in India delivering integrated facility management services, technical engineering, MEP maintenance, energy management, and 24x7 operations across 55+ cities.",
  applicationName: "INA TechFM",
  alternates: {
    canonical: "https://inatechfmglobal.com",
  },
  keywords: [
    "Integrated Facility Management Services in India",
    "Facility Management Company in India",
    "Facility Management Services",
    "Hard Facility Management Services",
    "Technical Facility Management Services",
    "Engineering Maintenance Services",
    "Facility Transition Management",
    "Energy Management Services",
    "Facility Management Audits",
    "Allied Facility Management Services",
    "INA TechFM",
    "Facility Management India",
  ],
  authors: [{ name: "INA TechFM", url: "https://inatechfmglobal.com" }],
  creator: "INA TechFM",
  publisher: "INA TechFM",
  icons: {
    icon: [
      { url: "/icon.png?v=3", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/icon-192.png?v=3", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: [
      { url: "/apple-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://inatechfmglobal.com",
    siteName: "INA TechFM",
    title: "Integrated Facility Management Services in India | INA TechFM",
    description:
      "Leading facility management company in India delivering integrated facility management services, technical engineering, MEP maintenance, energy management, and 24x7 operations across 55+ cities.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "INA TechFM - Integrated Facility Management Services in India",
        type: "image/png",
      },
      {
        url: "/Ina TechFM Logo white.png",
        width: 313,
        height: 179,
        alt: "INA TechFM Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrated Facility Management Services in India | INA TechFM",
    description:
      "Leading facility management company in India delivering integrated facility management services, technical engineering, MEP maintenance, energy management, and 24x7 operations across 55+ cities.",
    images: ["/og-image.png"],
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "INA TechFM",
  alternateName: "Ina Tech FM Global",
  url: "https://inatechfmglobal.com",
  logo: "https://inatechfmglobal.com/Ina%20TechFM%20Logo%20white.png",
  description:
    "Leading facility management company in India providing integrated facility management services, technical FM, hard FM, energy management, and engineering maintenance.",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Facility Management Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Integrated Facility Management Services in India",
          url: "https://inatechfmglobal.com",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hard Facility Management Services",
          url: "https://inatechfmglobal.com/services/hard-fm",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Technical Facility Management Services",
          url: "https://inatechfmglobal.com/services/technical-services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Engineering Maintenance Services",
          url: "https://inatechfmglobal.com/services/technical-services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Facility Transition Management",
          url: "https://inatechfmglobal.com/services/transition-services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Energy Management Services",
          url: "https://inatechfmglobal.com/services/sustainability-services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Facility Management Audits",
          url: "https://inatechfmglobal.com/services/audit-and-offerings",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Allied Facility Management Services",
          url: "https://inatechfmglobal.com/services/allied-services",
        },
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased bg-[#D9EDF8] overflow-x-hidden max-w-full`}
    >
      <body className="min-h-full flex flex-col bg-[#D9EDF8] text-[#383838] overflow-x-hidden max-w-full">
        <DiwaliTheme />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <ScrollProgressBar />
        <LoadingScreen />
        <div className="flex-grow w-full max-w-full overflow-x-clip">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
