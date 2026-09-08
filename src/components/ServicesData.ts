export interface ServiceItem {
  id: string;
  href: string;
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  projectTypes: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'drafting',
    href: '/services/drafting',
    number: '01',
    title: 'Drafting & Floor Plans',
    summary: 'Permit-ready architectural floor plans, site plans, ADU plans, elevations, and patio/deck plans drafted to pass local municipal plan review on first submission.',
    deliverables: [
      'Site Plans & Lot Layouts',
      'Architectural Floor Plans',
      'Exterior Building Elevations',
      'Electrical & Reflected Ceiling Plans',
      'Roofing & Framing Plans',
      'Window & Door Schedules'
    ],
    projectTypes: ['New Home Builds & Additions', 'Accessory Dwelling Units (ADUs)', 'Patio Plans, Decks & Pergolas', 'Commercial Tenant Build-outs']
  },
  {
    id: 'engineering',
    href: '/services/engineering',
    number: '02',
    title: 'Structural & MEP Engineering',
    summary: 'Comprehensive structural and MEP (Mechanical, Electrical, Plumbing) engineering sets complete with Licensed Professional Engineer (PE) stamps where required by city codes.',
    deliverables: [
      'Structural Steel & Timber Engineering Sets',
      'MEP (Mechanical, Electrical, Plumbing) Plans',
      'Foundation & Soil Load Calculations',
      'Structural Review, Load-Bearing Wall Calculations',
      'PE Engineering Stamps (Licensed across 11 states)'
    ],
    projectTypes: ['Single Family & Multi-Family Residential', 'Commercial Ground-Up & Tenant Improvements', 'Decks, Pergolas, & Patio Structural Reviews']
  },
  {
    id: 'shop-drawings',
    href: '/services/shop-drawings',
    number: '03',
    title: 'Fabrication Shop Drawings',
    summary: 'Fabrication-ready shop drawings for steel fabricators, precast concrete, millwork casework, MEP coordination, and glazing installers submittal-ready for AE approval.',
    deliverables: [
      'Structural Steel Shop & Erection Drawings',
      'Precast Concrete & Rebar Placement Drawings',
      'Custom Millwork & Architectural Casework',
      '3D MEP Spatial Coordination Drawings',
      'Curtain Wall & Glazing Fabrication Sets'
    ],
    projectTypes: ['Steel & Concrete Fabricators', 'Specialty Subcontractors', 'Commercial Building Contractors']
  },
  {
    id: '3d-design',
    href: '/services/3d-design',
    number: '04',
    title: '3D Design & Photorealistic Renders',
    summary: 'High-definition photorealistic 3D interior and exterior renderings and walkthrough animations constructed directly from your drafted and engineered plan sets.',
    deliverables: [
      'Interior Architectural Renders (Lighting & Material Studies)',
      'Exterior 3D Elevation Renders & Landscaping Context',
      '4K Video Walkthrough Animations',
      'Commercial Presentation & Investor Decks'
    ],
    projectTypes: ['Residential Remodels & Custom Homes', 'Restaurants & Hospitality Concepts', 'Commercial Real Estate Leasing Packages']
  },
  {
    id: 'estimation-takeoff',
    href: '/services/estimation-takeoff',
    number: '05',
    title: 'Estimation & Material Takeoff',
    summary: 'Fast 24 to 48-hour material takeoffs and labor cost estimates across 12+ trades with 95-97% accuracy, backed by 1-hour rush quote options for tight bid deadlines.',
    deliverables: [
      'Itemized Material Quantity Takeoffs (Excel/PDF)',
      'Trade-by-Trade Labor Cost Estimates',
      'Subcontractor Bid-Ready Summaries',
      '1-Hour Rush Estimate Delivery Option'
    ],
    projectTypes: ['Residential Remodels & ADUs', 'Commercial General Bidding', 'Ongoing Remote Estimating Partnerships']
  }
];
