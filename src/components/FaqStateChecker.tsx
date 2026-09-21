'use client';

import React, { useState } from 'react';
import { ShieldCheck, MapPin, CheckCircle2, Building2, Search } from 'lucide-react';

interface StateData {
  name: string;
  abbr: string;
  status: 'active' | 'nationwide';
  code: string;
  turnaround: string;
  specialty: string;
}

const STATES: StateData[] = [
  {
    name: 'Texas',
    abbr: 'TX',
    status: 'active',
    code: 'IRC 2021 / IBC 2021 / City of Dallas/Houston amendments',
    turnaround: '24–48 Hours',
    specialty: 'High expansive clay foundation design, post-tensioned slabs, windstorm zones',
  },
  {
    name: 'Florida',
    abbr: 'FL',
    status: 'active',
    code: 'FBC 8th Edition (2023) / HVHZ High-Velocity Hurricane Zone',
    turnaround: '48–72 Hours',
    specialty: 'Impact-rated glass, 150-180mph wind uplift, coastal piling & stem walls',
  },
  {
    name: 'California',
    abbr: 'CA',
    status: 'active',
    code: 'CBC 2022 / CRC 2022 / Title 24 Energy Compliance',
    turnaround: '48–72 Hours',
    specialty: 'High seismic design category D/E/F, ADU fast-track permitting, CalGreen',
  },
  {
    name: 'Georgia',
    abbr: 'GA',
    status: 'active',
    code: 'IBC 2018 / IRC 2018 with Georgia State Amendments',
    turnaround: '24–48 Hours',
    specialty: 'Red clay soil foundation engineering, engineered wood framing, daylighting',
  },
  {
    name: 'Colorado',
    abbr: 'CO',
    status: 'active',
    code: 'IRC 2021 / Local High Altitude Snow Load Overlays',
    turnaround: '48 Hours',
    specialty: 'Heavy roof snow load calculations (50-100+ psf), frost line footings',
  },
  {
    name: 'Massachusetts',
    abbr: 'MA',
    status: 'active',
    code: '9th/10th Edition 780 CMR / IECC Energy Code',
    turnaround: '48 Hours',
    specialty: 'Historical renovation framing, deep frost depth foundations, high thermal spec',
  },
  {
    name: 'Arizona',
    abbr: 'AZ',
    status: 'active',
    code: 'IBC 2018 / IRC 2018 / Maricopa County standards',
    turnaround: '24–48 Hours',
    specialty: 'Caliche soil excavation, post-tension foundation slabs, thermal solar ready',
  },
  {
    name: 'Utah',
    abbr: 'UT',
    status: 'active',
    code: 'IRC 2021 / Wasatch Fault Seismic Zone requirements',
    turnaround: '48 Hours',
    specialty: 'Seismic moment resistance frames, hillside slope stability engineering',
  },
  {
    name: 'Kentucky',
    abbr: 'KY',
    status: 'active',
    code: 'KBC 2024 / Kentucky Residential Code',
    turnaround: '24–48 Hours',
    specialty: 'Karst geology sinkhole footings, commercial structural steel frames',
  },
  {
    name: 'North Carolina',
    abbr: 'NC',
    status: 'active',
    code: '2024 North Carolina Building & Residential Code',
    turnaround: '24–48 Hours',
    specialty: 'Coastal wind zones, flood plain elevation certificates, pile foundations',
  },
  {
    name: 'South Carolina',
    abbr: 'SC',
    status: 'active',
    code: '2021 South Carolina Building Code / Coastal Overlays',
    turnaround: '24–48 Hours',
    specialty: 'Charleston seismic category D, coastal surge shear wall detailing',
  },
];

export function FaqStateChecker() {
  const [selectedState, setSelectedState] = useState<StateData>(STATES[0]);
  const [search, setSearch] = useState('');

  const filteredStates = STATES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.abbr.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-[var(--border)] rounded-3xl p-6 sm:p-10 shadow-xl my-12">
      <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mb-2">
        <MapPin className="w-4 h-4" />
        <span>Jurisdiction Lookup Tool</span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] font-heading mb-2">
        Check PE licensing & building codes by state
      </h3>
      <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-2xl">
        Select an active state below to inspect local governing codes, municipal amendment compliance, and engineering turnaround.
      </p>

      {/* State Pills Picker */}
      <div className="flex flex-wrap gap-2 mb-8">
        {STATES.map((state) => {
          const isSelected = selectedState.abbr === state.abbr;
          return (
            <button
              key={state.abbr}
              type="button"
              onClick={() => setSelectedState(state)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-amber-400'
              }`}
            >
              <span className="font-mono text-[10px] opacity-80">{state.abbr}</span>
              <span>{state.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected State Details Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg font-black font-mono shrink-0">
              {selectedState.abbr}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-bold text-[var(--foreground)] font-heading">
                  {selectedState.name}
                </h4>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Active PE Stamp</span>
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                Full Structural & MEP Engineering Certification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[var(--text-muted)]">Typical Turnaround:</span>
            <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
              {selectedState.turnaround}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-xs">
          <div>
            <span className="font-mono uppercase font-bold text-[var(--text-muted)] block mb-1">
              Governing Code & Amendments
            </span>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {selectedState.code}
            </p>
          </div>

          <div>
            <span className="font-mono uppercase font-bold text-[var(--text-muted)] block mb-1">
              Regional Engineering Specialization
            </span>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {selectedState.specialty}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
