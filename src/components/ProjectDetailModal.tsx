'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { ProjectItem } from './FilterableProjectsGallery';
import { useQuoteModal } from './QuoteModal';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const { openQuoteModal } = useQuoteModal();

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

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white border border-[var(--border)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 animate-modal my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:text-[var(--accent)] hover:scale-105 transition-all shadow-md"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Media */}
          <div className="md:col-span-6 bg-slate-950 relative min-h-[280px] sm:min-h-[380px] md:min-h-full flex flex-col justify-between">
            <div className="absolute inset-0">
              <Image
                src={project.imageSrc}
                alt={project.title}
                fill
                className="object-cover opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
            </div>

            {/* Top badges */}
            <div className="relative z-10 p-5 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[var(--accent)] text-white shadow-md">
                {project.categoryLabel}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono text-white/90 bg-black/60 backdrop-blur border border-white/20">
                📍 {project.location}
              </span>
            </div>

            {/* Bottom info bar */}
            <div className="relative z-10 p-5 border-t border-white/10 bg-black/40 backdrop-blur-sm">
              <div className="text-[11px] font-mono text-amber-300 uppercase tracking-wider">
                Software & Tooling
              </div>
              <div className="text-xs text-white/90 font-mono mt-0.5">
                {project.toolsUsed || 'AutoCAD · Revit BIM · Bluebeam · PE Stamped Calculations'}
              </div>
            </div>
          </div>

          {/* Right Column: Case Study Details */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider font-semibold">
                  Architectural Case Study
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight mt-1 leading-snug">
                  {project.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.summary}
              </p>

              {/* Highlights & Deliverables */}
              <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                <span className="text-xs font-mono font-bold uppercase text-[var(--text-secondary)]">
                  Key Scope & Deliverables
                </span>
                <div className="space-y-1.5">
                  {project.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[var(--foreground)]">
                      <span className="text-[var(--accent)] font-bold">✓</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Scope Details */}
              {project.fullScope && (
                <div className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--text-secondary)] leading-relaxed">
                  <strong className="text-[var(--foreground)] block mb-1 font-mono text-[11px] uppercase">
                    Engineering & Code Compliance:
                  </strong>
                  {project.fullScope}
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[var(--border)] space-y-2.5">
              <button
                onClick={() => {
                  onClose();
                  openQuoteModal(project.category);
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[var(--accent)]/20 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Request Similar Project Estimate</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono px-1">
                <span>Guaranteed 24-48hr Turnaround</span>
                <a href="tel:+18327373912" className="text-[var(--accent)] hover:underline">
                  (832) 737-3912
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
