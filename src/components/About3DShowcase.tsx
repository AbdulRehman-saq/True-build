'use client';

import React, { useState } from 'react';
import { Architectural3DViewer, ViewerMode } from './Architectural3DViewer';
import { useModelExplorer } from './ModelExplorer3DModal';
import { ScrollReveal } from './Animations';
import { Box, Layers, Compass, ShieldCheck, Sparkles, Maximize2, CheckCircle2 } from 'lucide-react';

export function About3DShowcase() {
  const { openModelExplorer } = useModelExplorer();
  const [activeMode, setActiveMode] = useState<ViewerMode>('structural');

  const engineeringSpecs = [
    {
      title: 'BIM LOD 350 Precision',
      desc: 'Elements modeled with precise geometric quantities, dimensions, and structural orientations ready for fabrication.',
    },
    {
      title: 'ASCE 7-22 Seismic & Wind Analysis',
      desc: 'Shear wall schedules, hold-downs, and roof diaphragm loads calculated for local hurricane and seismic zones.',
    },
    {
      title: 'Clash-Detected Utility Routing',
      desc: 'Structural steel and timber framing coordinated with HVAC ductwork, electrical risers, and plumbing chases.',
    },
    {
      title: 'PE-Stamped Plan Approval',
      desc: 'Every calculation packet and drawing set sealed by a licensed Professional Engineer across 11 states.',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950 text-white blueprint-grid">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/[0.07] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Engineering Engine</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
                Explore our digital <span className="text-gradient">engineering models.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p className="text-slate-400 max-w-2xl text-base leading-relaxed">
                Interact directly with an engineered structural and architectural model below. Rotate, zoom, and inspect framing, foundation beams, and clash-detected assemblies.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={160}>
            <button
              onClick={() => openModelExplorer()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer shrink-0"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Full Screen 3D BIM Explorer</span>
            </button>
          </ScrollReveal>
        </div>

        {/* 3D Model Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main 3D Canvas Card */}
          <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[500px]">
            {/* 3D Canvas */}
            <div className="relative flex-1 min-h-[440px]">
              <Architectural3DViewer
                initialMode={activeMode}
                showControls={true}
                compact={false}
                className="w-full h-full min-h-[440px]"
                onOpenModal={openModelExplorer}
              />
            </div>
          </div>

          {/* Side Specifications Card */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>Engineering Standards</span>
              </div>
              <h3 className="text-xl font-bold text-white font-heading mb-4">
                What makes our models permit-ready
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Our drafting and engineering are never superficial visuals. Every joint, span, and member is modeled to municipal building code requirements.
              </p>

              <div className="space-y-4">
                {engineeringSpecs.map((spec, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/60 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{spec.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-normal mt-0.5">{spec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Licensed PE Stamped</span>
              </span>
              <span className="font-mono font-bold text-amber-400">11 US States</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
