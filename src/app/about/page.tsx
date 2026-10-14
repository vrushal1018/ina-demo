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

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <SiteHeader />
      <main>
        {/* Hero section loads immediately */}
        <AboutUsHeroSection />

        {/* Below-the-fold sections load on scroll */}
        <AnimateIn delay={0.1} minHeight="260px" id="stats">
          <StatsSection />
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="460px" id="mission-vision">
          <MissionVisionSlider />
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="360px" id="ceo-quote">
          <CEOQuoteSection />
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="560px" id="leadership">
          <InteractiveTeamSlider />
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="620px" id="our-team">
          <OurTeam />
        </AnimateIn>

        <AnimateIn delay={0.1} minHeight="500px" id="how-we-work">
          <HowWeWork />
        </AnimateIn>
      </main>
    </div>
  );
}
