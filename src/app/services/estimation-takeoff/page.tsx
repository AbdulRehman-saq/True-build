'use client';
import React from 'react';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer, AnimatedCounter } from '@/components/Animations';
import { ServiceTabNav } from '@/components/ServiceTabNav';

export default function EstimationTakeoffPage() {
  const processSteps = [
    { num: '01', title: 'Send us your plans', desc: 'Upload architectural or structural drawings, along with your bid deadline and scope of work.' },
    { num: '02', title: 'We complete the takeoff', desc: 'Our estimators perform a detailed material takeoff and price it against current, trade-specific cost data.' },
    { num: '03', title: 'Receive your estimate', desc: 'You get a bid-ready cost estimate within 24–48 hours, or in as little as one hour for rush requests.' },
  ];

  const trades = [
    'Framing', 'Roofing', 'Concrete', 'Plumbing', 'Electrical', 'Drywall',
    'Painting', 'Flooring', 'HVAC', 'Masonry', 'Paving', 'Metal & More',
  ];

  return (
    <>
      <ServiceTabNav activeId="estimation-takeoff" />

      <section className="pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
          {/* Hero */}
          <div>
            <ScrollReveal><div className="accent-line mb-5" /></ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="text-sm font-mono text-[var(--accent)] mb-3">05 / ESTIMATION & TAKEOFF</p>
              <h1 className="heading-display text-[var(--foreground)] max-w-3xl">
                Never miss a bid{' '}
                <span className="text-gradient">deadline again.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="body-large text-[var(--text-secondary)] max-w-3xl mt-6">
                Your residential estimator and commercial estimator team for cost estimation and material takeoff, so a tight deadline never costs you a project. Standard estimates in 24–48 hours, with rush quotes available in as little as one hour, backed by a continuously updated pricing database for accuracy you can bid with confidence.
              </p>
            </ScrollReveal>
          </div>

          {/* Stats */}
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8">
              {[
                { value: '97', suffix: '%', label: 'Estimate Accuracy' },
                { value: '48', suffix: 'hr', label: 'Standard Turnaround' },
                { value: '1', suffix: 'hr', label: 'Rush Quote Option' },
                { value: '12', suffix: '+', label: 'Trades Covered' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-extrabold text-[var(--accent)] font-mono">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <span className="text-xs text-[var(--text-muted)] mt-1 block uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* How Our Process Works */}
          <div>
            <ScrollReveal>
              <div className="accent-line mb-4" />
              <h2 className="heading-section text-[var(--foreground)] mb-2">How our estimating process works</h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
                A straightforward process built for contractors on a bid deadline — from plans in, to a bid-ready estimate out.
              </p>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {processSteps.map((step) => (
                <div key={step.num} className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 card-lift">
                  <span className="font-mono text-2xl font-extrabold text-[var(--accent)] block mb-3">{step.num}</span>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* Trades Covered */}
          <div className="pt-8 border-t border-[var(--border)]">
            <ScrollReveal>
              <div className="accent-line mb-4" />
              <h2 className="heading-section text-[var(--foreground)] mb-2">Trades covered</h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
                As your dedicated takeoff professional, we deliver accurate cost estimation, material takeoff, labor costs, and budget forecasting across every major trade — so your bid accounts for the full scope of the job, not just the obvious line items.
              </p>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {trades.map((trade) => (
                <div key={trade} className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-center text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-all cursor-default">
                  {trade}
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* Residential vs Commercial */}
          <div className="pt-8 border-t border-[var(--border)]">
            <ScrollReveal>
              <div className="accent-line mb-4" />
              <h2 className="heading-section text-[var(--foreground)] mb-8">Estimating services</h2>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 card-lift">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 mb-4">RESIDENTIAL</span>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">Residential Estimator</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Cost estimation and takeoff for single-family homes, remodels, ADU plans, patio plans, and other residential projects — sized to the scope of a homeowner or residential contractor&apos;s bid. We account for local material and labor costs so your estimate reflects what the job will actually cost to build, not a generic average.
                </p>
              </div>
              <div className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 card-lift">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/20 mb-4">COMMERCIAL</span>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">Commercial Estimator</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Takeoff and cost estimation for commercial builds, tenant improvements, and multi-unit projects, delivered on a bid-ready timeline. Our commercial estimating covers structural, MEP, and finish trades, so general contractors can submit a complete, defensible bid.
                </p>
              </div>
            </StaggerContainer>
          </div>

          {/* Extended Team Partnership Offer */}
          <ScrollReveal>
            <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="max-w-3xl space-y-4 relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                  ONGOING PARTNERSHIP
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
                  Work with us as your estimating team
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  Rather than a one-off estimate, ProArch can work as your ongoing remote estimating partner — so you&apos;re never forced to pass on a bid because of time or capacity. Contractors who bid continuously with us qualify for a discounted rate, keeping estimating costs predictable across every project. This lets you bid on more work without adding an in-house estimator to payroll.
                </p>
                <div className="pt-2">
                  <Link href="/contact" className="inline-flex items-center text-sm font-bold text-[var(--accent)] hover:underline">
                    Inquire about ongoing estimating partnership →
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
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
                  Get a quote in under an hour
                </h2>
                <p className="text-[var(--foreground)]/80 max-w-md mx-auto font-medium text-sm sm:text-base">
                  Get a completed takeoff and cost estimate in 24-48 hours, or request a rush quote for tight deadlines.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                  <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold transition-all hover:scale-105 active:scale-95 shadow-xl">
                    Get an Estimate →
                  </Link>
                  <a href="tel:+18327373912" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/15 text-[var(--foreground)] font-bold border border-white/20 hover:bg-white/25 transition-all">
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
