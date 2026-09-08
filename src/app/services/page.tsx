'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollReveal, StaggerContainer } from '@/components/Animations';
import { servicesData } from '@/components/ServicesData';
import { useQuoteModal } from '@/components/QuoteModal';

export default function ServicesPage() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <>
      <section className="pt-16 pb-24 lg:pt-24 lg:pb-32 relative overflow-hidden blueprint-grid-subtle">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--accent)]/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-16">
          <div>
            <ScrollReveal>
              <div className="accent-line mb-5" />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[var(--border)] text-xs font-mono text-[var(--accent)] font-semibold mb-3 shadow-xs">
                <span>Integrated Architectural & Engineering Suite</span>
              </div>
              <h1 className="heading-display text-[var(--foreground)] max-w-3xl">
                From concept to construction budget —{' '}
                <span className="text-gradient">one team.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="body-large text-[var(--text-secondary)] max-w-2xl mt-4">
                Five connected disciplines working in synergy: permit-ready drafting, licensed PE structural & MEP engineering, fabrication shop drawings, photorealistic 3D design, and certified cost estimation.
              </p>
            </ScrollReveal>
          </div>

          <StaggerContainer className="space-y-6">
            {servicesData.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                className="reveal block bg-white border border-[var(--border)] rounded-2xl overflow-hidden card-lift group shadow-sm hover:border-[var(--accent)] transition-all duration-300"
              >
                <div className="grid sm:grid-cols-12 gap-0">
                  {/* Image Column */}
                  <div className="sm:col-span-4 h-52 sm:h-auto relative overflow-hidden bg-slate-900">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 font-mono text-xs font-bold bg-black/70 backdrop-blur text-white px-2.5 py-1 rounded border border-white/20">
                      {s.number}
                    </span>
                  </div>

                  {/* Content Column */}
                  <div className="sm:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        {s.summary}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                        Deliverables & Scope:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {s.deliverables.slice(0, 4).map((d) => (
                          <span
                            key={d}
                            className="text-[10px] font-mono px-2.5 py-1 rounded bg-[var(--background)] text-[var(--text-secondary)] border border-[var(--border)]"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--accent)] font-mono flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore Full Service Scope →
                      </span>
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">
                        Guaranteed Submittal-Ready
                      </span>
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] via-[#C49340] to-[#A07830]" />
              
              <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center space-y-5">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Not sure which discipline fits your project?
                </h2>
                <p className="text-white/90 max-w-lg mx-auto font-medium text-sm sm:text-base">
                  Speak directly with one of our lead architects or licensed PE engineers to review your sketches and code requirements.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => openQuoteModal()}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
                  >
                    Request Free Project Review →
                  </button>
                  <a
                    href="tel:+18327373912"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/15 text-white font-bold backdrop-blur border border-white/20 transition-all hover:bg-white/25 font-mono"
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
