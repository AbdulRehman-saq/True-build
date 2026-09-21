'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer } from '@/components/Animations';
import { ServiceTabNav } from '@/components/ServiceTabNav';
import { QuoteButton } from '@/components/QuoteModal';

export default function ShopDrawingsPage() {
  const deliverables = [
    { title: 'Structural Steel Shop Drawings', desc: 'Erection plans, connection details, member schedules, and column/beam identification sheets.' },
    { title: 'Precast Concrete Shop Drawings', desc: 'Panel layout drawings, rebar schedules, and embed placement sheets.' },
    { title: 'Millwork & Casework Shop Drawings', desc: 'Cabinet sections, countertop details, trim profiles, and material cut lists for fabricators.' },
    { title: 'MEP Coordination Drawings', desc: 'Routing clash detection and field installation coordination sheets.' },
    { title: 'Rebar & Reinforcement Drawings', desc: 'Placement diagrams, bar bending schedules, and lap splice details.' },
    { title: 'Curtain Wall & Glazing Shop Drawings', desc: 'Mullion layouts, glass type specifications, thermal breaks, and anchor/bracket detailing.' },
  ];

  const fitTypes = [
    {
      title: 'Submittal-Ready',
      desc: 'Drawings prepared for architect and engineer review, redline, and approval before fabrication begins, minimizing costly rework later.',
    },
    {
      title: 'Fabricators & Subcontractors',
      desc: 'Detailed enough for shop and field crews to build and install directly from the drawing set, with dimensions and connections clearly called out.',
    },
    {
      title: 'Commercial & Residential',
      desc: 'Shop drawing support for commercial builds, tenant improvements, and detailed residential projects requiring custom fabrication.',
    },
  ];

  return (
    <>
      <ServiceTabNav activeId="shop-drawings" />

      <section className="pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
          {/* Hero */}
          <div>
            <ScrollReveal><div className="accent-line mb-5" /></ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="text-sm font-mono text-[var(--accent)] mb-3">03 / SHOP DRAWINGS</p>
              <h1 className="heading-display text-[var(--foreground)] max-w-3xl">
                Fabrication-ready shop drawings{' '}
                <span className="text-gradient">for contractors & suppliers.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="body-large text-[var(--text-secondary)] max-w-3xl mt-6">
                Detailed shop drawings for structural, precast, millwork, and MEP components — built for fabrication and installation, and ready for architect/engineer submittal and approval. We work directly from approved construction documents to produce drawings your shop and field crews can build from.
              </p>
            </ScrollReveal>
          </div>

          {/* Deliverables */}
          <div>
            <ScrollReveal>
              <div className="accent-line mb-4" />
              <h2 className="heading-section text-[var(--foreground)] mb-2">What&apos;s included</h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
                Shop drawings translate design and engineering documents into precise fabrication and installation detail, so nothing is left to interpretation on the shop floor or in the field.
              </p>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {deliverables.map((d, i) => (
                <div key={i} className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 card-lift">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-mono text-xs font-bold mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="text-base font-bold text-[var(--foreground)] mb-2">{d.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* How It Fits Your Project */}
          <div className="pt-8 border-t border-[var(--border)]">
            <ScrollReveal>
              <div className="accent-line mb-4" />
              <h2 className="heading-section text-[var(--foreground)] mb-2">How it fits your project</h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
                Designed for seamless trade coordination, submittal approval, and shop execution.
              </p>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fitTypes.map((fit, i) => (
                <div key={i} className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 card-lift">
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">{fit.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{fit.desc}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* Extended Team Partnership Offer */}
          <ScrollReveal>
            <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="max-w-3xl space-y-4 relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                  SUBCONTRACTOR & GC EXTENSION
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
                  Work with our shop drawing team
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  Open to working as an extended shop drawing team for general contractors, fabricators, and subcontractors — producing submittal-ready drawings to your project&apos;s exact specifications and formats. We can turn around a single trade package or support shop drawings across an entire project.
                </p>
                <div className="pt-2">
                  <QuoteButton service="shop-drawings" className="inline-flex items-center text-sm font-bold text-[var(--accent)] hover:underline">
                    Inquire about trade package shop drawings →
                  </QuoteButton>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] via-[#C49340] to-[#A07830]" />
              
              <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Need shop drawings for your next project?
                </h2>
                <p className="text-white/80 max-w-md mx-auto font-medium text-sm sm:text-base">
                  Get fabrication-ready submittal sets delivered on timeline.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                  <QuoteButton service="shop-drawings" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold transition-all hover:scale-105 active:scale-95 shadow-xl">
                    Request Shop Drawings →
                  </QuoteButton>
                  <a href="tel:+18327373912" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/15 text-white font-bold border border-[var(--background)]/30 hover:bg-black/30 transition-all">
                    Call +1 (832) 737-3912
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
