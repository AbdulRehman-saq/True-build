'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/Animations';
import { QuoteButton } from '@/components/QuoteModal';
import { Faq3DDeliverable } from '@/components/Faq3DDeliverable';
import { FaqTurnaroundCalculator } from '@/components/FaqTurnaroundCalculator';
import { FaqStateChecker } from '@/components/FaqStateChecker';
import { ContactFormSection } from '@/components/ContactFormSection';
import {
  ShieldCheck,
  Clock,
  FileCheck,
  Layers,
  Compass,
  DollarSign,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

const faqList = [
  {
    cat: 'drafting',
    q: "Can you draft using our firm's existing drawing templates?",
    a: "Yes. When acting as an extended drafting partner, we draft directly into your CAD/BIM templates, adhering to your layer standards, font hierarchies, dimension styles, and custom firm title blocks so your deliverables look 100% native.",
  },
  {
    cat: 'drafting',
    q: "What is included in a residential permit drafting set?",
    a: "Our permit-ready sets include site plans, dimensioned floor plans, 4-sided exterior elevations, foundation plans, roof plans, electrical/ceiling layouts, and comprehensive door & window schedules sized for city code compliance.",
  },
  {
    cat: 'drafting',
    q: "What happens if our local city building department issues plan check comments?",
    a: "We provide a 100% plan check approval guarantee. If the plan examiner requests revisions, redlines, or structural clarifications, our engineers revise and update the set at zero additional cost until approved.",
  },
  {
    cat: 'engineering',
    q: "Do you provide PE stamps for plan approval?",
    a: "Yes. We provide PE-stamped structural and MEP engineering sets in all 11 licensed states (Texas, Florida, California, Georgia, Colorado, Massachusetts, Arizona, Utah, Kentucky, North Carolina, and South Carolina).",
  },
  {
    cat: 'engineering',
    q: "What engineering calculations are included in a structural package?",
    a: "Packages include full gravity and lateral load calculations (wind & seismic per ASCE 7), moment connection details, shear wall schedules, beam and header sizing, and foundation geotechnical bearing capacity analysis.",
  },
  {
    cat: 'engineering',
    q: "Do you handle load-bearing wall removals and open-concept remodels?",
    a: "Yes. We evaluate existing spans, calculate replacement steel or LVL flush beam sizing, design required point load transfer paths to footings, and issue a PE-sealed drawing set for residential remodels.",
  },
  {
    cat: 'shop-drawings',
    q: "What types of shop drawings do you produce?",
    a: "We produce structural steel erection drawings, precast concrete and rebar layout drawings, architectural casework/millwork shop sets, MEP coordination sheets, and glass curtain wall shop drawings.",
  },
  {
    cat: 'shop-drawings',
    q: "Are your shop drawings submittal-ready for GCs and fabricators?",
    a: "Yes. Every shop drawing set is prepared for architect and engineer review, redline, and approval before fabrication begins. We format drawings to your submittal standards so they are ready for the approval chain.",
  },
  {
    cat: '3d-design',
    q: "Do you create both interior and exterior renders?",
    a: "Yes. We create photorealistic interior and exterior renders, material and daylighting simulations, and 4K walkthrough animations for custom homes, ADUs, restaurants, and commercial projects.",
  },
  {
    cat: '3d-design',
    q: "What 3D and BIM file formats do you deliver?",
    a: "We deliver native Autodesk Revit (.RVT), AutoCAD (.DWG), SketchUp (.SKP), Rhino, Navisworks (.NWD), IFC open BIM, and high-resolution 4K TIFF/JPEG renderings.",
  },
  {
    cat: 'estimation',
    q: "How accurate are your cost estimates?",
    a: "Our estimators maintain 95-97% accuracy across trades by using continuously updated regional material and labor pricing databases specific to your project zip code.",
  },
  {
    cat: 'estimation',
    q: "How fast can we receive a completed takeoff?",
    a: "Standard turnaround is 24-48 hours. For tight bidding deadlines, we offer 1-hour rush quote response options to ensure you submit before the bid window closes.",
  },
  {
    cat: 'estimation',
    q: "Do you offer repeat bidding discounts for general contractors?",
    a: "Yes! We offer discounted pricing packages and monthly retainer arrangements for general contractors and subcontractors who partner with us for ongoing bid capacity.",
  },
  {
    cat: 'general',
    q: "Which states are you licensed in?",
    a: "We hold active Professional Engineer licenses across 11 states: Texas, Florida, California, Georgia, Colorado, Massachusetts, Arizona, Utah, Kentucky, North Carolina, and South Carolina.",
  },
  {
    cat: 'general',
    q: "Do you work with individual homeowners as well as firms?",
    a: "Yes. We work directly with custom home builders, commercial general contractors, architecture firms, and individual homeowners planning ground-up builds, additions, or ADUs.",
  },
];

const categories = [
  { id: 'all', label: 'All Questions' },
  { id: 'drafting', label: 'Drafting & Plans' },
  { id: 'engineering', label: 'PE Engineering' },
  { id: 'shop-drawings', label: 'Shop Drawings' },
  { id: '3d-design', label: '3D BIM & Renders' },
  { id: 'estimation', label: 'Takeoffs & Bids' },
  { id: 'general', label: 'Licensing & General' },
];

export default function FAQPage() {
  const [activeCat, setActiveCat] = useState('all');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = faqList.filter((f) => activeCat === 'all' || f.cat === activeCat);

  return (
    <>
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 relative overflow-hidden blueprint-grid-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Header */}
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="accent-line mb-5" />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold mb-4">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions & Interactive Guides</span>
              </div>
              <h1 className="heading-display text-[var(--foreground)]">
                Everything you need to know about{' '}
                <span className="text-gradient">our process & deliverables.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="body-large text-[var(--text-secondary)] mt-4">
                Clear answers regarding drafting standards, PE engineering stamp coverage in 11 states, 24-48hr estimation turnaround, and city permit approvals.
              </p>
            </ScrollReveal>
          </div>

          {/* 4 Quick Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5" />,
                title: 'PE Stamp Coverage',
                desc: 'Active licenses in 11 states. Every calculation and sheet is certified.',
              },
              {
                icon: <Clock className="w-5 h-5" />,
                title: '24–48hr Turnaround',
                desc: 'Standard turnaround across trades with 1-hour rush options.',
              },
              {
                icon: <FileCheck className="w-5 h-5" />,
                title: 'Permit Guarantee',
                desc: 'Zero-cost revisions for municipal plan check comments.',
              },
              {
                icon: <DollarSign className="w-5 h-5" />,
                title: 'Contractor Retainers',
                desc: 'Volume pricing for general contractors bidding multiple projects.',
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 60}>
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[var(--border)] shadow-sm hover:border-amber-500/40 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-sm text-[var(--foreground)] mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Interactive Component 1: 3D Deliverables Model Explorer */}
          <Faq3DDeliverable />

          {/* Interactive Component 2: Project Turnaround & Deliverables Estimator */}
          <FaqTurnaroundCalculator />

          {/* Interactive Component 3: State PE Licensing & Building Code Lookup Tool */}
          <FaqStateChecker />

          {/* FAQ Accordion Section */}
          <div className="pt-8 space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <h2 className="heading-section text-[var(--foreground)]">
                Detailed Questions & Answers
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Filter by discipline or search topics below
              </p>

              {/* Filter pills */}
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCat(c.id);
                      setOpenIdx(null);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      activeCat === c.id
                        ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                        : 'bg-white dark:bg-slate-900 border border-[var(--border)] text-[var(--text-secondary)] hover:border-amber-400'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion Items */}
            <div className="space-y-3 pt-4">
              {filtered.map((faq, i) => {
                const isOpen = openIdx === i;
                return (
                  <div
                    key={i}
                    className={`bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? 'border-amber-500 shadow-md shadow-amber-500/5'
                        : 'border-[var(--border)] hover:border-amber-400/50'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 cursor-pointer"
                    >
                      <span className="font-bold text-[var(--foreground)] text-[15px] leading-snug pr-4">
                        {faq.q}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'rotate-45 border-amber-500 text-amber-500 bg-amber-500/10'
                            : 'text-[var(--text-muted)] bg-[var(--surface)]'
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)]">
                        <p className="pt-4">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Direct Inquiries & Quote Form */}
          <div className="pt-16 max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="font-mono text-xs uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                Still have an unaddressed scope requirement?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] font-heading">
                Submit your project drawings or question directly
              </h3>
            </div>
            <ContactFormSection />
          </div>
        </div>
      </section>
    </>
  );
}
