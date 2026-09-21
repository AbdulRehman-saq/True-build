'use client';

import React, { useState } from 'react';
import { useQuoteModal } from './QuoteModal';
import { Clock, Calculator, Check, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';

export function FaqTurnaroundCalculator() {
  const { openQuoteModal } = useQuoteModal();

  const [projectType, setProjectType] = useState<'residential' | 'adu' | 'commercial' | 'addition'>('residential');
  const [sizeTier, setSizeTier] = useState<'small' | 'medium' | 'large'>('medium');
  const [services, setServices] = useState<string[]>(['drafting', 'structural']);

  const toggleService = (s: string) => {
    setServices((prev) =>
      prev.includes(s) ? (prev.length > 1 ? prev.filter((item) => item !== s) : prev) : [...prev, s]
    );
  };

  // Turnaround logic
  const getTurnaround = () => {
    let days = '24–48 Hours';
    if (services.includes('structural') && services.includes('mep')) {
      days = sizeTier === 'large' ? '3–5 Days' : '48–72 Hours';
    } else if (sizeTier === 'large') {
      days = '48–72 Hours';
    } else if (services.length === 1 && services.includes('estimation')) {
      days = '24 Hours (Rush Available)';
    }
    return days;
  };

  const getSheetCount = () => {
    let count = 6;
    if (sizeTier === 'medium') count += 3;
    if (sizeTier === 'large') count += 6;
    if (services.includes('structural')) count += 4;
    if (services.includes('mep')) count += 3;
    return count;
  };

  return (
    <div className="bg-white border-2 border-[#DDD7CB] rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden my-12">
      <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-bold uppercase tracking-wider mb-2">
        <Calculator className="w-4 h-4 text-amber-600" />
        <span>Instant Project Calculator</span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading mb-2">
        Estimate your project timeline & deliverables
      </h3>
      <p className="text-sm sm:text-base text-slate-700 font-medium mb-8 max-w-2xl">
        Select your project type and disciplines to calculate expected turnaround and included drawing package sheets.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Config Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Project Type */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-700 font-extrabold mb-2.5">
              1. Project Classification
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'residential', label: 'Custom Home' },
                { id: 'adu', label: 'ADU / In-Law' },
                { id: 'addition', label: 'Home Addition' },
                { id: 'commercial', label: 'Commercial Build' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setProjectType(t.id as any)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                    projectType === t.id
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-extrabold'
                      : 'bg-white text-slate-800 border-[#DDD7CB] hover:border-amber-400'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Tier */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-700 font-extrabold mb-2.5">
              2. Approximate Scope / Floor Area
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'small', label: '< 1,500 sq ft', sub: 'Compact / ADU' },
                { id: 'medium', label: '1,500 – 3,500 sq ft', sub: 'Standard Residential' },
                { id: 'large', label: '3,500+ sq ft', sub: 'Estate / Commercial' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSizeTier(s.id as any)}
                  className={`p-3 rounded-xl text-left border-2 transition-all cursor-pointer ${
                    sizeTier === s.id
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-white text-slate-800 border-[#DDD7CB] hover:border-amber-400'
                  }`}
                >
                  <div className="font-extrabold text-xs">{s.label}</div>
                  <div className={`text-[11px] font-medium ${sizeTier === s.id ? 'text-slate-950 font-bold' : 'text-slate-600'}`}>
                    {s.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Services Checklist */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-700 font-extrabold mb-2.5">
              3. Required Disciplines (Select all needed)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'drafting', label: 'Architectural Drafting & Floor Plans' },
                { id: 'structural', label: 'PE-Stamped Structural Calculations' },
                { id: 'mep', label: 'MEP Engineering & Title 24 Plans' },
                { id: 'estimation', label: 'Itemized Material Takeoff & Cost Bid' },
              ].map((srv) => {
                const isSelected = services.includes(srv.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleService(srv.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 text-slate-950 font-extrabold'
                        : 'bg-white border-[#DDD7CB] text-slate-800 hover:border-amber-400/50'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'border-2 border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>{srv.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Calculated Result Card */}
        <div className="lg:col-span-5 bg-[#FAF9F5] border-2 border-[#DDD7CB] rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-extrabold block mb-1">
              Estimated Delivery Speed
            </span>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
                  {getTurnaround()}
                </div>
                <div className="text-xs text-emerald-700 font-bold mt-0.5">
                  ✓ 1-Hour Rush Quotes available on request
                </div>
              </div>
            </div>

            <div className="my-5 border-t border-slate-200 pt-5 space-y-3">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-700 font-medium">Estimated Drawing Sheets:</span>
                <span className="font-mono font-bold text-slate-950">{getSheetCount()} full-size sheets</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-700 font-medium">PE Stamp Eligibility:</span>
                <span className="font-bold text-amber-700">All 11 Licensed States</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-700 font-medium">Plan Check Guarantee:</span>
                <span className="font-bold text-emerald-700">100% Free Corrections</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openQuoteModal()}
            className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Lock In This Turnaround & Get Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
