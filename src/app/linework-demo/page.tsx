'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';
import {
  Compass,
  Sliders,
  Play,
  Pause,
  Sun,
  Moon,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCode,
} from 'lucide-react';

export default function LineworkDemoPage() {
  const [theme, setTheme] = useState<'dark' | 'light' | 'cyan'>('dark');
  const [opacity, setOpacity] = useState<number>(0.75);
  const [showBeacons, setShowBeacons] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<'slice' | 'meet'>('slice');

  return (
    <div className="min-h-screen bg-[#070E1A] text-white font-sans selection:bg-[#2495D3] selection:text-white">
      <SiteHeader />

      {/* Main Interactive Showcase Hero */}
      <section
        className={`relative min-h-[92vh] flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
          theme === 'light'
            ? 'bg-gradient-to-b from-slate-50 via-white to-slate-100 text-[#1C3A62]'
            : 'bg-[#0A1629] text-white'
        }`}
      >
        {/* The Authentic Architectural Linework Background Animation */}
        <ArchitecturalLineworkBackground
          theme={theme}
          opacity={opacity}
          showBeacons={showBeacons}
          aspectRatio={aspectRatio}
        />

        {/* Blueprint Grid Ambient Accent */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            theme === 'light' ? 'blueprint-dots opacity-20' : 'blueprint-grid opacity-15'
          }`}
        />

        {/* Floating Controls HUD Top Right */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2495D3]/20 border border-[#2495D3]/40 flex items-center justify-center text-[#2495D3]">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <div className="text-xs font-semibold tracking-wide text-white">
                  INA TechFM linework engine
                </div>
                <div className="text-[11px] text-slate-400">
                  43 Authentic Vector Curves Extracted from lineworkina.pdf
                </div>
              </div>
            </div>

            {/* Quick Interactive Toggles */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Theme Toggle */}
              <div className="flex rounded-full bg-white/10 p-1 border border-white/10 text-xs">
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                    theme === 'dark' ? 'bg-[#2495D3] text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                    theme === 'light' ? 'bg-white text-[#1C3A62] font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setTheme('cyan')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                    theme === 'cyan' ? 'bg-[#2495D3] text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cyan</span>
                </button>
              </div>

              {/* Beacons Toggle */}
              <button
                onClick={() => setShowBeacons(!showBeacons)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  showBeacons
                    ? 'bg-[#2495D3]/20 border-[#2495D3]/50 text-[#2495D3]'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showBeacons ? 'Pen Beacons: On' : 'Pen Beacons: Off'}</span>
              </button>

              {/* Aspect Ratio Toggle */}
              <button
                onClick={() => setAspectRatio(aspectRatio === 'slice' ? 'meet' : 'slice')}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 border border-white/15 text-slate-200 hover:text-white transition-all flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Fit: {aspectRatio === 'slice' ? 'Cover (Slice)' : 'Contain (Meet)'}</span>
              </button>

              {/* Opacity Slider */}
              <div className="flex items-center gap-2 pl-2">
                <span className="text-xs text-slate-400">Opacity:</span>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-20 accent-[#2495D3] cursor-pointer"
                />
                <span className="text-xs font-mono text-[#2495D3]">{Math.round(opacity * 100)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content Layer - Validating Readability over Animation */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-7">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide backdrop-blur-md shadow-sm border ${
              theme === 'light'
                ? 'bg-[#2495D3]/15 text-[#2495D3] border-[#2495D3]/30'
                : 'bg-[#2495D3]/20 text-[#2495D3] border-[#2495D3]/40'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#2495D3] animate-pulse" />
            <span>Architectural motion design system</span>
          </div>

          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] ${
              theme === 'light' ? 'text-[#1C3A62]' : 'text-white'
            }`}
          >
            Engineering precision. <br />
            <span className="text-[#2495D3]">Architectural rhythm.</span>
          </h1>

          <p
            className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            Derived directly from the master vector geometry of <code className="font-mono text-xs px-2 py-0.5 rounded bg-black/20 text-[#2495D3]">lineworkina.pdf</code>.
            Simulates an invisible technical pen continuously drawing the parametric infrastructure in a 100% seamless, infinite loop.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="px-8 py-4 rounded-full bg-[#2495D3] hover:bg-[#488FCD] text-white font-semibold text-sm tracking-wide transition-all shadow-xl shadow-[#2495D3]/30 hover:-translate-y-0.5"
            >
              Return to Website
            </Link>
            <a
              href="/linework-extracted.svg"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-4 rounded-full text-sm font-semibold tracking-wide border backdrop-blur-md transition-all flex items-center gap-2 hover:-translate-y-0.5 ${
                theme === 'light'
                  ? 'border-slate-300 text-[#1C3A62] hover:bg-slate-100'
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <FileCode className="w-4 h-4 text-[#2495D3]" />
              <span>Inspect Raw Extracted SVG</span>
            </a>
          </div>
        </div>

        {/* Bottom Technical Specifications Strip */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div
            className={`p-6 rounded-3xl border backdrop-blur-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center ${
              theme === 'light'
                ? 'bg-white/80 border-slate-200 text-[#1C3A62]'
                : 'bg-black/30 border-white/10 text-white'
            }`}
          >
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#2495D3]">43 Curves</div>
              <div className="text-xs text-slate-400 mt-1">1:1 PDF Vector Extraction</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#2495D3]">16s - 22s</div>
              <div className="text-xs text-slate-400 mt-1">Seamless Deterministic Loop</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#2495D3]">60 FPS</div>
              <div className="text-xs text-slate-400 mt-1">GPU Hardware-Accelerated</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#2495D3]">0 Jitter</div>
              <div className="text-xs text-slate-400 mt-1">Reduced-Motion Accessible</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
