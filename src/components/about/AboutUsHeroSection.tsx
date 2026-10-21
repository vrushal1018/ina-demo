"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

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
    <section className="relative w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-12 font-sans overflow-hidden">
      {/* Background blueprint subtle accents */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      {/* Architectural linework stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.25} mask="fade-edges" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
        >
          <div className="inline-block rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#2495D3] mb-4">
            About Us
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C3A62] tracking-normal">
            About Us
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#585858] font-medium max-w-xl mx-auto">
            Helping You Find the Perfect Place to Call Business.
          </p>
        </motion.div>

        {/* Staggered Gallery Grid with Architectural Framing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 items-center mb-16 sm:mb-24">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative w-full ${img.heightClass} rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100 group`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                priority={img.id === 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A62]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Content Footer / "What we do" Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-30px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl text-left p-8 sm:p-12 rounded-3xl bg-[#F8F9FA] border border-slate-200/80 shadow-xs relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-[#2495D3]" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#2495D3] uppercase block mb-4">
            What we do
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal text-[#1C3A62] leading-tight sm:leading-snug lg:leading-tight">
            We enrich your assets through expert repairs and proactive maintenance, extending their lifespan and keeping your facility safe, efficient and reliable.
          </h2>
        </motion.div>

      </div>
    </section>
  );
}
