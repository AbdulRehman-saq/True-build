'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ProjectItem } from './FilterableProjectsGallery';
import { useQuoteModal } from './QuoteModal';
import { useModelExplorer } from './ModelExplorer3DModal';
import { motion, AnimatePresence } from './FramerMotion';
import {
  X,
  Maximize2,
  Minimize2,
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Phone,
  FileCheck,
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const { openQuoteModal } = useQuoteModal();
  const { openModelExplorer } = useModelExplorer();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!mounted || !project) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-hidden pointer-events-auto">
        {/* Backdrop — covers the entire screen directly on document.body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Container — Centered in viewport with max-h-[88vh] and responsive width */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className={`relative w-full bg-white border border-[var(--border)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[88vh] transition-all duration-300 ${
            isExpanded ? 'max-w-6xl h-[88vh]' : 'max-w-4xl'
          }`}
        >
          {/* Top Decorative Amber Stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[var(--accent)] via-amber-400 to-[var(--accent)] shrink-0" />

          {/* Modal Header — Sticky at Top */}
          <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-[var(--border)] bg-slate-50/90 backdrop-blur-sm flex items-center justify-between shrink-0 gap-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--accent)] text-white shrink-0 shadow-xs">
                {project.categoryLabel}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:inline truncate">
                📍 {project.location}
              </span>
            </div>

            {/* Header Action Controls: Size Adjuster & Close */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Size Adjust Toggle Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Restore Standard Size' : 'Expand / Adjust Size'}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-[var(--border)] bg-white transition-all flex items-center gap-1.5 text-xs font-mono shadow-xs cursor-pointer"
                aria-label="Adjust modal size"
              >
                {isExpanded ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span className="hidden sm:inline font-semibold">Standard</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span className="hidden sm:inline font-semibold">Adjust Size</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 border border-[var(--border)] bg-white transition-all shadow-xs cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid md:grid-cols-12 gap-0 min-h-full">
              {/* Left Column: Image & Tooling Showcase */}
              <div className="md:col-span-5 lg:col-span-6 bg-slate-950 relative min-h-[220px] sm:min-h-[280px] md:min-h-full flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="object-cover opacity-90"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-black/40" />
                </div>

                {/* Badges on image */}
                <div className="relative z-10 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-lg text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur-md border border-white/20">
                    📍 {project.location}
                  </span>

                  {project.has3DModel && (
                    <button
                      onClick={() => {
                        onClose();
                        openModelExplorer();
                      }}
                      className="px-3 py-1 rounded-lg text-[10px] font-mono font-bold bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white shadow-md flex items-center gap-1.5 hover:scale-105 transition-all cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Launch 3D BIM</span>
                    </button>
                  )}
                </div>

                {/* Software & Tooling Strip */}
                <div className="relative z-10 p-4 sm:p-5 border-t border-white/10 bg-black/60 backdrop-blur-md">
                  <div className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Software & Engineering Stack</span>
                  </div>
                  <div className="text-xs text-white/90 font-mono mt-1">
                    {project.toolsUsed || 'AutoCAD · Revit BIM · Bluebeam · PE Stamped Calculations'}
                  </div>
                </div>
              </div>

              {/* Right Column: Case Study Specs & Scope Details */}
              <div className="md:col-span-7 lg:col-span-6 p-5 sm:p-7 md:p-8 flex flex-col justify-between space-y-6 bg-white">
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider font-bold">
                      Architectural Case Study
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold text-[var(--foreground)] tracking-tight mt-1 leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2.5 pt-3 border-t border-[var(--border)]">
                    <span className="text-xs font-mono font-bold uppercase text-[var(--foreground)] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Key Scope & Deliverables</span>
                    </span>
                    <div className="space-y-2">
                      {project.specs.map((spec, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[var(--foreground)] bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-medium">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full Scope & Code Compliance */}
                  {project.fullScope && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-amber-500/5 border border-amber-400/30 text-xs text-[var(--text-secondary)] leading-relaxed space-y-1">
                      <strong className="text-[var(--foreground)] block font-mono text-[11px] uppercase text-[var(--accent)]">
                        Engineering Code Compliance & Submittal:
                      </strong>
                      <p>{project.fullScope}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Sticky Footer Bar — Always Visible at bottom */}
          <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-t border-[var(--border)] bg-slate-50/90 backdrop-blur-sm flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-4 text-[11px] font-mono text-[var(--text-muted)]">
              <span className="hidden sm:inline">⚡ Guaranteed 24-48hr Turnaround</span>
              <a
                href="tel:+18327373912"
                className="text-[var(--accent)] font-bold hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>(832) 737-3912</span>
              </a>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {project.has3DModel && (
                <button
                  onClick={() => {
                    onClose();
                    openModelExplorer();
                  }}
                  className="py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900 text-white font-bold text-xs font-mono transition-all hover:bg-slate-800 flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">Inspect 3D BIM</span>
                </button>
              )}

              <button
                onClick={() => {
                  onClose();
                  openQuoteModal(project.category);
                }}
                className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[var(--accent)]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Request Similar Project Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
