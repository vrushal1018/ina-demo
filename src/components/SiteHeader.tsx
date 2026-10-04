"use client";

import React, { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import Link from "next/link";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* INA Brand Logo */}
        <div className="flex items-center space-x-2.5 cursor-pointer group">
          <Link href="/">
            <img src="/Ina Logo-1.jpg.png" alt="INA Logo" className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          </Link>
        </div>

        {/* Floating Rounded Capsule Desktop Navigation Links (White Background) */}
        <nav className="hidden lg:flex items-center bg-white text-[#383838] px-6 py-2.5 rounded-full border border-gray-200 shadow-md space-x-8 text-sm font-medium">
          <Link
            href="/about"
            className="hover:text-[#2495D3] transition-colors"
          >
            About us
          </Link>
          <a
            href="#repairs"
            className="hover:text-[#2495D3] transition-colors"
          >
            Services
          </a>
          <Link
            href="/clients-corner"
            className="hover:text-[#2495D3] transition-colors"
          >
            Clients Corner
          </Link>
          <a
            href="#about"
            className="hover:text-[#2495D3] transition-colors"
          >
            Careers
          </a>
          <a
            href="#gallery"
            className="hover:text-[#2495D3] transition-colors"
          >
            Blogs
          </a>
          <a
            href="#gallery"
            className="hover:text-[#2495D3] transition-colors"
          >
            Contact Us
          </a>
        </nav>

        {/* Desktop Right Phone Widget & Contact Button */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Call Widget */}
          <div className="flex items-center space-x-3 text-right">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#2495D3] bg-[#1C3A62] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              <Phone className="w-4 h-4 text-[#2495D3]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] text-[#878787] font-semibold tracking-wide uppercase">
                Call Ina Tech Fm
              </span>
              <a
                href="+91-9326906715"
                className="text-sm font-bold text-[#1C3A62] hover:text-[#2495D3] transition-colors"
              >
                +91-9326906715
              </a>
            </div>
          </div>

          {/* Contact Us Button */}
          <a
            href="#contact"
            className="px-6 py-3 rounded-md bg-[#1C3A62] text-white text-sm font-semibold hover:bg-[#2495D3] transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Navigation Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-[#383838] hover:text-[#1C3A62] hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 pt-3 pb-6 space-y-3 shadow-xl absolute w-full left-0 top-[80px]">
          <Link
            href="/about"
            className="block py-2 text-base font-semibold text-[#383838] hover:text-[#2495D3]"
          >
            About Us
          </Link>
          <a
            href="#repairs"
            className="block py-2 text-base font-semibold text-[#383838] hover:text-[#2495D3]"
          >
            Services
          </a>
          <Link
            href="/clients-corner"
            className="block py-2 text-base font-semibold text-[#383838] hover:text-[#2495D3]"
          >
            Clients Corner
          </Link>
          <a
            href="#about"
            className="block py-2 text-base font-semibold text-[#383838] hover:text-[#2495D3]"
          >
            Careers
          </a>
          <a
            href="#gallery"
            className="block py-2 text-base font-semibold text-[#383838] hover:text-[#2495D3]"
          >
            Blogs
          </a>
          <a
            href="#gallery"
            className="block py-2 text-base font-semibold text-[#383838] hover:text-[#2495D3]"
          >
            Contact Us
          </a>
          <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
            <a
              href="tel:+919326906715"
              className="flex items-center space-x-2 text-[#1C3A62] font-bold"
            >
              <Phone className="w-4 h-4 text-[#2495D3]" />
              <span>Call Ina Tech Fm: +91-9326906715</span>
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-md bg-[#2495D3] text-white text-base font-bold text-center shadow-lg active:scale-95 transition-transform"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
