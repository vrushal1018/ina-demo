import React from "react";
import AboutUsHeroSection from "@/components/AboutUsHeroSection";
import StatsSection from "@/components/StatsSection";
import MissionVisionSlider from "@/components/MissionVisionSlider";
import CEOQuoteSection from "@/components/CEOQuoteSection";
import TrustedAgentsSection from "@/components/TrustedAgentsSection";
import WhereAreWeLocated from "@/components/WhereAreWeLocated";
import SiteHeader from "@/components/SiteHeader";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-transparent">
      <SiteHeader />
      <main>
        <AboutUsHeroSection />
        <StatsSection />
        <MissionVisionSlider />
        <CEOQuoteSection />
        <TrustedAgentsSection />
        <WhereAreWeLocated />
      </main>
    </div>
  );
}
