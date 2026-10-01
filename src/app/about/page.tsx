import React from "react";
import AboutUsHeroSection from "@/components/about/AboutUsHeroSection";
import StatsSection from "@/components/about/StatsSection";
import MissionVisionSlider from "@/components/about/MissionVisionSlider";
import CEOQuoteSection from "@/components/about/CEOQuoteSection";
import TrustedAgentsSection from "@/components/about/TrustedAgentsSection";
import OurTeam from "@/components/about/OurTeam";
import WhereAreWeLocated from "@/components/about/WhereAreWeLocated";
import HowWeWork from "@/components/about/HowWeWork";
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
        <OurTeam />
        <WhereAreWeLocated />
        <HowWeWork />
      </main>
    </div>
  );
}
