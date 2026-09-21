'use client';

import React from 'react';
import Link from 'next/link';
import { CenterFlow, NodeItem } from './ui/center-flow';
import {
  Compass,
  Layers,
  Box,
  FileSpreadsheet,
  Cpu,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export { CenterFlow };
export type { NodeItem };

export function ServicesCenterFlow({ className = '' }: { className?: string }) {
  const serviceNodes: NodeItem[] = [
    {
      id: 'drafting',
      num: '01',
      title: 'Architectural Drafting',
      subtitle: 'Permit-ready floor & site plans',
      href: '/services/drafting',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'engineering',
      num: '02',
      title: 'Structural & MEP',
      subtitle: 'PE stamped engineering & calcs',
      href: '/services/engineering',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: 'shop-drawings',
      num: '03',
      title: 'Shop Drawings',
      subtitle: 'Fabrication & CNC-ready steel',
      href: '/services/shop-drawings',
      icon: <Cpu className="w-4 h-4" />,
    },
    {
      id: '3d-design',
      num: '04',
      title: '3D Design & BIM',
      subtitle: 'Photorealistic WebGL models',
      href: '/services/3d-design',
      icon: <Box className="w-4 h-4" />,
    },
    {
      id: 'estimation',
      num: '05',
      title: 'Cost Takeoff',
      subtitle: '95–97% accurate material bids',
      href: '/services/estimation-takeoff',
      icon: <FileSpreadsheet className="w-4 h-4" />,
    },
  ];

  return (
    <div className={`relative rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-xl overflow-hidden ${className}`}>
      {/* Top subtle notification bar */}
      <div className="px-4 sm:px-6 py-3 bg-white/80 border-b border-[var(--border)] flex items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-[var(--accent)] font-semibold tracking-wider uppercase text-[11px] sm:text-xs">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse text-[var(--accent)] shrink-0" />
          <span>Integrated Services • 5 Disciplines</span>
        </div>
        <div className="flex items-center gap-3 text-[var(--text-muted)]">
          <span className="hidden md:inline text-xs">Click any node to explore full service scope</span>
          <Link
            href="/services"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-[var(--surface)] text-[var(--accent)] hover:text-[var(--accent-dark)] font-bold border border-[var(--border)] transition-all text-[11px] sm:text-xs shadow-xs"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Spacious 700px height Center Flow radial visualizer */}
      <CenterFlow
        nodeItems={serviceNodes}
        centerSize={150}
        nodeSize={80}
        borderRadius={38}
        nodeDistance={0.92}
        containerHeight={700}
        lineWidth={2.5}
        pulseWidth={3}
        pulseDuration={3.6}
        pulseLength={0.34}
        pulseSoftness={7}
        lineColor="rgba(216, 163, 56, 0.45)"
        pulseColor="#D8A338"
        glowColor="#D8A338"
        centerContent={
          <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-ping" />
            <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-[var(--accent)]">
              Integrated
            </span>
            <span className="font-heading font-black text-2xl text-white tracking-tight leading-none drop-shadow-sm">
              Services
            </span>
            <span className="text-[10px] font-mono font-bold text-[var(--accent)] bg-black/30 px-2.5 py-0.5 rounded-full border border-[var(--accent)]/40 mt-0.5">
              5 Disciplines
            </span>
          </div>
        }
      />
    </div>
  );
}
