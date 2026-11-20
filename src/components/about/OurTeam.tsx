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
    image: '/team/Amrit Guher.webp',
    imagePosition: 'center 26%',
    bio: 'Spearheading business growth through strategic planning, client relationships, and operational performance.',
    skills: ['Technical FM', 'Leadership'],
  },
  {
    id: 2,
    department: 'Operations',
    name: 'Sarabjeet Gujral',
    role: 'Vice President',
    image: '/team/Sarabjeet Gujral.webp',
    imagePosition: 'center 20%',
    bio: 'Driving operational excellence through strategic leadership, process optimisation, and efficient service delivery.',
    skills: ['Operations', 'Strategy'],
  },
  {
    id: 3,
    department: 'Sales & BD',
    name: 'Dilip Yadav',
    role: 'Manager - Sales',
    image: '/team/Dilip Yadav.webp',
    imagePosition: 'center 12%',
    bio: 'Driving business expansion through strategic sales initiatives, client acquisition, and relationship management.',
    skills: ['Sales', 'Client Relations'],
  },
  {
    id: 4,
    department: 'Transition & Mobilization',
    name: 'Prabhavit Prakhar',
    role: 'Transition Head',
    image: '/team/prabhavit-portrait.jpeg',
    imagePosition: 'center 4%',
    bio: 'Leading seamless business transitions through effective planning, coordination, and execution.',
    skills: ['Transition', 'Mobilization'],
  },
  {
    id: 5,
    department: 'Human Resources',
    name: 'Binesh Kesavan',
    role: 'Manager, Human Resources',
    image: '/team/Binesh Kesavan.webp',
    imagePosition: 'center 24%',
    bio: 'Building a productive workforce through effective talent management, employee engagement, and people development.',
    skills: ['People Ops', 'Talent Strategy'],
  },
];

export default function OurTeam() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleItems, setVisibleItems] = useState(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

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
  const safeCurrentIndex = Math.min(currentIndex, maxIndex);

  const prevSlide = () => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => {
      const cur = Math.min(prev, maxIndex);
      return cur === 0 ? maxIndex : cur - 1;
    });
  };

  const nextSlide = () => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => {
      const cur = Math.min(prev, maxIndex);
      return cur >= maxIndex ? 0 : cur + 1;
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStartX(null);
    setIsPaused(false);
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
    <section className="relative bg-gradient-to-b from-ina-tint-8 to-ina-tint-15 text-ina-ink py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-12 flex flex-col justify-center overflow-hidden font-sans border-t border-ina-blue/20">
      {/* Background blueprint dots */}
      <div className="absolute inset-0 blueprint-dots opacity-25 pointer-events-none" />
      {/* Architectural linework stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.22} mask="fade-edges" flipY={true} />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ina-navy/5 border border-ina-navy/15 text-ina-navy text-xs font-semibold tracking-wide">
            <Award className="w-3.5 h-3.5 text-ina-blue" />
            <span>Operational Executives</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-normal text-ina-navy">
            Meet Our Leadership Team
          </h2>
          <p className="text-ina-grey max-w-2xl mx-auto text-sm sm:text-base font-normal leading-relaxed">
            Our experienced professionals are dedicated to delivering excellence, innovation, and outstanding results for our clients.
          </p>
        </div>

        {/* Carousel Viewport Container with Touch Swipe Support */}
        <div
          className="relative overflow-hidden py-2 touch-pan-y"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${safeCurrentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {teamMembers.map((member) => (
              <div
                key={member.id}
                style={{ width: `${100 / visibleItems}%` }}
                className="flex-shrink-0 px-2.5 sm:px-3"
              >
                {/* Modern Architectural Card */}
                <div className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-ina-line/90 shadow-md hover:shadow-2xl hover:border-ina-blue transition-all duration-300 flex flex-col justify-between h-[450px] overflow-hidden">
                  {/* Top Bar Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ina-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Image Container with Custom Portrait Framing */}
                  <div className="relative w-full h-[220px] rounded-xl overflow-hidden bg-ina-tint-8 border border-ina-tint-8 mb-3 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={encodeURI(member.image)}
                      alt={member.name}
                      decoding="async"
                      style={{ objectPosition: member.imagePosition || 'center top' }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-ina-navy/90 backdrop-blur-sm text-[11px] font-semibold text-white tracking-wide shadow-xs">
                      {member.department}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-normal text-ina-navy group-hover:text-ina-blue transition-colors line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-ina-blue mt-0.5 mb-1.5 line-clamp-1">
                        {member.role}
                      </p>
                      <p className="text-xs text-ina-grey leading-relaxed line-clamp-2">
                        {member.bio}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-ina-tint-8 mt-2">
                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1 mb-2.5">
                        {member.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-ina-blue/10 text-ina-blue text-[10px] font-semibold px-2 py-0.5 rounded-md"
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
                            className="w-7 h-7 rounded-lg bg-ina-tint-8 hover:bg-ina-blue hover:text-white text-ina-grey flex items-center justify-center transition-colors"
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
                            className="w-7 h-7 rounded-lg bg-ina-tint-8 hover:bg-ina-blue hover:text-white text-ina-grey flex items-center justify-center transition-colors"
                            aria-label="Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <span className="text-[11px] font-semibold text-ina-navy group-hover:text-ina-blue inline-flex items-center gap-0.5 transition-colors">
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
            className="p-3 rounded-xl bg-ina-tint-8 hover:bg-ina-blue hover:text-white text-ina-navy transition-colors shadow-sm active:scale-95 border border-ina-line disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="bg-ina-navy text-white px-5 py-2 rounded-xl text-xs font-semibold tracking-wider shadow-sm">
            {safeCurrentIndex + 1} / {maxIndex + 1}
          </span>

          <button
            onClick={nextSlide}
            disabled={maxIndex === 0}
            className="p-3 rounded-xl bg-ina-tint-8 hover:bg-ina-blue hover:text-white text-ina-navy transition-colors shadow-sm active:scale-95 border border-ina-line disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}