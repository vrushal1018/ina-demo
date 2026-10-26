'use client';

import React, { useState, useRef } from 'react';
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
}

const technicalSupervisorJob: JobDetails = {
  id: 1,
  title: "Technical supervisor",
  department: "Operations & Technical FM",
  location: "Thane / Mumbai, Maharashtra",
  type: "Full-Time",
  experience: "3+ Years",
  tags: ["Operations", "On-site", "Full-Time", "Engineering"],
  description:
    "As a Technical Supervisor at Ina Tech FM, you will oversee facility operations, lead on-site engineering teams, and ensure mechanical, electrical, and plumbing (MEP) infrastructure functions with maximum uptime, safety, and strict regulatory compliance.",
  responsibilities: [
    "Lead daily operations and preventive maintenance of facility MEP systems, HVAC, and electrical switchgear.",
    "Manage and guide site technicians, ensuring SLA adherence and rapid turnaround for breakdown calls.",
    "Perform routine technical audits, risk assessments, and maintain compliance with statutory health and safety standards.",
    "Prepare comprehensive incident reports, energy log sheets, and client escalation summaries.",
    "Liaise with clients and vendors to ensure seamless maintenance execution and budget control.",
  ],
  qualifications: [
    "Diploma or Bachelor's Degree in Electrical, Mechanical, or Civil Engineering.",
    "3+ years of hands-on experience in technical facility management or building engineering operations.",
    "Strong technical troubleshooting skills and solid understanding of building management systems (BMS).",
    "Excellent leadership, problem-solving, and communication skills.",
  ],
};

export default function CareersPage() {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
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

  const openApplyModal = () => {
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
      formData.append("jobTitle", technicalSupervisorJob.title);
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
      <div className="relative min-h-screen bg-gradient-to-b from-[#D9EDF8] to-[#E2F1FA] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
        {/* Background Blueprint dots */}
        <div className="absolute inset-0 blueprint-dots opacity-40 pointer-events-none" />
        {/* Architectural linework stream */}
        <ArchitecturalLineworkBackground theme="light" opacity={0.25} mask="fade-edges" />

        <div className="relative z-10 max-w-4xl mx-auto pt-2">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2495D3]/10 border border-[#2495D3]/20 text-[#2495D3] text-xs font-semibold tracking-wide mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Careers at INA Tech FM</span>
            </div>
            <div className="hidden rounded-full bg-[#2495D3]/10 px-4 py-1.5 text-xs font-semibold text-[#2495D3]">
              Careers at INA Tech FM
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1C3A62] mb-3 tracking-normal">
              Currently open positions
            </h1>
            <p className="text-[#585858] max-w-xl mx-auto text-sm sm:text-base font-normal leading-relaxed">
              Join our dedicated team of engineers and facility management experts building dependable, sustainable workspaces.
            </p>
            <div className="w-16 h-1 bg-[#2495D3] mx-auto mt-3 rounded-full" />
          </div>

          {/* Job Listing Card */}
          <AnimateIn delay={0.1} minHeight="360px">
            <div className="relative bg-white rounded-3xl p-5 sm:p-7 md:p-8 shadow-xl border border-slate-200/90 overflow-hidden group">
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2495D3] to-[#1C3A62]" />

              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div>
                  <div
                    className="flex items-center gap-3 cursor-pointer group/title mb-3 w-fit"
                    onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                  >
                    <h2 className="text-2xl sm:text-3xl font-normal text-[#1C3A62] tracking-normal group-hover/title:text-[#2495D3] transition-colors">
                      {technicalSupervisorJob.title}
                    </h2>
                    <div className="p-1.5 rounded-full bg-slate-100 group-hover/title:bg-[#2495D3]/10 transition-colors">
                      <ChevronDown
                        className={`w-5 h-5 text-[#1C3A62] group-hover/title:text-[#2495D3] transition-transform duration-300 ${isDescriptionOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </div>
                  </div>

                  {/* Meta items */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#585858] font-medium mb-4">
                    <span className="flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-[#2495D3]" />
                      {technicalSupervisorJob.department}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#2495D3]" />
                      {technicalSupervisorJob.location}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#2495D3]" />
                      {technicalSupervisorJob.type}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {technicalSupervisorJob.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-[#1C3A62]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="flex md:flex-col items-start md:items-end justify-between gap-3 pt-2 md:pt-0">
                  <button
                    onClick={openApplyModal}
                    className="bg-[#2495D3] hover:bg-[#1C3A62] text-white px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 whitespace-nowrap shadow-lg shadow-[#2495D3]/20 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    Apply now
                  </button>
                  <span className="text-xs text-slate-400 font-medium hidden md:inline">
                    Sends to: HR Desk
                  </span>
                </div>
              </div>

              {/* Animated Expandable Details */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${isDescriptionOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'
                  }`}
              >
                <div className="overflow-hidden space-y-6">
                  {/* Overview */}
                  <div>
                    <h3 className="text-xs font-semibold tracking-wide text-[#1C3A62] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#2495D3]" />
                      <span>Role overview</span>
                    </h3>
                    <p className="text-[#585858] leading-relaxed text-[15px] font-normal">
                      {technicalSupervisorJob.description}
                    </p>
                  </div>

                  {/* Key Responsibilities */}
                  <div>
                    <h3 className="text-xs font-semibold tracking-wide text-[#1C3A62] mb-3">
                      Key responsibilities
                    </h3>
                    <ul className="space-y-2.5">
                      {technicalSupervisorJob.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#585858] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2495D3] mt-2 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Qualifications */}
                  <div>
                    <h3 className="text-xs font-semibold tracking-wide text-[#1C3A62] mb-3">
                      Qualifications & skills
                    </h3>
                    <ul className="space-y-2.5">
                      {technicalSupervisorJob.qualifications.map((qual, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#585858] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2495D3] mt-2 shrink-0" />
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Apply Action */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-sm text-[#585858] font-medium">
                      Ready to build your career with us?
                    </p>
                    <button
                      onClick={openApplyModal}
                      className="bg-[#1C3A62] hover:bg-[#2495D3] text-white px-7 py-2.5 rounded-xl font-semibold text-xs tracking-wide transition-all duration-300 cursor-pointer shadow-md hover:-translate-y-0.5 active:scale-95"
                    >
                      Apply for this position
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Application Form Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeApplyModal();
          }}
        >
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 transition-all duration-300 transform scale-100 p-6 sm:p-8">
            {/* Top Accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2495D3] to-[#1C3A62]" />

            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2495D3]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#2495D3] mb-2">
                  <Briefcase className="w-3 h-3" />
                  <span>Job application</span>
                </div>
                <h3 className="text-2xl font-normal text-[#1C3A62] tracking-normal">
                  Apply for technical supervisor
                </h3>
                <p className="text-sm text-[#585858] mt-1 font-medium">
                  Please fill in your details. Your application will be sent to our recruitment team.
                </p>
              </div>
              <button
                type="button"
                onClick={closeApplyModal}
                disabled={isSubmitting}
                className="p-2 rounded-full text-slate-400 hover:text-[#1C3A62] hover:bg-slate-100 transition-colors cursor-pointer"
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
                <h4 className="text-2xl font-normal text-[#1C3A62]">Application Submitted!</h4>
                <p className="text-sm sm:text-base text-[#585858] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1C3A62]">{name}</strong>. Your application and resume have been sent directly to{" "}
                  <strong className="text-[#2495D3]">jaisalil.s@inaspaceworks.com</strong>.
                </p>
                <p className="text-xs text-slate-400">
                  Our HR & Technical teams will review your profile and contact you soon.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={closeApplyModal}
                    className="bg-[#1C3A62] hover:bg-[#2495D3] text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md cursor-pointer"
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
                  <label className="text-xs font-semibold tracking-wide text-[#1C3A62] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#2495D3]" />
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm text-[#1C3A62] transition-all"
                  />
                </div>

                {/* Grid for Contact & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Contact Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold tracking-wide text-[#1C3A62] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#2495D3]" />
                      Contact number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm text-[#1C3A62] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold tracking-wide text-[#1C3A62] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#2495D3]" />
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm text-[#1C3A62] transition-all"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wide text-[#1C3A62] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2495D3]" />
                    Current address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your current residential address or city"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2495D3] focus:border-transparent text-sm text-[#1C3A62] transition-all resize-none"
                  />
                </div>

                {/* Resume Upload Section */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wide text-[#1C3A62] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#2495D3]" />
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
                          ? 'border-[#2495D3] bg-[#2495D3]/5 scale-[0.99]'
                          : 'border-slate-200 hover:border-[#2495D3] hover:bg-slate-50'
                        }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#2495D3]/10 text-[#2495D3] flex items-center justify-center mx-auto mb-3">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-[#1C3A62]">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Supported formats: PDF, DOC, DOCX (Max 10MB)
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#2495D3]/30 bg-[#2495D3]/5">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-[#2495D3] text-white flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-semibold text-[#1C3A62] truncate">
                            {resumeFile.name}
                          </p>
                          <p className="text-xs text-[#585858]">
                            {(resumeFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Send Info Note */}
                <div className="rounded-xl bg-slate-50 p-3 text-xs text-[#585858] flex items-center gap-2 border border-slate-100">
                  <Mail className="w-4 h-4 text-[#2495D3] shrink-0" />
                  <span>
                    Applications are directly dispatched to{" "}
                    <strong className="text-[#1C3A62]">jaisalil.s@inaspaceworks.com</strong>
                  </span>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={closeApplyModal}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#585858] hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#2495D3] hover:bg-[#1C3A62] disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
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