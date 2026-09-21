'use client';

import React, { useEffect, useRef, useState, useId } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface NodeItem {
  id?: string;
  num?: string;
  title: string;
  subtitle?: string;
  category?: string;
  description?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  href?: string;
  badge?: string;
  color?: string;
  onClick?: () => void;
}

export interface CenterFlowProps {
  nodeItems?: NodeItem[];
  centerContent?: React.ReactNode;
  centerSize?: number;
  nodeSize?: number;
  borderRadius?: number;
  nodeDistance?: number; // 0.1 to 1.0 (relative radius)
  lineWidth?: number;
  pulseWidth?: number;
  pulseDuration?: number; // seconds
  pulseInterval?: number; // seconds between pulses
  pulseLength?: number; // 0.1 to 0.8 (fraction of path)
  pulseSoftness?: number; // blur radius
  lineColor?: string;
  lineColorLight?: string;
  pulseColor?: string;
  pulseColorLight?: string;
  glowColor?: string;
  glowColorLight?: string;
  maxGlowIntensity?: number;
  glowDecay?: number;
  disableBlinking?: boolean;
  className?: string;
  containerHeight?: number;
}

export function CenterFlow({
  nodeItems = [],
  centerContent,
  centerSize = 144,
  nodeSize = 80,
  borderRadius = 36,
  nodeDistance = 0.95,
  lineWidth = 2,
  pulseWidth = 2.5,
  pulseDuration = 3.6,
  pulseInterval = 2.5,
  pulseLength = 0.32,
  pulseSoftness = 7,
  lineColor = 'rgba(217, 119, 6, 0.28)',
  lineColorLight = 'rgba(217, 119, 6, 0.28)',
  pulseColor = '#d97706',
  pulseColorLight = '#d97706',
  glowColor = '#d97706',
  glowColorLight = '#d97706',
  maxGlowIntensity = 25,
  glowDecay = 0.95,
  disableBlinking = false,
  className = '',
  containerHeight = 720,
}: CenterFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: containerHeight });
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [pulseTime, setPulseTime] = useState(0);
  const filterId = useId().replace(/:/g, '_');

  // Track container dimensions on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(320, rect.width),
          height: Math.max(520, rect.height || containerHeight),
        });
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateSize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, [containerHeight]);

  // Request animation frame loop for flowing pulse positions
  useEffect(() => {
    let animId: number;
    let start: number | null = null;

    const loop = (time: number) => {
      if (!start) start = time;
      const elapsed = (time - start) / 1000;
      setPulseTime(elapsed);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const { width, height } = dimensions;
  const isMobile = width < 768; // Cleanly switch layout on mobile screens
  const centerX = width / 2;
  const centerY = height / 2;

  // Desktop Radial Math:
  // Reserve margin for node card dimensions (width ~260px, height ~90px)
  const marginX = 180;
  const marginY = 110;
  const maxRadiusX = Math.max(220, (width / 2) - marginX);
  const maxRadiusY = Math.max(200, (height / 2) - marginY);

  const actualRadiusX = maxRadiusX * nodeDistance;
  const actualRadiusY = maxRadiusY * nodeDistance;

  const totalNodes = nodeItems.length;

  // Calculate coordinates & smooth organic bezier paths for each node in desktop mode
  const nodesData = nodeItems.map((item, index) => {
    const angle = (index / totalNodes) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + actualRadiusX * Math.cos(angle);
    const y = centerY + actualRadiusY * Math.sin(angle);

    const curveAmp = Math.sin(index * 1.8) * 26;
    const cp1X = centerX + (x - centerX) * 0.45 - curveAmp * Math.sin(angle);
    const cp1Y = centerY + (y - centerY) * 0.45 + curveAmp * Math.cos(angle);
    const cp2X = centerX + (x - centerX) * 0.75;
    const cp2Y = centerY + (y - centerY) * 0.75;

    const pathD = `M ${centerX} ${centerY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${x} ${y}`;

    return {
      item,
      index,
      x,
      y,
      angle,
      pathD,
    };
  });

  // ════════════════════════════════════════════════════════════
  // MOBILE SCREEN PRESENTATION (Width < 768px):
  // Clean Connected Pipeline - Zero Overlap, Perfect Touch UX
  // ════════════════════════════════════════════════════════════
  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden select-none py-8 px-4 sm:px-6 ${className}`}
      >
        {/* Background blueprint subtle ambient grid & radial glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at center 30%, ${glowColor}25 0%, transparent 75%)`,
          }}
        />

        {/* Mobile Hub Header */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center mb-8">
          <div className="relative group">
            {/* Outer glowing pulsing halo */}
            <div
              className="absolute inset-0 rounded-2xl -z-10 animate-pulse"
              style={{
                background: `radial-gradient(circle, ${glowColor}40 0%, transparent 75%)`,
                filter: 'blur(16px)',
                transform: 'scale(1.2)',
              }}
            />

            {/* Hub Card */}
            <div className="px-6 py-4 rounded-2xl bg-[#181D26] border-2 border-[var(--accent)] shadow-xl flex flex-col items-center justify-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-ping mb-0.5" />
              <div className="font-mono text-[10px] font-extrabold tracking-widest uppercase text-[var(--accent)]">
                Integrated
              </div>
              <div className="font-heading font-black text-xl text-white tracking-tight leading-tight">
                Services
              </div>
              <div className="text-[10px] text-[var(--accent)] bg-black/40 px-2.5 py-0.5 rounded-full border border-[var(--accent)]/30 font-mono mt-0.5">
                5 Disciplines
              </div>
            </div>
          </div>

          <p className="text-xs text-[var(--text-secondary)] mt-3 font-mono">
            Tap any service to inspect drawings & deliverables
          </p>
        </div>

        {/* Mobile Connected Service Cards List */}
        <div className="relative z-20 max-w-md mx-auto space-y-3">
          {/* Animated central connection spine (decorative left border line) */}
          <div className="relative pl-6 sm:pl-7 border-l-2 border-[var(--accent)]/40 ml-3 sm:ml-4 space-y-3">
            {nodeItems.map((item, index) => {
              const isHovered = hoveredNode === index;
              const NodeWrapper = item.href ? Link : 'div';
              const wrapperProps = item.href ? { href: item.href } : {};

              return (
                <div
                  key={item.id || item.title || index}
                  className="relative group"
                  onMouseEnter={() => setHoveredNode(index)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Glowing Node Joint on spine */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[35px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isHovered
                        ? 'bg-[var(--accent)] border-white shadow-lg shadow-[var(--accent)]/50 scale-125'
                        : 'bg-white border-[var(--accent)]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  </div>

                  {/* Service Card */}
                  <NodeWrapper
                    {...(wrapperProps as any)}
                    onClick={item.onClick}
                    className={`block w-full p-4 rounded-2xl transition-all duration-200 border cursor-pointer active:scale-[0.98] ${
                      isHovered
                        ? 'bg-white dark:bg-slate-900 border-2 border-amber-500 shadow-xl shadow-amber-500/20'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:border-amber-500'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Icon */}
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isHovered
                            ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60'
                        }`}
                      >
                        {item.icon ? (
                          item.icon
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-current" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-2">
                          {item.num && (
                            <span className="font-mono text-xs font-bold text-slate-950 bg-amber-400 px-2 py-0.5 rounded-md shrink-0 shadow-xs">
                              {item.num}
                            </span>
                          )}
                          <h4 className="font-heading font-extrabold text-[15px] text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight truncate">
                            {item.title}
                          </h4>
                        </div>
                        {item.subtitle && (
                          <p className="text-xs font-sans font-medium text-slate-600 dark:text-slate-300 mt-1 leading-normal line-clamp-1">
                            {item.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Action Arrow */}
                      <div className="shrink-0 text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform pl-1">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </NodeWrapper>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════
  // DESKTOP / TABLET PRESENTATION (Width >= 768px):
  // Full 360° Radial Circular Flow with Bezier Pulses
  // ════════════════════════════════════════════════════════════
  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{ height: `${containerHeight}px`, minHeight: '680px' }}
    >
      {/* Background blueprint subtle ambient grid & radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${glowColor}25 0%, transparent 70%)`,
        }}
      />

      {/* SVG Connecting Flow Lines & Animated Pulses */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id={`pulseGlow-${filterId}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation={pulseSoftness} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient for center aura */}
          <radialGradient id={`centerAura-${filterId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0.45" />
            <stop offset="60%" stopColor={glowColor} stopOpacity="0.12" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient center aura disk */}
        <circle
          cx={centerX}
          cy={centerY}
          r={centerSize * 1.3}
          fill={`url(#centerAura-${filterId})`}
        />

        {/* Base Branch Lines */}
        {nodesData.map(({ index, pathD }) => {
          const isHovered = hoveredNode === index;
          return (
            <g key={`base-${index}`}>
              {/* Outer faint glow on hover */}
              {isHovered && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={pulseColor}
                  strokeWidth={lineWidth + 5}
                  strokeOpacity="0.45"
                  strokeLinecap="round"
                  filter={`url(#pulseGlow-${filterId})`}
                />
              )}
              {/* Base line */}
              <path
                d={pathD}
                fill="none"
                stroke={isHovered ? pulseColor : lineColor}
                strokeWidth={isHovered ? lineWidth + 1.5 : lineWidth}
                strokeOpacity={isHovered ? 1 : 0.65}
                strokeLinecap="round"
                className="transition-colors duration-300"
              />
            </g>
          );
        })}

        {/* Flowing Energy Pulses (Animated along SVG paths) */}
        {nodesData.map(({ index, pathD }) => {
          const phaseOffset = (index * 0.72) % pulseDuration;
          const cycleTime = (pulseTime + phaseOffset) % pulseDuration;
          const progress = cycleTime / pulseDuration;

          const approxLength = Math.max(actualRadiusX, actualRadiusY) * 1.3;
          const pulseSegmentLength = approxLength * pulseLength;
          const offset = -progress * (approxLength + pulseSegmentLength);

          const isHovered = hoveredNode === index;

          return (
            <path
              key={`pulse-${index}`}
              d={pathD}
              fill="none"
              stroke={pulseColor}
              strokeWidth={isHovered ? pulseWidth + 2 : pulseWidth}
              strokeLinecap="round"
              strokeDasharray={`${pulseSegmentLength} ${approxLength * 2}`}
              strokeDashoffset={offset}
              filter={`url(#pulseGlow-${filterId})`}
              style={{
                opacity: 0.95,
              }}
            />
          );
        })}
      </svg>

      {/* Center "Services" Node */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 z-20 group"
        style={{
          left: `${centerX}px`,
          top: `${centerY}px`,
          width: `${centerSize}px`,
          height: `${centerSize}px`,
          borderRadius: `${borderRadius}px`,
        }}
      >
        {/* Outer glowing pulsing halo */}
        <div
          className="absolute inset-0 rounded-[inherit] -z-10 animate-pulse transition-opacity"
          style={{
            background: `radial-gradient(circle, ${glowColor}45 0%, transparent 75%)`,
            filter: 'blur(14px)',
            transform: 'scale(1.25)',
          }}
        />

        {/* Center node card - Architectural compass drafting aesthetic */}
        <div
          className="w-full h-full rounded-[inherit] bg-[#181D26] border-2 border-[var(--accent)] shadow-2xl flex flex-col items-center justify-center p-3 text-center transition-transform duration-300 group-hover:scale-105"
        >
          {centerContent ? (
            centerContent
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 pointer-events-none select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-ping" />
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--accent)]">
                Core
              </div>
              <div className="font-heading font-black text-2xl text-white leading-tight tracking-tight drop-shadow-md">
                Services
              </div>
              <div className="text-[10px] text-[var(--accent)] bg-black/40 px-2 py-0.5 rounded-full border border-[var(--accent)]/30 font-mono mt-0.5">
                {totalNodes} Disciplines
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Radial Branch Nodes (Clean Architectural Cards) */}
      {nodesData.map(({ item, index, x, y }) => {
        const isHovered = hoveredNode === index;
        const NodeWrapper = item.href ? Link : 'div';
        const wrapperProps = item.href ? { href: item.href } : {};

        return (
          <div
            key={item.id || item.title || index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300"
            style={{
              left: `${x}px`,
              top: `${y}px`,
            }}
            onMouseEnter={() => setHoveredNode(index)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <NodeWrapper
              {...(wrapperProps as any)}
              onClick={item.onClick}
              className={`block group/node cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-2xl transition-all duration-300 ${
                isHovered ? 'scale-105 -translate-y-1' : 'hover:scale-102'
              }`}
            >
              {item.content ? (
                item.content
              ) : (
                <div
                  className={`relative flex items-center gap-3.5 px-5 py-4 rounded-2xl transition-all duration-300 ${
                    isHovered
                      ? 'bg-white dark:bg-slate-900 border-2 border-amber-500 shadow-2xl shadow-amber-500/25'
                      : 'bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 shadow-lg shadow-black/5 hover:border-amber-500'
                  }`}
                  style={{
                    minWidth: '270px',
                    maxWidth: '340px',
                  }}
                >
                  {/* Indicator / Icon dot */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isHovered
                        ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60'
                    }`}
                  >
                    {item.icon ? (
                      item.icon
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-current" />
                    )}
                  </div>

                  {/* Title & Badge */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2">
                      {item.num && (
                        <span className="font-mono text-xs font-bold text-slate-950 bg-amber-400 px-2 py-0.5 rounded-md shrink-0 shadow-xs">
                          {item.num}
                        </span>
                      )}
                      <span className="font-heading font-extrabold text-[15px] text-slate-900 dark:text-white group-hover/node:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                        {item.title}
                      </span>
                    </div>
                    {item.subtitle && (
                      <p className="text-xs font-sans font-medium text-slate-600 dark:text-slate-300 mt-1 leading-normal">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Branch glowing node dot */}
                  <div className="flex items-center gap-1.5 shrink-0 pl-1">
                    <span
                      className={`w-3 h-3 rounded-full transition-all ${
                        isHovered
                          ? 'bg-amber-500 ring-4 ring-amber-500/35 scale-125'
                          : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    />
                  </div>
                </div>
              )}
            </NodeWrapper>
          </div>
        );
      })}
    </div>
  );
}
