'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Clock,
  Play,
  Link as LinkIcon,
  ArrowLeft,
  Check,
  Calendar,
  Share2,
  BookOpen,
} from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';
import { getBlogBySlug, blogs, BlogPost } from '@/data/blogs';

// Clean SVG Brand Icons
function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);

  const post: BlogPost =
    (slug ? getBlogBySlug(slug) : undefined) || blogs[0];

  const getTagClasses = (color?: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'blue':
        return 'bg-[#2495D3]/10 text-[#2495D3] border-[#2495D3]/20';
      case 'rose':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'gray':
      default:
        return 'bg-slate-100 text-[#585858] border-slate-200';
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    if (typeof window === 'undefined') return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    let shareUrl = '';

    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (!post?.sections?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
      }
    );

    post.sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [post]);

  const navItems = post.sidebarNav || post.sections?.map((s) => ({ id: s.id, label: s.title })) || [];

  return (
    <>
      <SiteHeader />

      <div className="bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA] min-h-screen font-sans text-[#383838] relative pt-8 pb-24 overflow-hidden">
        {/* Blueprint dots accent */}
        <div className="absolute inset-0 blueprint-dots opacity-20 pointer-events-none" />
        {/* Architectural linework stream */}
        <ArchitecturalLineworkBackground theme="light" opacity={0.2} mask="fade-edges" />

        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation Bar */}
          <div className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2495D3] hover:text-[#1C3A62] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to all posts</span>
            </Link>
          </div>

          {/* Header Section */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2.5 mb-5">
              {post.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 text-[11px] sm:text-xs font-semibold tracking-wide rounded-lg border ${getTagClasses(
                    tag.color
                  )}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-5 tracking-normal text-[#1C3A62]">
              {post.title}
            </h1>

            {/* Short Excerpt / Description */}
            <p className="text-base sm:text-lg text-[#585858] max-w-3xl mb-8 leading-relaxed font-normal">
              {post.description}
            </p>

            {/* Featured Image / Video Container */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl flex items-center justify-center group mb-6 bg-slate-900">
              <img
                src={post.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://placehold.co/1000x560/f0f7fb/2495D3?text=' +
                    encodeURIComponent(post.title);
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent z-10" />

              {/* Play video button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="relative z-20 flex items-center gap-2.5 bg-[#2495D3] hover:bg-[#1C3A62] text-white px-7 py-3 md:px-8 md:py-3.5 rounded-full font-semibold transition-all transform group-hover:scale-105 shadow-xl cursor-pointer"
              >
                <Play size={20} fill="currentColor" />
                <span>{isPlaying ? 'Video Playing' : 'Play video'}</span>
              </button>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center text-xs sm:text-sm text-[#585858] font-medium gap-y-2 py-3 border-y border-slate-100">
              <span className="flex items-center gap-1.5">
                <Calendar size={15} className="text-[#2495D3]" />
                Date: {post.date}
              </span>
              {post.author && (
                <>
                  <span className="mx-3 text-slate-300">|</span>
                  <span>
                    Author: <strong className="text-[#1C3A62] font-semibold">{post.author}</strong>
                  </span>
                </>
              )}
              <span className="mx-3 text-slate-300">|</span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#2495D3]" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Content Layout with Sidebar Navigation */}
          <div className="flex flex-col md:flex-row gap-12 relative mt-10">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-60 lg:w-64 flex-shrink-0">
              <div className="sticky top-28 bg-slate-50/80 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#1C3A62] mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-[#2495D3]" />
                  <span>Contents</span>
                </div>
                <nav className="space-y-2 text-sm">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block transition-all pl-3 py-1.5 rounded-r-lg ${
                          isActive
                            ? 'text-[#1C3A62] font-bold border-l-2 border-[#2495D3] bg-[#2495D3]/10'
                            : 'text-[#585858] hover:text-[#2495D3] border-l-2 border-transparent hover:border-slate-300'
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content Sections */}
            <main className="flex-1 max-w-2xl text-[#383838] text-base md:text-lg leading-relaxed">
              {post.sections?.map((section) => (
                <section key={section.id} id={section.id} className="mb-12 scroll-mt-28">
                  <h2 className="text-2xl md:text-3xl font-normal text-[#1C3A62] mb-5 tracking-normal">
                    {section.title}
                  </h2>

                  {/* Paragraphs */}
                  {section.paragraphs && (
                    <div className="space-y-4 text-[#585858]">
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Ordered Lists */}
                  {section.list && (
                    <ol className="list-decimal pl-5 space-y-3 marker:text-[#1C3A62] marker:font-bold mt-5 text-[#585858]">
                      {section.list.map((item, lIdx) => (
                        <li key={lIdx} className="pl-2 leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ol>
                  )}

                  {/* Bullet Lists */}
                  {section.bullets && (
                    <ul className="list-disc pl-5 space-y-3 marker:text-[#2495D3] mt-5 text-[#585858]">
                      {section.bullets.map((item, bIdx) => {
                        const colonIdx = item.indexOf(':');
                        if (colonIdx > 0) {
                          const prefix = item.substring(0, colonIdx + 1);
                          const rest = item.substring(colonIdx + 1);
                          return (
                            <li key={bIdx} className="pl-2 leading-relaxed">
                              <strong className="text-[#1C3A62] font-bold">{prefix}</strong>
                              {rest}
                            </li>
                          );
                        }
                        return (
                          <li key={bIdx} className="pl-2 leading-relaxed">
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {/* Subparagraphs after list/bullets */}
                  {section.subparagraphs && (
                    <div className="space-y-4 text-[#585858] mt-5">
                      {section.subparagraphs.map((p, spIdx) => (
                        <p key={spIdx} className="leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              {/* Mobile Social Share Bar */}
              <div className="flex md:hidden items-center gap-3 pt-8 border-t border-slate-100 mt-10">
                <span className="text-xs font-semibold text-[#585858] tracking-wide flex items-center gap-1.5">
                  <Share2 size={14} /> Share:
                </span>
                <button
                  onClick={() => handleShare('linkedin')}
                  aria-label="Share on LinkedIn"
                  className="p-2.5 rounded-full border border-slate-200 text-[#585858] hover:text-[#2495D3] hover:border-[#2495D3] transition-all bg-white"
                >
                  <LinkedinIcon size={16} />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  aria-label="Share on Twitter"
                  className="p-2.5 rounded-full border border-slate-200 text-[#585858] hover:text-[#2495D3] hover:border-[#2495D3] transition-all bg-white"
                >
                  <TwitterIcon size={16} />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  aria-label="Share on Facebook"
                  className="p-2.5 rounded-full border border-slate-200 text-[#585858] hover:text-[#2495D3] hover:border-[#2495D3] transition-all bg-white"
                >
                  <FacebookIcon size={16} />
                </button>
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy link"
                  className="p-2.5 rounded-full border border-slate-200 text-[#585858] hover:text-[#2495D3] hover:border-[#2495D3] transition-all bg-white"
                >
                  {copied ? <Check size={16} className="text-emerald-600" /> : <LinkIcon size={16} />}
                </button>
              </div>
            </main>

            {/* Desktop Social Share (Floating right) */}
            <div className="hidden lg:flex flex-col gap-3 absolute -right-16 top-0">
              <button
                onClick={() => handleShare('linkedin')}
                aria-label="Share on LinkedIn"
                className="p-3 rounded-full border border-slate-200 text-[#585858] hover:text-[#2495D3] hover:border-[#2495D3] transition-all bg-white shadow-sm hover:shadow cursor-pointer"
                title="Share on LinkedIn"
              >
                <LinkedinIcon size={18} />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                aria-label="Share on Twitter"
                className="p-3 rounded-full border border-slate-200 text-[#585858] hover:text-[#2495D3] hover:border-[#2495D3] transition-all bg-white shadow-sm hover:shadow cursor-pointer"
                title="Share on Twitter"
              >
                <TwitterIcon size={18} />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                aria-label="Share on Facebook"
                className="p-3 rounded-full border border-slate-200 text-[#585858] hover:text-[#2495D3] hover:border-[#2495D3] transition-all bg-white shadow-sm hover:shadow cursor-pointer"
                title="Share on Facebook"
              >
                <FacebookIcon size={18} />
              </button>
              <button
                onClick={handleCopyLink}
                aria-label="Copy link"
                className="relative p-3 rounded-full border border-slate-200 text-[#585858] hover:text-[#2495D3] hover:border-[#2495D3] transition-all bg-white shadow-sm hover:shadow cursor-pointer group"
                title="Copy link"
              >
                {copied ? <Check size={18} className="text-emerald-600" /> : <LinkIcon size={18} />}
                {copied && (
                  <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2.5 py-1 text-[11px] font-semibold text-white bg-[#1C3A62] rounded-md shadow whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
