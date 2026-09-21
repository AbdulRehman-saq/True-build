'use client';

import React, { useState } from 'react';
import { ScrollReveal } from './Animations';
import { ShieldCheck, FileCheck, CheckCircle2, Search, Sliders, Stamp, ArrowRight } from 'lucide-react';

export function QualityAssuranceFlow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Jurisdiction & Zoning Audit',
      role: 'Lead Planning Specialist',
      icon: <Search className="w-5 h-5" />,
      desc: 'We pull the local municipal building code overlays (e.g. IRC 2021, FBC 2023, CBC 2022) and verify lot setbacks, maximum building heights, FAR ratios, and environmental hazard overlays before production starts.',
      deliverable: 'Zoning & Code Compliance Pre-Check Memo',
      metric: '100% City Code Verified',
    },
    {
      num: '02',
      title: 'Structural Calculations & Modeling',
      role: 'Licensed Structural Designer',
      icon: <Sliders className="w-5 h-5" />,
      desc: 'Using Enercalc and RISA-3D, our engineers calculate dead, live, wind, and seismic loads. Member sizes, hold-down schedules, moment frames, and foundation beam depths are mathematically optimized.',
      deliverable: 'Stamped Calculation Packet (30-60 Pages)',
      metric: 'ASCE 7-22 Compliant',
    },
    {
      num: '03',
      title: '3D BIM Clash Detection',
      role: 'BIM Coordinator',
      icon: <FileCheck className="w-5 h-5" />,
      desc: 'All structural framing members are cross-referenced with architectural window/door schedules and MEP mechanical chases in Autodesk Navisworks to eliminate expensive field rework.',
      deliverable: 'Clash-Resolved Coordination Model',
      metric: 'Zero On-Site Rework Conflicts',
    },
    {
      num: '04',
      title: 'Independent Peer Review',
      role: 'Senior Project Engineer',
      icon: <CheckCircle2 className="w-5 h-5" />,
      desc: 'An independent senior engineer redlines the entire drawing set against the client firm’s specific CAD layer standards, dimension chains, and city permitting checklists.',
      deliverable: 'Comprehensive Internal Redline Audit',
      metric: '99.4% First-Round Acceptance',
    },
    {
      num: '05',
      title: 'Digital PE Seal & Stamp',
      role: 'Principal Professional Engineer',
      icon: <Stamp className="w-5 h-5" />,
      desc: 'The licensed Professional Engineer applies the digital cryptographic state seal and signature corresponding to the project jurisdiction (TX, FL, CA, GA, CO, MA, AZ, UT, KY, NC, SC).',
      deliverable: 'Permit-Ready Stamped Drawing Set',
      metric: '11 Licensed States',
    },
  ];

  return (
    <section className="py-24 bg-[var(--surface)] border-y border-[var(--border)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-14">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <ScrollReveal>
            <div className="accent-line mx-auto" />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Rigorous Quality Assurance</span>
            </div>
            <h2 className="heading-section text-[var(--foreground)] mt-2">
              Our 5-tier review & stamping protocol
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
              Every drawing set and calculation package passes through five rigorous inspection gates before client delivery.
            </p>
          </ScrollReveal>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white border-amber-500 shadow-md scale-[1.02]'
                    : 'bg-white/80 border-[#DDD7CB] hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-extrabold px-2 py-0.5 rounded ${
                    isActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {step.num}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-amber-500/15 text-amber-700' : 'text-slate-500'
                  }`}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xs font-extrabold text-slate-950 leading-tight line-clamp-2">
                  {step.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        <div className="bg-white border-2 border-[#DDD7CB] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-base font-extrabold text-amber-800 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-lg">
                  Gate {steps[activeStep].num}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">
                  Responsible: {steps[activeStep].role}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading">
                {steps[activeStep].title}
              </h3>

              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                {steps[activeStep].desc}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <div className="px-3.5 py-2 rounded-xl bg-[#FAF9F5] border-2 border-[#DDD7CB] text-xs text-slate-950 font-bold">
                  <span className="text-slate-600 block text-[10px] uppercase font-mono font-medium">Deliverable Artifact</span>
                  {steps[activeStep].deliverable}
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-800 font-bold">
                  <span className="text-emerald-700/80 block text-[10px] uppercase font-mono font-medium">QA Benchmark</span>
                  {steps[activeStep].metric}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#FAF9F5] border-2 border-[#DDD7CB] text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-700 flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-slate-950">City Permit Guaranteed</h4>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  We resolve any municipal plan check comments at zero extra cost.
                </p>
              </div>
              <div className="w-full pt-2">
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                  className="w-full py-2.5 rounded-xl bg-slate-950 text-white hover:bg-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Next Inspection Gate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
