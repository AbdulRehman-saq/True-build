'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Drafting & Floor Plans',
    projectType: 'Residential Project',
    timeline: 'Standard (24-48 hrs)',
    details: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {submitted ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
            ✓
          </div>
          <h3 className="text-2xl font-bold text-[var(--foreground)]">Quote Request Received!</h3>
          <p className="text-slate-300 max-w-md mx-auto text-sm">
            Thank you, <strong className="text-amber-400">{formData.name}</strong>. One of our lead engineers or cost estimators will review your details and reach out within 24 hours (or sooner if rush request selected).
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-6 py-2 rounded-lg bg-slate-800 text-[var(--foreground)] font-medium text-xs hover:bg-slate-700 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono font-medium uppercase text-slate-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Marcus Vance"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-medium uppercase text-slate-300 mb-2">
                Work Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="marcus@firmdomain.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono font-medium uppercase text-slate-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-medium uppercase text-slate-300 mb-2">
                Primary Service Needed *
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option>Drafting & Floor Plans</option>
                <option>Structural & MEP Engineering (PE Stamp)</option>
                <option>Fabrication Shop Drawings</option>
                <option>3D Rendering & Visualization</option>
                <option>Estimation & Material Takeoff</option>
                <option>Multiple / Extended Team Support</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono font-medium uppercase text-slate-300 mb-2">
                Project Category
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option>Residential Project (Remodel, ADU, Home)</option>
                <option>Commercial Build (Ground-up, Tenant Fit-out)</option>
                <option>Architecture & Engineering Partner Firm</option>
                <option>Specialty Subcontractor / Fabricator</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono font-medium uppercase text-slate-300 mb-2">
                Requested Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:border-amber-500 transition-colors"
              >
                <option>Standard Turnaround (24-48 Hours)</option>
                <option>1-Hour Rush Quote Needed</option>
                <option>Flexible / Bidding Phase</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium uppercase text-slate-300 mb-2">
              Project Details & Scope
            </label>
            <textarea
              rows={4}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Tell us about the project size, location, required sheets, or specific bid deadline..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[var(--foreground)] text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-amber-500/25 active:scale-[0.99]"
          >
            Submit Project Details & Request Quote →
          </button>
        </form>
      )}
    </div>
  );
}
