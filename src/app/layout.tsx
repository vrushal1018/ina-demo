import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "INA - Facility Management & Technical Services",
  description: "Comprehensive engineering and facility management solutions focused on reliable, sustainable and efficient operations.",
};

import LoadingScreen from "@/components/LoadingScreen";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased bg-white`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#383838]">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
