"use client";

import React from "react";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/SiteHeader";
import AboutUsHeroSection from "@/components/about/AboutUsHeroSection";
import AnimateIn from "@/components/AnimateIn";
import StatsSection from "@/components/about/StatsSection";
import MissionVisionSlider from "@/components/about/MissionVisionSlider";
import CEOQuoteSection from "@/components/about/CEOQuoteSection";
import InteractiveTeamSlider from "@/components/about/InteractiveTeamSlider";
import OurTeam from "@/components/about/OurTeam";
import HowWeWork from "@/components/about/HowWeWork";

// Dynamically import 3D interactive map to prevent SSR canvas issues
const WhereAreWeLocated = dynamic(
  () => import("@/components/about/WhereAreWeLocated"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[500px] flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#2495D3] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[#1C3A62] font-semibold">Loading Pan-India Locations...</span>
        </div>
      </div>
    ),
  }
);

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA]">
      <SiteHeader />
      <main>
        {/* Hero section loads immediately */}
        <AboutUsHeroSection />

        {/* Below-the-fold sections load on scroll */}
        <AnimateIn delay={0.1} minHeight="200px" id="stats">
          <StatsSection />
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="400px" id="mission-vision">
          <MissionVisionSlider />
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="320px" id="ceo-quote">
          <CEOQuoteSection />
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="440px" id="leadership">
          <InteractiveTeamSlider />
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="480px" id="our-team">
          <OurTeam />
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="420px" id="how-we-work">
          <HowWeWork />
        </AnimateIn>

        {/* Pan-India 3D Regional Map & Office Locations */}
        <AnimateIn delay={0.1} minHeight="480px" id="locations">
          <WhereAreWeLocated />
        </AnimateIn>
      </main>
    </div>
  );
}
