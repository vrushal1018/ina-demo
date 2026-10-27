'use client';

import React, { useMemo } from 'react';
import lineworkData from '@/data/lineworkPaths.json';

interface ArchitecturalLineworkBackgroundProps {
  /**
   * Theme mode:
   * - 'light': Refined architectural cyan & slate for white/light-grey whitespace sections
   * - 'dark': Luminous cyan/blue for dark navy sections
   * - 'cyan': Pure corporate #2495D3 palette
   */
  theme?: 'dark' | 'light' | 'cyan';
  /** Base opacity multiplier for the background (0.05 to 1.0) */
  opacity?: number;
  /** Whether to render subtle luminous technical pen beacons gliding along key paths */
  showBeacons?: boolean;
  /** Soft edge blending to seamlessly blend into surrounding whitespace */
  mask?: 'fade-edges' | 'fade-top' | 'fade-bottom' | 'fade-sides' | 'none';
  /** Flip vertically to create visual variety between consecutive sections */
  flipY?: boolean;
  /** Flip horizontally to create visual variety between consecutive sections */
  flipX?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** View aspect ratio behavior: 'slice' (cover full width/height) or 'meet' (contain) */
  aspectRatio?: 'slice' | 'meet';
}

export default function ArchitecturalLineworkBackground({
  theme = 'light',
  opacity,
  showBeacons = false,
  mask = 'fade-edges',
  flipY = false,
  flipX = false,
  className = '',
  style,
  aspectRatio = 'slice',
}: ArchitecturalLineworkBackgroundProps) {
  // Lighter, delicate opacity tailored for a subtle, high-end architectural presence
  const resolvedOpacity =
    opacity !== undefined ? opacity : theme === 'dark' ? 0.28 : 0.18;

  // 4 Rhythmic Phase Groups for continuous seamless drawing loop
  // Each dash + gap cycle = 500 units, seamlessly repeating 5x along the 2500 offset animation
  const groupSettings = useMemo(() => [
    {
      groupClass: 'arch-group-lead',
      dashArray: '320 180',
      duration: '10s',
      delay: '0s',
      strokeWidth: theme === 'light' ? 0.9 : 1.0,
      baseOpacity: 0.65,
    },
    {
      groupClass: 'arch-group-contour',
      dashArray: '260 240',
      duration: '13s',
      delay: '-3s',
      strokeWidth: theme === 'light' ? 0.8 : 0.9,
      baseOpacity: 0.55,
    },
    {
      groupClass: 'arch-group-horizon',
      dashArray: '360 140',
      duration: '15s',
      delay: '-6s',
      strokeWidth: theme === 'light' ? 0.7 : 0.8,
      baseOpacity: 0.45,
    },
    {
      groupClass: 'arch-group-depth',
      dashArray: '220 280',
      duration: '18s',
      delay: '-9s',
      strokeWidth: theme === 'light' ? 0.6 : 0.7,
      baseOpacity: 0.38,
    },
  ], [theme]);

  // Subtle architectural colors tailored to blend harmoniously without overpowering content
  const getPathColor = (idx: number, originalColor: string) => {
    if (theme === 'cyan') {
      return '#2495D3';
    }
    if (theme === 'light') {
      const palette = [
        'rgba(36, 149, 211, 0.55)', // Brand Cyan #2495D3
        'rgba(72, 143, 205, 0.45)', // Soft Sky Blue #488FCD
        'rgba(56, 189, 248, 0.40)', // Luminous Cyan
        'rgba(30, 122, 178, 0.35)', // Blueprint Slate Blue
      ];
      return palette[idx % palette.length];
    }
    // Dark theme: luminous cyan line
    return originalColor || '#3fb6ff';
  };

  // Mask styles for seamless blending into surrounding whitespace
  const maskStyle = useMemo(() => {
    switch (mask) {
      case 'fade-edges':
        return {
          maskImage:
            'radial-gradient(ellipse 90% 80% at 50% 50%, black 45%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 80% at 50% 50%, black 45%, transparent 100%)',
        };
      case 'fade-top':
        return {
          maskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
        };
      case 'fade-bottom':
        return {
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        };
      case 'fade-sides':
        return {
          maskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        };
      case 'none':
      default:
        return {};
    }
  }, [mask]);

  const preserveAspectRatioSetting =
    aspectRatio === 'slice' ? 'xMidYMid slice' : 'xMidYMid meet';

  // Curate 15 high-impact curves (every 3rd path) instead of 43 heavy overlapping lines
  const renderedPaths = useMemo(() => {
    return lineworkData.paths.filter((_, idx) => idx % 3 === 0);
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 arch-linework-container ${className}`}
      style={{
        opacity: resolvedOpacity,
        ...maskStyle,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        className={`w-full h-full arch-linework-svg ${flipY ? 'scale-y-[-1]' : ''} ${flipX ? 'scale-x-[-1]' : ''}`}
        viewBox={lineworkData.viewBox}
        preserveAspectRatio={preserveAspectRatioSetting}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Authentic Architectural Linework Curves with Active Fluid Flow Animation */}
        <g className="arch-linework-paths">
          {renderedPaths.map((pathItem, idx) => {
            const groupConfig = groupSettings[idx % groupSettings.length];
            const strokeColor = getPathColor(idx, pathItem.color);
            // Alternate between active flowing laser traces and steady architectural contour baselines
            const isAnimated = idx % 2 === 0;

            return (
              <path
                key={pathItem.id}
                id={`arch-curve-${pathItem.id}`}
                d={pathItem.d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={groupConfig.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`arch-path ${isAnimated ? groupConfig.groupClass : 'arch-steady-path'}`}
                style={
                  isAnimated
                    ? {
                        strokeDasharray: groupConfig.dashArray,
                        animationName: 'archLineTrace',
                        animationDuration: groupConfig.duration,
                        animationTimingFunction: 'linear',
                        animationIterationCount: 'infinite',
                        animationDelay: groupConfig.delay,
                        opacity: groupConfig.baseOpacity,
                      }
                    : {
                        opacity: Math.max(0.18, groupConfig.baseOpacity * 0.45),
                        animation: 'none',
                      }
                }
              />
            );
          })}
        </g>
      </svg>

      {/* Scoped CSS for Smooth 60fps Line Flow Animation without Heavy Shader Filters */}
      <style jsx>{`
        /* Continuous seamless architectural line flow */
        @keyframes archLineTrace {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -2500;
          }
        }

        .arch-path {
          vector-effect: non-scaling-stroke;
        }

        .arch-steady-path {
          animation: none !important;
        }

        /* Hardware-accelerated compositing plane & auto-cull offscreen sections */
        .arch-linework-container {
          content-visibility: auto;
          contain-intrinsic-size: 600px;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Mobile optimization: cull extra lines and reduce GPU pressure */
        @media (max-width: 768px) {
          .arch-mobile-hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
