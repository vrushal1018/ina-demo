"use client";

import React from "react";
import { CheckCircle2, PhoneCall, MapPin } from "lucide-react";

export default function RepairsAndServicing() {
  const commonIssuesLeft = [
    "Preventive and predictive maintenance",
    "Electrical and HVAC maintenance",
    "Engineering asset management",
    "MEP equipment testing and commissioning",
  ];

  const commonIssuesRight = [
    "Asset performance and lifecycle enhancement",
    "Energy audits and sustainability solutions",
    "Safety and compliance audits",
    "Repair, refurbishment and technical support",
  ];

  return (
    <section className="py-16 md:py-24 bg-white text-[#383838]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-6">

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C3A62] tracking-tight leading-tight">
              Expert Engineering & Facility Management Services
            </h2>

            {/* Introductory Paragraph */}
            <p className="text-base sm:text-lg text-[#585858] leading-relaxed font-normal">
              From critical engineering assets to day-to-day facility
              operations, every environment requires reliable, efficient,
              and proactive management. At Ina Tech FM, we combine engineering
              expertise, technology, and responsive service to enhance asset
              performance, minimize downtime, improve safety, and deliver
              sustainable operational outcomes.
            </p>

            {/* List Header */}
            <p className="text-base font-semibold text-[#1C3A62] pt-2">
              Our engineering and facility management expertise includes:
            </p>

            {/* 2-Column Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">

              {/* Left List */}
              <div className="space-y-3.5">
                {commonIssuesLeft.map((issue, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#2495D3] flex-shrink-0 mt-0.5" />

                    <span className="text-sm font-medium text-[#383838] leading-snug">
                      {issue}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right List */}
              <div className="space-y-3.5">
                {commonIssuesRight.map((issue, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#2495D3] flex-shrink-0 mt-0.5" />

                    <span className="text-sm font-medium text-[#383838] leading-snug">
                      {issue}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6">

              {/* Primary Button */}
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-lg bg-[#1C3A62] hover:bg-[#2495D3] text-white font-bold text-center transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
              >
                Talk to Our Experts
              </a>

              {/* Secondary Button */}
              <a
                href="#services"
                className="px-8 py-3.5 rounded-lg border-2 border-[#1C3A62] hover:bg-[#1C3A62] hover:text-white text-[#1C3A62] font-bold text-center transition-all duration-300 flex items-center justify-center space-x-2 transform active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Explore Our Services</span>
              </a>

            </div>
          </div>

          {/* Right Column: Headquarters Map */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 group">

              {/* Google Map */}
              <div className="relative h-[380px] sm:h-[460px] w-full">

                <iframe
                  src="https://www.google.com/maps?q=MBC+Tech+Park,+Sainath+Nagar,+Kasarvadavli,+Ghodbunder+Road,+Thane+West,+Maharashtra+400615&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ina Tech FM Headquarters Location"
                  className="w-full h-full"
                />

              </div>

              {/* Subtle Map Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#1C3A62]/20 via-transparent to-transparent" />

              {/* Headquarters Information Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-gray-100 shadow-lg">

                <div className="flex items-start space-x-3">

                  {/* Location Icon */}
                  <div className="p-2.5 rounded-lg bg-[#2495D3]/10 text-[#2495D3] flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>

                  {/* Location Details */}
                  <div>
                    <div className="text-xs font-semibold text-[#878787] uppercase tracking-wider mb-1">
                      Ina Tech FM Headquarters
                    </div>

                    <div className="text-sm font-bold text-[#1C3A62] leading-relaxed">
                      1st Floor, C-Wing, MBC Tech Park, Sainath Nagar,
                      Kasarvadavli, Ghodbunder Road, Thane West,
                      Maharashtra – 400615
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}