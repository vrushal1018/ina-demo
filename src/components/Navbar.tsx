"use client";

import { useState } from "react";
import {
  Sparkles,
  Layers,
  Zap,
  ShieldCheck,
  Code2,
  Menu,
  X,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <img src="/Ina Logo-1.jpg.png" alt="INA Logo" className="h-14 w-auto object-contain rounded-lg shadow-lg" />
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              INA <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium border border-purple-500/30">Next.js v15</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="#features" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-400" /> Features
            </a>
            <a href="#components" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-pink-400" /> UI Components
            </a>
            <a href="#security" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> Architecture
            </a>
            <a href="#code" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-400" /> Code Snippets
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="GitHub Repository"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href="#components"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-semibold shadow-md shadow-purple-500/20 hover:shadow-purple-500/40 transition-all flex items-center gap-2 group"
            >
              Explore Components
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-white/5 hover:text-purple-400"
            >
              Features
            </a>
            <a
              href="#components"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-white/5 hover:text-purple-400"
            >
              UI Components
            </a>
            <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-white/5 hover:text-purple-400"
            >
              Architecture
            </a>
            <a
              href="#code"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-zinc-200 hover:bg-white/5 hover:text-purple-400"
            >
              Code Snippets
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="#components"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm"
              >
                Explore Components
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
