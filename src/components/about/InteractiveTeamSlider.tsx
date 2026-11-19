'use client';

import React, { useState } from 'react';
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
    role: 'CEO',
    image: '/director photos/Ranjit patil sir.jpeg',
    bio: [
      'With 20+ years in client solutions and facility management,',
      'Mr. Ranjit is known for his client-first approach and expertise in strategic growth and technology-driven FM.'
    ],
    // quote: 'Building high-performance culture where teams do their best work.',
    linkedin: 'https://www.linkedin.com/in/ranjit-patil-63a820169/',
    twitter: '#'
  },
  {
    id: '2',
    name: 'Lipson Paul',
    role: 'Executive Director',
    image: '/director photos/lipson sir-whimsi.jpeg',
    bio: [
      'A finance and business strategy specialist with 16+ years of global FM experience,',
      'Mr. Lipson has led business transformation and drives operational excellence.'
    ],
    // quote: 'Engineering at scale is about clarity, discipline, and constant innovation.',
    linkedin: 'https://www.linkedin.com/in/lipsonpaul/',
    twitter: '#'
  },
  {
    id: '3',
    name: 'Jose TP',
    role: 'Managing Director',
    image: '/director photos/jose sir-whimsi.jpeg',
    bio: [
      'An engineering professional with 25+ years in Integrated Technical Facility Management,',
      'Mr. Jose is a first-generation entrepreneur who built a strong foundation for sustainable growth.'
    ],
    // quote: 'Design is not just what it looks like, but how seamlessly it works.',
    linkedin: 'https://www.linkedin.com/in/josetp/',
    twitter: '#'
  }
];

export default function InteractiveTeamSlider() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section className="relative w-full bg-gradient-to-b from-ina-tint-15 to-ina-tint-8 text-ina-navy py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-12 overflow-hidden font-sans">
      {/* Blueprint grid accent */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
      {/* Architectural linework stream */}
      <ArchitecturalLineworkBackground theme="light" opacity={0.38} mask="fade-edges" />

      {/* Header */}
      <div className="relative max-w-7xl mx-auto text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ina-navy/5 border border-ina-navy/15 text-ina-navy text-xs font-semibold tracking-wide mb-3">
          <Award className="w-3.5 h-3.5 text-ina-blue" />
          <span>Leadership</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-ina-navy tracking-normal">
          Our Board
        </h2>
        <div className="w-12 h-1 bg-ina-blue mx-auto mt-3 rounded-full" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto relative min-h-[450px]">
        {!selectedMember ? (
          /* ================= SLIDER VIEW ================= */
          <div className="relative">
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
              {TEAM.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="w-full sm:w-[300px] lg:w-[320px] flex-shrink-0 group cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <div className="relative bg-transparent hover:bg-white/15 rounded-2xl p-5 border border-ina-blue/25 group-hover:border-ina-blue shadow-md group-hover:shadow-2xl group-hover:shadow-ina-blue/15 transition-all duration-300 flex flex-col items-center">
                    {/* Architectural corner mark */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-ina-blue/40 group-hover:bg-ina-blue group-hover:scale-150 transition-all" />

                    {/* Image Pedestal */}
                    <div className="relative w-full h-[280px] rounded-xl bg-transparent overflow-hidden flex items-end justify-center mb-4 border border-ina-blue/20 group-hover:border-ina-blue/50 transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={encodeURI(member.image)}
                        alt={member.name}
                        decoding="async"
                        className={`w-full h-full ${member.image.toLowerCase().endsWith('.png')
                          ? 'object-contain object-bottom'
                          : 'object-cover object-top'
                          } group-hover:scale-105 transition-transform duration-500`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ina-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Info & CTA */}
                    <div className="w-full text-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-ina-blue/10 text-ina-blue text-xs font-semibold tracking-wide mb-2">
                        Co-Founder
                      </span>
                      <h3 className="text-xl sm:text-2xl font-normal text-ina-navy group-hover:text-ina-blue transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm text-ina-grey font-medium mt-1">
                        {member.role}
                      </p>

                      <div className="mt-4 pt-4 border-t border-ina-blue/15 flex items-center justify-center gap-1.5 text-xs font-semibold text-ina-blue group-hover:gap-2.5 transition-all">
                        <span></span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ================= DETAILED FOCUSED VIEW ================= */
          <div className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-14 border border-ina-line shadow-2xl max-w-5xl mx-auto overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ina-blue to-ina-navy" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-ina-tint-8 text-ina-grey flex items-center justify-center hover:bg-ina-blue hover:text-white transition-colors z-30 shadow-sm cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
              {/* Left Side: Image */}
              <div className="lg:col-span-5 flex justify-center items-end">
                <div className="relative w-full max-w-[360px] h-[300px] sm:h-[440px] rounded-2xl bg-transparent overflow-hidden border border-ina-blue/25 flex items-end justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={encodeURI(selectedMember.image)}
                    alt={selectedMember.name}
                    decoding="async"
                    className={`w-full h-full ${selectedMember.image.toLowerCase().endsWith('.png')
                      ? 'object-contain object-bottom'
                      : 'object-cover object-top'
                      }`}
                  />
                </div>
              </div>

              {/* Right Side: Data Content */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-ina-blue/10 text-ina-blue text-xs font-semibold tracking-wide">
                    Co-Founder
                  </span>
                  <span className="text-xs font-semibold text-slate-500 tracking-wide">
                    {selectedMember.role}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-normal text-ina-navy mb-6 tracking-normal">
                  {selectedMember.name}
                </h2>

                {/* Bio Paragraphs */}
                <div className="space-y-3.5 text-ina-grey leading-relaxed text-sm sm:text-base font-normal mb-6">
                  {selectedMember.bio.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Quote Block */}
                {selectedMember.quote && (
                  <blockquote className="relative bg-ina-tint-15 border-l-4 border-ina-blue p-4 rounded-r-xl italic text-ina-navy text-sm md:text-base mb-6 font-medium">
                    <Quote className="w-4 h-4 text-ina-blue mb-1 inline mr-1" />
                    &quot;{selectedMember.quote}&quot;
                  </blockquote>
                )}

                {/* Social Links & Back Action */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ina-tint-8">
                  <div className="flex items-center gap-4">
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs font-semibold text-ina-grey hover:text-ina-blue transition-colors"
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
                        className="flex items-center gap-2 text-xs font-semibold text-ina-grey hover:text-ina-blue transition-colors"
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
                    className="text-xs font-semibold text-ina-blue hover:underline"
                  >
                    ← Back to Board Members
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
