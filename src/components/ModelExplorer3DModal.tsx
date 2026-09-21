'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Architectural3DViewer } from './Architectural3DViewer';
import { useQuoteModal } from './QuoteModal';
import { motion, AnimatePresence } from './FramerMotion';
import { X, CheckCircle2, FileText, Compass, ShieldCheck } from 'lucide-react';

interface ModelExplorerContextType {
  isOpen: boolean;
  openModelExplorer: () => void;
  closeModelExplorer: () => void;
}

const ModelExplorerContext = createContext<ModelExplorerContextType | undefined>(undefined);

export function useModelExplorer() {
  const context = useContext(ModelExplorerContext);
  if (!context) {
    throw new Error('useModelExplorer must be used within a ModelExplorerProvider');
  }
  return context;
}

export function ModelExplorerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { openQuoteModal } = useQuoteModal();

  const openModelExplorer = () => setIsOpen(true);
  const closeModelExplorer = () => setIsOpen(false);

  return (
    <ModelExplorerContext.Provider value={{ isOpen, openModelExplorer, closeModelExplorer }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModelExplorer}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-slate-950 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
            >
              {/* Header */}
              <div className="px-5 py-4 sm:px-8 sm:py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/20 border border-[var(--accent)]/40 flex items-center justify-center text-amber-400">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>ProArch Interactive 3D BIM & Engineering Viewer</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        LIVE CAD/BIM
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Multi-Story Mixed-Use Commercial & Luxury Residential Specification
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeModelExplorer}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Content Body */}
              <div className="grid lg:grid-cols-12 gap-0 overflow-y-auto flex-1">
                {/* 3D Canvas Area */}
                <div className="lg:col-span-8 p-3 sm:p-5 flex flex-col justify-center bg-slate-950">
                  <Architectural3DViewer className="w-full h-full min-h-[420px] sm:min-h-[520px]" />
                </div>

                {/* Sidebar Engineering Specs */}
                <div className="lg:col-span-4 p-5 sm:p-6 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/40 flex flex-col justify-between space-y-6">
                  <div className="space-y-5">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                        Structural & Engineering Audit
                      </span>
                      <h4 className="text-lg font-bold text-white">Full Permit Submittal Package</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Every level is engineered to local building code (IBC/IRC 2021) with complete calculations stamped by licensed Professional Engineers.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: 'Licensed PE Stamp', detail: 'Civil & Structural in 11 States' },
                        { label: 'Permit Set Turnaround', detail: 'Guaranteed 24-48hr Rush Available' },
                        { label: 'BIM Clash Detection', detail: 'Zero Field MEP Conflicts' },
                        { label: '1st Review Pass Rate', detail: '100% City Approval Track Record' },
                      ].map((item, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[11px] font-mono text-slate-300 block">{item.label}</span>
                            <span className="text-xs font-bold text-white">{item.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-200/90 leading-relaxed">
                        Need a full permit drawing set, PE stamp, or takeoff estimate for your upcoming project?
                      </div>
                    </div>
                  </div>

                  {/* CTA Footer Buttons */}
                  <div className="pt-4 border-t border-slate-800 space-y-2.5">
                    <button
                      onClick={() => {
                        closeModelExplorer();
                        openQuoteModal();
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-sm transition-all shadow-lg shadow-[var(--accent)]/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Request Permit Set Quote</span>
                    </button>
                    <button
                      onClick={closeModelExplorer}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all"
                    >
                      Back to Website
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ModelExplorerContext.Provider>
  );
}
