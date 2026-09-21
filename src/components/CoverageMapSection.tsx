'use client';

import React from 'react';
import { ScrollReveal } from '@/components/Animations';
import { ShieldCheck, MapPin } from 'lucide-react';

const licensedStates = [
  { abbr: 'TX', name: 'Texas' },
  { abbr: 'FL', name: 'Florida' },
  { abbr: 'CA', name: 'California' },
  { abbr: 'NC', name: 'North Carolina' },
  { abbr: 'GA', name: 'Georgia' },
  { abbr: 'AZ', name: 'Arizona' },
  { abbr: 'VA', name: 'Virginia' },
  { abbr: 'CO', name: 'Colorado' },
  { abbr: 'TN', name: 'Tennessee' },
  { abbr: 'NV', name: 'Nevada' },
  { abbr: 'SC', name: 'South Carolina' },
];

export function CoverageMapSection() {
  return (
    <section className="py-24 lg:py-28 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[var(--accent)]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-5 mb-14">
            <div className="accent-line mx-auto" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--border)] text-xs font-mono text-[var(--accent)] font-bold shadow-xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>Nationwide Coverage</span>
            </div>
            <h2 className="heading-section text-[var(--foreground)]">
              Licensed PE stamps in 11 states and growing.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
              Our team of Professional Engineers holds active licenses across the country, delivering permit-ready packages that comply with your local jurisdiction.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-[var(--border)] rounded-3xl p-8 sm:p-10 shadow-sm">
              {/* Header strip */}
              <div className="flex items-center gap-3 mb-8 pb-5 border-b border-[var(--border)]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-200 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--foreground)]">PE Licensed States</h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono">Active Professional Engineer Stamps</p>
                </div>
                <div className="ml-auto">
                  <span className="text-3xl font-extrabold font-mono text-[var(--accent)]">11</span>
                </div>
              </div>

              {/* States grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {licensedStates.map((state, i) => (
                  <div
                    key={state.abbr}
                    className="group flex items-center gap-3 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)]/50 hover:bg-amber-50/50 transition-all duration-300 hover:shadow-sm"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span className="text-xl font-extrabold font-mono text-[var(--accent)] w-9 shrink-0 text-center group-hover:scale-110 transition-transform">
                      {state.abbr}
                    </span>
                    <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--foreground)] transition-colors">
                      {state.name}
                    </span>
                  </div>
                ))}

                {/* Expansion teaser */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-dashed border-[var(--accent)]/30 bg-[var(--accent)]/[0.04]">
                  <span className="text-xl font-extrabold font-mono text-[var(--accent)]/40 w-9 shrink-0 text-center">
                    +
                  </span>
                  <span className="text-sm font-medium text-[var(--accent)]/70 italic">
                    More coming soon
                  </span>
                </div>
              </div>

              {/* Bottom note */}
              <div className="mt-6 pt-5 border-t border-[var(--border)] text-center">
                <p className="text-xs text-[var(--text-muted)] font-medium">
                  Can&apos;t find your state? <span className="text-[var(--accent)] font-bold">Contact us</span> — we&apos;re actively expanding our licensing coverage.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
