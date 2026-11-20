"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import AnimateIn from "@/components/AnimateIn";
import Counter from "@/components/Counter";

import FeatureGrid from "@/components/home/FeatureGrid";
import ServicesSection from "@/components/home/ServicesSection";
import GarageDoorTypes from "@/components/home/GarageDoorTypes";
import BrandBanner from "@/components/home/BrandBanner";
import RepairsAndServicing from "@/components/home/RepairsAndServicing";
import GarageDoorSteps from "@/components/home/GarageDoorSteps";
import { useVideoFocus } from "@/hooks/useVideoFocus";

export default function Home() {
  const mobileHeroVideoRef = useVideoFocus({
    threshold: 0,
    rootMargin: "200px",
    pauseOnBlur: false,
  });
  const desktopHeroVideoRef = useVideoFocus({
    threshold: 0,
    rootMargin: "200px",
    pauseOnBlur: false,
  });
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  // Feature bullets for Tech fm
  // const features = [
  //   "Hard FM and Technical services",
  //   "Engineering services",
  //   "Sustainability services",
  //   "Audits and assessments",
  // ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-ina-tint-15 to-ina-tint-8 font-sans text-ina-ink selection:bg-ina-blue selection:text-white">
      {/* Header */}

      <SiteHeader />

      {/* Hero Section - Loads immediately (above the fold) */}
      <section className="relative w-full min-h-[100dvh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-ina-night">
        {/* Background Video with continuous loop and instant responsive preview poster */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* LCP Resource hints - Preload the high-priority hero poster */}
          <link
            rel="preload"
            as="image"
            href="/hero-mobile-preview.webp"
            type="image/webp"
            media="(max-width: 768px)"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            href="/hero-desktop-preview.webp"
            type="image/webp"
            media="(min-width: 769px)"
            fetchPriority="high"
          />

          {/* Responsive Preview Poster (Tailored for mobile vs desktop with zero awkward zoom) */}
          <picture
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              isVideoPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <source media="(max-width: 768px)" srcSet="/hero-mobile-preview.webp" />
            <source media="(min-width: 769px)" srcSet="/hero-desktop-preview.webp" />
            <img
              src="/hero-desktop-preview.webp"
              alt="Ina TechFM"
              width={1920}
              height={1080}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
          </picture>

          {/* Mobile Phone Hero Video - ALWAYS inatechphoneview1.mp4 */}
          <video
            ref={mobileHeroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            src="/inatechphoneview1.mp4"
            onPlaying={() => setIsVideoPlaying(true)}
            onEnded={(e) => {
              const v = e.currentTarget;
              v.currentTime = 0;
              v.play().catch(() => {});
            }}
            className="md:hidden absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Desktop/Tablet Hero Video - ALWAYS itf-hero-optimized.mp4 */}
          <video
            ref={desktopHeroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            src="/itf-hero-optimized.mp4"
            onPlaying={() => setIsVideoPlaying(true)}
            onEnded={(e) => {
              const v = e.currentTarget;
              v.currentTime = 0;
              v.play().catch(() => {});
            }}
            className="hidden md:block absolute inset-0 w-full h-full object-cover object-center scale-100 sm:scale-105"
          />
        </div>

        {/* Top-Left: Logo & Tagline */}
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 pt-6 sm:pt-8 lg:pt-10 flex items-start">
          {/* Brand Logo in Hero at Left */}
          <div className="flex flex-col items-start">
            <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95" title="Ina TechFM - Integrated Facility Management Services in India">
              <img
                src="/Ina%20TechFM%20Logo%20white.png"
                alt="Ina TechFM - Integrated Facility Management Services in India"
                width={313}
                height={179}
                decoding="async"
                className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain drop-shadow-xl"
              />
            </Link>
            {/* Primary SEO H1 Heading */}
            <h1 className="sr-only">
              Integrated Facility Management Services in India • Facility Management Company in India
            </h1>

            {/* Phone View: Empowering People • Enriching Assets directly below logo */}
            <div className="mt-2.5 flex flex-col items-start text-left md:hidden">
              <div className="text-sm font-light tracking-wide text-white leading-tight drop-shadow-md">
                Empowering People
              </div>
              <div className="text-sm font-medium tracking-wide text-ina-blue leading-tight mt-0.5 drop-shadow-md">
                Enriching Assets
              </div>
            </div>
          </div>
        </div>

        {/* Feature Points in Down Corner (Bottom-Right) */}
        {/* <div className="absolute bottom-36 sm:bottom-36 md:bottom-10 lg:bottom-12 right-5 sm:right-8 lg:right-12 z-20 flex flex-col items-start space-y-2.5 sm:space-y-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-2.5 drop-shadow-md"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-ina-blue flex-shrink-0" />
              <span className="text-xs sm:text-sm text-ina-line font-medium tracking-wide">
                {feature}
              </span>
            </div>
          ))}
        </div> */}

        {/* Bottom Verified Metrics & Tagline Band */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-6 lg:px-8 pb-8 sm:pb-10 pt-6 mt-auto">
          <div className="w-full border-t border-white/15 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left Corner of the Band (Desktop/Tablet): Empowering People • Enriching Assets */}
            <div className="hidden md:flex flex-col items-start text-left shrink-0">
              <div className="text-base sm:text-lg lg:text-xl font-light tracking-wide text-white leading-tight drop-shadow-md">
                Empowering People
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-medium tracking-wide text-ina-blue leading-tight mt-0.5 drop-shadow-md">
                Enriching Assets
              </div>
            </div>

            {/* Metrics Counters */}
            <div className="w-full md:max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 sm:gap-6 text-center md:text-right">
              <div className="flex flex-col items-center md:items-end justify-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-normal font-heading text-white tracking-normal whitespace-nowrap">
                  <Counter end={78} suffix="m+ sft" duration={2000} />
                </div>
                <div className="text-xs text-slate-300 sm:text-slate-400 mt-1 whitespace-nowrap">Area Managed</div>
              </div>
              <div className="flex flex-col items-center md:items-end justify-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-normal font-heading text-white tracking-normal whitespace-nowrap">
                  <Counter end={290} suffix="+" duration={2000} />
                </div>
                <div className="text-xs text-slate-300 sm:text-slate-400 mt-1 whitespace-nowrap">Clients</div>
              </div>
              <div className="flex flex-col items-center md:items-end justify-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-normal font-heading text-white tracking-normal whitespace-nowrap">
                  <Counter end={3000} suffix="+" duration={2000} />
                </div>
                <div className="text-xs text-slate-300 sm:text-slate-400 mt-1 whitespace-nowrap">Employees</div>
              </div>
              <div className="flex flex-col items-center md:items-end justify-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-normal font-heading text-white tracking-normal whitespace-nowrap">
                  <Counter end={2018} useGrouping={false} duration={2000} />
                </div>
                <div className="text-xs text-slate-300 sm:text-slate-400 mt-1 whitespace-nowrap">Since</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Below Hero - Loads on scroll */}
      <AnimateIn delay={0.1} minHeight="380px" id="feature-grid" lazy={true}>
        <FeatureGrid />
      </AnimateIn>

      {/* Services Section - Loads on scroll */}
      <AnimateIn delay={0.1} minHeight="520px" id="services" lazy={true}>
        <ServicesSection />
      </AnimateIn>

      {/* Sectors We Operate Grid - Loads on scroll */}
      <AnimateIn delay={0.1} minHeight="480px" id="sectors" lazy={true}>
        <GarageDoorTypes />
      </AnimateIn>

      {/* Brand Banner Section - Loads on scroll */}
      <AnimateIn delay={0.1} minHeight="140px" id="brands" lazy={true}>
        <BrandBanner />
      </AnimateIn>

      {/* Repairs & Servicing Section - Loads on scroll */}
      <AnimateIn delay={0.1} minHeight="500px" id="repairs" lazy={true}>
        <RepairsAndServicing />
      </AnimateIn>

      {/* Steps / How it works Section - Loads on scroll */}
      <AnimateIn delay={0.1} minHeight="450px" id="how-it-works" lazy={true}>
        <GarageDoorSteps />
      </AnimateIn>
    </div>
  );
}