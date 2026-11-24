'use client';

import React, { useState, useRef, useEffect } from 'react';
import SiteHeader from '@/components/SiteHeader';
import {
  ChevronDown,
  User,
  Phone,
  Mail,
  MapPin,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Briefcase,
  Clock,
  Building,
  Loader2,
  Trash2,
  Sparkles,
} from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';

interface JobDetails {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  qualifications: string[];
  isActive?: boolean;
  createdAt?: string;
}



export default function CareersPage() {
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [openJobIds, setOpenJobIds] = useState<number[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobDetails | null>(null);

  // Fetch latest active jobs from API (ensuring drafts are hidden and old posts never reappear)
  useEffect(() => {
    async function loadActiveJobs() {
      try {
        setIsLoadingJobs(true);
        const res = await fetch('/api/jobs', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.jobs && Array.isArray(data.jobs)) {
            setJobs(data.jobs);
            if (data.jobs.length > 0) {
              setSelectedJob(data.jobs[0]);
              setOpenJobIds([data.jobs[0].id]);
            } else {
              setSelectedJob(null);
              setOpenJobIds([]);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load active jobs:', err);
      } finally {
        setIsLoadingJobs(false);
      }
    }
    loadActiveJobs();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleJob = (id: number) => {
    setOpenJobIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("File size should not exceed 10MB.");
        return;
      }
      setResumeFile(file);
      setErrorMessage(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("File size should not exceed 10MB.");
        return;
      }
      setResumeFile(file);
      setErrorMessage(null);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetForm = () => {
    setName('');
    setContact('');
    setEmail('');
    setAddress('');
    setResumeFile(null);
    setErrorMessage(null);
    setIsSubmitted(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openApplyModal = (job: JobDetails) => {
    setSelectedJob(job);
    resetForm();
    setIsModalOpen(true);
  };

  const closeApplyModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!contact.trim()) {
      setErrorMessage("Please enter your contact number.");
      return;
    }
    if (!address.trim()) {
      setErrorMessage("Please enter your address.");
      return;
    }
    if (!resumeFile) {
      setErrorMessage("Please upload your resume (PDF or DOC/DOCX).");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("contact", contact.trim());
      formData.append("email", email.trim());
      formData.append("address", address.trim());
      formData.append("jobTitle", selectedJob?.title || "General Application");
      formData.append("resume", resumeFile);

      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Failed to submit your application. Please check your network or try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SiteHeader />
      <div className="relative min-h-screen bg-gradient-to-b from-ina-tint-15 to-ina-tint-8 pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
        {/* Background Blueprint dots */}
        <div className="absolute inset-0 blueprint-dots opacity-40 pointer-events-none" />
        {/* Architectural linework stream */}
        <ArchitecturalLineworkBackground theme="light" opacity={0.25} mask="fade-edges" />

        <div className="relative z-10 max-w-4xl mx-auto pt-2">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ina-blue/10 border border-ina-blue/20 text-ina-blue text-xs font-semibold tracking-wide mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Careers at Ina Tech FM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-ina-navy mb-3 tracking-normal">
              Currently Open Positions
            </h1>
            <p className="text-ina-grey max-w-xl mx-auto text-sm sm:text-base font-normal leading-relaxed">
              Join our dedicated team of engineers and facility management experts building dependable, sustainable workspaces.
            </p>
            <div className="w-16 h-1 bg-ina-blue mx-auto mt-3 rounded-full" />
          </div>

          {/* Job Listings List */}
          <div className="space-y-6">
            {isLoadingJobs ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-ina-line shadow-lg max-w-xl mx-auto">
                <Loader2 className="w-8 h-8 text-ina-blue animate-spin mx-auto mb-3" />
                <p className="text-sm font-medium text-ina-grey">Checking for open positions...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-ina-line shadow-lg max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-ina-tint-8 border border-ina-line flex items-center justify-center mx-auto mb-4 text-ina-blue">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-normal text-ina-navy mb-2">
                  No Current Openings Available
                </h3>
                <p className="text-sm text-ina-grey leading-relaxed mb-6">
                  We do not have any open positions listed at the moment, but we are always looking for exceptional engineering and FM talent.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-ina-navy hover:bg-ina-blue text-white px-6 py-3 rounded-xl font-semibold text-xs tracking-wide transition-all shadow-md"
                >
                  Contact Our HR Desk
                </a>
              </div>
            ) : (
              jobs.map((job) => {
              const isOpen = openJobIds.includes(job.id);
              return (
                <AnimateIn key={job.id} delay={0.1} minHeight="320px">
                  <div className="relative bg-white rounded-3xl p-5 sm:p-7 md:p-8 shadow-xl border border-ina-line/90 overflow-hidden group">
                    {/* Top Accent Strip */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ina-blue to-ina-navy" />

                    {/* Header row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-ina-tint-8">
                      <div>
                        <div
                          className="flex items-center gap-3 cursor-pointer group/title mb-3 w-fit"
                          onClick={() => toggleJob(job.id)}
                        >
                          <h2 className="text-2xl sm:text-3xl font-normal text-ina-navy tracking-normal group-hover/title:text-ina-blue transition-colors">
                            {job.title}
                          </h2>
                          <div className="p-1.5 rounded-full bg-ina-tint-8 group-hover/title:bg-ina-blue/10 transition-colors">
                            <ChevronDown
                              className={`w-5 h-5 text-ina-navy group-hover/title:text-ina-blue transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </div>

                        {/* Meta items */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-ina-grey font-medium mb-4">
                          <span className="flex items-center gap-1.5">
                            <Building className="w-4 h-4 text-ina-blue" />
                            {job.department}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-ina-line" />
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-ina-blue" />
                            {job.location}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-ina-line" />
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-ina-blue" />
                            {job.type}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-ina-line" />
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4 text-ina-blue" />
                            {job.experience}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-lg border border-ina-line bg-ina-tint-4 text-xs font-semibold text-ina-navy"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Apply Button */}
                      <div className="flex md:flex-col items-start md:items-end justify-between gap-3 pt-2 md:pt-0">
                        <button
                          onClick={() => openApplyModal(job)}
                          className="bg-ina-blue-deep hover:bg-ina-navy text-white px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 whitespace-nowrap shadow-lg shadow-ina-blue/20 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                        >
                          Apply now
                        </button>
                        <span className="text-xs text-ina-grey font-medium hidden md:inline">
                          Sends to: HR Desk
                        </span>
                      </div>
                    </div>

                    {/* Animated Expandable Details */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                    >
                      <div className="overflow-hidden space-y-6">
                        {/* Overview */}
                        <div>
                          <h3 className="text-xs font-semibold tracking-wide text-ina-navy mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-ina-blue" />
                            <span>Role overview</span>
                          </h3>
                          <p className="text-ina-grey leading-relaxed text-[15px] font-normal">
                            {job.description}
                          </p>
                        </div>

                        {/* Key Responsibilities */}
                        <div>
                          <h3 className="text-xs font-semibold tracking-wide text-ina-navy mb-3">
                            Key responsibilities
                          </h3>
                          <ul className="space-y-2.5">
                            {job.responsibilities.map((resp, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2.5 text-sm sm:text-[15px] text-ina-grey leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-ina-blue mt-2 shrink-0" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Qualifications */}
                        <div>
                          <h3 className="text-xs font-semibold tracking-wide text-ina-navy mb-3">
                            Qualifications & requirements
                          </h3>
                          <ul className="space-y-2.5">
                            {job.qualifications.map((qual, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2.5 text-sm sm:text-[15px] text-ina-grey leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-ina-blue mt-2 shrink-0" />
                                <span>{qual}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Bottom Apply Action */}
                        <div className="pt-6 border-t border-ina-tint-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <p className="text-sm text-ina-grey font-medium">
                            Ready to build your career with us?
                          </p>
                          <button
                            onClick={() => openApplyModal(job)}
                            className="bg-ina-navy hover:bg-ina-blue text-white px-7 py-2.5 rounded-xl font-semibold text-xs tracking-wide transition-all duration-300 cursor-pointer shadow-md hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto text-center"
                          >
                            Apply for {job.title}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              );
            })
            )}
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ina-night/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeApplyModal();
          }}
        >
          <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-ina-line transition-all duration-300 transform scale-100 p-5 sm:p-8">
            {/* Top Accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ina-blue to-ina-navy" />

            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-ina-tint-8 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-ina-blue/10 px-3 py-1 text-xs font-semibold tracking-wide text-ina-blue mb-2">
                  <Briefcase className="w-3 h-3" />
                  <span>Job application</span>
                </div>
                <h3 className="text-2xl font-normal text-ina-navy tracking-normal">
                  Apply for {selectedJob?.title || "Open Position"}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-ina-grey mt-1.5 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-ina-blue" />
                    {selectedJob?.location || ""}
                  </span>
                  <span>•</span>
                  <span>{selectedJob?.department || ""}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeApplyModal}
                disabled={isSubmitting}
                className="p-2 rounded-full text-ina-grey hover:text-ina-navy hover:bg-ina-tint-8 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success State */}
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-2xl font-normal text-ina-navy">Application Submitted!</h4>
                <p className="text-sm sm:text-base text-ina-grey max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-ina-navy">{name}</strong>. Your application for <strong className="text-ina-blue">{selectedJob?.title || "this position"}</strong> and resume have been sent directly to{" "}
                  <strong className="text-ina-blue">jaisalil.s@inaspaceworks.com</strong>.
                </p>
                <p className="text-xs text-ina-grey">
                  Our HR & Technical teams will review your profile and contact you soon.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={closeApplyModal}
                    className="bg-ina-navy hover:bg-ina-blue text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error Banner */}
                {errorMessage && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">{errorMessage}</div>
                  </div>
                )}

                {/* Candidate Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wide text-ina-navy flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-ina-blue" />
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-ina-line bg-ina-tint-4/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue focus:border-transparent text-sm text-ina-navy transition-all"
                  />
                </div>

                {/* Grid for Contact & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Contact Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold tracking-wide text-ina-navy flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-ina-blue" />
                      Contact number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-ina-line bg-ina-tint-4/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue focus:border-transparent text-sm text-ina-navy transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold tracking-wide text-ina-navy flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-ina-blue" />
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-ina-line bg-ina-tint-4/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue focus:border-transparent text-sm text-ina-navy transition-all"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wide text-ina-navy flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-ina-blue" />
                    Current address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your current residential address or city"
                    className="w-full px-4 py-3 rounded-xl border border-ina-line bg-ina-tint-4/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue focus:border-transparent text-sm text-ina-navy transition-all resize-none"
                  />
                </div>

                {/* Resume Upload Section */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wide text-ina-navy flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-ina-blue" />
                    Upload resume <span className="text-red-500">*</span>
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {!resumeFile ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${isDragging
                          ? 'border-ina-blue bg-ina-blue/5 scale-[0.99]'
                          : 'border-ina-line hover:border-ina-blue hover:bg-ina-tint-4'
                        }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-ina-blue/10 text-ina-blue flex items-center justify-center mx-auto mb-3">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-ina-navy">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs text-ina-grey mt-1">
                        Supported formats: PDF, DOC, DOCX (Max 10MB)
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-ina-blue/30 bg-ina-blue/5">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-ina-blue text-white flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-semibold text-ina-navy truncate">
                            {resumeFile.name}
                          </p>
                          <p className="text-xs text-ina-grey">
                            {(resumeFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-2 text-ina-grey hover:text-red-500 rounded-lg hover:bg-white transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Send Info Note */}
                <div className="rounded-xl bg-ina-tint-4 p-3 text-xs text-ina-grey flex items-center gap-2 border border-ina-tint-8">
                  <Mail className="w-4 h-4 text-ina-blue shrink-0" />
                  <span>
                    Applications are directly dispatched to{" "}
                    <strong className="text-ina-navy">jaisalil.s@inaspaceworks.com</strong>
                  </span>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={closeApplyModal}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-ina-line text-sm font-semibold text-ina-grey hover:bg-ina-tint-4 transition-colors cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-ina-blue-deep hover:bg-ina-navy disabled:bg-ina-line disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}