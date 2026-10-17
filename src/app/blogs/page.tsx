'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import BlogHero from "@/components/BlogHero";
import AnimateIn from "@/components/AnimateIn";
import { blogs } from "@/data/blogs";

export default function BlogsPage() {
  return (
    <>
      <SiteHeader />
      <BlogHero />
      <div className="min-h-screen bg-[#F8F9FA] py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto pt-8">
          {/* Header Section */}
          <AnimateIn delay={0.1} minHeight="120px">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
              <div className="max-w-xl">
                <div className="mb-4 inline-block rounded-full bg-[#2495D3]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#2495D3]">
                  Our Blog
                </div>
                <h2 className="text-4xl md:text-5xl text-[#1C3A62] mt-3 leading-tight tracking-tight">
                  <span className="font-semibold block">View All</span>
                  <span className="font-medium block mt-1">Knowledge Posts</span>
                </h2>
              </div>
              <div className="max-w-md lg:pb-2">
                <p className="text-[#585858] text-base leading-relaxed font-medium">
                  Dive into expert-written articles, tutorials, and insights
                  designed to help you stay ahead in the fast-moving world of
                  technology and innovation.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Blog Grid - Loads on scroll */}
          <AnimateIn delay={0.15} minHeight="600px">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {blogs.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="block h-full group focus:outline-hidden"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-30px" }}
                    transition={{
                      duration: 0.55,
                      delay: (idx % 3) * 0.1,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    className="flex flex-col h-full bg-white p-6 rounded-3xl shadow-xs hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[#2495D3]/30"
                  >
                    {/* Card Text Content (Top) */}
                    <div className="mb-6 flex-grow">
                      <div className="flex items-center gap-2 text-gray-500 mb-4">
                        <Calendar className="w-4 h-4 stroke-[2]" />
                        <span className="text-sm font-medium">{post.date}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-[#1C3A62] mb-3 leading-snug group-hover:text-[#2495D3] transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-[#585858] text-[15px] leading-relaxed line-clamp-3 font-medium">
                        {post.description}
                      </p>
                    </div>

                    {/* Card Image (Bottom) */}
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] w-full bg-gray-100">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />

                      {/* Hover Overlay with "Read More" Button */}
                      <div className="absolute inset-0 bg-[#1C3A62]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-[#2495D3] text-white px-8 py-3 rounded-full font-medium text-sm tracking-wide uppercase shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          Read More
                        </span>
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
