'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer } from '@/components/Animations';

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Custom Home Permit Set',
      category: 'Residential · Drafting & Engineering',
      location: 'Austin, TX',
      desc: 'Full architectural floor plans, exterior elevations, foundation details, and structural calculations engineered for immediate city permit review.',
      specs: ['4,200 Sq Ft', 'PE Stamp', 'First-Pass Approval'],
      accent: 'var(--accent)',
    },
    {
      title: 'Luxury Interior Remodel Renders',
      category: 'Residential · 3D Design',
      location: 'Miami, FL',
      desc: 'Photorealistic interior 3D visualizations with custom lighting profiles, cabinetry details, and material studies used for client approval before demo.',
      specs: ['4K Renders', 'Custom Materials', 'Zero Change Orders'],
      accent: '#60A5FA',
    },
    {
      title: 'Restaurant Build-Out Package',
      category: 'Commercial · 3D & MEP',
      location: 'Dallas, TX',
      desc: 'Exterior rendering package and MEP coordination drawings prepared for franchise landlord presentations and local zoning board review.',
      specs: ['Landlord Set', 'HVAC Coord.', 'Landscape Renders'],
      accent: '#34D399',
    },
    {
      title: 'Detached ADU Material Takeoff',
      category: 'Residential · Estimation',
      location: 'Denver, CO',
      desc: 'Comprehensive trade-by-trade takeoff and labor cost forecast delivered under 24 hours, giving the contractor a defensible bid package.',
      specs: ['24hr Turnaround', '97% Accuracy', 'Full Breakout'],
      accent: '#F59E0B',
    },
    {
      title: 'Retail Tenant Improvement Set',
      category: 'Commercial · Drafting',
      location: 'Atlanta, GA',
      desc: 'Complete architectural interior layout, partition details, reflected ceiling plan, and life safety sheet for a 12,000 sq ft retail space.',
      specs: ['12,000 Sq Ft', 'ADA Compliance', 'Permit Ready'],
      accent: '#A78BFA',
    },
    {
      title: 'ADU & Covered Deck Set',
      category: 'Residential · Drafting',
      location: 'Phoenix, AZ',
      desc: 'Custom lot site plan, structural timber engineering, and patio cover construction details engineered to withstand high wind load codes.',
      specs: ['High-Wind Calcs', 'Site Plan', 'PE Stamp'],
      accent: '#FB923C',
    },
  ];

  return (
    <>
      <section className="pt-16 pb-24 lg:pt-24 lg:pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-16">
          <div>
            <ScrollReveal><div className="accent-line mb-5" /></ScrollReveal>
            <ScrollReveal delay={80}>
              <h1 className="heading-display text-[var(--foreground)] max-w-3xl">
                Real projects,{' '}
                <span className="text-gradient">real results.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="body-large text-[var(--text-secondary)] max-w-2xl mt-6">
                A sample of the drafting, engineering, 3D design, and estimation work ProArch has delivered for architects, firms, and contractors nationwide.
              </p>
            </ScrollReveal>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden card-lift group">
                {/* Card header with color bar */}
                <div className="h-2" style={{ background: p.accent }} />
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-md text-[var(--text-muted)] border border-[var(--border)]">
                      {p.category}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">{p.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
                    {p.specs.map((s) => (
                      <span key={s} className="text-[10px] font-mono font-medium px-2 py-1 rounded bg-[var(--foreground)]/[0.04] text-[var(--text-muted)]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ScrollReveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] via-[#C49340] to-[#A07830]" />
              
              <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center space-y-5">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Want results like this?
                </h2>
                <p className="text-white/80 max-w-md mx-auto font-medium">
                  Get in touch with our team to get started on your drawing set, 3D render, or cost estimate.
                </p>
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold transition-all hover:scale-105 active:scale-95 shadow-xl mt-2">
                  Get a Free Quote →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
