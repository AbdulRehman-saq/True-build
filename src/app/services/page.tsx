'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer } from '@/components/Animations';
import { servicesData } from '@/components/ServicesData';

export default function ServicesPage() {
  return (
    <>
      <section className="pt-16 pb-24 lg:pt-24 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--accent)]/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-16">
          <div>
            <ScrollReveal>
              <div className="accent-line mb-5" />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h1 className="heading-display text-[var(--foreground)] max-w-3xl">
                From concept to construction budget —{' '}
                <span className="text-gradient">one team.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="body-large text-[var(--text-secondary)] max-w-2xl mt-6">
                Five connected disciplines that work together on every project: permit-ready drafting, PE engineering, shop drawings, photorealistic 3D design, and cost estimation.
              </p>
            </ScrollReveal>
          </div>

          <StaggerContainer className="space-y-5">
            {servicesData.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                className="reveal block bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 card-lift group"
              >
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
                  <span className="font-mono text-3xl font-extrabold text-[var(--accent)]/30 group-hover:text-[var(--accent)] transition-colors shrink-0">
                    {s.number}
                  </span>
                  <div className="space-y-3 flex-grow">
                    <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">{s.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.summary}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {s.deliverables.slice(0, 4).map((d) => (
                        <span key={d} className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--foreground)]/[0.04] text-[var(--text-muted)] border border-[var(--border)]">
                          {d}
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
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ScrollReveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] via-[#C49340] to-[#A07830]" />
              
              <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center space-y-5">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Not sure which service fits?
                </h2>
                <p className="text-white/80 max-w-md mx-auto font-medium">
                  Speak with one of our lead engineers or estimators to review your project plans.
                </p>
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold transition-all hover:scale-105 active:scale-95 shadow-xl mt-2">
                  Talk to Our Team →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
