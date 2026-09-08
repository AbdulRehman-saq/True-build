'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollReveal, StaggerContainer, AnimatedCounter } from '@/components/Animations';
import { FilterableProjectsGallery } from '@/components/FilterableProjectsGallery';
import { useQuoteModal } from '@/components/QuoteModal';

/* ═══════════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════════ */

export default function HomePage() {
  const { openQuoteModal } = useQuoteModal();
  const [blueprintMode, setBlueprintMode] = useState(false);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden blueprint-grid-subtle">
        {/* Background elements — soft ambient mesh glow */}
        <div className="absolute inset-0 pointer-events-none mesh-glow-hero" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left content */}
            <div className="lg:col-span-6 space-y-8">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--border)] bg-white/90 backdrop-blur text-xs text-[var(--text-muted)] shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-semibold text-[var(--foreground)]">Accepting new projects — 24hr guaranteed quote</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <h1 className="heading-display text-[var(--foreground)]">
                  Permit-ready drawings,{' '}
                  <span className="text-gradient">done right the first time.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="body-large text-[var(--text-secondary)] max-w-xl">
                  ProArch is the engineering, design, and estimating partner architects, builders, and developers rely on for complete permit sets, photorealistic 3D renders, and estimates that hold up on bid day.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    onClick={() => openQuoteModal()}
                    className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-[15px] transition-all duration-300 btn-shimmer active:scale-[0.97] shadow-xl shadow-[var(--accent)]/25 group cursor-pointer"
                  >
                    <span>Request a Free Quote</span>
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center px-7 py-4 rounded-xl border border-[var(--border)] bg-white/80 text-[var(--foreground)] font-semibold text-[15px] hover:bg-white hover:border-[var(--accent)]/60 transition-all duration-300 shadow-sm"
                  >
                    Explore All Services
                  </Link>
                </div>
              </ScrollReveal>

              {/* Quick Trust Highlights */}
              <ScrollReveal delay={350}>
                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold text-sm">✓</span>
                    <span>100% First-Pass Permit Pass Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold text-sm">✓</span>
                    <span>Licensed PE Stamps in 11 States</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold text-sm">✓</span>
                    <span>24–48hr Turnaround Available</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — Architectural Showcase Card with Real Image & Interactive Mode */}
            <div className="lg:col-span-6">
              <ScrollReveal variant="right" delay={250}>
                <div className="relative group">
                  {/* Glowing background backdrop */}
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[var(--accent)]/20 via-amber-200/30 to-blue-200/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

                  {/* Main Showcase Container */}
                  <div className="relative bg-white border border-[var(--border)] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                    {/* View Mode Toggle Bar */}
                    <div className="p-3 sm:px-5 sm:py-3 bg-[var(--surface-elevated)] border-b border-[var(--border)] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span className="text-[11px] font-mono text-[var(--text-muted)] ml-2">
                          PROARCH-PROJECT-V3.DWG
                        </span>
                      </div>
                      <button
                        onClick={() => setBlueprintMode(!blueprintMode)}
                        className="px-3 py-1 rounded-md text-[11px] font-mono font-semibold transition-all border border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--accent)] flex items-center gap-1.5 shadow-xs"
                      >
                        <span>{blueprintMode ? '📐 Blueprint Mode' : '📷 3D Render Mode'}</span>
                        <span className="text-[10px] text-[var(--accent)] font-bold">Toggle</span>
                      </button>
                    </div>

                    {/* Image Visual with Blueprint Filter Toggle */}
                    <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => openQuoteModal()}>
                      <Image
                        src="/images/hero_architecture.jpg"
                        alt="Modern Architecture Masterpiece Visualization by ProArch"
                        fill
                        className={`object-cover transition-all duration-700 ${
                          blueprintMode
                            ? 'invert contrast-150 brightness-75 hue-rotate-180 scale-105'
                            : 'contrast-105 group-hover:scale-105'
                        }`}
                        priority
                      />
                      
                      {/* Grid overlay for architectural feel */}
                      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                      {/* Top Floating Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Permit-Ready Submittal
                        </span>
                      </div>

                      {/* Bottom Floating Stats Badge */}
                      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2">
                        <div className="bg-black/60 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-xl text-white">
                          <span className="text-[10px] uppercase font-mono text-amber-300 block">Civil & Structural PE</span>
                          <span className="text-xs font-bold font-mono">11 Licensed States</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openQuoteModal();
                          }}
                          className="px-4 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-xs font-bold transition-all shadow-lg hover:scale-105 flex items-center gap-1.5"
                        >
                          <span>Get Instant Estimate</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>

                    {/* Bottom Project Strip */}
                    <div className="p-4 sm:p-5 bg-white flex items-center justify-between border-t border-[var(--border)]">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
                          Modern Mixed-Use Commercial & Luxury Residential
                        </h4>
                        <p className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">
                          Architectural Permit Set · Structural PE Stamp · 4K Visualization
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold text-[var(--accent)] bg-amber-50 px-2.5 py-1 rounded border border-amber-200 shrink-0">
                        Approved 1st Review
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Serving Bar */}
          <ScrollReveal delay={400}>
            <div className="mt-16 pt-8 border-t border-[var(--border)]">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-[var(--text-muted)]">
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
          </ScrollReveal>
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

      {/* ─── SERVICES WITH RICH IMAGE PREVIEWS ─── */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Sticky label */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <ScrollReveal variant="left">
                <div className="space-y-4">
                  <div className="accent-line" />
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--accent)] font-bold">
                    Core Capabilities
                  </p>
                  <h2 className="heading-section text-[var(--foreground)]">
                    One team, from concept drawings to construction budget.
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                    From the first sketch to the final bid number — we handle the engineering, drafting, rendering, and estimating so your team can focus on building.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => openQuoteModal()}
                      className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-bold text-xs font-mono uppercase tracking-wider hover:bg-[var(--accent-light)] transition-all shadow-md active:scale-95"
                    >
                      Request Service Quote →
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Service cards with Real Image Visuals */}
            <div className="lg:col-span-8">
              <StaggerContainer className="space-y-6">
                {[
                  {
                    num: '01',
                    title: 'Architectural Drafting',
                    desc: 'Permit-ready floor plans, site plans, ADU plans, and patio plans for architects, contractors, and property owners. Every drafting set is built to meet local building codes and pass plan review on the first submission.',
                    tags: ['Floor Plans', 'Site Plans', 'Elevations', 'ADU Plans'],
                    href: '/services/drafting',
                    image: '/images/project_drafting.jpg',
                  },
                  {
                    num: '02',
                    title: 'Structural & MEP Engineering',
                    desc: 'Structural and MEP engineering sets, with PE stamps provided where required. Our licensed engineers review loads, foundations, and system design so your project holds up under permit review.',
                    tags: ['PE Stamps', 'Load Calcs', 'Foundations', 'MEP'],
                    href: '/services/engineering',
                    image: '/images/project_engineering.jpg',
                  },
                  {
                    num: '03',
                    title: 'Fabrication Shop Drawings',
                    desc: 'Fabrication-ready shop drawings for structural, precast, millwork, and MEP components. Each set is prepared for architect and engineer approval before fabrication begins.',
                    tags: ['Steel Detailing', 'Precast', 'Millwork', 'CNC Ready'],
                    href: '/services/shop-drawings',
                    image: '/images/project_shopdrawings.jpg',
                  },
                  {
                    num: '04',
                    title: '3D Design — Interior & Exterior',
                    desc: 'Photorealistic renders and walkthroughs for residential and commercial projects. See material, lighting, and layout decisions before construction starts, reducing costly changes later.',
                    tags: ['Interior Renders', 'Exterior Visuals', 'Walkthroughs', '4K Quality'],
                    href: '/services/3d-design',
                    image: '/images/project_interior_3d.jpg',
                  },
                  {
                    num: '05',
                    title: 'Estimation & Takeoff',
                    desc: 'Your residential and commercial estimator team, covering cost estimation and takeoff across every major trade. We deliver material takeoff and labor cost estimates with 95–97% accuracy, so your bids are built on numbers you can trust.',
                    tags: ['24-48hr', '95-97% Accuracy', '12+ Trades', 'Rush Available'],
                    href: '/services/estimation-takeoff',
                    image: '/images/project_estimation.jpg',
                  },
                ].map((s) => (
                  <Link
                    key={s.num}
                    href={s.href}
                    className="reveal block bg-white border border-[var(--border)] rounded-2xl overflow-hidden card-lift group shadow-sm hover:border-[var(--accent)]"
                  >
                    <div className="grid sm:grid-cols-12 gap-0">
                      {/* Image Thumbnail Column */}
                      <div className="sm:col-span-4 h-48 sm:h-auto relative overflow-hidden bg-slate-900">
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 font-mono text-xs font-bold bg-black/60 backdrop-blur text-white px-2.5 py-1 rounded border border-white/20">
                          {s.num}
                        </span>
                      </div>

                      {/* Content Column */}
                      <div className="sm:col-span-8 p-6 sm:p-7 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                            {s.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                            {s.desc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {s.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--background)] text-[var(--text-muted)] border border-[var(--border)] font-mono"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs font-bold text-[var(--accent)] font-mono flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                            Learn more →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS GALLERY WITH LIGHTBOX MODAL ─── */}
      <section className="py-24 bg-[var(--surface-elevated)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="accent-line mx-auto" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[var(--border)] text-xs font-mono text-[var(--accent)] font-semibold shadow-xs">
                <span>Interactive Project Portfolio</span>
              </div>
              <h2 className="heading-section text-[var(--foreground)]">
                Proven work delivered across residential, commercial, and industrial.
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                Explore our recent permit drawing sets, structural engineering projects, 3D interior renders, and cost takeoffs. Click any card to view detailed specifications.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <FilterableProjectsGallery />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)]/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <div className="accent-line mx-auto" />
              <h2 className="heading-section text-[var(--foreground)]">
                What contractors and firms say
              </h2>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base">
                Trusted by architects, sub-contractors, and homeowners across 11 licensed states.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div
                key={i}
                className="reveal bg-white border border-[var(--border)] rounded-2xl p-7 sm:p-8 flex flex-col justify-between card-lift shadow-sm"
              >
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
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── BOTTOM CTA WITH DIRECT MODAL TRIGGER ─── */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ScrollReveal variant="scale">
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
                  <button
                    onClick={() => openQuoteModal()}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
                  >
                    Request an Estimate Now →
                  </button>
                  <a
                    href="tel:+18327373912"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/15 text-white font-bold text-base backdrop-blur border border-white/20 transition-all hover:bg-white/25 font-mono"
                  >
                    (832) 737-3912
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
