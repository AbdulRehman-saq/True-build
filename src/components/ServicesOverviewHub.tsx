'use client';

import React from 'react';
import Link from 'next/link';
import { servicesData } from './ServicesData';
import { DraftingTabNav } from './ServiceTabNav';

export function ServicesOverviewHub() {
  return (
    <div className="space-y-12">
      <DraftingTabNav activeId="all" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((s) => (
          <div key={s.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-2xl font-bold text-amber-500">{s.number}</span>
                <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-slate-800 text-slate-300">Detailed Service</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-amber-400 transition-colors">{s.title}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{s.summary}</p>
              
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-mono font-semibold uppercase text-slate-300">Key Deliverables:</h4>
                <ul className="text-xs text-slate-400 space-y-1">
                  {s.deliverables.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-amber-500 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href={s.href}
              className="w-full text-center py-2.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-[var(--foreground)] font-semibold text-sm transition-all"
            >
              Explore {s.title} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
