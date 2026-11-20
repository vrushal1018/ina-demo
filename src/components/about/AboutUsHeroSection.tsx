"use client";

import React, { useEffect } from "react";
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
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-start pt-24 sm:pt-28 lg:pt-32 pb-12 overflow-hidden bg-ina-night text-white font-sans">
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
          disablePictureInPicture
          disableRemotePlayback
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
          disablePictureInPicture
          disableRemotePlayback
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
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-12">
          {/* LEFT CONTENT */}
          <div className="relative z-30">
          </div>
        </div>
      </div>
    </section>
  );
}
