"use client";

import React from "react";
import Link from "next/link";

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Understand your requirements",
    description:
      "We begin by understanding your facility, operational requirements, engineering assets, challenges, and business objectives to identify the right approach for your site.",
  },
  {
    number: "02",
    title: "Assess and advise",
    description:
      "Our technical experts assess your engineering systems and assets, identify potential risks and improvement opportunities, and recommend practical solutions tailored to your facility.",
  },
  {
    number: "03",
    title: "Implement the right solution",
    description:
      "From Hard FM and technical services to transition, audits and sustainability solutions, our teams implement the required services with a focus on safety, reliability and operational continuity.",
  },
  {
    number: "04",
    title: "Optimise for the long term",
    description:
      "We continuously monitor asset performance, preventive maintenance and operational efficiency to extend asset life, reduce downtime, optimise costs and create sustainable value.",
  },
];

export default function FacilityManagementSteps() {
  return (
    <section
      className="relative w-full py-16 md:py-24 overflow-hidden font-['Poppins',sans-serif]"
      style={{
        background:
          "linear-gradient(to right, rgba(0,0,0,0.08) 0%, rgba(255,255,255,0) 30%, #ffffff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col items-start pt-2">
            <h2 className="font-['Integral_CF',sans-serif] text-3xl sm:text-4xl md:text-[52px] font-semibold text-black leading-[1.1] tracking-tight max-w-lg mb-8">
              Engineering solutions built around your needs
            </h2>

            <p className="text-[#585858] text-base md:text-lg leading-relaxed max-w-xl mb-8">
              We work closely with our clients to understand their facilities,
              optimise engineering assets and deliver reliable, sustainable
              solutions that support long-term operational performance.
            </p>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#1C3A62] text-white font-medium text-sm rounded-md shadow-sm hover:bg-[#2495D3] transition-colors duration-200"
            >
              Talk to Our Experts
            </Link>
          </div>

          {/* Right Column: Steps Timeline */}
          <div className="lg:col-span-6 relative pl-2 md:pl-6">
            <div className="flex flex-col gap-10 md:gap-12 relative">

              {STEPS.map((step, index) => {
                const isLast = index === STEPS.length - 1;

                return (
                  <div
                    key={step.number}
                    className="relative flex items-start gap-6"
                  >

                    {/* Badge & Line */}
                    <div className="relative flex flex-col items-center flex-shrink-0">

                      <div className="font-['Integral_CF',sans-serif] w-12 h-12 rounded-full bg-[#1C3A62] text-white flex items-center justify-center text-sm font-medium z-10">
                        {step.number}
                      </div>

                      {!isLast && (
                        <div
                          className="absolute top-12 bottom-[-40px] md:bottom-[-48px] w-[1.5px] bg-[#1C3A62] z-0 opacity-40"
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Step Details */}
                    <div className="pt-1.5 max-w-md">

                      <h3 className="font-['Integral_CF',sans-serif] text-xl md:text-2xl font-semibold text-black mb-2 leading-snug">
                        {step.title}
                      </h3>

                      <p className="text-[#585858] text-sm md:text-[15px] leading-relaxed">
                        {step.description}
                      </p>

                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}