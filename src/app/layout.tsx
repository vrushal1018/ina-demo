import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "INA - Facility Management & Technical Services",
  description: "Comprehensive engineering and facility management solutions focused on reliable, sustainable and efficient operations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased bg-[#D9EDF8]`}
    >
      <body className="min-h-full flex flex-col bg-[#D9EDF8] text-[#383838]">
        <LoadingScreen />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
