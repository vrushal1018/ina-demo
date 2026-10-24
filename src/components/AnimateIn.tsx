'use client';

import React from 'react';

export interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  lazy?: boolean;
  minHeight?: string | number;
  rootMargin?: string;
  threshold?: number;
  fallback?: React.ReactNode;
  id?: string;
  amount?: number;
  once?: boolean;
}

export function SectionSkeleton({
  height = '280px',
  className = '',
}: {
  height?: string | number;
  className?: string;
}) {
  return (
    <div
      style={{ minHeight: typeof height === 'number' ? `${height}px` : height }}
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center justify-center bg-white ${className}`}
    >
      <div className="w-full h-full min-h-[200px] rounded-3xl bg-slate-50/80 border border-slate-100 p-8 flex flex-col items-center justify-center">
        <div className="h-4 w-32 bg-slate-200/70 rounded-full mb-4" />
        <div className="h-8 w-64 max-w-full bg-slate-200/60 rounded-xl mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl opacity-70">
          <div className="h-28 bg-slate-200/50 rounded-2xl" />
          <div className="h-28 bg-slate-200/50 rounded-2xl hidden sm:block" />
          <div className="h-28 bg-slate-200/50 rounded-2xl hidden sm:block" />
        </div>
      </div>
    </div>
  );
}

export default function AnimateIn({
  children,
  className = '',
  minHeight,
  id,
}: AnimateInProps) {
  return (
    <div
      id={id}
      style={{
        minHeight: minHeight ? (typeof minHeight === 'number' ? `${minHeight}px` : minHeight) : undefined,
      }}
      className={`w-full ${className}`}
    >
      {children}
    </div>
  );
}
