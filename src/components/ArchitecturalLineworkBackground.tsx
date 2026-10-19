'use client';

import React, { useId } from 'react';
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
  showBeacons = true,
  mask = 'fade-edges',
  flipY = false,
  className = '',
  style,
  aspectRatio = 'slice',
}: ArchitecturalLineworkBackgroundProps) {
  const uniqueId = useId().replace(/:/g, '');

  // Default opacity tailored for pristine legibility and luxury feel
  const resolvedOpacity =
    opacity !== undefined ? opacity : theme === 'dark' ? 0.6 : 0.35;

  // 4 Rhythmic Phase Groups for continuous seamless loop without visual gaps
  // Mathematical period = 2500 units (exact match to curve arc length)
  const groupSettings = [
    {
      groupClass: 'arch-group-lead',
      dashArray: '1400 1100',
      duration: '18s',
      delay: '0s',
      strokeWidth: theme === 'light' ? 0.85 : 0.95,
      baseOpacity: theme === 'light' ? 0.75 : 0.85,
    },
    {
      groupClass: 'arch-group-contour',
      dashArray: '1200 1300',
      duration: '20s',
      delay: '-5s',
      strokeWidth: theme === 'light' ? 0.75 : 0.85,
      baseOpacity: theme === 'light' ? 0.62 : 0.72,
    },
    {
      groupClass: 'arch-group-horizon',
      dashArray: '1600 900',
      duration: '22s',
      delay: '-10s',
      strokeWidth: theme === 'light' ? 0.65 : 0.75,
      baseOpacity: theme === 'light' ? 0.52 : 0.6,
    },
    {
      groupClass: 'arch-group-depth',
      dashArray: '1000 1500',
      duration: '25s',
      delay: '-15s',
      strokeWidth: theme === 'light' ? 0.55 : 0.65,
      baseOpacity: theme === 'light' ? 0.42 : 0.48,
    },
  ];

  // Colors tailored to seamlessly blend with INA TechFM's corporate palette
  const getPathColor = (idx: number, originalColor: string) => {
    if (theme === 'cyan') {
      return '#2495D3';
    }
    if (theme === 'light') {
      // Architectural blueprint inks on white paper:
      // alternating subtle cyan, soft steel blue, and light indigo
      const palette = [
        'rgba(36, 149, 211, 0.65)',
        'rgba(72, 143, 205, 0.5)',
        'rgba(28, 58, 98, 0.42)',
        'rgba(36, 149, 211, 0.35)',
      ];
      return palette[idx % palette.length];
    }
    // Dark theme: use original vibrant cyan spectrum from PDF
    return originalColor || '#2495D3';
  };

  // Mask styles for seamless blending into surrounding whitespace
  const getMaskStyle = () => {
    switch (mask) {
      case 'fade-edges':
        return {
          maskImage:
            'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)',
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
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        };
      case 'none':
      default:
        return {};
    }
  };

  const preserveAspectRatioSetting =
    aspectRatio === 'slice' ? 'xMidYMid slice' : 'xMidYMid meet';

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 transition-opacity duration-700 ${className}`}
      style={{
        opacity: resolvedOpacity,
        ...getMaskStyle(),
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        className={`w-full h-full arch-linework-svg ${
          flipY ? 'scale-y-[-1]' : ''
        }`}
        viewBox={lineworkData.viewBox}
        preserveAspectRatio={preserveAspectRatioSetting}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle glow filter for technical drafting pen feel */}
          <filter
            id={`arch-glow-${uniqueId}`}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation={theme === 'dark' ? '1.5' : '0.8'} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Technical drafting pen beacon gradient */}
          <radialGradient id={`beacon-grad-${uniqueId}`}>
            <stop
              offset="0%"
              stopColor={theme === 'light' ? '#2495D3' : '#ffffff'}
              stopOpacity="1"
            />
            <stop
              offset="40%"
              stopColor="#2495D3"
              stopOpacity={theme === 'light' ? '0.7' : '0.8'}
            />
            <stop offset="100%" stopColor="#2495D3" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 43 Authentic Architectural Linework Curves from lineworkina.pdf */}
        <g
          className="arch-linework-paths"
          filter={theme === 'dark' ? `url(#arch-glow-${uniqueId})` : undefined}
        >
          {lineworkData.paths.map((pathItem, idx) => {
            const groupConfig = groupSettings[idx % groupSettings.length];
            const strokeColor = getPathColor(idx, pathItem.color);
            // Hide alternate lines on mobile viewports for clean, lightweight rendering
            const isMobileHidden = idx % 2 === 1;

            return (
              <path
                key={pathItem.id}
                id={`arch-curve-${uniqueId}-${pathItem.id}`}
                d={pathItem.d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={groupConfig.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`arch-path ${groupConfig.groupClass} ${
                  isMobileHidden ? 'arch-mobile-hidden' : ''
                }`}
                style={{
                  strokeDasharray: groupConfig.dashArray,
                  animationDuration: groupConfig.duration,
                  animationDelay: groupConfig.delay,
                  opacity: groupConfig.baseOpacity,
                }}
              />
            );
          })}
        </g>

        {/* Luminous Technical Pen Beacons - Gliding along primary structural guide curves */}
        {showBeacons && (
          <g className="arch-beacons">
            {/* Primary Beacon on Main Guide Curve #0 */}
            <circle
              r={theme === 'light' ? '3.5' : '4.5'}
              fill={`url(#beacon-grad-${uniqueId})`}
              className="arch-beacon-lead"
            >
              <animateMotion
                dur="18s"
                repeatCount="indefinite"
                rotate="auto"
                path={lineworkData.paths[0].d}
              />
            </circle>

            {/* Secondary Harmonic Beacon on Curve #14 */}
            <circle
              r={theme === 'light' ? '2.8' : '3.5'}
              fill={`url(#beacon-grad-${uniqueId})`}
              className="arch-beacon-mid"
            >
              <animateMotion
                dur="22s"
                begin="-9s"
                repeatCount="indefinite"
                rotate="auto"
                path={lineworkData.paths[14]?.d || lineworkData.paths[0].d}
              />
            </circle>

            {/* Tertiary Horizon Beacon on Curve #28 */}
            <circle
              r={theme === 'light' ? '2.2' : '3'}
              fill={`url(#beacon-grad-${uniqueId})`}
              className="arch-beacon-echo"
            >
              <animateMotion
                dur="25s"
                begin="-15s"
                repeatCount="indefinite"
                rotate="auto"
                path={lineworkData.paths[28]?.d || lineworkData.paths[0].d}
              />
            </circle>
          </g>
        )}
      </svg>

      {/* Scoped CSS for Deterministic 60fps Hardware-Accelerated Animation */}
      <style jsx>{`
        /* Continuous Architectural Line-Reveal Animation (100% Mathematically Seamless) */
        @keyframes archLineTrace {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -2500;
          }
        }

        .arch-path {
          animation-name: archLineTrace;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: stroke-dashoffset;
          vector-effect: non-scaling-stroke;
        }

        /* Responsive Performance Optimization on Mobile */
        @media (max-width: 768px) {
          .arch-mobile-hidden {
            display: none;
          }
        }

        /* Accessibility: Static Architectural Linework Fallback for Reduced-Motion */
        @media (prefers-reduced-motion: reduce) {
          .arch-path {
            animation: none !important;
            stroke-dasharray: none !important;
            stroke-dashoffset: 0 !important;
            opacity: 0.45 !important;
          }
          .arch-beacons {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
