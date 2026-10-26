"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Building2,
  Wrench,
  Leaf,
  Layers,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Close drawer on route navigation
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

  // Prevent background scroll when vertical navbar drawer is open
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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Clients corner", href: "/clients-corner" },
    { name: "Careers", href: "/careers" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact us", href: "/contact" },
  ];

  const servicesList = [
    {
      name: "Hard FM",
      href: "/services/hard-fm",
      desc: "Core technical & engineering infrastructure",
      icon: Building2,
    },
    {
      name: "Transition services",
      href: "/services/transition-services",
      desc: "Smooth operational site takeovers",
      icon: Layers,
    },
    {
      name: "Sustainability services",
      href: "/services/sustainability-services",
      desc: "Energy & carbon footprint reduction",
      icon: Leaf,
    },
    {
      name: "Technical services",
      href: "/services/technical-services",
      desc: "MEP, HVAC & critical systems upkeep",
      icon: Wrench,
    },
    {
      name: "Audit & offerings",
      href: "/services/audit-and-offerings",
      desc: "Statutory, safety & energy compliance",
      icon: ShieldCheck,
    },
    {
      name: "Allied services",
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
      {/* ================= MOBILE FLOATING MENU TRIGGER ================= */}
      <button
        onClick={() => setIsOpen(true)}
        className="sm:hidden fixed top-4 right-4 z-40 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1629]/85 hover:bg-[#0A1629] backdrop-blur-md border border-[#2495D3]/40 text-white shadow-xl active:scale-95 transition-all cursor-pointer"
        aria-label="Open navigation menu"
      >
        <span className="w-2 h-2 rounded-full bg-[#2495D3] animate-pulse" />
        <span className="text-xs font-semibold tracking-wide">Menu</span>
      </button>

      {/* ================= DESKTOP/TABLET LEFT EDGE INDICATOR ================= */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex fixed left-0 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2.5 py-4 sm:py-5 px-2 sm:px-2.5 rounded-r-2xl bg-slate-900/45 hover:bg-slate-900/70 backdrop-blur-md border-y border-r border-white/20 hover:border-[#2495D3]/60 text-white/80 hover:text-white transition-all duration-300 shadow-2xl group hover:px-3 cursor-pointer active:scale-95"
        aria-label="Open navigation menu"
        title="Open Navigation Menu"
      >
        <span className="w-2 h-2 rounded-full bg-[#2495D3] animate-pulse shadow-sm shadow-[#2495D3]" />
        <span className="[writing-mode:vertical-lr] text-[11px] font-semibold tracking-widest uppercase text-white/90 group-hover:text-[#2495D3] transition-colors">
          Menu
        </span>
        <ChevronRight className="w-4 h-4 text-[#2495D3] group-hover:translate-x-1 transition-transform" />
      </button>

      {/* ================= VERTICAL NAVBAR (OFF-CANVAS DRAWER WITH PREFETCHING) ================= */}
      {/* Backdrop Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/65 backdrop-blur-sm z-50 cursor-pointer transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      />

      {/* Vertical Drawer Panel */}
      <aside
        className={`fixed inset-y-0 left-0 w-full sm:w-[300px] md:w-[320px] bg-[#0A1629]/95 text-white backdrop-blur-xl z-50 border-r border-[#2495D3]/30 shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
              {/* Architectural Blueprint & Linework Background */}
              <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
              <ArchitecturalLineworkBackground
                theme="dark"
                opacity={0.28}
                mask="fade-edges"
              />
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2495D3]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1C3A62]/30 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full justify-between p-5 sm:p-6">
                {/* Top Section: Brand Logo & Close Button */}
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-white/10">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="inline-block transition-transform hover:scale-105 active:scale-95"
                      title="INA TechFM"
                    >
                      <img
                        src="/Ina TechFM Logo white.png"
                        alt="INA TechFM Logo"
                        className="h-14 sm:h-16 w-auto object-contain drop-shadow-md"
                      />
                    </Link>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#2495D3] text-white flex items-center justify-center transition-all duration-300 border border-white/15 shadow-sm active:scale-95 cursor-pointer"
                      aria-label="Close navigation menu"
                    >
                      <X className="w-5 h-5 transition-transform hover:rotate-90 duration-300" />
                    </button>
                  </div>

                  {/* Vertical Navigation Links */}
                  <nav className="space-y-1.5 pt-4 sm:pt-5">
                    {/* Home Link */}
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${isActive("/") && pathname === "/"
                        ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      <span>Home</span>
                      <ArrowRight className="w-4 h-4 text-[#2495D3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>

                    {/* About Us Link */}
                    <Link
                      href="/about"
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${isActive("/about")
                        ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      <span>About us</span>
                      <ArrowRight className="w-4 h-4 text-[#2495D3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>

                    {/* Services Accordion Menu */}
                    <div className="rounded-xl overflow-hidden transition-colors">
                      <button
                        onClick={() => setServicesExpanded(!servicesExpanded)}
                        className={`w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 cursor-pointer ${isServicesActive
                          ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                          }`}
                      >
                        <span>Services</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#2495D3] transition-transform duration-300 ${servicesExpanded ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {/* Expandable Submenu */}
                      {servicesExpanded && (
                        <div
                          className="overflow-hidden pl-4 pr-1 py-1 space-y-1 border-l-2 border-[#2495D3]/30 ml-3 mt-1"
                        >
                          {servicesList.map((service) => {
                            const ServiceIcon = service.icon;
                            const isSubActive = pathname === service.href;
                            return (
                              <Link
                                key={service.href}
                                href={service.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-start gap-2.5 p-2 rounded-lg transition-all ${isSubActive
                                  ? "bg-[#2495D3]/20 text-[#2495D3]"
                                  : "text-slate-300 hover:text-white hover:bg-white/10"
                                  }`}
                              >
                                <ServiceIcon className="w-4 h-4 text-[#2495D3] shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <div className="text-xs sm:text-sm font-semibold">
                                    {service.name}
                                  </div>
                                  <div className="text-[11px] text-slate-400 line-clamp-1">
                                    {service.desc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Clients Corner Link */}
                    <Link
                      href="/clients-corner"
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${isActive("/clients-corner")
                        ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      <span>Clients corner</span>
                      <ArrowRight className="w-4 h-4 text-[#2495D3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>

                    {/* Careers Link */}
                    <Link
                      href="/careers"
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${isActive("/careers")
                        ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      <span>Careers</span>
                      <ArrowRight className="w-4 h-4 text-[#2495D3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>

                    {/* Blogs Link */}
                    <Link
                      href="/blogs"
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${isActive("/blogs")
                        ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      <span>Blogs</span>
                      <ArrowRight className="w-4 h-4 text-[#2495D3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>

                    {/* Contact Us Link */}
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 ${isActive("/contact")
                        ? "bg-[#2495D3]/20 text-white border-l-4 border-[#2495D3]"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                        }`}
                    >
                      <span>Contact us</span>
                      <ArrowRight className="w-4 h-4 text-[#2495D3] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </nav>
                </div>

                {/* Bottom Section: Contact Widget */}
                <div className="pt-4 border-t border-white/10 mt-4 space-y-2.5">
                  {/* Phone Call Strip */}
                  <a
                    href="tel:+919326906715"
                    className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2495D3] text-white flex items-center justify-center shrink-0 shadow-md">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-semibold tracking-wide">
                        Direct Support Line
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                        +91-9326906715
                      </span>
                    </div>
                  </a>

                  {/* Verification Footer Text */}
                  <div className="text-center text-[10px] sm:text-[11px] text-slate-400 pt-0.5">
                    <span>3,000+ Employees • Pan-India Facility Engineering</span>
                  </div>
                </div>
              </div>
            </aside>
    </>
  );
}
