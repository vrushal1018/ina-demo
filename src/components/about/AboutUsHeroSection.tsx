"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useVideoFocus } from "@/hooks/useVideoFocus";

export default function AboutUsHeroSection() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const videoRef = useVideoFocus({
    threshold: 0.05,
    rootMargin: "0px",
    pauseOnBlur: true,
  });

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-start pt-8 sm:pt-10 lg:pt-12 pb-12 overflow-hidden bg-[#0A1629] text-white font-sans">
      {/* Background Video with continuous loop and single-source mobile/desktop switching */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          key={isMobile === null ? "ssr" : isMobile ? "mobile" : "desktop"}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover object-center ${
            isMobile ? "scale-100" : "scale-100 sm:scale-105"
          }`}
          src={isMobile === true ? "/demovideo_full_vertical.mp4" : isMobile === false ? "/demovideo.mp4" : undefined}
        >
          <source media="(max-width: 768px)" src="/demovideo_full_vertical.mp4" type="video/mp4" />
          <source media="(min-width: 769px)" src="/demovideo.mp4" type="video/mp4" />
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
