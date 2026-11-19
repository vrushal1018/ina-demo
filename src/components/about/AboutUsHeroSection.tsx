"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useVideoFocus } from "@/hooks/useVideoFocus";

export default function AboutUsHeroSection() {
  const mobileVideoRef = useVideoFocus({
    threshold: 0,
    rootMargin: "200px",
    pauseOnBlur: false,
  });
  const desktopVideoRef = useVideoFocus({
    threshold: 0,
    rootMargin: "200px",
    pauseOnBlur: false,
  });

  useEffect(() => {
    // Explicit autoplay compliance & initialization for mobile & desktop
    const playVideo = (video: HTMLVideoElement | null) => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "true");
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay policy restrictions - fallback triggers on user touch/scroll
        });
      }
    };

    playVideo(mobileVideoRef.current);
    playVideo(desktopVideoRef.current);
  }, [mobileVideoRef, desktopVideoRef]);

  return (
    <section className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-start pt-8 sm:pt-10 lg:pt-12 pb-12 overflow-hidden bg-[#0A1629] text-white font-sans">
      {/* Background Video with continuous loop and zero-layout-shift responsive display */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Mobile Phone Hero Video - ALWAYS /demovideo_full_vertical.mp4 */}
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src="/demovideo_full_vertical.mp4"
          onEnded={(e) => {
            const v = e.currentTarget;
            v.currentTime = 0;
            v.play().catch(() => {});
          }}
          className="md:hidden absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Desktop/Tablet Hero Video - ALWAYS /demovideo.mp4 */}
        <video
          ref={desktopVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src="/demovideo.mp4"
          onEnded={(e) => {
            const v = e.currentTarget;
            v.currentTime = 0;
            v.play().catch(() => {});
          }}
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center scale-100 sm:scale-105"
        />
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
