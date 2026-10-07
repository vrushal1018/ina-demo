"use client";

import React from "react";
import { Home } from "lucide-react";

export default function BlogHero() {
  return (
    <section className="relative w-full py-24 md:py-32 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* 
        Background styling featuring the updated soft, pale-blue gradient.
      */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e0f0fc] via-[#edf5fc] to-[#f7faff] -z-10" />

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-sm mb-10 text-gray-700">
          <Home className="w-4 h-4 mb-0.5 stroke-[1.5]" />
          <span>
            Home / <span className="font-semibold text-gray-900">Blog</span>
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-[4rem] font-semibold text-gray-900 leading-[1.1] tracking-tight mb-6">
          Insights,
          <br />
          Ideas & Innovation
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Explore expert articles, tech trends, and practical tips to keep your
          business ahead of the curve.
        </p>
      </div>
    </section>
  );
}