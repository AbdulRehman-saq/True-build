'use client';

import React, { useState } from 'react';

export interface FAQItem {
  q: string;
  a: string;
  category: 'drafting' | 'engineering' | 'shop-drawings' | '3d-design' | 'estimation' | 'general';
}

export const faqList: FAQItem[] = [
  // Drafting
  {
    category: 'drafting',
    q: "Can you draft using our architecture firm's existing drawing templates & title blocks?",
    a: "Yes. When acting as an extended drafting partner for architecture or engineering firms, we draft directly into your CAD/BIM templates, adhering to your layer standards, font hierarchies, and title blocks."
  },
  {
    category: 'drafting',
    q: "What is typically included in a complete residential permit drafting set?",
    a: "Our permit-ready drawing sets include site plans, dimensioned floor plans, exterior elevations, foundation plans, roof plans, electrical/ceiling layouts, and door & window schedules sized for city code compliance."
  },
  // Engineering
  {
    category: 'engineering',
    q: "Do you provide PE (Professional Engineer) stamps for plan approval?",
    a: "Yes. We provide PE-stamped structural and MEP engineering calculations and drawing sets in all 11 licensed states (TX, FL, CA, GA, CO, MA, AZ, UT, KY, NC, SC)."
  },
  {
    category: 'engineering',
    q: "What engineering services do you handle for residential and commercial builds?",
    a: "We perform structural timber and steel design, foundation load calculations, load-bearing wall removal evaluations, MEP (Mechanical, Electrical, Plumbing) system layouts, and energy calculations."
  },
  // Shop Drawings
  {
    category: 'shop-drawings',
    q: "What types of fabrication shop drawings do you produce?",
    a: "We produce structural steel erection drawings, precast concrete and rebar layout drawings, architectural casework/millwork shop sets, MEP coordination sheets, and glass curtain wall shop drawings."
  },
  {
    category: 'shop-drawings',
    q: "Are your shop drawings submittal-ready for architect & engineer review?",
    a: "Absoluty. Every shop drawing set is prepared to exact submittal standards, formatted for clear redline review, architect approval, and direct shop floor fabrication."
  },
  // 3D Design
  {
    category: '3d-design',
    q: "Do you create both interior and exterior photorealistic renders?",
    a: "Yes. We create photorealistic interior and exterior renders, material and lighting studies, and 4K walkthrough animations for custom homes, ADUs, restaurants, and commercial retail projects."
  },
  {
    category: '3d-design',
    q: "How are your 3D renders created from our project files?",
    a: "We build 3D models directly from your drafted CAD files, BIM models, or hand sketches, ensuring accurate spatial dimensions, realistic material textures, and precise lighting profiles."
  },
  // Estimation & Takeoff
  {
    category: 'estimation',
    q: "How accurate are your construction cost estimates & material takeoffs?",
    a: "Our estimators maintain 95-97% accuracy across trades by using continuously updated regional material and labor pricing databases specific to your project zip code."
  },
  {
    category: 'estimation',
    q: "How fast can we receive a completed material takeoff?",
    a: "Standard estimate turnaround is 24 to 48 hours. For tight bidding deadlines, we offer 1-hour rush quote response options."
  },
  {
    category: 'estimation',
    q: "Do you offer repeat bidding discounts for contractors?",
    a: "Yes! We offer discounted pricing packages for general contractors and subcontractors who partner with us for ongoing bid capacity."
  },
  // General
  {
    category: 'general',
    q: "Which states are you licensed to provide engineering and design services in?",
    a: "We hold active licenses across 11 states: Texas, Florida, California, Georgia, Colorado, Massachusetts, Arizona, Utah, Kentucky, North Carolina, and South Carolina."
  },
  {
    category: 'general',
    q: "Do you work with individual homeowners as well as commercial firms?",
    a: "Yes. We work directly with homeowners, custom home builders, commercial general contractors, architecture firms, and specialty fabricators."
  }
];

export function FAQAccordionSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'drafting', label: 'Drafting' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'shop-drawings', label: 'Shop Drawings' },
    { id: '3d-design', label: '3D Design' },
    { id: 'estimation', label: 'Estimation' },
    { id: 'general', label: 'General' },
  ];

  const filteredFaqs = faqList.filter(
    (item) => selectedCat === 'all' || item.category === selectedCat
  );

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setSelectedCat(c.id);
              setOpenIdx(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              selectedCat === c.id
                ? 'bg-[var(--accent)] text-white font-bold shadow-md shadow-[var(--accent)]/20'
                : 'bg-white border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/60'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIdx === index;
          return (
            <div
              key={index}
              className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden transition-all shadow-xs hover:border-[var(--accent)]/60"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 hover:bg-[var(--surface-elevated)]/40 transition-colors cursor-pointer"
              >
                <span className="font-bold text-[var(--foreground)] text-base sm:text-lg flex items-center gap-3">
                  <span className="text-[var(--accent)] font-mono text-sm font-bold">Q.</span>
                  {faq.q}
                </span>
                <span className="w-8 h-8 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] font-mono text-lg font-bold shrink-0">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-3 text-[var(--text-secondary)] text-sm leading-relaxed border-t border-[var(--border)] bg-[var(--background)]/40">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
