'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mail, ArrowUpRight, Award } from 'lucide-react';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';


const teamMembers = [
  {
    id: 1,
    department: 'Technical Services',
    name: 'Amrit Guher',
    role: 'Business Head',
    image: '/team/Amrit Guher.jpeg',
    imagePosition: 'center 26%',
    bio: '15+ years leading strategic growth, technical operations, and digital transformation initiatives.',
    skills: ['Technical FM', 'Leadership'],
  },
  {
    id: 2,
    department: 'Operations',
    name: 'Sarabjeet Gujral',
    role: 'Vice President',
    image: '/team/Sarabjeet Gujral.jpeg',
    imagePosition: 'center 20%',
    bio: 'Ensuring seamless operations, swift communications, and client success across all facilities.',
    skills: ['Operations', 'Strategy'],
  },
  {
    id: 3,
    department: 'Sales & BD',
    name: 'Dilip Yadav',
    role: 'Manager - Sales',
    image: '/team/Dilip Yadav.jpeg',
    imagePosition: 'center 12%',
    bio: 'Driving enterprise partnerships, client engagement, and customized facility management solutions.',
    skills: ['Sales', 'Client Relations'],
  },
  {
    id: 4,
    department: 'Transition & Mobilization',
    name: 'Prabhavit Prakhar',
    role: 'Transition Head',
    image: '/team/Prabhavit Prakhar.jpeg',
    imagePosition: 'center 14%',
    bio: 'Specializing in seamless site takeovers, facility mobilization, and operational continuity.',
    skills: ['Transition', 'Mobilization'],
  },
  {
    id: 5,
    department: 'Human Resources',
    name: 'Binesh Kesavan',
    role: 'Manager, Human Resources',
    image: '/team/Binesh Kesavan.jpeg',
    imagePosition: 'center 24%',
    bio: 'Building vibrant team dynamics, talent development, and employee engagement across regions.',
    skills: ['People Ops', 'Talent Strategy'],
  },
];

export default function OurTeam() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, teamMembers.length - visibleItems);

  // Keep currentIndex clamped when visibleItems changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const prevSlide = () => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isPaused, maxIndex]);

  return (
    <section className="relative bg-gradient-to-b from-[#E2F1FA] to-[#D9EDF8] text-[#383838] py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-12 flex flex-col justify-center overflow-hidden font-sans border-t border-[#2495D3]/20">
      {/* Background blueprint dots */}
      <div className="absolute inset-0 blueprint-dots opacity-25 pointer-events-none" />
      {/* Architectural linework stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.22} mask="fade-edges" flipY={true} />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C3A62]/5 border border-[#1C3A62]/15 text-[#1C3A62] text-xs font-semibold tracking-wide">
            <Award className="w-3.5 h-3.5 text-[#2495D3]" />
            <span>Operational executives</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-normal text-[#1C3A62]">
            Meet our leadership team
          </h2>
          <p className="text-[#585858] max-w-2xl mx-auto text-sm sm:text-base font-normal leading-relaxed">
            Our experienced professionals are dedicated to delivering excellence, innovation, and outstanding results for our clients.
          </p>
        </div>

        {/* Carousel Viewport Container */}
        <div
          className="relative overflow-hidden py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {teamMembers.map((member) => (
              <div
                key={member.id}
                style={{ width: `${100 / visibleItems}%` }}
                className="flex-shrink-0 px-2.5 sm:px-3"
              >
                {/* Modern Architectural Card */}
                <div className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#2495D3] transition-all duration-300 flex flex-col justify-between h-[450px] overflow-hidden">
                  {/* Top Bar Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2495D3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Image Container with Custom Portrait Framing */}
                  <div className="relative w-full h-[220px] rounded-xl overflow-hidden bg-slate-100 border border-slate-100 mb-3 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{ objectPosition: member.imagePosition || 'center top' }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1C3A62]/90 backdrop-blur-sm text-[11px] font-semibold text-white tracking-wide shadow-xs">
                      {member.department}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-normal text-[#1C3A62] group-hover:text-[#2495D3] transition-colors line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#2495D3] mt-0.5 mb-1.5 line-clamp-1">
                        {member.role}
                      </p>
                      <p className="text-xs text-[#585858] leading-relaxed line-clamp-2">
                        {member.bio}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 mt-2">
                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1 mb-2.5">
                        {member.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-[#2495D3]/10 text-[#2495D3] text-[10px] font-semibold px-2 py-0.5 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5">
                          <a
                            href="#"
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-[#2495D3] hover:text-white text-[#585858] flex items-center justify-center transition-colors"
                            aria-label="LinkedIn"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" r="2"></circle>
                            </svg>
                          </a>
                          <a
                            href="#"
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-[#2495D3] hover:text-white text-[#585858] flex items-center justify-center transition-colors"
                            aria-label="Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <span className="text-[11px] font-semibold text-[#1C3A62] group-hover:text-[#2495D3] inline-flex items-center gap-0.5 transition-colors">
                          Profile <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls & Page Indicator */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            disabled={maxIndex === 0}
            className="p-3 rounded-xl bg-slate-100 hover:bg-[#2495D3] hover:text-white text-[#1C3A62] transition-colors shadow-sm active:scale-95 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="bg-[#1C3A62] text-white px-5 py-2 rounded-xl text-xs font-semibold tracking-wider shadow-sm">
            {currentIndex + 1} / {maxIndex + 1}
          </span>

          <button
            onClick={nextSlide}
            disabled={maxIndex === 0}
            className="p-3 rounded-xl bg-slate-100 hover:bg-[#2495D3] hover:text-white text-[#1C3A62] transition-colors shadow-sm active:scale-95 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}