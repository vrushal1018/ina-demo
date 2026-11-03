import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inatechfmglobal.com"),
  title: {
    default: "INA TechFM - Facility Management & Technical Services",
    template: "%s | INA TechFM",
  },
  description:
    "Comprehensive engineering and facility management solutions focused on reliable, sustainable, and efficient operations across India.",
  applicationName: "INA TechFM",
  keywords: [
    "Facility Management",
    "Technical Services",
    "Engineering Operations",
    "MEP Maintenance",
    "HVAC",
    "Ina TechFM",
    "Ina Tech FM",
    "Pan-India FM",
  ],
  authors: [{ name: "INA TechFM", url: "https://inatechfmglobal.com" }],
  creator: "INA TechFM",
  publisher: "INA TechFM",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://inatechfmglobal.com",
    siteName: "INA TechFM",
    title: "INA TechFM - Facility Management & Technical Services",
    description:
      "Comprehensive engineering and facility management solutions focused on reliable, sustainable, and efficient operations across India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "INA TechFM - Engineering & Facility Management Solutions",
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
    title: "INA TechFM - Facility Management & Technical Services",
    description:
      "Comprehensive engineering and facility management solutions focused on reliable, sustainable, and efficient operations across India.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased bg-[#D9EDF8] overflow-x-hidden max-w-full`}
    >
      <body className="min-h-full flex flex-col bg-[#D9EDF8] text-[#383838] overflow-x-hidden max-w-full">
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
