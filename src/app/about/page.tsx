'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer } from '@/components/Animations';
import { QuoteButton } from '@/components/QuoteModal';
import { About3DShowcase } from '@/components/About3DShowcase';
import { QualityAssuranceFlow } from '@/components/QualityAssuranceFlow';
import { AboutMilestones } from '@/components/AboutMilestones';
import { CoverageMapSection } from '@/components/CoverageMapSection';
import { ToolsTechGrid } from '@/components/ToolsTechGrid';
import { ShieldCheck, CheckCircle2, Compass, Layers, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 relative overflow-hidden blueprint-grid-subtle">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-amber-500/[0.06] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <ScrollReveal>
            <div className="accent-line mb-5" />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold mb-4">
              <span>Extended Architecture & Engineering Capacity</span>
            </div>
            <h1 className="heading-display text-[var(--foreground)] max-w-4xl">
              An extended team for firms,{' '}
              <span className="text-gradient">not just another vendor.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mt-6">
              ProArch provides licensed PE engineering, permit-ready drafting, 3D BIM modeling, and fast construction cost estimation for architects, contractors, developers, and homeowners.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Milestone Stats */}
      <AboutMilestones />

      {/* Interactive 3D Model Showcase */}
      <About3DShowcase />

      {/* How We Work */}
      <section className="py-24 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal variant="left">
              <div className="space-y-5 lg:sticky lg:top-28">
                <div className="accent-line" />
                <h2 className="heading-section text-[var(--foreground)]">
                  How we integrate with your team
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                  We built ProArch around one clear idea: architecture firms and general contractors need reliable engineering, drafting, and cost estimating capacity without taking on high full-time overhead.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
                  We plug directly into your firm’s CAD/BIM templates, layering standards, and municipal title blocks so drawings feel 100% native to your practice.
                </p>
                <div className="pt-3">
                  <QuoteButton className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/15">
                    Start a Project Consultation →
                  </QuoteButton>
                </div>
              </div>
            </ScrollReveal>

            <StaggerContainer className="space-y-5">
              {[
                {
                  num: '01',
                  title: 'PE-Stamped Engineering Across 11 States',
                  desc: 'Structural calculations and MEP engineering drawings sealed by licensed Professional Engineers in TX, FL, CA, GA, CO, MA, AZ, UT, KY, NC, and SC.',
                },
                {
                  num: '02',
                  title: 'Your Format & Layer Standards, Not Ours',
                  desc: 'We draft directly into your AutoCAD / Revit templates, adhering to your layer hierarchies, font sizing, and custom firm title blocks.',
                },
                {
                  num: '03',
                  title: 'Fast 24-48hr Turnaround with Rush Options',
                  desc: 'Standard estimates and drafting sets delivered in 24-48 hours. For high-stakes bid deadlines, our 1-hour rush quote response keeps you competitive.',
                },
                {
                  num: '04',
                  title: 'Zero-Cost Municipal Revisions Guarantee',
                  desc: 'If a city building department returns plan check comments, our engineers resolve and update the drawings at zero additional cost until approved.',
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="reveal bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-7 card-lift group"
                >
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-2xl font-extrabold text-amber-500 shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--foreground)] mb-1.5 group-hover:text-amber-500 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 5-Tier Quality Assurance Review Gate */}
      <QualityAssuranceFlow />

      {/* Software & Tools Grid */}
      <ToolsTechGrid />

      {/* Licensed States Coverage Map */}
      <CoverageMapSection />

      {/* Who We Serve */}
      <section className="py-24 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal>
            <div className="accent-line mb-5" />
            <h2 className="heading-section text-[var(--foreground)] mb-10">Who we serve</h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Residential Contractors & Homeowners',
                desc: 'Ground-up custom homes, second-story additions, whole-home remodels, ADU plans, and foundation repair engineering.',
              },
              {
                title: 'Commercial GCs & Developers',
                desc: 'Commercial strip centers, restaurants, industrial warehouses, retail build-outs, and submittal-ready fabrication shop drawings.',
              },
              {
                title: 'Architecture & Engineering Firms',
                desc: 'On-demand production capacity during workload spikes. We act as your back-office drafting and engineering team.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="reveal bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl p-7 card-lift"
              >
                <h3 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ScrollReveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700" />

              <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center space-y-5">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-heading">
                  Ready to partner with our engineering team?
                </h2>
                <p className="text-slate-900/90 max-w-lg mx-auto font-medium text-sm sm:text-base leading-relaxed">
                  Send us your drawing scope or bid requirements. We respond with firm quotes and turnaround schedules within 24 hours.
                </p>
                <div className="pt-2">
                  <QuoteButton className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-xl">
                    Request Project Quote & Consultation →
                  </QuoteButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
