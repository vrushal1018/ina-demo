'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Briefcase,
  Building,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
  X,
  Search,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import ArchitecturalLineworkBackground from '@/components/ArchitecturalLineworkBackground';
import { JobDetails } from '@/data/jobs';

const PREDEFINED_DEPARTMENTS = [
  'Operations & Client Relations',
  'Operations & Technical FM',
  'Hard FM & Engineering',
  'Technical Services',
  'Sustainability Services',
  'Transition Services',
  'Allied Services',
  'Audit & Offerings',
  'Custom',
];

const PREDEFINED_TYPES = ['Full-Time', 'Part-Time', 'Contract', 'On-site', 'Hybrid'];

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<{ email: string; role: string } | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Jobs state
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);
  const [jobFormError, setJobFormError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Delete confirmation modal state
  const [jobToDelete, setJobToDelete] = useState<JobDetails | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form inputs
  const [formTitle, setFormTitle] = useState('');
  const [formDepartment, setFormDepartment] = useState('Operations & Technical FM');
  const [customDepartment, setCustomDepartment] = useState('');
  const [formLocation, setFormLocation] = useState('Mumbai, Maharashtra');
  const [formType, setFormType] = useState('Full-Time');
  const [formExperience, setFormExperience] = useState('3+ Years');
  const [formTags, setFormTags] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formResponsibilities, setFormResponsibilities] = useState('');
  const [formQualifications, setFormQualifications] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth/me');
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setAdminUser(data.user);
        fetchJobs();
      } else {
        setIsAuthenticated(false);
        setAdminUser(null);
      }
    } catch {
      setIsAuthenticated(false);
      setAdminUser(null);
    }
  };

  const fetchJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const res = await fetch('/api/admin/jobs');
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch (err) {
      console.error('Failed to load jobs:', err);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both email and password.');
      return;
    }

    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please check your credentials.');
      }

      setIsAuthenticated(true);
      setAdminUser(data.user);
      fetchJobs();
      showToast('Welcome back, Admin!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid login credentials.';
      setLoginError(msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsAuthenticated(false);
      setAdminUser(null);
      setLoginPassword('');
    }
  };

  const fillDemoCredentials = () => {
    setLoginEmail('admin@inatechfm.com');
    setLoginPassword('InaTechFM@2025!');
    setLoginError(null);
  };

  // Open modal for creating new job
  const handleOpenCreateModal = () => {
    setEditingJobId(null);
    setFormTitle('');
    setFormDepartment('Operations & Technical FM');
    setCustomDepartment('');
    setFormLocation('Mumbai, Maharashtra');
    setFormType('Full-Time');
    setFormExperience('3+ Years');
    setFormTags('Operations, On-site, Full-Time, Engineering');
    setFormDescription('');
    setFormResponsibilities('');
    setFormQualifications('');
    setFormIsActive(true);
    setJobFormError(null);
    setIsModalOpen(true);
  };

  // Open modal for editing existing job
  const handleOpenEditModal = (job: JobDetails) => {
    setEditingJobId(job.id);
    setFormTitle(job.title);

    const isPredefined = PREDEFINED_DEPARTMENTS.includes(job.department);
    if (isPredefined) {
      setFormDepartment(job.department);
      setCustomDepartment('');
    } else {
      setFormDepartment('Custom');
      setCustomDepartment(job.department);
    }

    setFormLocation(job.location);
    setFormType(job.type);
    setFormExperience(job.experience);
    setFormTags(job.tags.join(', '));
    setFormDescription(job.description);
    setFormResponsibilities(job.responsibilities.join('\n'));
    setFormQualifications(job.qualifications.join('\n'));
    setFormIsActive(job.isActive !== false);
    setJobFormError(null);
    setIsModalOpen(true);
  };

  // Toggle active status directly
  const handleToggleActive = async (job: JobDetails) => {
    const updatedStatus = !(job.isActive !== false);
    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: job.id,
          isActive: updatedStatus,
        }),
      });

      if (res.ok) {
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, isActive: updatedStatus } : j))
        );
        showToast(
          `Job "${job.title}" is now ${updatedStatus ? 'Live / Active' : 'Draft / Inactive'}.`
        );
      } else {
        showToast('Failed to update job status.', 'error');
      }
    } catch {
      showToast('Network error while updating job status.', 'error');
    }
  };

  // Submit create or edit form
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setJobFormError(null);

    const resolvedDept =
      formDepartment === 'Custom' ? customDepartment.trim() : formDepartment.trim();

    if (!formTitle.trim()) {
      setJobFormError('Job Title is required.');
      return;
    }
    if (!resolvedDept) {
      setJobFormError('Department is required.');
      return;
    }
    if (!formLocation.trim()) {
      setJobFormError('Location is required.');
      return;
    }
    if (!formDescription.trim()) {
      setJobFormError('Role overview / description is required.');
      return;
    }

    setIsSubmittingJob(true);

    try {
      const payload = {
        id: editingJobId,
        title: formTitle.trim(),
        department: resolvedDept,
        location: formLocation.trim(),
        type: formType.trim(),
        experience: formExperience.trim(),
        tags: formTags,
        description: formDescription.trim(),
        responsibilities: formResponsibilities,
        qualifications: formQualifications,
        isActive: formIsActive,
      };

      const method = editingJobId ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/jobs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save job.');
      }

      showToast(
        editingJobId
          ? `Job "${data.job.title}" updated successfully!`
          : `Job "${data.job.title}" posted successfully!`
      );
      setIsModalOpen(false);
      fetchJobs();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving job.';
      setJobFormError(msg);
    } finally {
      setIsSubmittingJob(false);
    }
  };

  // Delete job
  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: jobToDelete.id }),
      });

      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j.id !== jobToDelete.id));
        showToast(`Job "${jobToDelete.title}" deleted successfully.`);
        setJobToDelete(null);
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to delete job.', 'error');
      }
    } catch {
      showToast('Network error while deleting job.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === 'active') return job.isActive !== false;
    if (statusFilter === 'inactive') return job.isActive === false;
    return true;
  });

  const activeJobsCount = jobs.filter((j) => j.isActive !== false).length;
  const inactiveJobsCount = jobs.filter((j) => j.isActive === false).length;

  // 1. Loading Initial State
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ina-tint-15 to-ina-tint-8 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-ina-line shadow-xl flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-ina-blue animate-spin" />
          <p className="text-sm font-semibold text-ina-navy">Loading Ina Admin Portal...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-ina-tint-15 to-ina-tint-8 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 blueprint-dots opacity-40 pointer-events-none" />
        <ArchitecturalLineworkBackground theme="light" opacity={0.25} mask="fade-edges" />

        <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ina-blue/10 border border-ina-blue/20 text-ina-blue text-xs font-semibold tracking-wide mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Ina TechFM Admin Portal</span>
            </div>
            <h1 className="text-3xl font-normal text-ina-navy tracking-tight">Admin Sign In</h1>
            <p className="mt-2 text-sm text-ina-grey">
              Manage career postings and operations for Ina TechFM
            </p>
          </div>

          {/* Login Card */}
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-ina-line/90 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ina-blue to-ina-navy" />

            {loginError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm animate-in fade-in">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <span className="font-medium">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold tracking-wide text-ina-navy uppercase mb-2">
                  Admin Email
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ina-grey">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    placeholder="admin@inatechfm.com"
                    className="block w-full pl-10 pr-4 py-3 bg-ina-tint-4/60 border border-ina-line rounded-xl text-ina-navy text-sm placeholder:text-ina-grey/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide text-ina-navy uppercase mb-2">
                  Password
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ina-grey">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="block w-full pl-10 pr-11 py-3 bg-ina-tint-4/60 border border-ina-line rounded-xl text-ina-navy text-sm placeholder:text-ina-grey/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-ina-grey hover:text-ina-navy transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full mt-2 bg-ina-blue-deep hover:bg-ina-navy text-white py-3.5 px-4 rounded-xl font-semibold text-sm tracking-wide shadow-lg shadow-ina-blue/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Assistant */}
            <div className="mt-6 pt-5 border-t border-ina-tint-8 text-center">
              <p className="text-xs text-ina-grey mb-2">Default configured administrator account:</p>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ina-tint-8 hover:bg-ina-tint-15 border border-ina-line text-xs font-semibold text-ina-navy transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-ina-blue" />
                <span>Auto-fill Credentials</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-ina-grey hover:text-ina-blue transition-colors"
            >
              ← Back to Ina TechFM Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-ina-tint-15 via-ina-tint-8 to-white font-sans text-ina-navy">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl border animate-in slide-in-from-top-3 ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span className="text-sm font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-ina-line shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-ina-navy">
                  Ina <span className="text-ina-blue">TechFM</span>
                </span>
              </Link>
              <div className="h-5 w-px bg-ina-line hidden sm:block" />
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-ina-blue/10 border border-ina-blue/20 text-ina-blue text-xs font-semibold">
                Admin Panel
              </span>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="hidden md:inline-block text-xs font-medium text-ina-grey">
                Signed in as: <strong className="text-ina-navy">{adminUser?.email}</strong>
              </span>

              <Link
                href="/careers"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ina-tint-8 hover:bg-ina-tint-15 border border-ina-line text-xs font-semibold text-ina-navy transition-all"
              >
                <span>View Careers Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-ina-blue" />
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 border border-ina-line hover:border-red-200 text-xs font-semibold text-red-600 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Page Title & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ina-blue/10 text-ina-blue text-xs font-semibold mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Opportunities Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-normal text-ina-navy">Job Postings Manager</h1>
            <p className="text-sm text-ina-grey mt-1">
              Create, edit, toggle active status, and remove job openings displayed on the Careers page.
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center justify-center gap-2 bg-ina-blue-deep hover:bg-ina-navy text-white px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide shadow-lg shadow-ina-blue/20 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job Opening</span>
          </button>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-ina-line shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ina-grey uppercase tracking-wider">
                Total Job Postings
              </p>
              <p className="text-2xl font-bold text-ina-navy mt-1">{jobs.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-ina-tint-8 border border-ina-line flex items-center justify-center text-ina-blue">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-ina-line shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ina-grey uppercase tracking-wider">
                Live on Careers
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-emerald-700">{activeJobsCount}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  Active
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-ina-line shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-ina-grey uppercase tracking-wider">
                Drafts / Hidden
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-amber-700">{inactiveJobsCount}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  Inactive
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-ina-line shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ina-grey" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, department, or tags..."
              className="w-full pl-10 pr-4 py-2 bg-ina-tint-4/60 border border-ina-line rounded-xl text-sm text-ina-navy placeholder:text-ina-grey/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="inline-flex rounded-xl p-1 bg-ina-tint-4 border border-ina-line text-xs font-semibold">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-white text-ina-navy shadow-xs font-bold'
                    : 'text-ina-grey hover:text-ina-navy'
                }`}
              >
                All ({jobs.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'active'
                    ? 'bg-white text-emerald-700 shadow-xs font-bold'
                    : 'text-ina-grey hover:text-ina-navy'
                }`}
              >
                Active ({activeJobsCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('inactive')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  statusFilter === 'inactive'
                    ? 'bg-white text-amber-700 shadow-xs font-bold'
                    : 'text-ina-grey hover:text-ina-navy'
                }`}
              >
                Inactive ({inactiveJobsCount})
              </button>
            </div>

            <button
              onClick={fetchJobs}
              disabled={isLoadingJobs}
              className="p-2 rounded-xl border border-ina-line bg-white hover:bg-ina-tint-8 text-ina-grey hover:text-ina-navy transition-colors cursor-pointer"
              title="Refresh job list"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingJobs ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Jobs List */}
        {isLoadingJobs && jobs.length === 0 ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-ina-blue animate-spin mx-auto mb-3" />
            <p className="text-sm font-medium text-ina-grey">Fetching job postings...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-ina-line shadow-xs max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-ina-tint-8 border border-ina-line flex items-center justify-center mx-auto mb-4 text-ina-grey">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-ina-navy mb-1">No job postings found</h3>
            <p className="text-sm text-ina-grey mb-6">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search criteria or filter status.'
                : 'Get started by creating your first job opening to display on the Careers page.'}
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 bg-ina-blue hover:bg-ina-blue-deep text-white px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post a New Job</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const isActive = job.isActive !== false;
              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-ina-line shadow-xs hover:border-ina-blue/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Job Details Left */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-ina-navy">{job.title}</h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        {isActive ? 'Active on Careers' : 'Inactive (Draft)'}
                      </span>
                    </div>

                    {/* Metadata chips */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-ina-grey font-medium">
                      <span className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-ina-blue" />
                        {job.department}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-ina-line" />
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-ina-blue" />
                        {job.location}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-ina-line" />
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-ina-blue" />
                        {job.type}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-ina-line" />
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-ina-blue" />
                        {job.experience}
                      </span>
                    </div>

                    {/* Description snippet */}
                    <p className="text-xs sm:text-sm text-ina-grey line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md bg-ina-tint-4 border border-ina-line text-[11px] font-medium text-ina-navy"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-ina-tint-8">
                    {/* Toggle Active Switch */}
                    <button
                      type="button"
                      onClick={() => handleToggleActive(job)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                          : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                      title={isActive ? 'Click to deactivate' : 'Click to activate'}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? 'bg-emerald-600' : 'bg-slate-400'
                        }`}
                      />
                      <span>{isActive ? 'Published (Live)' : 'Unpublished (Draft)'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditModal(job)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ina-tint-8 hover:bg-ina-tint-15 border border-ina-line text-xs font-semibold text-ina-navy transition-all cursor-pointer"
                        title="Edit job opening"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-ina-blue" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setJobToDelete(job)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-red-50 border border-ina-line hover:border-red-200 text-xs font-semibold text-red-600 transition-all cursor-pointer"
                        title="Delete job opening"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* CREATE / EDIT JOB MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ina-night/60 backdrop-blur-md overflow-y-auto animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isSubmittingJob) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-ina-line p-6 sm:p-8 my-auto">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ina-blue to-ina-navy" />

            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-ina-tint-8 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-ina-blue/10 px-3 py-1 text-xs font-semibold text-ina-blue mb-1.5">
                  <Briefcase className="w-3 h-3" />
                  <span>{editingJobId ? 'Edit Job Opening' : 'New Career Posting'}</span>
                </div>
                <h2 className="text-2xl font-normal text-ina-navy">
                  {editingJobId ? `Edit: ${formTitle || 'Job Opening'}` : 'Post a New Job'}
                </h2>
                <p className="text-xs text-ina-grey mt-0.5">
                  This form directly controls the details shown to candidates on the Careers page.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmittingJob}
                className="p-2 rounded-full text-ina-grey hover:text-ina-navy hover:bg-ina-tint-8 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {jobFormError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm animate-in fade-in">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <span>{jobFormError}</span>
              </div>
            )}

            <form onSubmit={handleSaveJob} className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-xs font-semibold tracking-wide text-ina-navy uppercase mb-1.5">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Key Account Manager, Senior HVAC Engineer"
                  required
                  className="w-full px-4 py-2.5 bg-ina-tint-4/60 border border-ina-line rounded-xl text-sm text-ina-navy placeholder:text-ina-grey/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all"
                />
              </div>

              {/* Department & Location (Row) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wide text-ina-navy uppercase mb-1.5">
                    Department *
                  </label>
                  <select
                    value={formDepartment}
                    onChange={(e) => setFormDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 bg-ina-tint-4/60 border border-ina-line rounded-xl text-sm text-ina-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all"
                  >
                    {PREDEFINED_DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>

                  {formDepartment === 'Custom' && (
                    <input
                      type="text"
                      value={customDepartment}
                      onChange={(e) => setCustomDepartment(e.target.value)}
                      placeholder="Enter custom department name"
                      className="mt-2 w-full px-4 py-2 bg-ina-tint-4/60 border border-ina-line rounded-xl text-sm text-ina-navy placeholder:text-ina-grey/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wide text-ina-navy uppercase mb-1.5">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Mumbai, Maharashtra or Goa"
                    required
                    className="w-full px-4 py-2.5 bg-ina-tint-4/60 border border-ina-line rounded-xl text-sm text-ina-navy placeholder:text-ina-grey/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all"
                  />
                </div>
              </div>

              {/* Employment Type & Experience (Row) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wide text-ina-navy uppercase mb-1.5">
                    Employment Type *
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-ina-tint-4/60 border border-ina-line rounded-xl text-sm text-ina-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all"
                  >
                    {PREDEFINED_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wide text-ina-navy uppercase mb-1.5">
                    Experience Required *
                  </label>
                  <input
                    type="text"
                    value={formExperience}
                    onChange={(e) => setFormExperience(e.target.value)}
                    placeholder="e.g. 3+ Years, 5–10 Years"
                    required
                    className="w-full px-4 py-2.5 bg-ina-tint-4/60 border border-ina-line rounded-xl text-sm text-ina-navy placeholder:text-ina-grey/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold tracking-wide text-ina-navy uppercase mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="e.g. Operations, On-site, Full-Time, Engineering Services"
                  className="w-full px-4 py-2.5 bg-ina-tint-4/60 border border-ina-line rounded-xl text-sm text-ina-navy placeholder:text-ina-grey/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all"
                />
                <p className="text-[11px] text-ina-grey mt-1">
                  Separate tags with commas. These appear as chips on the job listing card.
                </p>
              </div>

              {/* Role Overview / Description */}
              <div>
                <label className="block text-xs font-semibold tracking-wide text-ina-navy uppercase mb-1.5">
                  Role Overview / Description *
                </label>
                <textarea
                  rows={4}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  required
                  placeholder="Provide an overview of the role, team responsibilities, and overall mission at Ina TechFM..."
                  className="w-full px-4 py-3 bg-ina-tint-4/60 border border-ina-line rounded-xl text-sm text-ina-navy placeholder:text-ina-grey/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all resize-y"
                />
              </div>

              {/* Key Responsibilities */}
              <div>
                <label className="block text-xs font-semibold tracking-wide text-ina-navy uppercase mb-1.5">
                  Key Responsibilities (One per line)
                </label>
                <textarea
                  rows={5}
                  value={formResponsibilities}
                  onChange={(e) => setFormResponsibilities(e.target.value)}
                  placeholder="Lead daily operations and preventive maintenance&#10;Manage and guide site technicians&#10;Conduct routine audits and statutory compliance"
                  className="w-full px-4 py-3 bg-ina-tint-4/60 border border-ina-line rounded-xl text-sm text-ina-navy placeholder:text-ina-grey/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all font-sans resize-y"
                />
                <p className="text-[11px] text-ina-grey mt-1">
                  Each line will be displayed as a distinct bullet point under &quot;Key responsibilities&quot;.
                </p>
              </div>

              {/* Qualifications & Requirements */}
              <div>
                <label className="block text-xs font-semibold tracking-wide text-ina-navy uppercase mb-1.5">
                  Qualifications & Requirements (One per line)
                </label>
                <textarea
                  rows={5}
                  value={formQualifications}
                  onChange={(e) => setFormQualifications(e.target.value)}
                  placeholder="Diploma or Degree in Mechanical / Electrical Engineering&#10;3+ years of experience in technical FM&#10;Strong troubleshooting and communication skills"
                  className="w-full px-4 py-3 bg-ina-tint-4/60 border border-ina-line rounded-xl text-sm text-ina-navy placeholder:text-ina-grey/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ina-blue/30 focus:border-ina-blue transition-all font-sans resize-y"
                />
                <p className="text-[11px] text-ina-grey mt-1">
                  Each line will be displayed as a distinct bullet point under &quot;Qualifications & requirements&quot;.
                </p>
              </div>

              {/* Status Checkbox */}
              <div className="p-4 rounded-xl bg-ina-tint-4 border border-ina-line flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-ina-navy">Live Status</p>
                  <p className="text-xs text-ina-grey">
                    {formIsActive
                      ? 'This job will be published and immediately visible to candidates on /careers'
                      : 'This job will be saved as a draft and hidden from candidates'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-ina-tint-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmittingJob}
                  className="px-5 py-2.5 rounded-xl border border-ina-line text-xs font-semibold text-ina-grey hover:text-ina-navy hover:bg-ina-tint-8 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingJob}
                  className="inline-flex items-center gap-2 bg-ina-blue-deep hover:bg-ina-navy text-white px-7 py-2.5 rounded-xl font-semibold text-xs tracking-wide shadow-md hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmittingJob ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingJobId ? 'Update Job Posting' : 'Publish Job'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {jobToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ina-night/60 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-ina-line shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-ina-navy text-center mb-2">Delete Job Opening?</h3>
            <p className="text-xs sm:text-sm text-ina-grey text-center leading-relaxed mb-6">
              Are you sure you want to delete <strong className="text-ina-navy">&quot;{jobToDelete.title}&quot;</strong>? This action will immediately remove it from the Careers page and cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setJobToDelete(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-xl border border-ina-line text-xs font-semibold text-ina-grey hover:text-ina-navy transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide shadow-md transition-all cursor-pointer disabled:opacity-70"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

