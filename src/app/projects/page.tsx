'use client';

import React from 'react';
import { ScrollReveal } from '@/components/Animations';
import { FilterableProjectsGallery } from '@/components/FilterableProjectsGallery';
import { useQuoteModal } from '@/components/QuoteModal';
import { useModelExplorer } from '@/components/ModelExplorer3DModal';
import { Compass, Sparkles, Box } from 'lucide-react';

export default function ProjectsPage() {
  const { openQuoteModal } = useQuoteModal();
  const { openModelExplorer } = useModelExplorer();

  return (
    <>
      <section className="pt-16 pb-24 lg:pt-24 lg:pb-32 relative overflow-hidden blueprint-grid-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
          <div>
            <ScrollReveal><div className="accent-line mb-5" /></ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-[var(--accent)] font-semibold mb-3">
                <span>Featured Project Portfolio</span>
              </div>
              <h1 className="heading-display text-[var(--foreground)] max-w-3xl">
                Real projects,{' '}
                <span className="text-gradient">real results.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="body-large text-[var(--text-secondary)] max-w-2xl mt-4">
                A verified sample of the drafting sets, PE-stamped engineering, photorealistic 3D visualizations, and construction cost estimates delivered nationwide. Click any project to inspect full architectural specifications and deliverables.
              </p>
            </ScrollReveal>
          </div>

          {/* Interactive 3D Model Showcase Banner */}
          <ScrollReveal delay={200}>
            <div className="p-5 sm:p-8 rounded-3xl bg-[#181D26] border border-[#2B3342] text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Real-Time WebGL Architecture</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Interactive 3D BIM & Engineering Viewer
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Inspect our 3D parametric building model in real-time. Rotate 360°, explode floor assemblies, and review structural PE framing connections directly in your browser.
                </p>
              </div>

              <div className="relative z-10 shrink-0 w-full md:w-auto">
                <button
                  onClick={openModelExplorer}
                  className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Compass className="w-4 h-4 text-white" />
                  <span>Launch 3D BIM Viewer</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Filterable Gallery with Lightbox */}
          <ScrollReveal delay={240}>
            <FilterableProjectsGallery />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ScrollReveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] via-[#C49340] to-[#A07830]" />
              
              <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center space-y-5">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Want results like this for your project?
                </h2>
                <p className="text-white/90 max-w-lg mx-auto font-medium text-sm sm:text-base">
                  Get in touch with our team to get started on your permit set, 3D architectural render, or construction takeoff. Quotes delivered within 24 hours.
                </p>
                <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => openQuoteModal()}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold transition-all hover:scale-105 active:scale-95 shadow-xl"
                  >
                    Request a Free Quote →
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
