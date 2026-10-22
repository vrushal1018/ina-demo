"use client";

import React, { useState } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ServicesSection from "./ServicesSection";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "About us", href: "/about" },
    { name: "Clients corner", href: "/clients-corner" },
    { name: "Careers", href: "/careers" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact us", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isServicesActive = pathname.startsWith("/services");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* INA Brand Logo */}
        <div className="flex items-center space-x-2.5 cursor-pointer group">
          <Link href="/" className="flex items-center">
            <img
              src="/Ina Logo-1.jpg.png"
              alt="INA Logo"
              className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Floating Rounded Capsule Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center bg-white text-[#383838] px-6 py-2.5 rounded-full border border-slate-200 shadow-xs space-x-7 text-sm font-medium">
          <Link
            href="/about"
            className={`transition-colors relative py-1 ${isActive("/about")
                ? "text-[#2495D3] font-semibold"
                : "text-[#383838] hover:text-[#2495D3]"
              }`}
          >
            About us
            {isActive("/about") && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#2495D3] rounded-full" />
            )}
          </Link>

          {/* Services with Mega Menu Dropdown */}
          <div className="group relative">
            <a
              href="#repairs"
              className={`hover:text-[#2495D3] transition-colors py-4 -my-4 flex items-center gap-1 ${isServicesActive ? "text-[#2495D3] font-semibold" : "text-[#383838]"
                }`}
            >
              <span>Services</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2495D3] group-hover:rotate-180 transition-transform duration-300" />
            </a>

            {/* Mega Menu Dropdown */}
            <div className="fixed top-[76px] left-0 w-full pt-3 px-4 sm:px-6 lg:px-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
              <div className="max-w-7xl mx-auto w-full bg-white shadow-2xl border border-slate-200/80 overflow-hidden transform group-hover:translate-y-0 -translate-y-2 transition-all duration-300 rounded-3xl max-h-[82vh] overflow-y-auto">
                <ServicesSection />
              </div>
            </div>
          </div>

          <Link
            href="/clients-corner"
            className={`transition-colors relative py-1 ${isActive("/clients-corner")
                ? "text-[#2495D3] font-semibold"
                : "text-[#383838] hover:text-[#2495D3]"
              }`}
          >
            Clients corner
            {isActive("/clients-corner") && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#2495D3] rounded-full" />
            )}
          </Link>

          <Link
            href="/careers"
            className={`transition-colors relative py-1 ${isActive("/careers")
                ? "text-[#2495D3] font-semibold"
                : "text-[#383838] hover:text-[#2495D3]"
              }`}
          >
            Careers
            {isActive("/careers") && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#2495D3] rounded-full" />
            )}
          </Link>

          <Link
            href="/blogs"
            className={`transition-colors relative py-1 ${isActive("/blogs")
                ? "text-[#2495D3] font-semibold"
                : "text-[#383838] hover:text-[#2495D3]"
              }`}
          >
            Blogs
            {isActive("/blogs") && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#2495D3] rounded-full" />
            )}
          </Link>

          <Link
            href="/contact"
            className={`transition-colors relative py-1 ${isActive("/contact")
                ? "text-[#2495D3] font-semibold"
                : "text-[#383838] hover:text-[#2495D3]"
              }`}
          >
            Contact us
            {isActive("/contact") && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#2495D3] rounded-full" />
            )}
          </Link>
        </nav>

        {/* Desktop Right Phone Widget & Contact Button */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Call Widget */}
          <div className="flex items-center space-x-3 text-right">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#2495D3] bg-[#1C3A62] flex items-center justify-center text-white font-medium text-sm shadow-sm transition-transform hover:scale-105">
              <Phone className="w-4 h-4 text-[#2495D3]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] text-[#878787] font-semibold tracking-wide">
                Call INA Tech FM
              </span>
              <a
                href="tel:+919326906715"
                className="text-sm font-semibold text-[#1C3A62] hover:text-[#2495D3] transition-colors"
              >
                +91-9326906715
              </a>
            </div>
          </div>

          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full bg-[#1C3A62] text-white text-sm font-semibold hover:bg-[#2495D3] transition-all duration-300 shadow-md hover:shadow-lg shadow-[#1C3A62]/15 hover:-translate-y-0.5 active:translate-y-0"
          >
            Contact us
          </Link>
        </div>

        {/* Mobile Navigation Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl text-[#383838] hover:text-[#1C3A62] hover:bg-slate-100 transition-colors"
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
        <div className="lg:hidden bg-white/98 backdrop-blur-lg border-b border-slate-200 px-6 pt-4 pb-8 space-y-3 shadow-2xl absolute w-full left-0 top-[80px] animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold text-[#383838] hover:text-[#2495D3] border-b border-slate-100"
          >
            About us
          </Link>
          <a
            href="#repairs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold text-[#383838] hover:text-[#2495D3] border-b border-slate-100"
          >
            Services
          </a>
          <Link
            href="/clients-corner"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold text-[#383838] hover:text-[#2495D3] border-b border-slate-100"
          >
            Clients corner
          </Link>
          <Link
            href="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold text-[#383838] hover:text-[#2495D3] border-b border-slate-100"
          >
            Careers
          </Link>
          <Link
            href="/blogs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold text-[#383838] hover:text-[#2495D3] border-b border-slate-100"
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-base font-semibold text-[#383838] hover:text-[#2495D3] border-b border-slate-100"
          >
            Contact us
          </Link>

          <div className="pt-4 flex flex-col space-y-3">
            <a
              href="tel:+919326906715"
              className="flex items-center space-x-3 text-[#1C3A62] font-semibold text-sm p-3 rounded-xl bg-slate-50 border border-slate-200/60"
            >
              <div className="w-8 h-8 rounded-full bg-[#1C3A62] text-white flex items-center justify-center">
                <Phone className="w-4 h-4 text-[#2495D3]" />
              </div>
              <span>Call INA Tech FM: +91-9326906715</span>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-3.5 rounded-full bg-[#2495D3] hover:bg-[#1C3A62] text-white text-base font-semibold text-center shadow-lg active:scale-95 transition-all"
            >
              Contact us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
