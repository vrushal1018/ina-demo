"use client";

import React from "react";
import Image from "next/image";
import aboutUsImg from "../../../public/about us.png";

export default function CEOQuoteSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* Left Column: CEO Portrait Image */}
          <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-sm">
            <Image
              src={aboutUsImg}
              alt="About Us"
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
                We build a strong work environment by actively encouraging our team members
                to bring out new ideas and innovative thoughts.
              </span>{" "}
              <span className="text-[#878787]">
                We ensure the wellbeing and safety of our people across sites and back
                offices, while creating a culture where every team member feels valued
                and part of the family.
              </span>
            </blockquote>

            {/* Author Info */}
            <div>
              <h3 className="text-xl sm:text-2xl font-medium text-[#1C3A62]">
                Our People
              </h3>

              <p className="text-sm sm:text-base text-[#585858] font-medium mt-0.5 mb-3">
                3000+ Employees Across India
              </p>

              {/* Supporting Statement */}
              <div className="relative max-w-xl">
                <p className="text-sm sm:text-base text-[#585858] leading-relaxed">
                  With 3000+ employees working across India, we echo our corporate
                  values and deliver our commitments while building, nurturing, and
                  maintaining vibrant relationships with our clients.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
