'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/Animations';
import { QuoteButton } from '@/components/QuoteModal';

const faqList = [
  { cat: 'drafting', q: "Can you draft using our firm's existing drawing templates?", a: "Yes. When acting as an extended drafting partner, we draft directly into your CAD/BIM templates, adhering to your layer standards, font hierarchies, and title blocks." },
  { cat: 'drafting', q: "What is included in a residential permit drafting set?", a: "Our permit-ready sets include site plans, dimensioned floor plans, exterior elevations, foundation plans, roof plans, electrical/ceiling layouts, and door & window schedules sized for city code compliance." },
  { cat: 'engineering', q: "Do you provide PE stamps for plan approval?", a: "Yes. We provide PE-stamped structural and MEP engineering sets in all 11 licensed states (TX, FL, CA, GA, CO, MA, AZ, UT, KY, NC, SC)." },
  { cat: 'engineering', q: "What engineering services do you handle?", a: "We perform structural timber and steel design, foundation load calculations, load-bearing wall removal evaluations, MEP system layouts, and energy calculations." },
  { cat: 'shop-drawings', q: "What types of shop drawings do you produce?", a: "We produce structural steel erection drawings, precast concrete and rebar layout drawings, architectural casework/millwork shop sets, MEP coordination sheets, and glass curtain wall shop drawings." },
  { cat: 'shop-drawings', q: "Are your shop drawings submittal-ready?", a: "Yes. Every shop drawing set is prepared for architect and engineer review, redline, and approval before fabrication begins. We format drawings to your submittal standards so they're ready for the approval chain." },
  { cat: '3d-design', q: "Do you create both interior and exterior renders?", a: "Yes. We create photorealistic interior and exterior renders, material and lighting studies, and 4K walkthrough animations for custom homes, ADUs, restaurants, and commercial projects." },
  { cat: '3d-design', q: "What project types do you render for?", a: "We produce renders for residential projects (remodels, additions, new builds), restaurants (franchise presentations, investor decks), and commercial buildings (permitting visuals, leasing packages, financing decisions)." },
  { cat: 'estimation', q: "How accurate are your cost estimates?", a: "Our estimators maintain 95-97% accuracy across trades by using continuously updated regional material and labor pricing databases specific to your project zip code." },
  { cat: 'estimation', q: "How fast can we receive a completed takeoff?", a: "Standard turnaround is 24-48 hours. For tight bidding deadlines, we offer 1-hour rush quote response options." },
  { cat: 'estimation', q: "Do you offer repeat bidding discounts?", a: "Yes! We offer discounted pricing packages for general contractors and subcontractors who partner with us for ongoing bid capacity." },
  { cat: 'general', q: "Which states are you licensed in?", a: "We hold active licenses across 11 states: Texas, Florida, California, Georgia, Colorado, Massachusetts, Arizona, Utah, Kentucky, North Carolina, and South Carolina." },
  { cat: 'general', q: "Do you work with individual homeowners?", a: "Yes. We work directly with homeowners, custom home builders, commercial general contractors, architecture firms, and specialty fabricators." },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'drafting', label: 'Drafting' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'shop-drawings', label: 'Shop Drawings' },
  { id: '3d-design', label: '3D Design' },
  { id: 'estimation', label: 'Estimation' },
  { id: 'general', label: 'General' },
];

export default function FAQPage() {
  const [activeCat, setActiveCat] = useState('all');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = faqList.filter((f) => activeCat === 'all' || f.cat === activeCat);

  return (
    <>
      <section className="pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
          <div>
            <ScrollReveal><div className="accent-line mb-5" /></ScrollReveal>
            <ScrollReveal delay={80}>
              <h1 className="heading-display text-[var(--foreground)]">
                Frequently asked{' '}<span className="text-gradient">questions.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="body-large text-[var(--text-secondary)] max-w-xl mt-4">
                Answers about our drafting, engineering, shop drawings, 3D design, and estimating services.
              </p>
            </ScrollReveal>
          </div>

          {/* Filter pills */}
          <ScrollReveal delay={200}>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setActiveCat(c.id); setOpenIdx(null); }}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeCat === c.id
                      ? 'bg-[var(--accent)] text-white font-bold shadow-md shadow-[var(--accent)]/15'
                      : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--text-muted)]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Accordion */}
          <div className="space-y-3">
            {filtered.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={i}
                  className={`bg-[var(--surface)] border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-[var(--accent)]/30' : 'border-[var(--border)]'
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 hover:bg-[var(--foreground)]/[0.02] transition-colors"
                  >
                    <span className="font-semibold text-[var(--foreground)] text-[15px] leading-snug pr-4">{faq.q}</span>
                    <div className={`w-7 h-7 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen ? 'rotate-45 border-[var(--accent)] text-[var(--accent)]' : 'text-[var(--text-muted)]'
                    }`}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)]">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Still have a question */}
          <ScrollReveal delay={300}>
            <div className="text-center pt-8">
              <p className="text-[var(--text-secondary)] mb-4">Still have a question?</p>
              <QuoteButton className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm transition-all hover:bg-[var(--accent-light)] active:scale-95 shadow-md shadow-[var(--accent)]/15">
                Contact & Inquire →
              </QuoteButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
