'use client';

import React, { useState } from 'react';
import SiteHeader from '@/components/SiteHeader';

const tabs = [
  "All Jobs",
  "Marketing",
  "Engineering",
  "Product",
  "Sales",
  "Operations"
];

const jobsData = [
  {
    id: 1,
    title: "Senior Data Platform Engineer",
    tags: ["Engineering", "London, UK", "Remote"],
    description: "Yoora CRM offers the most affordable, comprehensive platform to manage the entire customer journey, from generating leads, to closing deals and supporting your customers. With a full suite of CRM.",
  },
  {
    id: 2,
    title: "Senior Product Designer",
    tags: ["Product", "London, UK", "Remote"],
    description: "Yoora CRM offers the most affordable, comprehensive platform to manage the entire customer journey, from generating leads, to closing deals and supporting your customers. With a full suite of CRM.",
  }
];

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState("All Jobs");

  // Optional: Filter jobs based on active tab
  const filteredJobs = activeTab === "All Jobs" 
    ? jobsData 
    : jobsData.filter(job => job.tags.includes(activeTab));

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen bg-[#F8F9FA] py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto pt-8">
          {/* Header Section */}
          <div className="mb-6 flex justify-center">
            <div className="inline-block rounded-full bg-[#2495D3]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#2495D3]">
              Careers
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-center text-[#1C3A62] mb-12 tracking-tight">
            Currently open positions
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-base font-medium transition-colors relative ${
                  activeTab === tab
                    ? "text-[#1C3A62]"
                    : "text-gray-500 hover:text-[#1C3A62]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#2495D3] rounded-t-md" />
                )}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  {/* Job Title and Tags */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#1C3A62] mb-5 tracking-tight group-hover:text-[#2495D3] transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {job.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium text-[#585858]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button className="bg-[#2495D3] hover:bg-[#1C3A62] text-white px-8 py-3.5 rounded-full font-medium text-sm uppercase tracking-wide transition-all duration-300 whitespace-nowrap shadow-md hover:-translate-y-1">
                    Apply Now
                  </button>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-100 my-8"></div>

                {/* Description */}
                <p className="text-[#585858] leading-relaxed text-[15px] font-medium">
                  {job.description}
                </p>
              </div>
            ))}
            
            {/* Empty State Fallback */}
            {filteredJobs.length === 0 && (
              <div className="text-center py-16 text-gray-500 font-medium">
                No open positions available in this category right now.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
