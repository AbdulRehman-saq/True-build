'use client';

import React from 'react';
import { useQuoteModal } from './QuoteModal';

export function FloatingQuickWidget() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
      {/* Direct Call Quick Button */}
      <a
        href="tel:+18327373912"
        className="hidden sm:flex w-12 h-12 rounded-full bg-white border border-[var(--border)] items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300 shadow-xl hover:scale-105 group"
        title="Call (832) 737-3912"
        aria-label="Direct Phone Line"
      >
        <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      </a>

      {/* Main Floating Quote Pill */}
      <button
        onClick={() => openQuoteModal()}
        className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-[var(--foreground)] text-white hover:bg-slate-800 transition-all duration-300 shadow-2xl hover:shadow-[var(--accent)]/30 hover:scale-105 group border border-white/10"
        aria-label="Open Instant Quote Request"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent)]" />
        </span>
        <span className="text-xs sm:text-sm font-bold tracking-tight">Get Free Estimate</span>
        <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </button>
    </div>
  );
}
