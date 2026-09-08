import React from 'react';

export function StatsAndTestimonials() {
  const stats = [
    { label: 'LICENSED STATES', value: '11', desc: 'PE Stamped sets nationwide' },
    { label: 'CORE DISCIPLINES', value: '05', desc: 'Drafting to estimation' },
    { label: 'ESTIMATE ACCURACY', value: '97%', desc: 'Verified local pricing' },
    { label: 'TURNAROUND TIME', value: '24-48h', desc: '1hr rush quotes available' },
  ];

  const testimonials = [
    {
      quote: "Great experience with their cost estimation and material take-off services. Accurate, timely, and really helped me plan my new home with confidence.",
      author: "Mike",
      role: "Homeowner",
      project: "Custom Single-Family Build"
    },
    {
      quote: "I've used their estimation services for a few commercial projects, and they've never let me down. Super reliable and easy to work with.",
      author: "Jo Reyes",
      role: "General Contractor",
      project: "Retail Tenant Improvements"
    },
    {
      quote: "The engineering drawings I received were clear, detailed, and exactly what I needed. The team really understood my vision.",
      author: "Daniel",
      role: "Property Developer",
      project: "Multi-Unit ADU Project"
    },
    {
      quote: "I've worked with a few estimators before, but this team really stood out. Clear, accurate estimates that kept my project on track.",
      author: "Joel",
      role: "Builder",
      project: "Commercial Build-Out"
    }
  ];

  return (
    <section className="py-24 bg-[#0B132B] text-[var(--foreground)] space-y-24">
      {/* Stats Counter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {stats.map((s, idx) => (
              <div key={idx} className={`pt-4 lg:pt-0 ${idx !== 0 ? 'lg:pl-8' : ''}`}>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                  {s.label}
                </span>
                <span className="text-4xl sm:text-5xl font-extrabold text-[var(--foreground)] font-mono block tracking-tight">
                  {s.value}
                </span>
                <span className="text-xs text-slate-400 mt-1 block font-medium">
                  {s.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
            — CLIENT FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            What contractors, builders, and developers say
          </h2>
          <p className="text-slate-400 text-sm">
            Trusted by architects, sub-contractors, and home owners across 11 licensed states.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400 text-sm">
                  ★★★★★
                </div>
                <p className="text-slate-300 text-base italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-6 border-t border-slate-800/80 mt-6 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-[var(--foreground)] text-sm">{t.author}</h4>
                  <span className="text-xs text-amber-400 font-mono block">{t.role}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  {t.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
