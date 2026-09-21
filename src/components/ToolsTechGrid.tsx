'use client';

import React from 'react';
import { ScrollReveal, StaggerContainer } from '@/components/Animations';

const tools = [
  { name: 'AutoCAD', category: 'Drafting' },
  { name: 'Revit', category: 'BIM' },
  { name: '3ds Max', category: '3D' },
  { name: 'SketchUp', category: '3D' },
  { name: 'Lumion Pro', category: 'Rendering' },
  { name: 'Corona Renderer', category: 'Rendering' },
  { name: 'Unreal Engine 5', category: 'Real-Time 3D' },
  { name: 'Enercalc', category: 'Structural' },
  { name: 'RISA-3D', category: 'Structural' },
  { name: 'Tekla Structures', category: 'Steel Detailing' },
  { name: 'Navisworks', category: 'Clash Detection' },
  { name: 'Bluebeam Revu', category: 'Takeoff' },
  { name: 'PlanSwift', category: 'Estimation' },
  { name: 'RSMeans 2024', category: 'Cost Data' },
  { name: 'WoodWorks', category: 'Timber' },
  { name: 'SDS2', category: 'Steel Detailing' },
];

const categoryColors: Record<string, string> = {
  'Drafting': 'bg-sky-500/10 text-sky-700 border-sky-200',
  'BIM': 'bg-indigo-500/10 text-indigo-700 border-indigo-200',
  '3D': 'bg-violet-500/10 text-violet-700 border-violet-200',
  'Rendering': 'bg-rose-500/10 text-rose-700 border-rose-200',
  'Real-Time 3D': 'bg-fuchsia-500/10 text-fuchsia-700 border-fuchsia-200',
  'Structural': 'bg-amber-500/10 text-amber-700 border-amber-200',
  'Steel Detailing': 'bg-orange-500/10 text-orange-700 border-orange-200',
  'Clash Detection': 'bg-teal-500/10 text-teal-700 border-teal-200',
  'Takeoff': 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
  'Estimation': 'bg-lime-500/10 text-lime-700 border-lime-200',
  'Cost Data': 'bg-cyan-500/10 text-cyan-700 border-cyan-200',
  'Timber': 'bg-yellow-500/10 text-yellow-800 border-yellow-200',
};

export function ToolsTechGrid() {
  return (
    <section className="py-24 lg:py-28 bg-[var(--surface-elevated)] border-y border-[var(--border)] relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[var(--accent)]/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto space-y-5 mb-14">
            <div className="accent-line mx-auto" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--border)] text-xs font-mono text-[var(--accent)] font-bold shadow-xs">
              <span>Tools & Technology</span>
            </div>
            <h2 className="heading-section text-[var(--foreground)]">
              Industry-standard software. No shortcuts.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
              We work with the same professional tools used by top-tier architecture firms, structural engineers, and construction estimators worldwide.
            </p>
          </div>
        </ScrollReveal>

        {/* Tools Grid */}
        <StaggerContainer className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {tools.map((tool) => {
            const colorClass = categoryColors[tool.category] || 'bg-slate-100 text-slate-700 border-slate-200';
            return (
              <div
                key={tool.name}
                className="reveal group"
              >
                <div className={`flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-[1.04] hover:border-[var(--accent)]/40 cursor-default ${colorClass}`}>
                  <span className="text-sm sm:text-[15px] font-bold tracking-tight">{tool.name}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider opacity-60 hidden sm:inline">
                    {tool.category}
                  </span>
                </div>
              </div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
