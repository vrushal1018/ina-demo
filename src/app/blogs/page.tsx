'use client';

import React from "react";
import { Calendar } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

const blogPosts = [
  {
    id: 1,
    date: "02-07-2025",
    title: "Boost Productivity with Automation",
    description:
      "Discover how workflow automation and DevOps tools can streamline operations, reduce errors, and save your team valuable time.",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    date: "25-06-2025",
    title: "Securing Data in Cloud",
    description:
      "Learn the best practices for protecting sensitive data in cloud environments, including encryption, access controls, and compliance.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    date: "10-06-2025",
    title: "Choosing the Right Tech",
    description:
      "Explore a strategic approach to selecting software, tools, and platforms that align with your business goals and budget.",
    imageUrl:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    date: "25-06-2025",
    title: "Choosing Hosting Wisely",
    description:
      "Choosing the right hosting plan is critical to your website's long-term success. In this guide, we break down how to evaluate hosting options based on your project's.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    date: "25-06-2025",
    title: "Understanding DevOps Culture",
    description:
      "Discover how embracing a DevOps culture can break down silos between development and operations teams, foster seamless collaboration, automate workflows.",
    imageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    date: "10-06-2025",
    title: "Optimizing IT Infrastructure",
    description:
      "Explore smart, future-focused strategies to modernize outdated systems, implement real-time monitoring tools, and manage your technology stack with efficiency.",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
];

export default function BlogsPage() {
  return (
    <>
      <SiteHeader />
      <div className="min-h-screen bg-[#F8F9FA] py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto pt-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
            <div className="max-w-xl">
              <div className="mb-4 inline-block rounded-full bg-[#2495D3]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#2495D3]">
                Our Blog
              </div>
              <h2 className="text-4xl md:text-5xl text-[#1C3A62] mt-3 leading-tight tracking-tight">
                <span className="font-extrabold block">View All</span>
                <span className="font-bold block mt-1">Knowledge Posts</span>
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

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {blogPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer flex flex-col h-full bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                
                {/* Card Text Content (Top) */}
                <div className="mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 stroke-[2]" />
                    <span className="text-sm font-bold">{post.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-[#1C3A62] mb-3 leading-snug group-hover:text-[#2495D3] transition-colors">
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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay with "Read More" Button */}
                  <div className="absolute inset-0 bg-[#1C3A62]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#2495D3] text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide uppercase shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Read More
                    </span>
                  </div>
                </div>
                
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
