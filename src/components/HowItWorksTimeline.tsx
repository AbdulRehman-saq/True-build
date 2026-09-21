'use client';

import React from 'react';
import { ScrollReveal, StaggerContainer } from '@/components/Animations';
import { Upload, Microscope, PenTool, BadgeCheck } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Submit Plans',
    desc: 'Upload your existing drawings, lot surveys, or project scope — or just describe what you need. We accept all major CAD and PDF formats.',
    icon: Upload,
    accent: 'bg-sky-500/10 text-sky-600 border-sky-200',
  },
  {
    num: '02',
    title: 'Engineering Review',
    desc: 'Our licensed PE team analyzes your structural loads, MEP requirements, and local code compliance across all 11 licensed states.',
    icon: Microscope,
    accent: 'bg-amber-500/10 text-amber-600 border-amber-200',
  },
  {
    num: '03',
    title: 'Drafting & 3D',
    desc: 'CAD production begins in your format and title block — plus photorealistic 3D renders and interactive BIM models on request.',
    icon: PenTool,
    accent: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  },
  {
    num: '04',
    title: 'Deliver & Stamp',
    desc: 'Receive your permit-ready drawing set with PE stamp, detailed cost estimate, and 3D deliverables — typically in 24–48 hours.',
    icon: BadgeCheck,
    accent: 'bg-violet-500/10 text-violet-600 border-violet-200',
  },
];

export function HowItWorksTimeline() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--accent)]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-5 mb-16">
            <div className="accent-line mx-auto" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--border)] text-xs font-mono text-[var(--accent)] font-bold shadow-xs">
              <span>How It Works</span>
            </div>
            <h2 className="heading-section text-[var(--foreground)]">
              From scope to stamp in four clear steps.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
              No guesswork, no back-and-forth. Our streamlined process takes your project from initial drawings to a fully permit-ready package.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="reveal group relative">
                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(100%+2px)] w-[calc(100%-52px)] h-[2px] z-0">
                    <div className="w-full h-full bg-gradient-to-r from-[var(--border)] via-[var(--accent)]/30 to-[var(--border)] rounded-full" />
                  </div>
                )}

                <div className="relative bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-7 card-lift h-full flex flex-col gap-4 transition-all duration-300 hover:border-[var(--accent)]/50 hover:shadow-lg">
                  {/* Step Number + Icon */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 ${step.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-3xl font-extrabold text-[var(--accent)]/30 group-hover:text-[var(--accent)] transition-colors">
                      {step.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
