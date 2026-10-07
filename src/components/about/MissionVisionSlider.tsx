"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import missionImg from "../../../public/mission.png";
import visionImg from "../../../public/vision.png";
import goalsImg from "../../../public/goals.png";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string | import("next/image").StaticImageData;
  alt: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Our Mission",
    description:
      "To deliver efficient, sustainable, and technology-enabled facility management solutions that enhance asset performance, optimize energy consumption, ensure compliance, and create better environments for our customers.",
    image: missionImg,
    alt: "Our Mission",
  },
  {
    id: 2,
    title: "Our Vision",
    description:
      "To be the first choice in Engineering Facility Management by delivering innovative, technology-driven solutions that create lasting value for our customers.",
    image: visionImg,
    alt: "Our Vision",
  },
  {
    id: 3,
    title: "Our Goals",
    description:
      "To achieve operational excellence, drive sustainable growth, embrace innovative technologies, and deliver measurable value through reliable, efficient, and customer-focused facility management solutions.",
    image: goalsImg,
    alt: "Our Goals",
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

  // Auto-play interval (switches every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden shadow-lg">
          {/* Slide Images (Fading transition) */}
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
          ))}

          {/* Foreground Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

              {/* Text Block */}
              <div className="max-w-2xl text-white transition-all duration-500 transform">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3">
                  {slides[currentIndex].title}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-200 font-normal leading-relaxed max-w-xl">
                  {slides[currentIndex].description}
                </p>
              </div>

              {/* Navigation Arrows & Indicators */}
              <div className="flex items-center gap-3 self-end md:self-auto">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous Slide"
                  className="p-3.5 rounded-full border border-white/30 bg-black/20 text-white hover:bg-white hover:text-[#1C3A62] backdrop-blur-sm transition-all duration-200 active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  aria-label="Next Slide"
                  className="p-3.5 rounded-full bg-white text-[#1C3A62] hover:bg-[#2495D3] hover:text-white transition-all duration-200 shadow-md active:scale-95"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Slide Dots Indicator */}
            <div className="flex items-center gap-2 mt-6">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                    ? "w-8 bg-[#2495D3]"
                    : "w-2 bg-white/40 hover:bg-white/70"
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
