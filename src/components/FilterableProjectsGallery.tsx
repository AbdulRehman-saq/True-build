'use client';

import React, { useState } from 'react';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'drafting' | '3d-design' | 'estimation';
  categoryLabel: string;
  location: string;
  summary: string;
  specs: string[];
  imageBgClass: string;
}

export const projectsList: ProjectItem[] = [
  {
    id: 'single-family-build',
    title: 'Single-Family Custom Home Permit Set',
    category: 'drafting',
    categoryLabel: 'Residential · Drafting & Engineering',
    location: 'Austin, TX',
    summary: 'Full architectural floor plans, exterior elevations, foundation details, and structural calculations engineered for immediate city permit review.',
    specs: ['4,200 Sq Ft', 'Structural PE Stamp', 'Passed Review First Submission'],
    imageBgClass: 'from-amber-900/40 to-slate-900',
  },
  {
    id: 'interior-remodel-3d',
    title: 'Modern Luxury Interior Remodel Renders',
    category: '3d-design',
    categoryLabel: 'Residential · 3D Design',
    location: 'Miami, FL',
    summary: 'Photorealistic interior 3D visualizations with custom lighting profiles, cabinetry details, and material studies used for client approval before demo.',
    specs: ['4K Photorealistic Renders', 'Custom Material Mapping', '0 Design Change Orders'],
    imageBgClass: 'from-blue-900/40 to-slate-900',
  },
  {
    id: 'restaurant-exterior-concept',
    title: 'Commercial Restaurant Build-Out & Renders',
    category: '3d-design',
    categoryLabel: 'Commercial · 3D Design & MEP',
    location: 'Dallas, TX',
    summary: 'Exterior rendering package and MEP coordination drawings prepared for franchise landlord presentations and local zoning board review.',
    specs: ['Landlord Submittal Set', 'HVAC & Electrical Coordination', 'Landscaping Renders'],
    imageBgClass: 'from-emerald-900/40 to-slate-900',
  },
  {
    id: 'adu-cost-estimate',
    title: 'Detached ADU Material Takeoff & Cost Estimate',
    category: 'estimation',
    categoryLabel: 'Residential · Estimation',
    location: 'Denver, CO',
    summary: 'Comprehensive trade-by-trade takeoff and labor cost forecast delivered under 24 hours, giving the contractor a defensible bid package.',
    specs: ['24-Hour Turnaround', '97% Estimate Accuracy', 'Full Trade Breakout'],
    imageBgClass: 'from-amber-950/50 to-slate-900',
  },
  {
    id: 'tenant-improvement-set',
    title: 'Commercial Retail Tenant Improvement Drawing Set',
    category: 'drafting',
    categoryLabel: 'Commercial · Drafting & Engineering',
    location: 'Atlanta, GA',
    summary: 'Complete architectural interior layout, partition details, reflected ceiling plan, and life safety sheet for a 12,000 sq ft retail space.',
    specs: ['12,000 Sq Ft Retail', 'Life Safety & ADA Compliance', 'Permit Ready'],
    imageBgClass: 'from-purple-900/40 to-slate-900',
  },
  {
    id: 'adu-pergola-permit-set',
    title: 'Accessory Dwelling Unit & Covered Deck Set',
    category: 'drafting',
    categoryLabel: 'Residential · Drafting',
    location: 'Phoenix, AZ',
    summary: 'Custom lot site plan, structural timber engineering, and patio cover construction details engineered to withstand high wind load codes.',
    specs: ['High-Wind Load Calculations', 'Site Plan & Utility Hookup', 'PE Stamp Included'],
    imageBgClass: 'from-amber-900/30 to-slate-900',
  },
];

export function FilterableProjectsGallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'drafting' | '3d-design' | 'estimation'>('all');

  const filtered = projectsList.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'drafting', label: 'Drafting & Engineering' },
          { id: '3d-design', label: '3D Renders' },
          { id: 'estimation', label: 'Estimation & Takeoffs' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeFilter === f.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-[var(--foreground)] hover:border-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-xl"
          >
            <div>
              {/* Architectural Card Visual Header */}
              <div
                className={`h-48 bg-gradient-to-br ${item.imageBgClass} p-6 border-b border-slate-800 relative flex flex-col justify-between overflow-hidden`}
              >
                {/* Subtle blueprint grid overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                <span className="relative text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-md self-start border border-amber-500/30">
                  {item.categoryLabel}
                </span>
                <div>
                  <span className="text-xs text-slate-400 font-mono block">Location:</span>
                  <span className="text-sm font-semibold text-[var(--foreground)]">{item.location}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.summary}</p>

                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-2">
                  {item.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-slate-950 text-amber-300 px-2.5 py-1 rounded border border-slate-800"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
