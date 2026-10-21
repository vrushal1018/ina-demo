'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import BlogHero from "@/components/BlogHero";
import AnimateIn from "@/components/AnimateIn";
import ArchitecturalLineworkBackground from "@/components/ArchitecturalLineworkBackground";
import { blogs } from "@/data/blogs";

export default function BlogsPage() {
  return (
    <>
      <SiteHeader />
      <BlogHero />
      <div className="relative min-h-screen bg-gradient-to-b from-white via-slate-50 to-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
        {/* Blueprint dots accent */}
        <div className="absolute inset-0 blueprint-dots opacity-30 pointer-events-none" />
        {/* Architectural linework stream */}
        <ArchitecturalLineworkBackground theme="light" opacity={0.22} mask="fade-edges" />

        <div className="relative z-10 max-w-7xl mx-auto pt-4">
          {/* Header Section */}
          <AnimateIn delay={0.1} minHeight="120px">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 pb-8 border-b border-slate-100">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 text-[#2495D3] text-xs font-semibold uppercase tracking-wider mb-4">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Our Blog</span>
                </div>
                <div className="hidden rounded-full bg-[#2495D3]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#2495D3]">
                  Our Blog
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#1C3A62] leading-tight tracking-normal">
                  <span className="block">View All</span>
                  <span className="block mt-1 text-[#2495D3]">Knowledge Posts</span>
                </h2>
              </div>
              <div className="max-w-md lg:pb-2">
                <p className="text-[#585858] text-base sm:text-lg leading-relaxed font-normal">
                  Dive into expert-written articles, tutorials, and insights
                  designed to help you stay ahead in the fast-moving world of
                  technology and innovation.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Blog Grid */}
          <AnimateIn delay={0.15} minHeight="600px">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="block h-full group focus:outline-none"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.5,
                      delay: (idx % 3) * 0.08,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    className="relative flex flex-col h-full bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200/90 overflow-hidden hover:-translate-y-1 group-hover:border-[#2495D3]"
                  >
                    {/* Top Accent Strip */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2495D3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                    {/* Image at Top */}
                    <div className="relative overflow-hidden aspect-[16/10] w-full bg-slate-100">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1629]/40 via-transparent to-transparent pointer-events-none" />

                      {/* Date Badge */}
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-[#1C3A62]/90 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                        <Calendar className="w-3.5 h-3.5 text-[#2495D3]" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="text-xl font-normal text-[#1C3A62] mb-3 leading-snug group-hover:text-[#2495D3] transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-[#585858] text-sm leading-relaxed line-clamp-3 font-normal mb-6">
                          {post.description}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#2495D3] group-hover:text-[#1C3A62] transition-colors uppercase tracking-wider">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>
    </>
  );
}
