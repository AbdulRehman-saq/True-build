'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProjectDetailModal } from './ProjectDetailModal';
import { useModelExplorer } from './ModelExplorer3DModal';
import { Tilt3DCard, motion, AnimatePresence } from './FramerMotion';
import { Compass, ExternalLink } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'drafting' | '3d-design' | 'estimation';
  categoryLabel: string;
  location: string;
  summary: string;
  specs: string[];
  imageSrc: string;
  toolsUsed?: string;
  fullScope?: string;
  has3DModel?: boolean;
}

export const projectsList: ProjectItem[] = [
  {
    id: 'single-family-build',
    title: 'Single-Family Custom Home Permit Set',
    category: 'drafting',
    categoryLabel: 'Residential · Drafting & Engineering',
    location: 'Austin, TX',
    summary: 'Full architectural floor plans, exterior elevations, foundation details, and structural calculations engineered for immediate city permit review.',
    specs: ['4,200 Sq Ft Luxury Residence', 'Texas PE Structural Stamp', 'Passed Review First Submission'],
    imageSrc: '/images/project_residential.jpg',
    toolsUsed: 'AutoCAD 2024 · Revit BIM · RISA-3D · Enercalc',
    fullScope: 'Delivered an 18-sheet permit drawing set including architectural layout, roof framing, foundation rebar schedules, and lateral wind resistance calculations conforming to Austin Residential Code.',
    has3DModel: true,
  },
  {
    id: 'interior-remodel-3d',
    title: 'Modern Luxury Interior Remodel Renders',
    category: '3d-design',
    categoryLabel: 'Residential · 3D Design',
    location: 'Miami, FL',
    summary: 'Photorealistic interior 3D visualizations with custom lighting profiles, cabinetry details, and material studies used for client approval before demo.',
    specs: ['4K Photorealistic Renders', 'Custom Material Mapping', '0 Design Change Orders'],
    imageSrc: '/images/project_interior_3d.jpg',
    toolsUsed: '3ds Max · Corona Renderer · Unreal Engine 5 · Photoshop',
    fullScope: 'Created full 360-degree interior visual walkthroughs and high-resolution marketing renderings for a 3,800 sq ft luxury penthouse remodel featuring custom millwork and Calacatta marble.',
    has3DModel: true,
  },
  {
    id: 'restaurant-exterior-concept',
    title: 'Commercial Restaurant Build-Out & Renders',
    category: '3d-design',
    categoryLabel: 'Commercial · 3D Design & MEP',
    location: 'Dallas, TX',
    summary: 'Exterior rendering package and MEP coordination drawings prepared for franchise landlord presentations and local zoning board review.',
    specs: ['Landlord Submittal Set', 'HVAC & Electrical Coordination', 'Outdoor Terrace Renders'],
    imageSrc: '/images/project_commercial.jpg',
    toolsUsed: 'Revit MEP · Lumion Pro · Navisworks Clash Detection',
    fullScope: 'Complete architectural facade remodel concept with day/twilight exterior renderings, outdoor dining terrace layout, grease trap plumbing coordination, and rooftop HVAC screening.',
    has3DModel: true,
  },
  {
    id: 'adu-cost-estimate',
    title: 'Detached ADU Material Takeoff & Cost Estimate',
    category: 'estimation',
    categoryLabel: 'Residential · Estimation',
    location: 'Denver, CO',
    summary: 'Comprehensive trade-by-trade takeoff and labor cost forecast delivered under 24 hours, giving the contractor a defensible bid package.',
    specs: ['24-Hour Turnaround', '97% Estimate Accuracy', 'Full 16-Division Trade Breakout'],
    imageSrc: '/images/project_estimation.jpg',
    toolsUsed: 'Bluebeam Revu · PlanSwift · RSMeans 2024 · Excel HeavyBid',
    fullScope: 'Line-item quantity takeoff for earthwork, foundation concrete, lumber framing, MEP rough-ins, drywall, and finishes with local Denver material and prevailing labor rates.',
    has3DModel: false,
  },
  {
    id: 'tenant-improvement-set',
    title: 'Commercial Retail Tenant Improvement Set',
    category: 'drafting',
    categoryLabel: 'Commercial · Drafting & Engineering',
    location: 'Atlanta, GA',
    summary: 'Complete architectural interior layout, partition details, reflected ceiling plan, and life safety sheet for a 12,000 sq ft retail space.',
    specs: ['12,000 Sq Ft Retail Space', 'Life Safety & ADA Compliance', 'Permit Ready Submittal'],
    imageSrc: '/images/project_engineering.jpg',
    toolsUsed: 'AutoCAD Architecture · Revit · NFPA & IBC 2021 Analysis',
    fullScope: 'Code-compliant life safety analysis, egress calculations, ADA restroom details, occupancy load certification, and partition wall framing details approved by City of Atlanta.',
    has3DModel: true,
  },
  {
    id: 'adu-pergola-permit-set',
    title: 'Accessory Dwelling Unit & Structural Blueprints',
    category: 'drafting',
    categoryLabel: 'Residential · Drafting',
    location: 'Phoenix, AZ',
    summary: 'Custom lot site plan, structural timber engineering, and patio cover construction details engineered to withstand high wind load codes.',
    specs: ['High-Wind Load Calculations', 'Site Plan & Utility Hookup', 'PE Stamp Included'],
    imageSrc: '/images/project_drafting.jpg',
    toolsUsed: 'AutoCAD · Enercalc · WoodWorks Sizer · Bluebeam',
    fullScope: 'Engineered timber framing calculations for a 1,200 sq ft detached ADU with covered cedar pergola, foundation soil bearing calculations, and complete utility connection diagrams.',
    has3DModel: true,
  },
  {
    id: 'industrial-steel-fabrication',
    title: 'Structural Steel Detailing & Shop Drawings',
    category: 'drafting',
    categoryLabel: 'Industrial · Fabrication Shop Drawings',
    location: 'Houston, TX',
    summary: 'Submittal-ready CNC fabrication shop drawings, anchor bolt layouts, truss assemblies, and connection details for structural steel fabricators.',
    specs: ['CNC DXF & DSTV Files', 'Weld & Bolt Schedules', 'Zero Field Rework'],
    imageSrc: '/images/project_shopdrawings.jpg',
    toolsUsed: 'Tekla Structures · SDS2 · AutoCAD · Advance Steel',
    fullScope: 'Complete piece-marked fabrication shop drawings and erection plans for a 45,000 sq ft industrial warehouse including mezzanine framing, stairs, and handrails.',
    has3DModel: true,
  },
  {
    id: 'duplex-permit-engineering',
    title: 'Multi-Family Duplex Permit & Foundation Engineering',
    category: 'drafting',
    categoryLabel: 'Residential · Drafting & Engineering',
    location: 'San Antonio, TX',
    summary: 'Complete two-unit duplex permit drawing set with engineered post-tension slab foundation, fire separation wall details, and energy code compliance documentation.',
    specs: ['Dual-Unit 2,800 Sq Ft Each', 'Post-Tension Foundation Design', 'Fire-Rated Assembly Details'],
    imageSrc: '/images/project_duplex.jpg',
    toolsUsed: 'AutoCAD 2024 · Revit · RISA-3D · Enercalc · REScheck',
    fullScope: 'Delivered a 24-sheet permit set for a side-by-side duplex including architectural plans, structural calculations with PE stamp, fire separation wall assemblies, and Texas energy code REScheck documentation.',
    has3DModel: true,
  },
  {
    id: 'luxury-kitchen-bath-3d',
    title: 'Luxury Kitchen & Bath 3D Visualization Package',
    category: '3d-design',
    categoryLabel: 'Residential · 3D Design',
    location: 'Scottsdale, AZ',
    summary: 'Premium photorealistic 3D renders of a high-end kitchen remodel with custom walnut cabinetry, Calacatta marble waterfall island, and designer primary bathroom suite.',
    specs: ['8K Photorealistic Renders', 'Material Board Mapping', 'Client Approval Package'],
    imageSrc: '/images/project_kitchen_3d.jpg',
    toolsUsed: '3ds Max · Corona Renderer · Substance Designer · Photoshop',
    fullScope: 'Created 12 photorealistic interior renders including kitchen island detail views, pendant lighting studies, bathroom vanity closeups, and full room panoramas used for material selection and contractor bidding.',
    has3DModel: true,
  },
  {
    id: 'warehouse-expansion-estimate',
    title: 'Warehouse Expansion Bid Estimate & Trade Breakdown',
    category: 'estimation',
    categoryLabel: 'Industrial · Estimation',
    location: 'Charlotte, NC',
    summary: 'Comprehensive 16-division CSI trade breakdown and material quantity takeoff for a 60,000 sq ft warehouse expansion including steel, concrete, MEP, and site work.',
    specs: ['60,000 Sq Ft Expansion', '16-Division CSI Format', '96% Bid Accuracy'],
    imageSrc: '/images/project_warehouse_estimate.jpg',
    toolsUsed: 'PlanSwift · Bluebeam Revu · RSMeans 2024 · Excel HeavyBid',
    fullScope: 'Complete quantity takeoff and cost estimate across structural steel, concrete foundations, roofing, MEP rough-ins, fire protection, and site grading with local Charlotte subcontractor pricing and prevailing wage rates.',
    has3DModel: false,
  },
];

export function FilterableProjectsGallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'drafting' | '3d-design' | 'estimation'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const { openModelExplorer } = useModelExplorer();

  const filtered = projectsList.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <>
      <div className="space-y-8">
        {/* Animated Filter Tabs with layoutId pill */}
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'drafting', label: 'Drafting & Engineering' },
            { id: '3d-design', label: '3D Renders & BIM' },
            { id: 'estimation', label: 'Estimation & Takeoffs' },
          ].map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-[var(--text-secondary)] hover:text-[var(--foreground)] bg-white border border-[var(--border)]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterTab"
                    className="absolute inset-0 bg-[var(--accent)] rounded-xl shadow-md shadow-[var(--accent)]/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Grid with Framer Motion FLIP layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <Tilt3DCard maxTilt={5} scaleHover={1.02} className="h-full rounded-2xl">
                  <div
                    onClick={() => setSelectedProject(item)}
                    className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--accent)] transition-colors duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl cursor-pointer h-full"
                  >
                    <div>
                      {/* Architectural Card Visual Header with Real Image */}
                      <div className="h-56 relative overflow-hidden bg-slate-900">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Badges overlay */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-black/60 backdrop-blur px-3 py-1 rounded-md border border-white/15">
                              {item.categoryLabel}
                            </span>
                            {item.has3DModel && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openModelExplorer();
                                }}
                                title="Inspect 3D BIM Model"
                                className="px-2.5 py-1 rounded-md bg-[var(--accent)] text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-md hover:scale-105 transition-transform"
                              >
                                <Compass className="w-3 h-3" />
                                <span>3D BIM</span>
                              </button>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-amber-300 font-mono block">
                              📍 {item.location}
                            </span>
                            <span className="text-[10px] font-mono text-white/90 bg-white/20 backdrop-blur px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                              <span>Specs</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-3.5">
                        <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                          {item.summary}
                        </p>

                        <div className="pt-3 border-t border-[var(--border)] flex flex-wrap gap-1.5">
                          {item.specs.slice(0, 2).map((spec, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono bg-[var(--background)] text-[var(--text-secondary)] px-2.5 py-1 rounded border border-[var(--border)]"
                            >
                              {spec}
                            </span>
                          ))}
                          {item.specs.length > 2 && (
                            <span className="text-[10px] font-mono bg-amber-50 text-[var(--accent)] px-2 py-1 rounded border border-amber-200">
                              +{item.specs.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-5 pt-1 text-[11px] font-semibold text-[var(--accent)] flex items-center gap-1 group-hover:gap-2 transition-all">
                      <span>Explore Full Case Study</span>
                      <span>→</span>
                    </div>
                  </div>
                </Tilt3DCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Quick View Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
