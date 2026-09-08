'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

interface QuoteModalContextType {
  isOpen: boolean;
  selectedService: string;
  openQuoteModal: (service?: string) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType>({
  isOpen: false,
  selectedService: '',
  openQuoteModal: () => {},
  closeQuoteModal: () => {},
});

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}

const SERVICES_LIST = [
  { id: 'drafting', label: 'Architectural Drafting & Permit Sets', badge: 'Permit-Ready' },
  { id: 'engineering', label: 'PE Structural & MEP Engineering', badge: 'PE Stamped' },
  { id: '3d-design', label: 'Photorealistic 3D Renders & BIM', badge: '4K Visualization' },
  { id: 'estimation', label: 'Cost Estimation & Quantity Takeoff', badge: '24-48hr Turnaround' },
  { id: 'shop-drawings', label: 'Shop Drawings & Detailing', badge: 'Fabrication-Ready' },
];

const PROJECT_TYPES = [
  'Single-Family Residential',
  'Accessory Dwelling Unit (ADU)',
  'Commercial Retail / Office',
  'Restaurant & Hospitality',
  'Industrial & Warehouse',
  'Multi-Family Development',
];

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('drafting');
  const [projectType, setProjectType] = useState('Single-Family Residential');
  const [sqFt, setSqFt] = useState('2,500 - 5,000 sq ft');
  const [stateCode, setStateCode] = useState('TX');
  const [timeline, setTimeline] = useState('Standard (48-72 hrs)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openQuoteModal = (service?: string) => {
    if (service) setSelectedService(service);
    setSubmitted(false);
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeQuoteModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
    }
  };

  return (
    <QuoteModalContext.Provider value={{ isOpen, selectedService, openQuoteModal, closeQuoteModal }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
            onClick={closeQuoteModal}
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-2xl bg-white border border-[var(--border)] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 animate-modal my-auto">
            {/* Top decorative amber stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-light)] to-[var(--accent)]" />

            {/* Header */}
            <div className="p-6 sm:p-8 pb-4 border-b border-[var(--border)] relative bg-[var(--background)]/50">
              <button
                onClick={closeQuoteModal}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-all shadow-sm"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Instant Project Estimate & Consultation
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight">
                Request a Permit-Ready Estimate
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-lg">
                Upload your plans, sketches, or project scope. Our architects & PE engineers provide transparent quotes within 24 hours.
              </p>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              {submitted ? (
                <div className="py-10 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-lg shadow-emerald-500/10">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[var(--foreground)]">Quote Request Received!</h3>
                    <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                      Thank you, <span className="font-semibold text-[var(--foreground)]">{name || 'there'}</span>. A licensed project engineer will review your project scope and deliver a guaranteed quote within 24 hours.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)] max-w-md mx-auto text-left text-xs space-y-1.5 font-mono text-[var(--text-secondary)]">
                    <div><strong className="text-[var(--foreground)]">Service:</strong> {SERVICES_LIST.find(s => s.id === selectedService)?.label}</div>
                    <div><strong className="text-[var(--foreground)]">Project Type:</strong> {projectType}</div>
                    <div><strong className="text-[var(--foreground)]">Turnaround:</strong> {timeline}</div>
                    {uploadedFile && <div><strong className="text-[var(--foreground)]">Uploaded:</strong> {uploadedFile}</div>}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="tel:+18327373912"
                      className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-bold text-sm hover:bg-[var(--accent-light)] transition-all shadow-md"
                    >
                      Call (832) 737-3912 For Rush Review
                    </a>
                    <button
                      onClick={closeQuoteModal}
                      className="px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:bg-slate-50 transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Select Service */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      1. Select Required Discipline
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SERVICES_LIST.map((srv) => (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setSelectedService(srv.id)}
                          className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between gap-1 ${
                            selectedService === srv.id
                              ? 'border-[var(--accent)] bg-amber-50/50 shadow-sm text-[var(--foreground)] font-semibold ring-1 ring-[var(--accent)]'
                              : 'border-[var(--border)] bg-white hover:border-[var(--accent)]/50 text-[var(--text-secondary)]'
                          }`}
                        >
                          <span className="font-semibold text-xs leading-snug">{srv.label}</span>
                          <span className="text-[10px] font-mono text-[var(--accent)]">{srv.badge}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Project Specifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-semibold text-[var(--text-secondary)]">
                        Project Sector
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                      >
                        {PROJECT_TYPES.map((pt) => (
                          <option key={pt} value={pt}>{pt}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-semibold text-[var(--text-secondary)]">
                        Approximate Scope / Area
                      </label>
                      <select
                        value={sqFt}
                        onChange={(e) => setSqFt(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                      >
                        <option value="Under 1,500 sq ft">Under 1,500 sq ft (Patio, ADU, Remodel)</option>
                        <option value="1,500 - 3,500 sq ft">1,500 - 3,500 sq ft (Single-Family)</option>
                        <option value="3,500 - 10,000 sq ft">3,500 - 10,000 sq ft (Custom Home / Retail)</option>
                        <option value="10,000+ sq ft">10,000+ sq ft (Commercial / Warehouse)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-semibold text-[var(--text-secondary)]">
                        Target Turnaround
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                      >
                        <option value="Rush (24-48 hrs)">⚡ Rush Submittal (24-48 hrs)</option>
                        <option value="Standard (48-72 hrs)">Standard (48-72 hrs)</option>
                        <option value="Flexible (1-2 weeks)">Flexible (1-2 weeks)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono font-semibold text-[var(--text-secondary)]">
                        Project Location / State
                      </label>
                      <input
                        type="text"
                        value={stateCode}
                        onChange={(e) => setStateCode(e.target.value)}
                        placeholder="e.g. Austin, TX or Miami, FL"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                  </div>

                  {/* Step 3: Drawing / File Attachment Simulation */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-semibold text-[var(--text-secondary)]">
                      Attach Plans / Sketches / PDF (Optional)
                    </label>
                    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[var(--border)] rounded-xl cursor-pointer hover:border-[var(--accent)] transition-colors bg-[var(--background)]/40 group">
                      <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.dwg,.rvt,.png,.jpg,.jpeg" />
                      <svg className="w-8 h-8 text-[var(--accent)] mb-2 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-xs font-semibold text-[var(--foreground)]">
                        {uploadedFile ? uploadedFile : 'Click to select PDF, CAD (DWG), RVT, or sketch photos'}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] mt-0.5">
                        Max file size: 50MB · Confidential NDA protection guaranteed
                      </span>
                    </label>
                  </div>

                  {/* Step 4: Contact Information */}
                  <div className="space-y-3 pt-2 border-t border-[var(--border)]">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      2. Your Contact Information
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name *"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Work or Personal Email *"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                        />
                      </div>
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number (for SMS submittal updates)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        placeholder="Brief project details, city jurisdiction requirements, or specific requests..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-white text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold text-sm transition-all shadow-lg shadow-[var(--accent)]/25 flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating Project Estimate...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Quote Request (Guaranteed 24-Hour Reply)</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-[var(--text-muted)] mt-2">
                      No commitment required · 100% Free Consultation · Direct review by licensed engineer
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </QuoteModalContext.Provider>
  );
}
