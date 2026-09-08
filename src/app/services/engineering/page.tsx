'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer } from '@/components/Animations';
import { ServiceTabNav } from '@/components/ServiceTabNav';

export default function EngineeringPage() {
  const deliverables = [
    { title: 'Structural Engineering Sets', desc: 'Beam sizing, column schedules, shear wall layouts, and connection details.' },
    { title: 'MEP Plans (HVAC, Electrical, Plumbing)', desc: 'Complete HVAC ducting, electrical load panels, and plumbing drawings.' },
    { title: 'Foundation Engineering', desc: 'Slab-on-grade, stem wall, pier & beam, and deep foundation calculations.' },
    { title: 'Structural Calculations & Design', desc: 'Wind load, seismic category, and live/dead load calculations.' },
    { title: 'Structural Review & Detailing', desc: 'Comprehensive review of structural frames and load paths.' },
    { title: 'PE Stamps Provided', desc: 'Official Licensed Professional Engineer stamps provided across 11 states.' },
  ];

  const applicationAreas = [
    {
      title: 'New Builds & Additions',
      desc: 'Full structural and MEP engineering for ground-up construction and additions, including load calculations and foundation design.',
    },
    {
      title: 'Remodels & ADUs',
      desc: 'Structural review and engineering for remodels and accessory dwelling units, including any load-bearing wall or foundation changes.',
    },
    {
      title: 'Decks, Pergolas & Patio Covers',
      desc: 'Structural engineering and PE stamps for decks, pergolas, and patio covers, sized correctly for local wind and load requirements.',
    },
  ];

  return (
    <>
      <ServiceTabNav activeId="engineering" />

      <section className="pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
          {/* Hero */}
          <div>
            <ScrollReveal><div className="accent-line mb-5" /></ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="text-sm font-mono text-[var(--accent)] mb-3">02 / ENGINEERING</p>
              <h1 className="heading-display text-[var(--foreground)] max-w-3xl">
                Structural & MEP engineering,{' '}
                <span className="text-gradient">PE stamps provided.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="body-large text-[var(--text-secondary)] max-w-3xl mt-6">
                Structural and MEP engineering sets that meet local code requirements — delivered with professional engineering stamps where required for permit. Our licensed engineers handle structural design, load calculations, and system detailing so your drawings hold up under plan review.
              </p>
            </ScrollReveal>
          </div>

          {/* Deliverables */}
          <div>
            <ScrollReveal>
              <div className="accent-line mb-4" />
              <h2 className="heading-section text-[var(--foreground)] mb-2">What&apos;s included</h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
                Engineering sets built to hold up under plan review, not just look complete — every set includes the structural calculations and detailing a plan reviewer expects to see.
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

          {/* Where Engineering Applies */}
          <div className="pt-8 border-t border-[var(--border)]">
            <ScrollReveal>
              <div className="accent-line mb-4" />
              <h2 className="heading-section text-[var(--foreground)] mb-2">Where our engineering applies</h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
                PE-stamped structural and MEP solutions across residential and commercial scopes.
              </p>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {applicationAreas.map((item, i) => (
                <div key={i} className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 card-lift">
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* Extended Team Partnership Offer */}
          <ScrollReveal>
            <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="max-w-3xl space-y-4 relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                  FIRM PARTNERSHIP
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
                  Partner with our engineering team
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  Open to working as an extended engineering team for architecture and drafting firms — reviewing and stamping structural sets to your project&apos;s requirements, at a lower cost than a full in-house engineering staff. We can support a single structural review or serve as your ongoing engineering resource across multiple projects.
                </p>
                <div className="pt-2">
                  <Link href="/contact" className="inline-flex items-center text-sm font-bold text-[var(--accent)] hover:underline">
                    Talk to our engineering leads →
                  </Link>
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
                  Need an engineering set stamped?
                </h2>
                <p className="text-white/80 max-w-md mx-auto font-medium text-sm sm:text-base">
                  Get your structural calculations and PE-stamped plans reviewed by our licensed engineers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                  <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold transition-all hover:scale-105 active:scale-95 shadow-xl">
                    Request Engineering Quote →
                  </Link>
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
