"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronDown,
  Building2,
  Wrench,
  Leaf,
  Layers,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Track scroll position to transition the top bar from transparent to solid frosted glass
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route navigation
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      const timer = setTimeout(() => {
        setIsOpen(false);
        setServicesExpanded(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when fullscreen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Determine whether the current route has a dark hero background
  const isHomePage = pathname === "/";
  const hasDarkHero =
    isHomePage ||
    pathname === "/about" ||
    pathname === "/blogs" ||
    (pathname.startsWith("/services/") && pathname !== "/services/audit-and-offerings");

  const servicesList = [
    {
      name: "Hard FM",
      href: "/services/hard-fm",
      desc: "Core technical & engineering infrastructure",
      icon: Building2,
    },
    {
      name: "Transition Services",
      href: "/services/transition-services",
      desc: "Smooth operational site takeovers",
      icon: Layers,
    },
    {
      name: "Sustainability Services",
      href: "/services/sustainability-services",
      desc: "Energy & carbon footprint reduction",
      icon: Leaf,
    },
    {
      name: "Technical Services",
      href: "/services/technical-services",
      desc: "MEP, HVAC & critical systems upkeep",
      icon: Wrench,
    },
    {
      name: "Audit & Offerings",
      href: "/services/audit-and-offerings",
      desc: "Statutory, safety & energy compliance",
      icon: ShieldCheck,
    },
    {
      name: "Allied Services",
      href: "/services/allied-services",
      desc: "Integrated soft & specialized facility support",
      icon: Sparkles,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isServicesActive = pathname.startsWith("/services");

  return (
    <>
      {/* =========================================================
          TOP FIXED NAVBAR BAR (Matching inaspaceworks.com header.bar)
      ========================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          isScrolled || !hasDarkHero
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/70 py-3 sm:py-3.5"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo & Lockup */}
          <div
            className={`flex items-center gap-3 sm:gap-4 transition-opacity duration-300 ${
              isHomePage && !isScrolled
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
          >
            <Link
              href="/"
              className="inline-block transition-transform hover:scale-105 active:scale-95"
              title="INA TechFM - Integrated Facility Management Services in India"
            >
              <img
                src={
                  isScrolled || !hasDarkHero
                    ? "/Ina Logo-1.jpg.png"
                    : "/Ina%20TechFM%20Logo%20white.png"
                }
                alt="INA TechFM"
                width={190}
                height={55}
                className="h-10 sm:h-12 md:h-13 w-auto object-contain transition-all duration-300 drop-shadow-md"
              />
            </Link>
          </div>

          {/* Minimal Architectural MENU Button (2-line offset hamburger) */}
          <button
            onClick={() => setIsOpen(true)}
            className={`flex items-center gap-2.5 sm:gap-3 bg-transparent border-0 font-medium text-xs sm:text-sm tracking-[0.22em] uppercase cursor-pointer py-2 px-1 transition-all duration-300 group active:scale-95 ${
              isScrolled || !hasDarkHero
                ? "text-[#1C3A62] hover:text-[#2495D3]"
                : "text-white hover:text-[#2495D3]"
            }`}
            aria-expanded={isOpen}
            aria-controls="site-menu"
            aria-label="Open navigation menu"
          >
            <span className="tracking-[0.22em] font-medium select-none">Menu</span>
            <span
              className="relative block w-6 sm:w-7 h-2.5 sm:h-3"
              aria-hidden="true"
            >
              <span className="absolute top-0 left-0 right-0 h-[1.6px] bg-current transition-transform duration-200 group-hover:translate-x-0.5" />
              <span className="absolute bottom-0 left-2 right-0 h-[1.6px] bg-current transition-transform duration-200 group-hover:-translate-x-0.5" />
            </span>
          </button>
        </div>
      </header>

      {/* =========================================================
          FULLSCREEN MENU OVERLAY (Matching inaspaceworks.com .menu)
      ========================================================== */}
      <div
        id="site-menu"
        className={`fixed inset-0 z-50 bg-[#0A1629] text-white flex flex-col justify-between overflow-y-auto no-scrollbar transition-all duration-600 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          isOpen
            ? "opacity-100 pointer-events-auto [clip-path:inset(0_0_0_0)]"
            : "opacity-0 pointer-events-none [clip-path:inset(0_0_0_100%)]"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Background Architectural Grid & Linework Stream */}
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <ArchitecturalLineworkBackground theme="dark" opacity={0.18} mask="fade-edges" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#2495D3]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1C3A62]/40 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header inside Menu */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-18 sm:h-20 flex items-center justify-between border-b border-white/10 shrink-0">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="inline-block transition-transform hover:scale-105 active:scale-95"
            title="INA TechFM"
          >
            <img
              src="/Ina%20TechFM%20Logo%20white.png"
              alt="INA TechFM"
              width={190}
              height={55}
              className="h-10 sm:h-12 md:h-13 w-auto object-contain drop-shadow-md"
            />
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 bg-transparent border-0 font-medium text-xs sm:text-sm tracking-[0.22em] uppercase cursor-pointer py-2 px-1 text-white hover:text-[#2495D3] transition-colors group active:scale-95"
            aria-label="Close navigation menu"
          >
            <span className="tracking-[0.22em] font-medium select-none">Close</span>
            <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90 text-[#2495D3]" />
          </button>
        </div>

        {/* Main Content Area (2-Column Grid on Desktop matching inaspaceworks.com) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center py-8 lg:py-12">
          <nav className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center" aria-label="Main Navigation">
            {/* Left Column (Aside on Desktop) */}
            <aside className="hidden lg:flex lg:col-span-5 flex-col justify-between h-full max-h-[480px] pr-10 border-r border-white/10">
              <div>
                <div className="text-xs font-semibold tracking-[0.25em] text-[#2495D3] uppercase mb-4">
                  Core Capabilities
                </div>
                <div className="space-y-2 text-2xl font-light tracking-wide text-slate-200">
                  <div>
                    <span className="text-[#2495D3] font-medium">engineering</span> O&amp;M
                  </div>
                  <div>
                    <span className="text-[#2495D3] font-medium">hard</span> FM
                  </div>
                  <div>
                    <span className="text-[#2495D3] font-medium">technical</span> services
                  </div>
                  <div>
                    <span className="text-[#2495D3] font-medium">sustainability</span> FM
                  </div>
                  <div>
                    <span className="text-[#2495D3] font-medium">transition</span> ops
                  </div>
                  <div>
                    <span className="text-[#2495D3] font-medium">allied</span> support
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 space-y-2">
                <div className="text-xs font-semibold tracking-wider text-[#2495D3] uppercase">
                  Direct Support
                </div>
                <a
                  href="tel:+919326906715"
                  className="block text-white hover:text-[#2495D3] font-medium text-lg transition-colors"
                >
                  +91 9326906715
                </a>
                <div className="text-xs text-slate-400">info@inatechfmglobal.com</div>
                <div className="text-xs text-slate-400 pt-1">
                  3,000+ Employees • Pan-India across 55+ Cities
                </div>
              </div>
            </aside>

            {/* Right Column (Large Typographic Navigation Links) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <ul className="list-none m-0 p-0 flex flex-col space-y-3 sm:space-y-4">
                {/* Home */}
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-baseline gap-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-3 ${
                      isActive("/") && pathname === "/" ? "text-white font-normal" : "text-white/65"
                    }`}
                  >
                    <span>Home</span>
                    {isActive("/") && pathname === "/" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2495D3] inline-block mb-1 shadow-sm shadow-[#2495D3]" />
                    )}
                  </Link>
                </li>

                {/* What We Do / Services (with 06 count & expandable accordion) */}
                <li>
                  <div className="flex flex-col">
                    <button
                      onClick={() => setServicesExpanded(!servicesExpanded)}
                      className={`flex items-baseline gap-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-3 text-left cursor-pointer ${
                        isServicesActive ? "text-white font-normal" : "text-white/65"
                      }`}
                    >
                      <span>What We Do</span>
                      <small className="text-xs font-mono tracking-widest text-[#2495D3] font-semibold -translate-y-2 sm:-translate-y-3">
                        06
                      </small>
                      <ChevronDown
                        className={`w-5 h-5 text-[#2495D3] transition-transform duration-300 ml-2 self-center ${
                          servicesExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Expanded Services Sub-menu */}
                    {servicesExpanded && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 pb-2 pl-4 border-l-2 border-[#2495D3]/40 mt-3 animate-fadeIn">
                        {servicesList.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => setIsOpen(false)}
                            className={`group p-2.5 rounded-xl transition-all ${
                              pathname === service.href
                                ? "bg-white/10 text-white"
                                : "text-slate-300 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <div className="text-sm font-medium flex items-center gap-2">
                              <span className="text-[#2495D3] group-hover:translate-x-0.5 transition-transform">
                                →
                              </span>
                              <span>{service.name}</span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                              {service.desc}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </li>

                {/* About Us */}
                <li>
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-baseline gap-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-3 ${
                      isActive("/about") ? "text-white font-normal" : "text-white/65"
                    }`}
                  >
                    <span>About</span>
                    {isActive("/about") && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2495D3] inline-block mb-1 shadow-sm shadow-[#2495D3]" />
                    )}
                  </Link>
                </li>

                {/* Clients Corner */}
                <li>
                  <Link
                    href="/clients-corner"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-baseline gap-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-3 ${
                      isActive("/clients-corner") ? "text-white font-normal" : "text-white/65"
                    }`}
                  >
                    <span>Clients Corner</span>
                    {isActive("/clients-corner") && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2495D3] inline-block mb-1 shadow-sm shadow-[#2495D3]" />
                    )}
                  </Link>
                </li>

                {/* Careers */}
                <li>
                  <Link
                    href="/careers"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-baseline gap-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-3 ${
                      isActive("/careers") ? "text-white font-normal" : "text-white/65"
                    }`}
                  >
                    <span>Careers</span>
                    {isActive("/careers") && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2495D3] inline-block mb-1 shadow-sm shadow-[#2495D3]" />
                    )}
                  </Link>
                </li>

                {/* Blogs */}
                <li>
                  <Link
                    href="/blogs"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-baseline gap-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-3 ${
                      isActive("/blogs") ? "text-white font-normal" : "text-white/65"
                    }`}
                  >
                    <span>Blogs</span>
                    {isActive("/blogs") && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2495D3] inline-block mb-1 shadow-sm shadow-[#2495D3]" />
                    )}
                  </Link>
                </li>

                {/* Contact */}
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-baseline gap-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-3 ${
                      isActive("/contact") ? "text-white font-normal" : "text-white/65"
                    }`}
                  >
                    <span>Contact</span>
                    {isActive("/contact") && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2495D3] inline-block mb-1 shadow-sm shadow-[#2495D3]" />
                    )}
                  </Link>
                </li>
              </ul>

              {/* Mobile Footer Contact Strip (visible only on mobile) */}
              <div className="lg:hidden mt-8 pt-6 border-t border-white/10 flex flex-col gap-2">
                <div className="text-xs text-[#2495D3] uppercase font-semibold tracking-wider">
                  Contact Us
                </div>
                <a
                  href="tel:+919326906715"
                  className="text-white text-base font-medium hover:text-[#2495D3] transition-colors"
                >
                  +91 9326906715
                </a>
                <div className="text-xs text-slate-400">
                  info@inatechfmglobal.com • 55+ Cities in India
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
