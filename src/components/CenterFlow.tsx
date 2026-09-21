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
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: 'engineering',
      num: '02',
      title: 'Structural & MEP',
      subtitle: 'PE stamped engineering & calcs',
      href: '/services/engineering',
      icon: <Layers className="w-5 h-5" />,
    },
    {
      id: 'shop-drawings',
      num: '03',
      title: 'Shop Drawings',
      subtitle: 'Fabrication & CNC-ready steel',
      href: '/services/shop-drawings',
      icon: <Cpu className="w-5 h-5" />,
    },
    {
      id: '3d-design',
      num: '04',
      title: '3D Design & BIM',
      subtitle: 'Photorealistic WebGL models',
      href: '/services/3d-design',
      icon: <Box className="w-5 h-5" />,
    },
    {
      id: 'estimation',
      num: '05',
      title: 'Cost Takeoff',
      subtitle: '95–97% accurate material bids',
      href: '/services/estimation-takeoff',
      icon: <FileSpreadsheet className="w-5 h-5" />,
    },
  ];

  return (
    <div className={`relative rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-xl overflow-hidden ${className}`}>
      {/* Top clear notification bar */}
      <div className="px-4 sm:px-6 py-3 bg-white/95 dark:bg-slate-900/95 border-b border-[var(--border)] flex items-center justify-between gap-2 text-xs font-sans">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-extrabold tracking-wider uppercase text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 animate-pulse text-amber-500 shrink-0" />
          <span>Integrated Services • 5 Disciplines</span>
        </div>
        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
          <span className="hidden md:inline text-xs sm:text-sm">Click any node to explore full service scope</span>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all text-xs shadow-xs"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Spacious 700px height Center Flow radial visualizer */}
      <CenterFlow
        nodeItems={serviceNodes}
        centerSize={156}
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
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="font-mono text-[11px] font-black uppercase tracking-widest text-amber-400">
              Integrated
            </span>
            <span className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight leading-none drop-shadow-md">
              Services
            </span>
            <span className="text-xs font-mono font-bold text-amber-300 bg-black/60 px-3 py-0.5 rounded-full border border-amber-400/50 mt-1 shadow-sm">
              5 Disciplines
            </span>
          </div>
        }
      />
    </div>
  );
}
