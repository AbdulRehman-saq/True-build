'use client';

import React, { useState } from 'react';
import { Architectural3DViewer, ViewerMode } from './Architectural3DViewer';
import { useModelExplorer } from './ModelExplorer3DModal';
import { ScrollReveal } from './Animations';
import { Box, Layers, Compass, CheckCircle2, FileText, Maximize2, Sparkles } from 'lucide-react';

export function Faq3DDeliverable() {
  const { openModelExplorer } = useModelExplorer();
  const [activeMode, setActiveMode] = useState<ViewerMode>('blueprint');

  const deliverableSheets = [
    { code: 'A-101', name: 'Site Plan & Zoning Setbacks', type: 'Architectural' },
    { code: 'A-102', name: 'Dimensioned Floor Plans', type: 'Architectural' },
    { code: 'A-201', name: 'Exterior Elevations (4-Sided)', type: 'Architectural' },
    { code: 'S-101', name: 'PE-Stamped Foundation Plan', type: 'Structural' },
    { code: 'S-201', name: 'Roof & Floor Framing Layouts', type: 'Structural' },
    { code: 'MEP-1', name: 'Electrical & Mechanical Schedules', type: 'Engineering' },
  ];

  const fileFormats = [
    { ext: '.DWG', desc: 'AutoCAD native drawing' },
    { ext: '.RVT', desc: 'Revit BIM model' },
    { ext: '.PDF', desc: 'Vector 24x36 Arch D' },
    { ext: '.IFC', desc: 'Open BIM coordination' },
    { ext: '.XLSX', desc: 'Itemized takeoff bid' },
  ];

  return (
    <section className="py-20 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden blueprint-grid my-12">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Deliverable Inspection 3D Model</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading">
              What does an approved deliverable package look like?
            </h2>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              Every drawing package is delivered in your choice of formats, fully coordinated between 3D BIM geometry, 2D permit sheet sets, and PE calculation packets.
            </p>
          </div>

          <button
            onClick={() => openModelExplorer()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer shrink-0"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Launch 3D BIM Model Explorer</span>
          </button>
        </div>

        {/* 3D Model Canvas & Sheet Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive 3D Canvas */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden flex flex-col min-h-[420px] shadow-xl">
            <div className="relative flex-1 min-h-[400px]">
              <Architectural3DViewer
                initialMode={activeMode}
                showControls={true}
                compact={true}
                className="w-full h-full min-h-[400px]"
                onOpenModal={openModelExplorer}
              />
            </div>
          </div>

          {/* Deliverables Sheet Checklist & Formats */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Standard Permit Sheets Included
                </span>
                <span className="text-[11px] text-slate-400 font-mono">24" × 36" Arch D</span>
              </div>

              <div className="space-y-2.5">
                {deliverableSheets.map((sheet) => (
                  <div
                    key={sheet.code}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[11px]">
                        {sheet.code}
                      </span>
                      <span className="font-medium text-slate-200">{sheet.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{sheet.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivered File Formats */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-2.5">
                Delivered File Formats
              </span>
              <div className="flex flex-wrap gap-2">
                {fileFormats.map((f) => (
                  <div
                    key={f.ext}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs flex items-center gap-1.5"
                  >
                    <span className="font-mono font-bold text-amber-400">{f.ext}</span>
                    <span className="text-slate-400 text-[10px] hidden sm:inline">({f.desc})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
