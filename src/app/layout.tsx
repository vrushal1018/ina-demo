import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Maverick - Melbourne's Trusted Local Garage Door Experts",
  description: "Fast repairs, expert installations, scheduled servicing, and local police checked technicians in Melbourne. Call +1300 111 222.",
};

import LoadingScreen from "@/components/LoadingScreen";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
