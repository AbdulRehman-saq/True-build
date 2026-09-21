import React from 'react';
import Link from 'next/link';

export function CoreDisciplinesOverview() {
  const disciplines = [
    {
      num: '01',
      title: 'Architectural Drafting',
      tagline: 'Form & Design Intent',
      desc: 'Floor plans, site plans, ADU plans, and patio drawings crafted to pass local municipal permit review on the first submission.',
      link: '/services/drafting'
    },
    {
      num: '02',
      title: 'Structural & MEP',
      tagline: 'Columns, Beams & System Loads',
      desc: 'Licensed PE engineering sets, structural load calculations, foundation design, and mechanical/electrical/plumbing compliance.',
      link: '/services/engineering'
    },
    {
      num: '03',
      title: 'Shop Drawings',
      tagline: 'Fabrication & Installation Detail',
      desc: 'Structural steel, precast concrete, millwork casework, and glazing shop drawings submittal-ready for architect & engineer signoff.',
      link: '/services/shop-drawings'
    },
    {
      num: '04',
      title: '3D Renders & Walkthroughs',
      tagline: 'Photorealistic Visualizations',
      desc: 'Interior/exterior renders and walkthrough animations constructed directly from your plans to eliminate costly changes on site.',
      link: '/services/3d-design'
    },
    {
      num: '05',
      title: 'Estimation & Takeoff',
      tagline: 'Quantities, Labor & Cost Forecasting',
      desc: 'Trade-by-trade material takeoff and labor cost estimates delivered in 24 to 48 hours with 95-97% accuracy across 12+ trades.',
      link: '/services/estimation-takeoff'
    }
  ];

  return (
    <section className="py-20 bg-[var(--surface)] text-[var(--foreground)] border-y border-[var(--border)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold block mb-2">
              WHAT WE DO
            </span>
            <h2 className="heading-section text-[var(--foreground)]">
              One team, from concept drawings<br className="hidden sm:inline" /> to construction budget.
            </h2>
          </div>
          <Link
            href="/services"
            className="px-6 py-3 rounded-xl bg-[var(--foreground)] hover:bg-[var(--accent)] text-white font-semibold text-sm transition-colors shadow-xs"
          >
            Explore All 5 Disciplines →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {disciplines.map((d) => (
            <div
              key={d.num}
              className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)]/70 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-bold text-[var(--accent)]">{d.num}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] bg-[var(--surface-elevated)] border border-[var(--border)] px-3 py-1 rounded">
                    {d.tagline}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {d.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                  {d.desc}
                </p>
              </div>
              <Link
                href={d.link}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-dark)] group-hover:translate-x-1 transition-all"
              >
                Learn More <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
