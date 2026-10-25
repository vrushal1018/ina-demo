'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface LazySectionProps {
  children: React.ReactNode;
  minHeight?: string | number;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  id?: string;
  fallback?: React.ReactNode;
  lazy?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  amount?: number;
  once?: boolean;
}

export function SectionSkeleton({
  height = '300px',
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
      <div className="w-full h-full min-h-[220px] rounded-3xl bg-slate-50/80 border border-slate-100 p-8 flex flex-col items-center justify-center">
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

export default function LazySection({
  children,
  minHeight,
  rootMargin = '400px 0px',
  threshold = 0,
  className = '',
  id,
  fallback,
  lazy = false,
}: LazySectionProps) {
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy || isLoaded) return;

    if (typeof window !== 'undefined' && id && window.location.hash === `#${id}`) {
      const timer = setTimeout(() => setIsLoaded(true), 0);
      return () => clearTimeout(timer);
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      const timer = setTimeout(() => setIsLoaded(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && (entry.isIntersecting || entry.intersectionRatio > 0)) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    // Safety fallback
    const safetyTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);

    const handlePrint = () => setIsLoaded(true);
    window.addEventListener('beforeprint', handlePrint);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
      window.removeEventListener('beforeprint', handlePrint);
    };
  }, [lazy, isLoaded, rootMargin, threshold, id]);

  if (!isLoaded) {
    return (
      <div
        ref={containerRef}
        id={id}
        style={{ minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }}
        className={`w-full bg-white ${className}`}
      >
        {fallback || (minHeight ? <SectionSkeleton height={minHeight} /> : null)}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
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
