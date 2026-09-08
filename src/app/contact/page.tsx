'use client';

import React, { useState } from 'react';
import { ScrollReveal } from '@/components/Animations';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', projectType: '', timeline: '', details: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-[var(--foreground)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20 transition-all duration-200";

  return (
    <>
      <section className="pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left info */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-8">
                <div>
                  <ScrollReveal><div className="accent-line mb-5" /></ScrollReveal>
                  <ScrollReveal delay={80}>
                    <h1 className="heading-display text-[var(--foreground)]">
                      Let&apos;s talk about{' '}<span className="text-gradient">your project.</span>
                    </h1>
                  </ScrollReveal>
                  <ScrollReveal delay={160}>
                    <p className="text-[var(--text-secondary)] mt-4 leading-relaxed">
                      Reach out for a drafting quote, engineering review, 3D design consultation, or cost estimate. Standard turnaround is 24-48 hours.
                    </p>
                  </ScrollReveal>
                </div>

                <ScrollReveal delay={200}>
                  <div className="space-y-5 text-sm">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-1">Phone</span>
                      <a href="tel:+18327373912" className="text-lg font-bold text-[var(--foreground)] font-mono hover:text-[var(--accent)] transition-colors">
                        (832) 737-3912
                      </a>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-1">Email</span>
                      <a href="mailto:info@proarchestdesign.com" className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
                        info@proarchestdesign.com
                      </a>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-1">Office</span>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        Shady Trail PMB 242<br />Dallas, TX 75229
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[var(--border)]">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-1">Licensed States</span>
                      <p className="text-xs text-[var(--text-muted)] font-mono">
                        TX · FL · CA · GA · CO · MA · AZ · UT · KY · NC · SC
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <ScrollReveal variant="right">
                <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--accent)]/[0.03] rounded-full blur-[80px] pointer-events-none" />

                  {submitted ? (
                    <div className="text-center py-16 space-y-5 relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--foreground)]">Quote Request Received</h3>
                      <p className="text-[var(--text-secondary)] max-w-md mx-auto text-sm">
                        Thank you, <strong className="text-[var(--foreground)]">{form.name}</strong>. A member of our team will review your project details and respond within 24 hours.
                      </p>
                      <button onClick={() => setSubmitted(false)} className="mt-4 px-6 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] font-medium text-xs hover:border-[var(--text-muted)] transition-colors">
                        Submit Another
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-2">Full Name *</label>
                          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Marcus Vance" className={inputClass} />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-2">Email *</label>
                          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="marcus@firmdomain.com" className={inputClass} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-2">Phone *</label>
                          <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" className={inputClass} />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-2">Service Needed</label>
                          <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputClass}>
                            <option value="">Select a service</option>
                            <option>Drafting & Floor Plans</option>
                            <option>Structural & MEP Engineering</option>
                            <option>Fabrication Shop Drawings</option>
                            <option>3D Rendering & Visualization</option>
                            <option>Cost Estimation & Takeoff</option>
                            <option>Multiple Services</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-2">Project Type</label>
                          <select value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })} className={inputClass}>
                            <option value="">Select category</option>
                            <option>Residential (Remodel, ADU, Home)</option>
                            <option>Commercial (Ground-up, Tenant Fit-out)</option>
                            <option>Architecture/Engineering Firm</option>
                            <option>Specialty Subcontractor/Fabricator</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-2">Timeline</label>
                          <select value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className={inputClass}>
                            <option value="">Select timeline</option>
                            <option>Standard (24-48 Hours)</option>
                            <option>1-Hour Rush Quote</option>
                            <option>Flexible / Bidding Phase</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-2">Project Details</label>
                        <textarea rows={4} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Tell us about the project size, location, required sheets, or specific bid deadline..." className={inputClass} />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-[15px] transition-all duration-300 btn-shimmer active:scale-[0.99] shadow-lg shadow-[var(--accent)]/15"
                      >
                        Submit Quote Request →
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
