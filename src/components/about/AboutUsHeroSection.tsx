"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useVideoFocus } from "@/hooks/useVideoFocus";

export default function AboutUsHeroSection() {
  const videoRef = useVideoFocus({
    threshold: 0.05,
    rootMargin: "0px",
    pauseOnBlur: true,
  });
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-start pt-8 sm:pt-10 lg:pt-12 pb-12 overflow-hidden bg-[#0A1629] text-white font-sans">
      {/* Background Video with continuous loop and responsive preview */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Responsive Preview Poster (Tailored for mobile vs desktop with zero awkward zoom) */}
        <picture
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            isVideoPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <source media="(max-width: 768px)" srcSet="/about-mobile-preview.webp" />
          <source media="(min-width: 769px)" srcSet="/about-desktop-preview.webp" />
          <img src="/about-desktop-preview.webp" alt="" className="w-full h-full object-cover object-center" />
        </picture>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onPlaying={() => setIsVideoPlaying(true)}
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 sm:scale-105"
        >
          <source src="/demovideo.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start">
        {/* Breadcrumbs - Top Left */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
          <Link href="/" className="hover:text-[#2495D3] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-semibold text-[#2495D3]">About Us</span>
        </div>

        {/* Blue Line - Just below Home / About us */}
        <div className="w-20 h-1 bg-[#2495D3] mt-3 sm:mt-4 rounded-full" />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-12">
          {/* LEFT CONTENT */}
          <div className="relative z-30">
          </div>
        </div>
      </div>
    </section>
  );
}
