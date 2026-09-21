'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer } from '@/components/Animations';
import { ServiceTabNav } from '@/components/ServiceTabNav';
import { QuoteButton } from '@/components/QuoteModal';

export default function DraftingPage() {
  const deliverables = [
    { title: 'Site Plans', desc: 'Property line boundaries, setbacks, zoning overlays, and utility connections.' },
    { title: 'Floor Plans', desc: 'Fully dimensioned interior room layouts, partition wall types, and structural openings.' },
    { title: 'Elevations', desc: 'Four-sided building height dimensions, material callouts, and roofline pitches.' },
    { title: 'Electrical Plans', desc: 'Fixture locations, panel schedules, switch legs, and outlet placement.' },
    { title: 'Roof Plans', desc: 'Truss layouts, roof pitch slope directions, valley detailing, and drainage paths.' },
    { title: 'Window & Door Schedules', desc: 'Comprehensive opening dimensions, egress ratings, and material specifications.' },
  ];

  const projectTypes = [
    {
      title: 'New Builds & Additions',
      desc: 'Complete architectural drawing sets for ground-up construction and home additions, coordinated with your engineer and permitting office.',
    },
    {
      title: 'ADU Plans',
      desc: 'Complete ADU plans and accessory dwelling unit drawings, from initial layout to fully permit-ready detail, sized to your lot and local zoning requirements.',
    },
    {
      title: 'Patio Plans, Decks & Pergolas',
      desc: 'Patio plans, deck plans, and pergola drawings for smaller residential structures, drafted to the same permit-ready standard as a full home set.',
    },
  ];

  return (
    <>
      <ServiceTabNav activeId="drafting" />

      <section className="pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
          {/* Hero */}
          <div>
            <ScrollReveal><div className="accent-line mb-5" /></ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="text-sm font-mono text-[var(--accent)] mb-3">01 / DRAFTING</p>
              <h1 className="heading-display text-[var(--foreground)] max-w-3xl">
                Accurate architectural drawings,{' '}
                <span className="text-gradient">ready for permit.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="body-large text-[var(--text-secondary)] max-w-3xl mt-6">
                Floor plans, site plans, and full drawing sets produced to your specifications — or your firm&apos;s own formats when working as an extended drafting team. Every set is prepared to meet local building codes, so your project moves through plan review without unnecessary delays.
              </p>
            </ScrollReveal>
          </div>

          {/* Deliverables */}
          <div>
            <ScrollReveal>
              <div className="accent-line mb-4" />
              <h2 className="heading-section text-[var(--foreground)] mb-2">What&apos;s included</h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
                Clean, accurate architectural drafting for residential and commercial projects, covering everything from initial layout to permit-ready detail.
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

          {/* Project Types */}
          <div className="pt-8 border-t border-[var(--border)]">
            <ScrollReveal>
              <div className="accent-line mb-4" />
              <h2 className="heading-section text-[var(--foreground)] mb-2">Project types</h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
                Drafting solutions tailored to your project scale and municipal requirements.
              </p>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projectTypes.map((pt, i) => (
                <div key={i} className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 card-lift">
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">{pt.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{pt.desc}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* Extended Team Partnership Offer */}
          <ScrollReveal>
            <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="max-w-3xl space-y-4 relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                  PARTNER WITH US
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
                  Work with our drafting team
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  Open to working as an extended drafting team for architects, architecture, and engineering firms — using your firm&apos;s own formats and standards, at a lower cost than a full in-house drafting staff. This partnership model lets firms take on more projects without the overhead of hiring additional drafters.
                </p>
                <div className="pt-2">
                  <QuoteButton service="drafting" className="inline-flex items-center text-sm font-bold text-[var(--accent)] hover:underline">
                    Inquire about firm partnership →
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
                  Ready to start your drawing set?
                </h2>
                <p className="text-white/80 max-w-md mx-auto font-medium text-sm sm:text-base">
                  Upload your sketches or project requirements for a fast quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                  <QuoteButton service="drafting" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold transition-all hover:scale-105 active:scale-95 shadow-xl">
                    Request a Drafting Quote →
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
