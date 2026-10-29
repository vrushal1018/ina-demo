"use client";

import React, { useEffect, useRef } from "react";

export interface CounterProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  useGrouping?: boolean;
  className?: string;
}

export default function Counter({
  end,
  start = 0,
  duration = 2000,
  prefix = "",
  suffix = "",
  useGrouping = true,
  className = "",
}: CounterProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  const format = (value: number) => {
    const rounded = Math.round(value);
    const formatted = useGrouping
      ? rounded.toLocaleString("en-US")
      : rounded.toString();
    return `${prefix}${formatted}${suffix}`;
  };

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      el.textContent = format(end);
      return;
    }

    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          let startTime: number | null = null;
          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const currentVal = start + (end - start) * easedProgress;

            if (el) {
              el.textContent = format(currentVal);
            }

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            } else {
              if (el) {
                el.textContent = format(end);
              }
            }
          };

          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, start, duration, prefix, suffix, useGrouping]);

  return (
    <span ref={countRef} className={className}>
      {format(start)}
    </span>
  );
}

