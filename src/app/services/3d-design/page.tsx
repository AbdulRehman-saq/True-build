'use client';
import React from 'react';
import Link from 'next/link';
import { ScrollReveal, StaggerContainer } from '@/components/Animations';
import { ServiceTabNav } from '@/components/ServiceTabNav';

export default function ThreeDDesignPage() {
  const deliverables = [
    { title: 'Interior Rendering', desc: 'Photorealistic interior visuals covering layout, materials, and lighting — ideal for client presentations, marketing, and confirming design decisions before a build begins.' },
    { title: 'Exterior Rendering', desc: 'Full exterior renders showing massing, materials, and landscaping in context, for homes, restaurants, and commercial buildings — useful for permitting visuals as well as marketing.' },
    { title: 'Walkthrough Animations', desc: 'Animated camera tours of completed project interiors and exteriors in 4K resolution.' },
    { title: 'Material & Lighting Studies', desc: 'Close-up material and finish comparisons with custom lighting profiles for client selection meetings.' },
  ];

  const useCases = [
    {
      title: 'Residential',
      desc: 'Help homeowners visualize a remodel, addition, or new build before construction starts, reducing change orders down the line.',
    },
    {
      title: 'Restaurants',
      desc: 'Interior and exterior renders for concept approval, franchise presentations, and investor decks before build-out begins.',
    },
    {
      title: 'Commercial',
      desc: 'Renders that support permitting visuals, leasing packages, and investment or financing decisions.',
    },
  ];

  return (
    <>
      <ServiceTabNav activeId="3d-design" />

      <section className="pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
          {/* Hero */}
          <div>
            <ScrollReveal><div className="accent-line mb-5" /></ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="text-sm font-mono text-[var(--accent)] mb-3">04 / 3D DESIGN</p>
              <h1 className="heading-display text-[var(--foreground)] max-w-3xl">
                See the finished space{' '}
                <span className="text-gradient">before construction begins.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="body-large text-[var(--text-secondary)] max-w-3xl mt-6">
                Photorealistic interior and exterior rendering and walkthroughs for residential, restaurant, and commercial projects — so clients and investors can visualize the result with confidence. Renders are built directly from your drafted or engineered plans, so what you see is what gets built.
              </p>
            </ScrollReveal>
          </div>

          {/* What's Included */}
          <div>
            <ScrollReveal>
              <div className="accent-line mb-4" />
              <h2 className="heading-section text-[var(--foreground)] mb-2">What&apos;s included</h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
                Full-scope 3D visualization services from concept to final presentation-ready deliverables.
              </p>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {deliverables.map((d, i) => (
                <div key={i} className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 card-lift">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-mono text-xs font-bold mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="text-base font-bold text-[var(--foreground)] mb-2">{d.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* Where It's Used */}
          <div className="pt-8 border-t border-[var(--border)]">
            <ScrollReveal>
              <div className="accent-line mb-4" />
              <h2 className="heading-section text-[var(--foreground)] mb-2">Where it&apos;s used</h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
                3D visualization for every project stage and every stakeholder.
              </p>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useCases.map((item, i) => (
                <div key={i} className="reveal bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-7 card-lift">
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>

          {/* CTA */}
          <ScrollReveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] via-[#C49340] to-[#A07830]" />
              <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
                  Want to see your project in 3D?
                </h2>
                <p className="text-[var(--foreground)]/80 max-w-md mx-auto font-medium text-sm sm:text-base">
                  Get photorealistic renders built directly from your project drawings.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                  <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-[var(--accent)] font-bold transition-all hover:scale-105 active:scale-95 shadow-xl">
                    Request a Render Quote →
                  </Link>
                  <Link href="/projects" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/15 text-[var(--foreground)] font-bold border border-white/20 hover:bg-white/25 transition-all">
                    See Our Projects
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
