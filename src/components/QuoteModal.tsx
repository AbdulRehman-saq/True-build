'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  Compass,
  Layers,
  Sparkles,
  FileSpreadsheet,
  Cpu,
  CheckCircle2,
  Clock,
  ShieldCheck,
  UploadCloud,
  FileText,
  X,
  ArrowRight,
  PhoneCall,
  Check,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

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

export function QuoteButton({
  children,
  service,
  className,
}: {
  children: React.ReactNode;
  service?: string;
  className?: string;
}) {
  const { openQuoteModal } = useQuoteModal();
  return (
    <button
      type="button"
      onClick={() => openQuoteModal(service)}
      className={`cursor-pointer ${className || ''}`}
    >
      {children}
    </button>
  );
}

interface ServiceConfig {
  id: string;
  label: string;
  badge: string;
  turnaround: string;
  licensing: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
  contextTip: string;
}

const SERVICES_LIST: ServiceConfig[] = [
  {
    id: 'drafting',
    label: 'Architectural Drafting & Permit Sets',
    badge: 'Permit-Ready',
    turnaround: '48–72 hrs',
    licensing: 'Licensed Architect & City Permit Expediter',
    icon: Compass,
    deliverables: [
      'Full architectural plan set: site, floor, roof & foundation layout',
      'Exterior elevations, building sections & wall assembly details',
      'Life-safety notes, egress calculations & door/window schedules',
      'Pre-formatted municipal permit submittal package (PDF & CAD)',
    ],
    contextTip: 'Ideal for city permit approvals, ADUs, residential remodels, additions, and commercial build-outs.',
  },
  {
    id: 'engineering',
    label: 'PE Structural & MEP Engineering',
    badge: 'PE Stamped & Sealed',
    turnaround: '48–72 hrs',
    licensing: 'Licensed Professional Engineer (All 50 US States)',
    icon: Layers,
    deliverables: [
      'Load-bearing structural framing, beam/column design & shear walls',
      'Foundation design (post-tension, slab-on-grade, piers & retaining)',
      'Mechanical (HVAC), Electrical panel schedules & Plumbing layouts',
      'Official PE calculation reports & digital engineering seals',
    ],
    contextTip: 'Required by city building departments for structural alterations, load changes, and new builds.',
  },
  {
    id: '3d-design',
    label: 'Photorealistic 3D Renders & BIM',
    badge: '4K Visualization',
    turnaround: '24–48 hrs',
    licensing: 'Revit BIM & Architectural Visualization Artists',
    icon: Sparkles,
    deliverables: [
      'High-resolution 4K exterior & interior photorealistic renderings',
      'Custom material, texture, lighting & daylight simulation studies',
      'Parametric Autodesk Revit (.rvt) BIM modeling & clash detection',
      '360° virtual walkthroughs & investor presentation fly-throughs',
    ],
    contextTip: 'Best for HOA architectural review, investor pitch decks, pre-sales, and design approvals.',
  },
  {
    id: 'estimation',
    label: 'Cost Estimation & Quantity Takeoff',
    badge: 'CSI MasterFormat Takeoff',
    turnaround: '24–48 hrs',
    licensing: 'Certified Professional Estimators (CPE / ASPE)',
    icon: FileSpreadsheet,
    deliverables: [
      'Exhaustive CSI 16/50 MasterFormat line-item material & labor takeoff',
      'Zip-code calibrated regional RSMeans labor rates & material pricing',
      'Subcontractor bid comparison matrix & itemized Excel spreadsheets',
      'Value-engineering cost reduction recommendations & budget buffers',
    ],
    contextTip: 'Built for general contractors, property developers, and lending banks needing verified bids.',
  },
  {
    id: 'shop-drawings',
    label: 'Shop Drawings & Detailing',
    badge: 'Fabrication-Ready',
    turnaround: '48–72 hrs',
    licensing: 'Senior Steel & Architectural Detailers',
    icon: Cpu,
    deliverables: [
      'Structural steel connection detailing, bolt schedules & weld symbols',
      'Architectural millwork, casework, storefront & curtain wall details',
      'CNC fabrication cut lists, DXF parts, and assembly piece marks',
      'Field erection & installer coordination drawings with anchor bolt plans',
    ],
    contextTip: 'Engineered directly for steel fabricators, trade subcontractors, and manufacturer installers.',
  },
];

const PROJECT_TYPES = [
  'Single-Family Residential (New or Remodel)',
  'Accessory Dwelling Unit (ADU / Garage Conversion)',
  'Commercial Retail / Office / Tenant Improvement',
  'Restaurant & Hospitality Buildout',
  'Industrial Warehouse & Logistics Facility',
  'Multi-Family Residential (Townhomes / Apartments)',
  'Mixed-Use Commercial & Residential',
];

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('drafting');
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [sqFt, setSqFt] = useState('1,500 - 3,500 sq ft (Single-Family)');
  const [stateCode, setStateCode] = useState('TX');
  const [timeline, setTimeline] = useState('Standard (48-72 hrs)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Normalize service string when opening modal
  const openQuoteModal = (service?: string) => {
    if (service) {
      const lower = service.toLowerCase();
      if (lower.includes('struct') || lower.includes('mep') || lower.includes('eng')) {
        setSelectedService('engineering');
      } else if (lower.includes('3d') || lower.includes('render') || lower.includes('bim')) {
        setSelectedService('3d-design');
      } else if (lower.includes('cost') || lower.includes('estimat') || lower.includes('takeoff')) {
        setSelectedService('estimation');
      } else if (lower.includes('shop') || lower.includes('fabricat') || lower.includes('detail')) {
        setSelectedService('shop-drawings');
      } else {
        setSelectedService('drafting');
      }
    }
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
    }, 700);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMb} MB`);
    }
  };

  const activeServiceConfig =
    SERVICES_LIST.find((s) => s.id === selectedService) || SERVICES_LIST[0];

  return (
    <QuoteModalContext.Provider value={{ isOpen, selectedService, openQuoteModal, closeQuoteModal }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-fade-in"
            onClick={closeQuoteModal}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 animate-modal my-auto">
            {/* Top Amber Accent Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

            {/* Header Section */}
            <div className="p-5 sm:p-7 pb-4 border-b border-slate-200 bg-slate-50/80 relative">
              <button
                onClick={closeQuoteModal}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-colors shadow-xs"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300/80 text-xs font-semibold text-amber-900 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>DIRECT ENGINEER REVIEW · 100% FREE & CONFIDENTIAL</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Request an Itemized Project Estimate
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
                Select your discipline to see complete scope inclusions. Our licensed architects & PE engineers provide transparent, fixed-price proposals within 24 hours.
              </p>

              {/* Guarantees Trust Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>24–48h Guaranteed Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Licensed PE (All 50 States)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Zero Obligation · Signed NDA</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto space-y-6">
              {submitted ? (
                /* Success Confirmation State */
                <div className="py-8 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-lg shadow-emerald-500/15">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Estimate Request Received!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-slate-900">{name || 'there'}</strong>. Your project scope has been routed directly to our engineering department. You will receive an itemized proposal at <strong className="text-slate-900">{email || 'your email'}</strong> within 24 hours.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-lg mx-auto text-left text-xs space-y-2 text-slate-700">
                    <div className="font-semibold text-slate-900 text-sm pb-1 border-b border-slate-200">
                      Request Scope Summary:
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-500">Selected Discipline:</span>
                      <span className="font-semibold text-slate-900 text-right">{activeServiceConfig.label}</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-500">Project Sector:</span>
                      <span className="font-semibold text-slate-900 text-right">{projectType}</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-500">Estimated Area:</span>
                      <span className="font-semibold text-slate-900 text-right">{sqFt}</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-500">Jurisdiction / Location:</span>
                      <span className="font-semibold text-slate-900 text-right">{stateCode}</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-500">Turnaround Speed:</span>
                      <span className="font-semibold text-amber-800 text-right">{timeline}</span>
                    </div>
                    {uploadedFile && (
                      <div className="flex justify-between py-0.5">
                        <span className="text-slate-500">Attached File:</span>
                        <span className="font-semibold text-slate-900 text-right truncate max-w-[200px]">{uploadedFile}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="tel:+18327373912"
                      className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Call (832) 737-3912 For Urgent Review</span>
                    </a>
                    <button
                      onClick={closeQuoteModal}
                      className="px-6 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* STEP 1: Discipline Selection with Clear Scope Context */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center">
                          1
                        </span>
                        <span>Select Required Discipline & Scope</span>
                      </label>
                      <span className="text-xs text-slate-500">Choose one to review inclusions</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SERVICES_LIST.map((srv) => {
                        const Icon = srv.icon;
                        const isSelected = selectedService === srv.id;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setSelectedService(srv.id)}
                            className={`p-3.5 rounded-xl text-left border transition-all text-xs flex items-start gap-3 cursor-pointer ${
                              isSelected
                                ? 'border-amber-600 bg-amber-50/60 shadow-xs ring-1 ring-amber-500/80 text-slate-900'
                                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 text-slate-700'
                            }`}
                          >
                            <div
                              className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                                isSelected ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-grow min-w-0">
                              <div className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                                {srv.label}
                              </div>
                              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                <span className="inline-block text-[11px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200">
                                  {srv.badge}
                                </span>
                                <span className="text-[11px] text-slate-500">
                                  ⏱ {srv.turnaround}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* DYNAMIC CONTEXT CALLOUT BOX FOR SELECTED DISCIPLINE */}
                    <div className="mt-3 p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 space-y-2.5 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-amber-200/70">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                            Included in this {activeServiceConfig.badge} Estimate:
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-slate-700">
                          Sealed By: <strong className="text-slate-900">{activeServiceConfig.licensing}</strong>
                        </span>
                      </div>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800">
                        {activeServiceConfig.deliverables.map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                            <span className="leading-tight">{d}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-1.5 text-[11px] text-slate-600 italic flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>{activeServiceConfig.contextTip}</span>
                      </div>
                    </div>
                  </div>

                  {/* STEP 2: Project Specifications & Scope */}
                  <div className="space-y-3 pt-2 border-t border-slate-200">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center">
                        2
                      </span>
                      <span>Project Specifications & Jurisdiction</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Project Sector / Typology
                        </label>
                        <select
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500"
                        >
                          {PROJECT_TYPES.map((pt) => (
                            <option key={pt} value={pt}>
                              {pt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Approximate Scope / Floor Area
                        </label>
                        <select
                          value={sqFt}
                          onChange={(e) => setSqFt(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="Under 1,500 sq ft (Patio, ADU, Remodel)">Under 1,500 sq ft (Patio, ADU, Remodel)</option>
                          <option value="1,500 - 3,500 sq ft (Single-Family)">1,500 - 3,500 sq ft (Single-Family)</option>
                          <option value="3,500 - 10,000 sq ft (Custom Home / Retail)">3,500 - 10,000 sq ft (Custom Home / Retail)</option>
                          <option value="10,000+ sq ft (Commercial / Warehouse)">10,000+ sq ft (Commercial / Warehouse)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Target Turnaround Urgency
                        </label>
                        <select
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="Rush (24-48 hrs)">⚡ Rush Submittal (24-48 hrs)</option>
                          <option value="Standard (48-72 hrs)">Standard Turnaround (48-72 hrs)</option>
                          <option value="Flexible (1-2 weeks)">Flexible Schedule (1-2 weeks)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Project Location / Jurisdiction
                        </label>
                        <input
                          type="text"
                          value={stateCode}
                          onChange={(e) => setStateCode(e.target.value)}
                          placeholder="e.g. Austin, TX or Miami-Dade, FL"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500"
                        />
                        <span className="block text-[10px] text-slate-500">
                          Used to verify local building codes & wind/seismic load specs.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* STEP 3: Drawing / File Attachment with Context */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center">
                          3
                        </span>
                        <span>Attach Plans, Sketches, or Photos (Optional)</span>
                      </label>
                      <span className="text-[11px] text-slate-500">Optional · Don't have plans? Skip</span>
                    </div>

                    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-amber-500 hover:bg-amber-50/20 transition-all bg-slate-50/70 group">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.dwg,.rvt,.png,.jpg,.jpeg,.zip"
                      />
                      <UploadCloud className="w-7 h-7 text-amber-600 mb-1.5 transition-transform group-hover:scale-110" />
                      <span className="text-xs font-semibold text-slate-800 text-center">
                        {uploadedFile ? (
                          <span className="text-emerald-700 flex items-center gap-1.5">
                            <FileText className="w-4 h-4" />
                            {uploadedFile} ({fileSize})
                          </span>
                        ) : (
                          'Click to upload PDF, CAD (DWG), Revit (RVT), or photo sketches'
                        )}
                      </span>
                      <span className="text-[11px] text-slate-500 mt-0.5 text-center">
                        Accepted: PDF, DWG, RVT, JPG, PNG (up to 50MB) · Full mutual NDA guaranteed
                      </span>
                    </label>
                  </div>

                  {/* STEP 4: Contact Information */}
                  <div className="space-y-3 pt-2 border-t border-slate-200">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center">
                        4
                      </span>
                      <span>Contact & Proposal Delivery Details</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. David Vance"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Work or Personal Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Phone Number (for SMS submittal status)
                        </label>
                        <input
                          type="tel"
                          placeholder="(832) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Estimated Construction Start Date
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Next month / Immediately"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Specific Scope Notes or City Requirements
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Briefly describe what you need (e.g., removing a load-bearing wall, needing city permit drawings for an ADU, or structural beam calculations)..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 resize-none"
                      />
                    </div>
                  </div>

                  {/* PROCESS TRANSPARENCY TIMELINE */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                      What happens after you submit:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="space-y-0.5">
                        <div className="text-[11px] font-bold text-amber-700">1. Scope Review</div>
                        <p className="text-[10px] text-slate-500 leading-tight">
                          Licensed PE reviews your drawings or notes within 4 hrs.
                        </p>
                      </div>
                      <div className="space-y-0.5 border-x border-slate-200 px-1">
                        <div className="text-[11px] font-bold text-amber-700">2. Fixed Quote</div>
                        <p className="text-[10px] text-slate-500 leading-tight">
                          Receive an itemized, guaranteed price quote in 24 hrs.
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[11px] font-bold text-amber-700">3. Direct Kickoff</div>
                        <p className="text-[10px] text-slate-500 leading-tight">
                          Work begins immediately upon proposal sign-off.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition-all shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating Fixed-Price Estimate...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request For 24-Hour Guaranteed Estimate</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-500 mt-2">
                      No credit card or commitment required · 100% Free Consultation · Direct review by licensed engineer
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
