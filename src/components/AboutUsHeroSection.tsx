"use client";

import React from "react";
import Image from "next/image";

export default function AboutUsHeroSection() {
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
      alt: "Couple looking at their new home with a dog",
      heightClass: "h-[220px] sm:h-[260px] lg:h-[300px]",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
      alt: "Modern luxury apartment complex",
      heightClass: "h-[180px] sm:h-[210px] lg:h-[240px]",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
      alt: "Happy real estate agent holding keys",
      heightClass: "h-[240px] sm:h-[290px] lg:h-[340px]",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      alt: "Modern glass office building",
      heightClass: "h-[180px] sm:h-[210px] lg:h-[240px]",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      alt: "Professional real estate agent smiling",
      heightClass: "h-[220px] sm:h-[260px] lg:h-[300px]",
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C3A62] tracking-tight">
            About Us
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#585858] font-medium">
            Helping You Find the Perfect Place to Call Business.
          </p>
        </div>

        {/* Staggered Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 items-center mb-16 sm:mb-20">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className={`relative w-full ${img.heightClass} rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center"
                priority={img.id === 3}
              />
            </div>
          ))}
        </div>

        {/* Content Footer / "What we do" Statement */}
        <div className="max-w-4xl text-left">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#878787] uppercase block mb-3">
            What we do
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1C3A62] leading-tight sm:leading-snug lg:leading-tight">
            We help people find modern homes and smart real estate investment
            opportunities designed for better living and long–term value.
          </h2>
        </div>

      </div>
    </section>
  );
}
