'use client';

import React from 'react';
import { useQuoteModal } from './QuoteModal';

interface CalloutProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export function ReadyToStartCTA({
  title = "Ready to start your next project?",
  subtitle = "Whether you need permit-ready drawings, structural PE stamps, 3D renders, or a 24-hour cost estimate, our team is ready to scale with your project.",
  buttonText = "Request a Quote",
  secondaryText = "Call +1 (832) 737-3912",
  secondaryHref = "tel:+18327373912",
}: CalloutProps) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <div className="bg-gradient-to-br from-[var(--accent)] via-[#C49340] to-[#A07830] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden my-16">
      {/* Blueprint Grid Overlay Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <span className="inline-block text-xs font-mono font-bold tracking-widest uppercase bg-black/30 backdrop-blur text-white px-4 py-1.5 rounded-full border border-white/20">
          Get Started Today · 24hr Response
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          {title}
        </h2>
        <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto font-medium">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <button
            onClick={() => openQuoteModal()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[var(--accent)] hover:bg-slate-50 font-bold text-base transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            {buttonText} →
          </button>
          <a
            href={secondaryHref}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-base border border-white/20 backdrop-blur transition-all font-mono"
          >
            {secondaryText}
          </a>
        </div>
      </div>
    </div>
  );
}
