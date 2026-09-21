'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

export interface RotatingCardItem {
  id: string;
  title: string;
  category?: string;
  location?: string;
  image: string;
  specs?: string[];
  description?: string;
  has3DModel?: boolean;
}

interface RotatingCardsProps {
  cards: RotatingCardItem[];
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  duration?: number;
  autoPlay?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
  mouseWheel?: boolean;
  className?: string;
  onCardClick?: (card: RotatingCardItem) => void;
}

const mobileSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.95,
  }),
};

export function RotatingCards({
  cards,
  radius = 380,
  cardWidth = 260,
  cardHeight = 340,
  duration = 24,
  autoPlay = true,
  draggable = true,
  pauseOnHover = true,
  mouseWheel = true,
  className = '',
  onCardClick,
}: RotatingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotationY, setRotationY] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);
  const [mobileDirection, setMobileDirection] = useState<number>(1);

  const startXRef = useRef<number>(0);
  const currentRotationRef = useRef<number>(0);
  const lastVelocityRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(performance.now());

  // Detect mobile width cleanly
  useEffect(() => {
    function checkMobile() {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 640);
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Safe radius for desktop mode so cards never mathematically overlap
  const totalCards = cards.length;
  const anglePerCard = 360 / Math.max(1, totalCards);
  const minSafeRadius = Math.ceil((cardWidth / 2) / Math.sin(Math.PI / Math.max(1, totalCards)) * 1.15);
  const effectiveRadius = Math.max(radius, minSafeRadius);

  // Keep rotation ref synced with state
  currentRotationRef.current = rotationY;

  // Auto-play Animation Loop for Desktop 3D Drum
  const animate = useCallback(
    (now: number) => {
      const delta = (now - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = now;

      const shouldRotate = !isMobile && isPlaying && (!pauseOnHover || !isHovered) && !isDragging;

      if (shouldRotate && duration > 0) {
        const speed = 360 / duration; // degrees per second
        setRotationY((prev) => (prev - speed * delta) % 360);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [duration, isDragging, isHovered, isMobile, isPlaying, pauseOnHover]
  );

  useEffect(() => {
    lastTimestampRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animate]);

  // Mobile Auto-Play Interval
  useEffect(() => {
    if (!isMobile || !isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setMobileDirection(1);
      setMobileActiveIndex((prev) => (prev + 1) % cards.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isMobile, isPlaying, isHovered, cards.length]);

  // Drag Handlers for Desktop
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable || isMobile) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    lastVelocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isMobile) return;
    const deltaX = e.clientX - startXRef.current;
    startXRef.current = e.clientX;
    const sensitivity = 0.45;
    lastVelocityRef.current = deltaX * sensitivity;
    setRotationY((prev) => prev + lastVelocityRef.current);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Mouse Wheel Rotation
  const handleWheel = (e: React.WheelEvent) => {
    if (!mouseWheel || isMobile) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      setRotationY((prev) => prev - e.deltaX * 0.2);
    }
  };

  // Step Rotate Left / Right
  const stepRotate = (direction: 'left' | 'right') => {
    if (isMobile) {
      if (direction === 'left') {
        setMobileDirection(-1);
        setMobileActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
      } else {
        setMobileDirection(1);
        setMobileActiveIndex((prev) => (prev + 1) % cards.length);
      }
    } else {
      const stepAngle = 360 / cards.length;
      const delta = direction === 'left' ? stepAngle : -stepAngle;
      setRotationY((prev) => prev + delta);
    }
  };

  // ════════════════════════════════════════════════════════════
  // MOBILE VIEW: Focused Single Card Showcase (Zero Overlap)
  // ════════════════════════════════════════════════════════════
  if (isMobile) {
    const activeCard = cards[mobileActiveIndex] || cards[0];

    return (
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full overflow-hidden select-none py-6 px-4 flex flex-col items-center justify-center ${className}`}
      >
        {/* Active Card with Smooth Swipe Animation */}
        <div className="relative w-full max-w-[320px] h-[390px] mx-auto">
          <AnimatePresence initial={false} mode="wait" custom={mobileDirection}>
            <motion.div
              key={activeCard.id}
              custom={mobileDirection}
              variants={mobileSlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 320, damping: 32 },
                opacity: { duration: 0.25 },
                scale: { duration: 0.25 },
              }}
              onClick={() => {
                if (onCardClick) onCardClick(activeCard);
              }}
              className="w-full h-full rounded-2xl overflow-hidden border border-[var(--accent)] bg-[#0F1522] shadow-2xl shadow-[var(--accent)]/15 flex flex-col cursor-pointer active:scale-[0.99] transition-transform"
              style={{
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
              }}
            >
              {/* Top Image Half */}
              <div className="relative h-[50%] w-full bg-slate-900 overflow-hidden">
                <Image
                  src={activeCard.image}
                  alt={activeCard.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 320px, 280px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />

                {/* Top Badges Header */}
                <div className="relative z-10 p-3 flex items-center justify-between gap-1.5">
                  {activeCard.category && (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/85 backdrop-blur-md text-white border border-white/20 shadow-sm">
                      {activeCard.category}
                    </span>
                  )}

                  {activeCard.has3DModel && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[var(--accent)] text-white flex items-center gap-1 shadow-sm">
                      <Compass className="w-3 h-3" />
                      <span>3D BIM</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Content Half - Solid High Contrast for Crystal Clear Typography */}
              <div className="relative h-[50%] w-full p-4 flex flex-col justify-between bg-[#0F1522] border-t border-white/10 select-text">
                <div className="space-y-1.5">
                  {activeCard.location && (
                    <span className="text-xs font-mono font-semibold text-[var(--accent)] block">
                      📍 {activeCard.location}
                    </span>
                  )}
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight line-clamp-2">
                    {activeCard.title}
                  </h4>
                  {activeCard.specs && activeCard.specs[0] && (
                    <p className="text-xs text-slate-300 font-mono tracking-wide line-clamp-1">
                      • {activeCard.specs[0]}
                    </p>
                  )}
                </div>
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-[var(--accent)] font-mono border-t border-white/5">
                  <span>View Specifications</span>
                  <span className="text-sm">→</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-4">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setMobileDirection(idx > mobileActiveIndex ? 1 : -1);
                setMobileActiveIndex(idx);
              }}
              title={`Go to project ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === mobileActiveIndex
                  ? 'w-6 bg-[var(--accent)] shadow-xs'
                  : 'w-2 bg-slate-400 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Mobile Controls */}
        <div className="relative z-20 mt-4 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-[var(--border)] shadow-md">
          <button
            onClick={() => stepRotate('left')}
            title="Previous Project"
            className="p-1.5 rounded-lg text-slate-700 hover:text-[var(--accent)] active:bg-slate-100 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
            className="px-3 py-1.5 rounded-xl bg-[var(--foreground)] text-white active:bg-[var(--foreground)]/90 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[var(--accent)]" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={() => stepRotate('right')}
            title="Next Project"
            className="p-1.5 rounded-lg text-slate-700 hover:text-[var(--accent)] active:bg-slate-100 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-mono text-slate-500 border-l border-slate-200 pl-2.5">
            {mobileActiveIndex + 1} / {cards.length}
          </span>
        </div>

        <p className="text-[11px] text-slate-500 font-mono mt-2.5">
          👆 Swipe or tap card to inspect project specs
        </p>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════
  // DESKTOP 3D CIRCULAR CAROUSEL VIEW (Width >= 640px)
  // ════════════════════════════════════════════════════════════
  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      className={`relative w-full overflow-hidden select-none py-12 flex flex-col items-center justify-center ${
        draggable ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''
      } ${className}`}
      style={{
        perspective: '1200px',
        minHeight: `${cardHeight + 160}px`,
      }}
    >
      {/* 3D Rotating Drum Container */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          height: `${cardHeight}px`,
        }}
      >
        <div
          className="relative w-0 h-0 transition-transform ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotationY}deg)`,
            transitionDuration: isDragging ? '0ms' : '200ms',
          }}
        >
          {cards.map((card, index) => {
            const cardAngle = index * anglePerCard;
            const normalizedAngle = ((cardAngle + rotationY) % 360 + 360) % 360;
            // Angular distance from camera view center (0 degrees)
            const angleFromFront = Math.min(normalizedAngle, 360 - normalizedAngle);
            // Strict 62 degree threshold so ONLY the 3 front cards are ever rendered
            const isFacingFront = angleFromFront < 62;
            const isFront = angleFromFront < 26;

            // Completely eliminate any cards on the sides/rear to avoid mirrored background text
            if (!isFacingFront) {
              return null;
            }

            const zIndex = Math.round(100 - angleFromFront);
            const cardOpacity = Math.max(0.7, 1 - (angleFromFront / 70) * 0.4);

            return (
              <div
                key={card.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDragging && onCardClick) {
                    onCardClick(card);
                  }
                }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 ${
                  isFront ? 'opacity-100' : 'hover:opacity-100'
                }`}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transformStyle: 'preserve-3d',
                  // Billboard the card: moves along the 3D circle, but faces flat to camera (0 deg) for razor-sharp text
                  transform: `rotateY(${cardAngle}deg) translateZ(${effectiveRadius}px) rotateY(${-cardAngle - rotationY}deg)`,
                  zIndex,
                  opacity: isFront ? 1 : cardOpacity,
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility',
                }}
              >
                {/* Card Outer Container */}
                <div
                  className={`w-full h-full rounded-2xl overflow-hidden border transition-all duration-300 shadow-2xl flex flex-col bg-[#0F1522] ${
                    isFront
                      ? 'border-[var(--accent)] shadow-2xl shadow-[var(--accent)]/25 ring-2 ring-[var(--accent)]/40 scale-[1.03]'
                      : 'border-[var(--border)] opacity-95 group-hover:opacity-100 group-hover:border-[var(--accent)]/70'
                  }`}
                  style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                  }}
                >
                  {/* Top Half: High-Resolution Project Image & Badges */}
                  <div className="relative h-[50%] w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 240px, 280px"
                      priority={isFront}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />

                    {/* Top Badges Header */}
                    <div className="relative z-10 p-3 flex items-center justify-between gap-1.5">
                      {card.category && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/85 backdrop-blur-md text-white border border-white/20 shadow-sm">
                          {card.category}
                        </span>
                      )}

                      {card.has3DModel && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[var(--accent)] text-white flex items-center gap-1 shadow-sm">
                          <Compass className="w-3 h-3" />
                          <span>3D BIM</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Half: Solid Architectural Drafting Panel for 100% Crystal Clear Text */}
                  <div className="relative h-[50%] w-full p-4 sm:p-5 flex flex-col justify-between bg-[#0F1522] border-t border-white/10 select-text">
                    <div className="space-y-1.5">
                      {card.location && (
                        <span className="text-xs font-mono font-semibold text-[var(--accent)] block">
                          📍 {card.location}
                        </span>
                      )}
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight line-clamp-2 group-hover:text-[var(--accent-light)] transition-colors">
                        {card.title}
                      </h4>
                      {card.specs && card.specs[0] && (
                        <p className="text-xs text-slate-300 font-mono tracking-wide line-clamp-1">
                          • {card.specs[0]}
                        </p>
                      )}
                    </div>
                    <div className="pt-2 flex items-center justify-between text-xs font-bold text-[var(--accent)] font-mono border-t border-white/5">
                      <span className="group-hover:underline underline-offset-4">View Specifications</span>
                      <span className="text-sm group-hover:translate-x-1.5 transition-transform">→</span>
                    </div>
                  </div>
                </div>

                {/* Ground Reflection Accent */}
                <div
                  className="w-full h-8 rounded-full blur-xl bg-[var(--accent)]/15 absolute -bottom-6 left-0 right-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Control Bar */}
      <div className="relative z-20 mt-10 flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[var(--border)] shadow-lg">
        <button
          onClick={() => stepRotate('left')}
          title="Rotate Left"
          className="p-2 rounded-xl text-slate-700 hover:text-[var(--accent)] hover:bg-slate-100 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? 'Pause Rotation' : 'Auto-Rotate Carousel'}
          className="px-3 py-1.5 rounded-xl bg-[var(--foreground)] text-white hover:bg-[var(--foreground)]/90 text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-[var(--accent)]" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
        </button>

        <button
          onClick={() => stepRotate('right')}
          title="Rotate Right"
          className="p-2 rounded-xl text-slate-700 hover:text-[var(--accent)] hover:bg-slate-100 transition-all cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <span className="text-[11px] font-mono text-[var(--text-muted)] border-l border-[var(--border)] pl-3 hidden sm:inline">
          🖱 Drag to spin · Click card to inspect
        </span>
      </div>
    </div>
  );
}
