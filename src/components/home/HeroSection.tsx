"use client";

import { useState } from "react";
import {
  Rocket,
  CheckCircle2,
  Terminal,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  LayoutGrid,
  ShieldCheck,
  Flame,
} from "lucide-react";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const command = "npx create-next-app@latest --tailwind";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
      {/* Glow Background Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-pink-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-purple-500/30 text-xs font-semibold text-purple-300 shadow-sm animate-pulse-slow">
            <Flame className="w-4 h-4 text-pink-400" />
            <span>Next.js 15 + Tailwind CSS v4 + Lucide Icons</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1]">
            Build Faster with{" "}
            <span className="gradient-text">Next.js & Lucide UI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A complete production-ready setup configured with Next.js App Router,
            Tailwind CSS v4 styling system, and customizable Lucide React icons.
          </p>

          {/* Command Copy Box */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 font-mono text-sm text-zinc-300 shadow-inner">
              <div className="flex items-center gap-2.5 truncate">
                <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">{command}</span>
              </div>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all shrink-0"
                title="Copy command"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#components"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-base shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center gap-2.5 group"
            >
              <LayoutGrid className="w-5 h-5" />
              View UI Components
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#features"
              className="px-6 py-3.5 rounded-xl glass-card hover:bg-white/10 text-white font-semibold text-base transition-all flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
              Key Features
            </a>
          </div>

          {/* Highlights Checklist */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-zinc-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>TypeScript Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tailwind v4 Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Lucide Icon Library</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero-Config Setup</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
