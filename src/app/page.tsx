'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer, AnimatedCounter } from '@/components/Animations';

/* ═══════════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background elements — soft radial wash instead of dotted grid */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Warm radial glow top-right */}
          <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-[var(--accent)]/[0.07] rounded-full blur-[140px]" />
          {/* Subtle cool glow bottom-left */}
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-200/[0.15] rounded-full blur-[120px]" />
          {/* Warm center fill */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-amber-100/[0.2] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left content */}
            <div className="lg:col-span-7 space-y-8">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--border)] bg-white/80 backdrop-blur text-xs text-[var(--text-muted)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-medium">Accepting new projects — 24hr response</span>
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
                  ProArch is the engineering, design, and estimating team architects, firms, and developers rely on for complete permit sets, photorealistic 3D renders, and estimates that hold up on bid day.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-[15px] transition-all duration-300 btn-shimmer active:scale-[0.97] shadow-lg shadow-[var(--accent)]/20"
                  >
                    Request a Quote
                    <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center px-7 py-4 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-[15px] hover:bg-[var(--foreground)]/[0.04] hover:border-[var(--text-muted)] transition-all duration-300"
                  >
                    Our Services
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — Feature card stack */}
            <div className="lg:col-span-5 hidden lg:block">
              <ScrollReveal variant="right" delay={250}>
                <div className="space-y-4">
                  {[
                    { num: '01', title: 'Architectural Drafting', desc: 'Floor plans, site plans, ADU plans & patio drawings', color: 'var(--accent)' },
                    { num: '02', title: 'PE Engineering', desc: 'Licensed structural & MEP across 11 states', color: '#2563EB' },
                    { num: '03', title: 'Cost Estimation', desc: '24-48hr turnarounds, 95-97% accuracy', color: '#059669' },
                  ].map((item) => (
                    <div
                      key={item.num}
                      className="glass rounded-2xl p-5 card-lift group cursor-default"
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-transform group-hover:scale-110"
                          style={{ background: `color-mix(in srgb, ${item.color} 12%, transparent)`, color: item.color }}
                        >
                          {item.num}
                        </span>
                        <div>
                          <h3 className="font-semibold text-[var(--foreground)] text-sm mb-0.5">{item.title}</h3>
                          <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Trusted by bar */}
          <ScrollReveal delay={400}>
            <div className="mt-20 pt-10 border-t border-[var(--border)]">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-xs text-[var(--text-muted)]">
                <span className="uppercase tracking-[0.15em] font-medium text-[var(--text-muted)]">Serving</span>
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                  Residential & Commercial
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                  Architecture Firms
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                  General Contractors
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                  Property Developers
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                  Homeowners
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className="py-6 border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x divide-[var(--border)]">
            {[
              { value: '11', suffix: '', label: 'Licensed States' },
              { value: '3', suffix: '', label: 'Service Lines' },
              { value: '95', suffix: '%+', label: 'Estimate Accuracy' },
              { value: '24', suffix: 'hr', label: 'Turnaround Available' },
            ].map((stat, i) => (
              <div key={i} className={`py-6 ${i > 0 ? 'lg:pl-8' : ''} text-center lg:text-left`}>
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

      {/* ─── SERVICES ─── */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Sticky label */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <ScrollReveal variant="left">
                <div className="space-y-5">
                  <div className="accent-line" />
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--accent)] font-semibold">What We Do</p>
                  <h2 className="heading-section text-[var(--foreground)]">
                    One team, from concept drawings to construction budget.
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    From the first sketch to the final bid number — we handle the engineering, drafting, rendering, and estimating so your team can focus on building.
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-light)] font-semibold text-sm transition-colors mt-4"
                  >
                    View all services
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Service cards — staggered column */}
            <div className="lg:col-span-8">
              <StaggerContainer className="space-y-5">
                {[
                  {
                    num: '01', title: 'Architectural Drafting',
                    desc: 'Permit-ready floor plans, site plans, ADU plans, and patio plans for architects, contractors, and property owners. Every drafting set is built to meet local building codes and pass plan review on the first submission.',
                    tags: ['Floor Plans', 'Site Plans', 'Elevations', 'ADU Plans'],
                    href: '/services/drafting',
                  },
                  {
                    num: '02', title: 'Structural & MEP Engineering',
                    desc: 'Structural and MEP engineering sets, with PE stamps provided where required. Our licensed engineers review loads, foundations, and system design so your project holds up under permit review.',
                    tags: ['PE Stamps', 'Load Calcs', 'Foundations', 'MEP'],
                    href: '/services/engineering',
                  },
                  {
                    num: '03', title: 'Fabrication Shop Drawings',
                    desc: 'Fabrication-ready shop drawings for structural, precast, millwork, and MEP components. Each set is prepared for architect and engineer approval before fabrication begins.',
                    tags: ['Steel', 'Precast', 'Millwork', 'Glazing'],
                    href: '/services/shop-drawings',
                  },
                  {
                    num: '04', title: '3D Design — Interior & Exterior',
                    desc: 'Photorealistic renders and walkthroughs for residential and commercial projects. See material, lighting, and layout decisions before construction starts, reducing costly changes later.',
                    tags: ['Interior', 'Exterior', 'Walkthroughs', 'Material Studies'],
                    href: '/services/3d-design',
                  },
                  {
                    num: '05', title: 'Estimation & Takeoff',
                    desc: 'Your residential and commercial estimator team, covering cost estimation and takeoff across every major trade. We deliver material takeoff and labor cost estimates with 95–97% accuracy, so your bids are built on numbers you can trust.',
                    tags: ['24-48hr', '95-97% Accuracy', '12+ Trades', 'Rush Available'],
                    href: '/services/estimation-takeoff',
                  },
                ].map((s) => (
                  <Link
                    key={s.num}
                    href={s.href}
                    className="reveal block bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 card-lift group"
                  >
                    <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
                      <span className="font-mono text-3xl font-extrabold text-[var(--accent)]/30 group-hover:text-[var(--accent)] transition-colors shrink-0">
                        {s.num}
                      </span>
                      <div className="space-y-3 flex-grow">
                        <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {s.desc}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {s.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--foreground)]/[0.04] text-[var(--text-muted)] border border-[var(--border)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center shrink-0">
                        <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-all group-hover:translate-x-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
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

      {/* ─── RESIDENTIAL & COMMERCIAL ─── */}
      <section className="py-24 lg:py-28 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="accent-line mx-auto" />
              <h2 className="heading-section text-[var(--foreground)]">
                Residential & Commercial. One team, start to finish.
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                From single-family remodels to multi-unit commercial builds, ProArch plugs into your workflow instead of replacing it — as an extended engineering team, a design partner, or a remote estimator. We work directly in your formats and timelines, so adding ProArch feels like adding staff, not hiring a vendor.
              </p>
            </div>
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
              <p className="text-[var(--text-secondary)]">
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
                className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 sm:p-8 flex flex-col justify-between card-lift"
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

      {/* ─── CTA ─── */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ScrollReveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden">
              {/* BG */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] via-[#C49340] to-[#A07830]" />

              <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Ready to start your<br />next project?
                </h2>
                <p className="text-white/80 text-base sm:text-lg max-w-lg mx-auto font-medium">
                  Whether you need permit-ready drawings, structural PE stamps, 3D renders, or a cost estimate — our team responds within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl"
                  >
                    Request a Quote →
                  </Link>
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
