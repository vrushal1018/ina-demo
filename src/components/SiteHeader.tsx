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

  // Determine whether the current route has a dark hero background
  const hasDarkHero =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/blogs" ||
    (pathname.startsWith("/services/") && pathname !== "/services/audit-and-offerings");

  // Track scroll position to transition the navbar when leaving the hero section
  useEffect(() => {
    const handleScroll = () => {
      const threshold = hasDarkHero
        ? typeof window !== "undefined"
          ? window.innerHeight - 80
          : 600
        : 20;
      setIsScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [hasDarkHero]);

  const isDarkNavbar = hasDarkHero && !isScrolled;

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

  // Prevent background scroll when fullscreen menu is open without breaking window scroll position
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
        className={`fixed top-0 left-0 right-0 z-40 transform-gpu transition-all duration-300 ease-out py-3 sm:py-3.5 ${
          isDarkNavbar
            ? "bg-ina-night/30 backdrop-blur-md border-b border-white/10"
            : "bg-white/75 backdrop-blur-md shadow-xs border-b border-ina-line/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo & Lockup - Blue Logo Only */}
          <div className="flex items-center gap-3 sm:gap-4 transition-opacity duration-300 opacity-100">
            <Link
              href="/"
              className="inline-block transition-transform hover:scale-105 active:scale-95"
              title="Ina TechFM - Integrated Facility Management Services in India"
            >
              <img
                src="/Ina Logo-1.jpg.png"
                alt="Ina TechFM"
                width={190}
                height={55}
                className="h-10 sm:h-12 md:h-13 w-auto object-contain transition-all duration-300 drop-shadow-xs"
              />
            </Link>
          </div>

          {/* Minimal Architectural MENU Button (2-line offset hamburger) */}
          <button
            onClick={() => setIsOpen(true)}
            className={`flex items-center gap-2.5 sm:gap-3 bg-transparent border-0 font-medium text-xs sm:text-sm tracking-[0.22em] uppercase cursor-pointer py-2 px-1 transition-all duration-300 group active:scale-95 ${
              isDarkNavbar
                ? "text-white hover:text-ina-blue"
                : "text-ina-navy hover:text-ina-blue"
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
        className={`fixed inset-0 h-[100dvh] w-full max-w-full z-50 bg-ina-night text-white flex flex-col justify-between overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y transition-all duration-600 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          isOpen
            ? "opacity-100 pointer-events-auto [clip-path:inset(0_0_0_0)]"
            : "opacity-0 pointer-events-none [clip-path:inset(0_0_0_100%)]"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Background Architectural Grid & Linework Stream (Contained to prevent horizontal drag/scroll) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 blueprint-grid opacity-10" />
          <ArchitecturalLineworkBackground theme="dark" opacity={0.18} mask="fade-edges" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-ina-blue/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-ina-navy/40 rounded-full blur-3xl" />
        </div>

        {/* Top Header inside Menu */}
        <div className="relative z-10 w-full border-b border-white/10 py-3 sm:py-3.5 shrink-0">
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="inline-block transition-transform hover:scale-105 active:scale-95"
                title="Ina TechFM"
              >
                <img
                  src="/Ina Logo-1.jpg.png"
                  alt="Ina TechFM"
                  width={190}
                  height={55}
                  className="h-10 sm:h-12 md:h-13 w-auto object-contain transition-all duration-300 drop-shadow-xs"
                />
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 sm:gap-2.5 bg-transparent border-0 font-medium text-xs sm:text-sm tracking-[0.22em] uppercase cursor-pointer py-2 px-1 text-white hover:text-ina-sky transition-colors group active:scale-95"
              aria-label="Close navigation menu"
            >
              <span className="tracking-[0.22em] font-medium select-none">Close</span>
              <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90 text-ina-sky" />
            </button>
          </div>
        </div>

        {/* Main Content Area (2-Column Grid on Desktop: Nav Links on Left, Core Capabilities on Right) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-start lg:justify-center py-6 sm:py-8 lg:py-12">
          <nav className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center" aria-label="Main Navigation">
            {/* Left Column (Large Typographic Navigation Links) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <ul className="list-none m-0 p-0 flex flex-col space-y-2.5 sm:space-y-3.5 lg:space-y-4">
                {/* Home */}
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-baseline gap-3 sm:gap-4 text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-2 sm:hover:translate-x-3 ${
                      isActive("/") && pathname === "/" ? "text-white font-normal" : "text-white/65"
                    }`}
                  >
                    <span>Home</span>
                    {isActive("/") && pathname === "/" && (
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-ina-blue inline-block mb-1 shadow-sm shadow-ina-blue" />
                    )}
                  </Link>
                </li>

                {/* What We Do / Services (with 06 count & expandable accordion) */}
                <li>
                  <div className="flex flex-col">
                    <button
                      onClick={() => setServicesExpanded(!servicesExpanded)}
                      className={`flex items-baseline gap-2.5 sm:gap-3 text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-2 sm:hover:translate-x-3 text-left cursor-pointer ${
                        isServicesActive ? "text-white font-normal" : "text-white/65"
                      }`}
                    >
                      <span>What We Do</span>
                      <small className="text-[11px] sm:text-xs font-mono tracking-widest text-ina-blue font-semibold -translate-y-2 sm:-translate-y-3">
                        06
                      </small>
                      <ChevronDown
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-ina-blue transition-transform duration-300 ml-1.5 sm:ml-2 self-center ${
                          servicesExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Expanded Services Sub-menu */}
                    {servicesExpanded && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-3 sm:pt-4 pb-2 pl-3 sm:pl-4 border-l-2 border-ina-blue/40 mt-2 sm:mt-3 animate-fadeIn">
                        {servicesList.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => setIsOpen(false)}
                            className={`group p-2 sm:p-2.5 rounded-xl transition-all ${
                              pathname === service.href
                                ? "bg-white/10 text-white"
                                : "text-ina-mist hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <div className="text-xs sm:text-sm font-medium flex items-center gap-2">
                              <span className="text-ina-sky group-hover:translate-x-0.5 transition-transform">
                                →
                              </span>
                              <span>{service.name}</span>
                            </div>
                            <div className="text-[10px] sm:text-[11px] text-ina-mist mt-0.5 line-clamp-1">
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
                    className={`flex items-baseline gap-3 sm:gap-4 text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-2 sm:hover:translate-x-3 ${
                      isActive("/about") ? "text-white font-normal" : "text-white/65"
                    }`}
                  >
                    <span>About</span>
                    {isActive("/about") && (
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-ina-blue inline-block mb-1 shadow-sm shadow-ina-blue" />
                    )}
                  </Link>
                </li>

                {/* Clients Corner */}
                <li>
                  <Link
                    href="/clients-corner"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-baseline gap-3 sm:gap-4 text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-2 sm:hover:translate-x-3 ${
                      isActive("/clients-corner") ? "text-white font-normal" : "text-white/65"
                    }`}
                  >
                    <span>Clients Corner</span>
                    {isActive("/clients-corner") && (
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-ina-blue inline-block mb-1 shadow-sm shadow-ina-blue" />
                    )}
                  </Link>
                </li>

                {/* Careers */}
                <li>
                  <Link
                    href="/careers"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-baseline gap-3 sm:gap-4 text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-2 sm:hover:translate-x-3 ${
                      isActive("/careers") ? "text-white font-normal" : "text-white/65"
                    }`}
                  >
                    <span>Careers</span>
                    {isActive("/careers") && (
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-ina-blue inline-block mb-1 shadow-sm shadow-ina-blue" />
                    )}
                  </Link>
                </li>

                {/* Blogs */}
                <li>
                  <Link
                    href="/blogs"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-baseline gap-3 sm:gap-4 text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-2 sm:hover:translate-x-3 ${
                      isActive("/blogs") ? "text-white font-normal" : "text-white/65"
                    }`}
                  >
                    <span>Blogs</span>
                    {isActive("/blogs") && (
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-ina-blue inline-block mb-1 shadow-sm shadow-ina-blue" />
                    )}
                  </Link>
                </li>

                {/* Contact */}
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-baseline gap-3 sm:gap-4 text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-300 hover:text-white hover:translate-x-2 sm:hover:translate-x-3 ${
                      isActive("/contact") ? "text-white font-normal" : "text-white/65"
                    }`}
                  >
                    <span>Contact</span>
                    {isActive("/contact") && (
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-ina-blue inline-block mb-1 shadow-sm shadow-ina-blue" />
                    )}
                  </Link>
                </li>
              </ul>

              {/* Mobile Footer Contact Strip (visible only on mobile) */}
              <div className="lg:hidden mt-6 pt-5 border-t border-white/10 flex flex-col gap-2 pb-6">
                <div className="text-[11px] text-ina-sky uppercase font-semibold tracking-wider">
                  Contact Us
                </div>
                <a
                  href="tel:+919326906715"
                  className="text-white text-base font-medium hover:text-ina-sky transition-colors"
                >
                  +91 9326906715
                </a>
                <div className="text-xs text-ina-mist">
                  info@inatechfmglobal.com • 55+ Cities in India
                </div>
              </div>
            </div>

            {/* Right Column (Core Capabilities & Direct Support Aside) */}
            <aside className="hidden lg:flex lg:col-span-5 flex-col justify-between h-full max-h-[480px] pl-10 lg:pl-16 border-l border-white/10">
              <div>
                <div className="text-xs font-semibold tracking-[0.25em] text-ina-sky uppercase mb-4">
                  Core Capabilities
                </div>
                <div className="space-y-2 text-2xl font-light tracking-wide text-ina-line">
                  <div>
                    <span className="text-ina-sky font-medium">Engineering</span> O&amp;M
                  </div>
                  <div>
                    <span className="text-ina-sky font-medium">Hard</span> FM
                  </div>
                  <div>
                    <span className="text-ina-sky font-medium">Technical</span> Services
                  </div>
                  <div>
                    <span className="text-ina-sky font-medium">Sustainability</span> FM
                  </div>
                  <div>
                    <span className="text-ina-sky font-medium">Transition</span> Ops
                  </div>
                  <div>
                    <span className="text-ina-sky font-medium">Allied</span> Support
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 space-y-2">
                <div className="text-xs font-semibold tracking-wider text-ina-sky uppercase">
                  Direct Support
                </div>
                <a
                  href="tel:+919326906715"
                  className="block text-white hover:text-ina-sky font-medium text-lg transition-colors"
                >
                  +91 9326906715
                </a>
                <div className="text-xs text-ina-mist">info@inatechfmglobal.com</div>
                <div className="text-xs text-ina-mist pt-1">
                  3,000+ Employees • Pan-India across 55+ Cities
                </div>
              </div>
            </aside>
          </nav>
        </div>
      </div>
    </>
  );
}
