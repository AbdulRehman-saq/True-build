'use client';

import React from 'react';
import { ScrollReveal } from './Animations';
import { Award, Building, DollarSign, Clock, Users, CheckCircle2 } from 'lucide-react';

export function AboutMilestones() {
  const stats = [
    {
      icon: <Building className="w-5 h-5" />,
      value: '1,250+',
      label: 'Permit-Ready Sets Approved',
      sub: 'Zero unresolved city rejections',
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      value: '$450M+',
      label: 'Bids & Estimates Produced',
      sub: '95–97% historical trade accuracy',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      value: '24–48hr',
      label: 'Standard Project Turnaround',
      sub: '1-hour rush quote response',
    },
    {
      icon: <Award className="w-5 h-5" />,
      value: '11 States',
      label: 'Active PE Stamp Licensing',
      sub: 'TX, FL, CA, GA, CO, MA, AZ, UT, KY, NC, SC',
    },
  ];

  return (
    <section className="py-20 bg-white/70 border-b border-[#DDD7CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 80}>
              <div className="p-6 rounded-2xl bg-white border-2 border-[#DDD7CB] shadow-xs hover:border-amber-500/60 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="font-heading font-black text-3xl sm:text-4xl text-slate-950 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-extrabold text-slate-950 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-600 font-mono mt-1">
                  {stat.sub}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
