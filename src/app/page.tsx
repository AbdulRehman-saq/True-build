'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatedCounter } from '@/components/Animations';
import { projectsList, ProjectItem } from '@/components/FilterableProjectsGallery';
import { RotatingCards } from '@/components/RotatingCards';
import { ServicesCenterFlow } from '@/components/CenterFlow';
import { ProjectDetailModal } from '@/components/ProjectDetailModal';
import { useQuoteModal } from '@/components/QuoteModal';
import { useModelExplorer } from '@/components/ModelExplorer3DModal';
import { Architectural3DViewer } from '@/components/Architectural3DViewer';
import { HowItWorksTimeline } from '@/components/HowItWorksTimeline';
import { ToolsTechGrid } from '@/components/ToolsTechGrid';
import { CoverageMapSection } from '@/components/CoverageMapSection';
import {
  MotionReveal,
  Tilt3DCard,
  Magnetic,
  FloatingElement,
  motion,
} from '@/components/FramerMotion';
import {
  Box,
  Compass,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Eye,
  Maximize2,
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   HOMEPAGE WITH 3D MODELS & FRAMER MOTION
   ═══════════════════════════════════════════════ */

export default function HomePage() {
  const { openQuoteModal } = useQuoteModal();
  const { openModelExplorer } = useModelExplorer();

  // Hero visual mode: '3d-model' | 'photo' | 'blueprint'
  const [heroViewMode, setHeroViewMode] = useState<'3d-model' | 'photo' | 'blueprint'>('3d-model');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const rotatingCards = projectsList.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.categoryLabel,
    location: p.location,
    image: p.imageSrc,
    specs: p.specs,
    description: p.summary,
    has3DModel: p.has3DModel,
  }));

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden blueprint-grid-subtle">
        {/* Background elements — ambient mesh glow & floating geometry */}
        <div className="absolute inset-0 pointer-events-none mesh-glow-hero" />
        
        {/* Ambient floating 3D wireframe decorative accents */}
        <div className="absolute top-20 right-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 left-10 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20 w-full flex flex-col items-center text-center">
          {/* Centered Floating Pill */}
          <MotionReveal variant="up" delay={0.1}>
            <FloatingElement duration={5} yOffset={6}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--border)] bg-white/95 backdrop-blur-md text-xs text-[var(--text-muted)] shadow-sm mx-auto">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-semibold text-[var(--foreground)]">
                  Accepting new projects — 24hr guaranteed quote
                </span>
              </div>
            </FloatingElement>
          </MotionReveal>

          {/* Centered Heading */}
          <MotionReveal variant="up" delay={0.2} className="w-full">
            <h1 className="heading-display text-[var(--foreground)] max-w-4xl mx-auto mt-6">
              Permit-ready drawings,{' '}
              <span className="text-gradient">done right the first time.</span>
            </h1>
          </MotionReveal>

          {/* Centered Description */}
          <MotionReveal variant="up" delay={0.3} className="w-full">
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto mt-5 leading-relaxed">
              ProArch is the engineering, design, and estimating partner architects, builders, and developers rely on for complete permit sets, interactive 3D BIM models, and estimates that hold up on bid day.
            </p>
          </MotionReveal>

          {/* Centered CTA Buttons */}
          <MotionReveal variant="up" delay={0.4} className="w-full">
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-8 justify-center items-center max-w-lg mx-auto sm:max-w-none">
              <Magnetic pullFactor={0.3}>
                <button
                  onClick={() => openQuoteModal()}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-[15px] transition-all duration-300 btn-shimmer active:scale-[0.97] shadow-xl shadow-[var(--accent)]/25 group cursor-pointer"
                >
                  <span>Request a Free Quote</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Magnetic>

              <Magnetic pullFactor={0.25}>
                <button
                  onClick={openModelExplorer}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-[var(--foreground)] text-white font-semibold text-[15px] hover:bg-[var(--foreground)]/90 transition-all duration-300 shadow-md group cursor-pointer gap-2"
                >
                  <Compass className="w-4 h-4 text-[var(--accent)] group-hover:rotate-45 transition-transform" />
                  <span>Launch 3D Explorer</span>
                </button>
              </Magnetic>

              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl border border-[var(--border)] bg-white/90 text-[var(--foreground)] font-semibold text-[15px] hover:bg-white hover:border-[var(--accent)]/60 transition-all duration-300 shadow-xs"
              >
                Explore Services
              </Link>
            </div>
          </MotionReveal>

          {/* Centered Trust Highlights */}
          <MotionReveal variant="up" delay={0.5} className="w-full">
            <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">100% First-Pass Permit Pass Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Licensed PE Stamps in 11 States</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">24–48hr Turnaround Available</span>
              </div>
            </div>
          </MotionReveal>

          {/* Centered 3D Architectural Showcase with 3-Way Mode Switcher */}
          <div className="w-full max-w-5xl mx-auto mt-12 sm:mt-16 text-left">
            <MotionReveal variant="up" delay={0.55}>
              <div className="relative group">
                {/* Glowing ambient background backdrop */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[var(--accent)]/30 via-amber-300/30 to-sky-400/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

                {/* Main Showcase Container */}
                <div className="relative bg-white border border-[var(--border)] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                  {/* View Mode Switcher Header */}
                  <div className="p-3 sm:px-5 sm:py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">
                        PROARCH-PROJECT-V4.BIM
                      </span>
                    </div>

                    {/* 3-Way Mode Toggle Tabs */}
                    <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar">
                      <button
                        onClick={() => setHeroViewMode('3d-model')}
                        className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                          heroViewMode === '3d-model'
                            ? 'bg-[var(--accent)] text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Compass className="w-3 h-3" />
                        <span>Interactive 3D</span>
                      </button>
                      <button
                        onClick={() => setHeroViewMode('photo')}
                        className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                          heroViewMode === 'photo'
                            ? 'bg-slate-800 text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        <span>Photo Render</span>
                      </button>
                      <button
                        onClick={() => setHeroViewMode('blueprint')}
                        className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                          heroViewMode === 'blueprint'
                            ? 'bg-sky-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Box className="w-3 h-3" />
                        <span>Blueprint</span>
                      </button>
                    </div>
                  </div>

                  {/* Viewer Stage Area */}
                  <div className="relative min-h-[360px] sm:min-h-[480px] w-full overflow-hidden bg-slate-950">
                    {heroViewMode === '3d-model' ? (
                      /* Live Three.js WebGL Interactive 3D Model */
                      <Architectural3DViewer className="w-full h-full" />
                    ) : heroViewMode === 'photo' ? (
                      /* High-Res Photo Mode */
                      <div className="relative w-full h-[360px] sm:h-[480px]">
                        <Image
                          src="/images/project_commercial.jpg"
                          alt="Photorealistic Architectural Render"
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                        <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                          <div>
                            <span className="text-xs font-mono bg-amber-500/90 text-black px-2 py-0.5 rounded font-bold">
                              4K Photorealistic Render
                            </span>
                            <p className="text-sm font-semibold mt-1">Ray-traced materials, global illumination & daylight study</p>
                          </div>
                          <span className="text-xs font-mono text-slate-300 hidden sm:inline">Corona / 3ds Max</span>
                        </div>
                      </div>
                    ) : (
                      /* Blueprint CAD Mode */
                      <div className="relative w-full h-[360px] sm:h-[480px] bg-[#002b5c] p-6 flex flex-col justify-between blueprint-grid text-white">
                        <div className="flex justify-between items-start border-b border-white/20 pb-3">
                          <div>
                            <span className="text-xs font-mono text-sky-300">SHEET A-101 · PERMIT SUBMISSION</span>
                            <h3 className="text-lg font-bold font-mono text-white">ARCHITECTURAL GROUND FLOOR PLAN</h3>
                          </div>
                          <div className="border border-white/40 px-3 py-1 text-[10px] font-mono text-sky-200">
                            SCALE: 1/4&quot; = 1&apos;-0&quot;
                          </div>
                        </div>

                        {/* Simulated CAD drawing lines in blueprint */}
                        <div className="flex-1 my-4 border border-dashed border-white/20 rounded-xl relative flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-28 border-2 border-white/40 flex items-center justify-around text-[10px] font-mono text-white/60">
                            <div className="border-r border-white/30 h-full p-2">LIVING / DINING [340 SQ FT]</div>
                            <div className="border-r border-white/30 h-full p-2">PRIMARY SUITE [280 SQ FT]</div>
                            <div className="p-2">COVERED LANAI [160 SQ FT]</div>
                          </div>
                          <div className="text-center font-mono text-xs text-sky-200 bg-[#001f44]/80 px-4 py-2 rounded border border-sky-400/40">
                            <span>📐 Complete Dimensioned CAD Vector Layout Available Upon Request</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-xs font-mono text-sky-300/80 border-t border-white/20 pt-2">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-bold text-white">11 Licensed States</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModelExplorer();
                            }}
                            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/20 text-white text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
                          >
                            <Compass className="w-3.5 h-3.5 text-amber-400" />
                            <span>Inspect in 3D</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Project Strip */}
                  <div className="p-3.5 sm:p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[var(--border)]">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground)] flex items-center gap-2">
                        <span>Modern Mixed-Use Commercial & Luxury Residential</span>
                      </h4>
                      <p className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">
                        Architectural Permit Set · Structural PE Stamp · Real-Time 3D BIM
                      </p>
                    </div>
                    <button
                      onClick={openModelExplorer}
                      className="text-xs font-mono font-bold text-[var(--accent)] bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 shrink-0 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Expand 3D Model</span>
                    </button>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Centered Serving Bar */}
          <MotionReveal variant="up" delay={0.65} className="w-full">
            <div className="mt-14 pt-8 border-t border-[var(--border)] w-full">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs text-[var(--text-muted)] text-center">
                <span className="uppercase tracking-[0.15em] font-semibold text-[var(--foreground)]">Serving</span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  Residential & Commercial
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  Architecture Firms
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  General Contractors
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  Property Developers
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  Homeowners & ADU Builders
                </span>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* ─── WHAT WE DO STATS ─── */}
      <section className="py-8 border-y border-[var(--border)] bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x divide-[var(--border)]">
            {[
              { value: '11', suffix: '', label: 'Licensed States for PE Stamps' },
              { value: '100', suffix: '%', label: 'Permit-Ready Drawings' },
              { value: '95', suffix: '%+', label: 'Cost Estimate Accuracy' },
              { value: '24', suffix: 'hr', label: 'Fast Quote & Rush Turnaround' },
            ].map((stat, i) => (
              <div key={i} className={`py-4 ${i > 0 ? 'lg:pl-8' : ''} text-center lg:text-left`}>
                <div className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] font-mono tracking-tight">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <span className="text-xs text-[var(--text-muted)] mt-1 block uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS TIMELINE ─── */}
      <HowItWorksTimeline />

      {/* ─── CORE CAPABILITIES (RADIAL CENTER FLOW ARCHITECTURE) ─── */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Section Heading with requested Core Capabilities text */}
          <MotionReveal variant="up">
            <div className="text-center max-w-3xl mx-auto space-y-5">
              <div className="accent-line mx-auto" />
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--border)] text-xs font-mono text-[var(--accent)] font-bold shadow-xs">
                <span>Core Capabilities</span>
              </div>
              <h2 className="heading-section text-[#1A1A2E]">
                One team, from concept drawings to construction budget.
              </h2>
              <p className="text-[#4A453A] leading-relaxed text-sm sm:text-base font-medium">
                From the first sketch to the final bid number — we handle the engineering, drafting, 3D visualization, and estimating so your team can focus on building.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Magnetic pullFactor={0.25}>
                  <button
                    onClick={() => openQuoteModal()}
                    className="px-6 py-3.5 rounded-xl bg-[var(--accent)] text-white font-bold text-xs font-mono uppercase tracking-wider hover:bg-[var(--accent-light)] transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Request Service Quote →
                  </button>
                </Magnetic>
                <button
                  onClick={openModelExplorer}
                  className="px-5 py-3.5 rounded-xl bg-[var(--foreground)] text-white font-bold text-xs font-mono uppercase tracking-wider hover:bg-[var(--foreground)]/90 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>3D BIM Explorer</span>
                </button>
              </div>
            </div>
          </MotionReveal>

          {/* Spacious Radial Center Flow interactive architecture */}
          <MotionReveal variant="up" delay={0.15}>
            <ServicesCenterFlow />
          </MotionReveal>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ROTATING 3D CAROUSEL ─── */}
      <section className="py-24 bg-[var(--surface-elevated)] border-y border-[var(--border)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <MotionReveal variant="up">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="accent-line mx-auto" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[var(--border)] text-xs font-mono text-[var(--accent)] font-semibold shadow-xs">
                <span>3D Circular Showcase</span>
              </div>
              <h2 className="heading-section text-[var(--foreground)]">
                Proven work delivered across residential, commercial, and industrial.
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                Drag, scroll, or use the controls to rotate through our featured permit drawing sets, structural engineering projects, and 3D renders. Click any card to inspect full project specs.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <RotatingCards
              cards={rotatingCards}
              radius={400}
              cardWidth={280}
              cardHeight={370}
              duration={28}
              autoPlay={true}
              draggable={true}
              pauseOnHover={true}
              mouseWheel={true}
              onCardClick={(card) => {
                const fullProject = projectsList.find((p) => p.id === card.id);
                if (fullProject) setSelectedProject(fullProject);
              }}
            />
          </MotionReveal>

          <div className="text-center pt-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-xs hover:shadow-md group"
            >
              <span>View Full Filterable Project Gallery</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent)] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Project detail modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </section>

      {/* ─── TESTIMONIALS WITH 3D TILT ─── */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)]/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <MotionReveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="accent-line mx-auto" />
              <h2 className="heading-section text-[var(--foreground)]">
                What contractors and firms say
              </h2>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base">
                Trusted by architects, sub-contractors, and homeowners across 11 licensed states.
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote: "Great experience with their cost estimation and material take-off services. Accurate, timely, and really helped me plan my new home with confidence.",
                author: "Mike", role: "Homeowner"
              },
              {
                quote: "I've used their estimation services for a few commercial projects, and they've never let me down. Super reliable and easy to work with.",
                author: "Jo Reyes", role: "Contractor"
              },
              {
                quote: "The engineering drawings I received were clear, detailed, and exactly what I needed. The team really understood my vision.",
                author: "Daniel", role: "Property Developer"
              },
              {
                quote: "I've worked with a few estimators before, but this team really stood out. Clear, accurate estimates that kept my project on track.",
                author: "Joel", role: "Builder"
              },
            ].map((t, i) => (
              <MotionReveal key={i} variant="up" delay={i * 0.1}>
                <Tilt3DCard maxTilt={4} className="h-full rounded-2xl">
                  <div className="bg-white border border-[var(--border)] rounded-2xl p-7 sm:p-8 flex flex-col justify-between h-full shadow-sm">
                    <div className="space-y-4">
                      <div className="flex gap-0.5 text-[var(--accent)]">
                        {[...Array(5)].map((_, j) => (
                          <svg key={j} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed italic">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-[var(--foreground)] text-sm block">{t.author}</span>
                        <span className="text-xs text-[var(--text-muted)]">{t.role}</span>
                      </div>
                    </div>
                  </div>
                </Tilt3DCard>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOOLS & TECHNOLOGY ─── */}
      <ToolsTechGrid />

      {/* ─── PE COVERAGE MAP ─── */}
      <CoverageMapSection />

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <MotionReveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] via-[#C49340] to-[#A07830]" />

              <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Ready to start your<br />next project?
                </h2>
                <p className="text-white/90 text-base sm:text-lg max-w-lg mx-auto font-medium">
                  Whether you need permit-ready drawings, structural PE stamps, 3D renders, or a cost estimate — our team responds within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <Magnetic pullFactor={0.3}>
                    <button
                      onClick={() => openQuoteModal()}
                      className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
                    >
                      Request an Estimate Now →
                    </button>
                  </Magnetic>
                  <Magnetic pullFactor={0.25}>
                    <button
                      onClick={openModelExplorer}
                      className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[var(--foreground)] text-white font-bold text-base transition-all hover:bg-[var(--foreground)]/90 shadow-xl cursor-pointer gap-2"
                    >
                      <Compass className="w-5 h-5 text-[var(--accent)]" />
                      <span>Explore 3D BIM Model</span>
                    </button>
                  </Magnetic>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
