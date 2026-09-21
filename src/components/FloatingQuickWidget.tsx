'use client';

import React from 'react';
import { useQuoteModal } from './QuoteModal';

export function FloatingQuickWidget() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center">
      {/* Main Floating Quote Pill */}
      <button
        onClick={() => openQuoteModal()}
        className="flex items-center gap-2 sm:gap-3 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-[var(--foreground)] text-white hover:bg-[var(--foreground)]/90 transition-all duration-300 shadow-2xl hover:shadow-[var(--accent)]/30 hover:scale-105 group border border-white/10 cursor-pointer"
        aria-label="Open Instant Quote Request"
      >
        <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[var(--accent)]" />
        </span>
        <span className="text-xs sm:text-sm font-bold tracking-tight">Get Free Estimate</span>
        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/15 flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </button>
    </div>
  );
}
