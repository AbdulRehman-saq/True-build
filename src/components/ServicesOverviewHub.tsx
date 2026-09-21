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
          <div key={s.id} className="bg-white border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--accent)] transition-all shadow-xs hover:shadow-md flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-2xl font-bold text-[var(--accent)]">{s.number}</span>
                <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-secondary)] font-medium">Detailed Service</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">{s.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">{s.summary}</p>
              
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-mono font-semibold uppercase text-[var(--text-muted)]">Key Deliverables:</h4>
                <ul className="text-xs text-[var(--text-secondary)] space-y-1.5">
                  {s.deliverables.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-[var(--accent)] font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href={s.href}
              className="w-full text-center py-2.5 rounded-lg bg-[var(--foreground)] hover:bg-[var(--accent)] text-white font-semibold text-sm transition-all shadow-xs"
            >
              Explore {s.title} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
