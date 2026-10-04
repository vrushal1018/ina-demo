'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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
    image: '/lipson%20paul.png',
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
    image: '/Jose%20sir.png',
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
    <section className="relative w-full min-h-screen bg-white text-[#1C3A62] py-16 px-6 overflow-hidden font-['Poppins',sans-serif]">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="text-xs md:text-sm font-semibold text-[#E55B48] uppercase tracking-widest block mb-2">
          Leadership
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-800 tracking-tight">
          OUR BOARD
        </h2>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto relative min-h-[550px]">
        <AnimatePresence mode="wait">
          {!selectedMember ? (
            /* ================= SLIDER VIEW ================= */
            <motion.div
              key="slider-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Cards Container */}
              <div className="overflow-hidden py-4">
                <div
                  className="flex flex-wrap justify-center gap-8"
                >
                  {TEAM.map((member) => (
                    <motion.div
                      key={member.id}
                      onClick={() => setSelectedMember(member)}
                      className="w-[300px] sm:w-[320px] flex-shrink-0 group cursor-pointer"
                    >
                      {/* Image Container with Shared Layout ID */}
                      <div className="relative w-full h-[380px] mb-6 flex items-end justify-center">
                        <motion.img
                          layoutId={`member-image-${member.id}`}
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Info */}
                      <motion.div layoutId={`member-info-${member.id}`}>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#E55B48] transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium">
                          {member.role}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ================= DETAILED FOCUSED VIEW ================= */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-2xl max-w-6xl mx-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 left-6 sm:top-8 sm:left-8 w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors z-30"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-8">
                {/* Left Side: Animated Image */}
                <div className="lg:col-span-5 flex justify-center items-end">
                  <div className="relative w-full max-w-[380px] h-[450px]">
                    <motion.img
                      layoutId={`member-image-${selectedMember.id}`}
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-contain object-bottom"
                    />
                  </div>
                </div>

                {/* Right Side: Data Content */}
                <motion.div
                  layoutId={`member-info-${selectedMember.id}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="lg:col-span-7 flex flex-col justify-center"
                >
                  <span className="text-sm font-semibold text-[#E55B48] uppercase tracking-wider block mb-2">
                    {selectedMember.role}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
                    {selectedMember.name}
                  </h2>

                  {/* Bio Paragraphs */}
                  <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base font-normal mb-8 max-w-2xl">
                    {selectedMember.bio.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Quote Block */}
                  {selectedMember.quote && (
                    <blockquote className="border-l-2 border-[#E55B48] pl-4 italic text-slate-700 text-sm md:text-base mb-8">
                      &quot;{selectedMember.quote}&quot;
                    </blockquote>
                  )}

                  {/* Social Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#E55B48] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {selectedMember.twitter && (
                      <a
                        href={selectedMember.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#E55B48] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                        Twitter
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
