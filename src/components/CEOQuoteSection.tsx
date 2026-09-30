"use client";

import React from "react";
import Image from "next/image";

export default function CEOQuoteSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: CEO Portrait Image */}
          <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
              alt="Michael Johnson - Founder & CEO of Realspace"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Right Column: Statement & Signature */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Main Statement with Dual-Tone Emphasis */}
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed tracking-tight mb-8">
              <span className="text-[#1C3A62] font-semibold">
                We believe real estate should be simple, transparent, and built on trust. Our team is dedicated to providing expert guidance, modern solutions,
              </span>{" "}
              <span className="text-[#878787]">
                and personalized support to make every buying and investment journey smooth and successful.
              </span>
            </blockquote>

            {/* Author Info */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1C3A62]">
                Michael Johnson
              </h3>
              <p className="text-sm sm:text-base text-[#585858] font-medium mt-0.5 mb-3">
                Founder & CEO of Realspace
              </p>

              {/* Signature Graphic */}
              <div className="relative w-28 sm:w-36 h-10">
                <span className="font-serif italic text-2xl sm:text-3xl text-[#585858]/80 select-none tracking-widest">
                  Michael
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
