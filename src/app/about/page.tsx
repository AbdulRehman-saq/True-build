'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer } from '@/components/Animations';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-24 lg:pt-24 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--accent)]/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <ScrollReveal>
            <div className="accent-line mb-5" />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="heading-display text-[var(--foreground)] max-w-3xl">
              An extended team for firms,{' '}
              <span className="text-gradient">not just a vendor.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mt-6">
              ProArch provides engineering, drafting, 3D design, and cost estimation services for architects, contractors, developers, and homeowners — working inside your process rather than around it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal variant="left">
              <div className="space-y-5 lg:sticky lg:top-28">
                <div className="accent-line" />
                <h2 className="heading-section text-[var(--foreground)]">How we work</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  We built ProArch around one clear idea: architecture firms and general contractors need reliable engineering, drafting, and cost estimating support without hiring full-time staff. We plug directly into your existing drawing formats, timelines, and title block standards.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="space-y-5">
              {[
                { num: '01', title: 'PE-Stamped Engineering', desc: 'Structural and MEP engineering drawing sets delivered with professional engineering stamps across 11 licensed states.' },
                { num: '02', title: 'Your Format, Not Ours', desc: 'We draft directly into your firm\'s existing CAD/BIM templates, layer setups, and title block standards.' },
                { num: '03', title: 'Fast 24-48hr Turnaround', desc: 'Standard estimates and drafting turnarounds in 24-48 hours, with 1-hour rush quote response options for tight deadlines.' },
              ].map((item) => (
                <div key={item.num} className="reveal bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-7 card-lift group">
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-2xl font-extrabold text-[var(--accent)] shrink-0">{item.num}</span>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--foreground)] mb-1.5 group-hover:text-[var(--accent)] transition-colors">{item.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Licensed States */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal>
            <div className="accent-line mb-5" />
            <h2 className="heading-section text-[var(--foreground)] mb-3">Licensed Nationwide</h2>
            <p className="text-[var(--text-secondary)] text-sm max-w-2xl mb-10">
              ProArch holds active engineering licenses across 11 states. Every structural set can be PE-stamped and submitted for local permit review.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {['Texas', 'Florida', 'California', 'Georgia', 'Colorado', 'Massachusetts', 'Arizona', 'Utah', 'Kentucky', 'North Carolina', 'South Carolina', 'Nationwide'].map((state) => (
              <div key={state} className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-center text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-all cursor-default">
                {state}
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* What We Work On */}
      <section className="py-24 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal>
            <div className="accent-line mb-5" />
            <h2 className="heading-section text-[var(--foreground)] mb-10">Who we serve</h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Residential', desc: 'New builds, additions, remodels, ADU plans, patio plans, decks, and pergolas for homeowners and residential contractors.' },
              { title: 'Commercial', desc: 'Ground-up commercial builds, restaurant build-outs, retail fit-outs, and tenant improvements for developers and GCs.' },
              { title: 'Firms & Partners', desc: 'Extended drafting, engineering, and shop drawing capacity for architecture and engineering firms — using your templates.' },
            ].map((item) => (
              <div key={item.title} className="reveal bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-7 card-lift">
                <h3 className="text-lg font-bold text-[var(--accent)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ScrollReveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] via-[#C49340] to-[#A07830]" />
              
              <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center space-y-5">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Want to work with our team?
                </h2>
                <p className="text-white/80 max-w-md mx-auto font-medium">
                  Tell us about your project requirements or inquire about an ongoing partnership.
                </p>
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold transition-all hover:scale-105 active:scale-95 shadow-xl mt-2">
                  Get in Touch →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
