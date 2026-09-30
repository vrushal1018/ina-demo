import React from "react";
import AboutUsHeroSection from "@/components/AboutUsHeroSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-transparent">
      {/* We can re-use the Navbar if it's not already in the root layout.
          If it's in the root layout, we don't need it. Let's just output the hero for now. */}
      <Navbar />
      <main>
        <AboutUsHeroSection />
      </main>
      <Footer />
    </div>
  );
}
