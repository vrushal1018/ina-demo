"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Compass, Eye, Target } from "lucide-react";
import missionImg from "../../../public/mission.png";
import visionImg from "../../../public/vision.png";
import goalsImg from "../../../public/goals.png";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string | import("next/image").StaticImageData;
  alt: string;
  icon: any;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Our Mission",
    description:
      "To deliver efficient, sustainable, and technology-enabled facility management solutions that enhance asset performance, optimize energy consumption, ensure compliance, and create better environments for our customers.",
    image: missionImg,
    alt: "Our Mission",
    icon: Compass,
  },
  {
    id: 2,
    title: "Our Vision",
    description:
      "To be the first choice in Engineering Facility Management by delivering innovative, technology-driven solutions that create lasting value for our customers.",
    image: visionImg,
    alt: "Our Vision",
    icon: Eye,
  },
  {
    id: 3,
    title: "Our Goals",
    description:
      "To achieve operational excellence, drive sustainable growth, embrace innovative technologies, and deliver measurable value through reliable, efficient, and customer-focused facility management solutions.",
    image: goalsImg,
    alt: "Our Goals",
    icon: Target,
  },
];

export default function MissionVisionSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, []);

  // Auto-play interval (switches every 7 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="relative w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Interactive Top Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10 flex-wrap">
          {slides.map((slide, idx) => {
            const Icon = slide.icon;
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isCurrent
                    ? "bg-[#1C3A62] text-white shadow-lg shadow-[#1C3A62]/20 scale-105"
                    : "bg-slate-100 text-[#585858] hover:bg-slate-200"
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? "text-[#2495D3]" : "text-slate-500"}`} />
                <span>{slide.title}</span>
              </button>
            );
          })}
        </div>

        {/* Presentation Stage */}
        <div className="relative w-full h-[500px] sm:h-[560px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/80">
          {/* Slide Images (Fading transition) */}
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center scale-105 transition-transform duration-1000"
              />
              {/* Deep Cinematic Gradient Overlay for Crystal Clear Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1629]/95 via-[#0A1629]/60 to-black/30" />
            </div>
          ))}

          {/* Foreground Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

              {/* Text Block */}
              <div className="max-w-2xl text-white">
                <div className="inline-block rounded-full bg-[#2495D3]/20 border border-[#2495D3]/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#2495D3] mb-4">
                  Strategic Foundation
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 leading-tight font-heading">
                  {slides[currentIndex].title}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-xl">
                  {slides[currentIndex].description}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3 self-end md:self-auto">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Slide"
                  className="p-3.5 rounded-full border border-white/20 bg-black/40 text-white hover:bg-white hover:text-[#1C3A62] backdrop-blur-md transition-all duration-200 active:scale-95 shadow-md"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next Slide"
                  className="p-3.5 rounded-full bg-[#2495D3] hover:bg-[#488FCD] text-white transition-all duration-200 shadow-lg shadow-[#2495D3]/30 active:scale-95"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Slide Progress Bar */}
            <div className="flex items-center gap-2.5 mt-8">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === currentIndex
                      ? "w-12 bg-[#2495D3]"
                      : "w-3 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
