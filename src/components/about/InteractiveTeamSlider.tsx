'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Quote, Award } from 'lucide-react';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string[];
  quote?: string;
  linkedin?: string;
  twitter?: string;
}

const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Ranjit Patil',
    role: 'Co-Founder',
    image: '/bg1.png',
    bio: [
      'Arden, a 5th-generation San Franciscan, is Cruise\'s Chief People Officer. With over 20 years of experience in Human Resources, Arden drives Cruise\'s People strategy and execution.',
      'Her team supports Cruise\'s mission to build the most advanced self-driving vehicle by creating a high-performance culture where Cruisers can do the best work of their lives.',
      'Before Cruise, Arden was the VP of People at Dropbox, where she was responsible for building and scaling the company\'s culture across 12 global offices.'
    ],
    quote: 'Building high-performance culture where teams do their best work.',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: '2',
    name: 'Lipson Paul',
    role: 'Co-Founder',
    image: '/director photos/lipson1-ink.jpeg',
    bio: [
      'Mo leads the engineering division, overseeing AI models, software architecture, and hardware integration across autonomous systems.',
      'He brings over two decades of tech leadership, previously spearheading enterprise cloud transformation and scalable infrastructure initiatives.'
    ],
    quote: 'Engineering at scale is about clarity, discipline, and constant innovation.',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: '3',
    name: 'Jose TP',
    role: 'Co-Founder',
    image: '/director photos/jose sir-whimsi.jpeg',
    bio: [
      'David shapes user interaction, vehicle interface UX, and spatial product experience across physical and digital touchpoints.',
      'A passionate designer focused on human-centric technology that blends naturally into daily life.'
    ],
    quote: 'Design is not just what it looks like, but how seamlessly it works.',
    linkedin: '#',
    twitter: '#'
  }
];

export default function InteractiveTeamSlider() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section className="relative w-full bg-slate-50/50 text-[#1C3A62] py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-12 overflow-hidden font-sans">
      {/* Blueprint grid accent */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
      {/* Architectural linework stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.38} mask="fade-edges" />

      {/* Header */}
      <div className="relative max-w-7xl mx-auto text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C3A62]/5 border border-[#1C3A62]/15 text-[#1C3A62] text-xs font-semibold tracking-wide mb-3">
          <Award className="w-3.5 h-3.5 text-[#2495D3]" />
          <span>Leadership</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1C3A62] tracking-normal">
          Our board
        </h2>
        <div className="w-12 h-1 bg-[#2495D3] mx-auto mt-3 rounded-full" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto relative min-h-[450px]">
        <AnimatePresence mode="wait">
          {!selectedMember ? (
            /* ================= SLIDER VIEW ================= */
            <motion.div
              key="slider-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                {TEAM.map((member) => (
                  <motion.div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="w-full sm:w-[300px] lg:w-[320px] flex-shrink-0 group cursor-pointer"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative bg-transparent hover:bg-white/15 rounded-2xl p-5 border border-[#2495D3]/25 group-hover:border-[#2495D3] shadow-md group-hover:shadow-2xl group-hover:shadow-[#2495D3]/15 transition-all duration-300 flex flex-col items-center">
                      {/* Architectural corner mark */}
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#2495D3]/40 group-hover:bg-[#2495D3] group-hover:scale-150 transition-all" />

                      {/* Image Pedestal */}
                      <div className="relative w-full h-[280px] rounded-xl bg-transparent overflow-hidden flex items-end justify-center mb-4 border border-[#2495D3]/20 group-hover:border-[#2495D3]/50 transition-colors">
                        <motion.img
                          layoutId={`member-image-${member.id}`}
                          src={member.image}
                          alt={member.name}
                          className={`w-full h-full ${
                            member.image.toLowerCase().endsWith('.png')
                              ? 'object-contain object-bottom'
                              : 'object-cover object-top'
                          } group-hover:scale-105 transition-transform duration-500`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C3A62]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Info & CTA */}
                      <div className="w-full text-center">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#2495D3]/10 text-[#2495D3] text-xs font-semibold tracking-wide mb-2">
                          {member.role}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-normal text-[#1C3A62] group-hover:text-[#2495D3] transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-sm text-[#585858] font-medium mt-1">
                          {member.role}
                        </p>

                        <div className="mt-4 pt-4 border-t border-[#2495D3]/15 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#2495D3] group-hover:gap-2.5 transition-all">
                          <span>View executive profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ================= DETAILED FOCUSED VIEW ================= */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-3xl p-6 sm:p-10 lg:p-14 border border-slate-200 shadow-2xl max-w-5xl mx-auto overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2495D3] to-[#1C3A62]" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-slate-100 text-[#585858] flex items-center justify-center hover:bg-[#2495D3] hover:text-white transition-colors z-30 shadow-sm"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* Left Side: Animated Image */}
                <div className="lg:col-span-5 flex justify-center items-end">
                  <div className="relative w-full max-w-[360px] h-[440px] rounded-2xl bg-transparent overflow-hidden border border-[#2495D3]/25 flex items-end justify-center">
                    <motion.img
                      layoutId={`member-image-${selectedMember.id}`}
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className={`w-full h-full ${
                        selectedMember.image.toLowerCase().endsWith('.png')
                          ? 'object-contain object-bottom'
                          : 'object-cover object-top'
                      }`}
                    />
                  </div>
                </div>

                {/* Right Side: Data Content */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-[#2495D3] tracking-wide block mb-2">
                    {selectedMember.role}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-normal text-[#1C3A62] mb-6 tracking-normal">
                    {selectedMember.name}
                  </h2>

                  {/* Bio Paragraphs */}
                  <div className="space-y-3.5 text-[#585858] leading-relaxed text-sm sm:text-base font-normal mb-6">
                    {selectedMember.bio.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Quote Block */}
                  {selectedMember.quote && (
                    <blockquote className="relative bg-[#F0F7FD] border-l-4 border-[#2495D3] p-4 rounded-r-xl italic text-[#1C3A62] text-sm md:text-base mb-6 font-medium">
                      <Quote className="w-4 h-4 text-[#2495D3] mb-1 inline mr-1" />
                      &quot;{selectedMember.quote}&quot;
                    </blockquote>
                  )}

                  {/* Social Links & Back Action */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      {selectedMember.linkedin && (
                        <a
                          href={selectedMember.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-xs font-semibold text-[#585858] hover:text-[#2495D3] transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" r="2"></circle>
                          </svg>
                          LinkedIn
                        </a>
                      )}
                      {selectedMember.twitter && (
                        <a
                          href={selectedMember.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-xs font-semibold text-[#585858] hover:text-[#2495D3] transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                          Twitter
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedMember(null)}
                      className="text-xs font-semibold text-[#2495D3] hover:underline"
                    >
                      ← Back to Board Members
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
