import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Permit-Ready Architectural Drafting & CAD Floor Plans',
  description:
    'Permit-ready architectural drafting sets, site plans, interior floor plans, exterior elevations, electrical layouts, roof plans, and window/door schedules for residential and commercial builds.',
  keywords: [
    'architectural drafting',
    'permit-ready floor plans',
    'residential blueprints',
    'ADU plans drafting',
    'elevation drawings',
    'site plan drafting',
    'commercial space planning',
    'CAD drafting services',
    'BIM drafting',
  ],
  alternates: {
    canonical: '/services/drafting',
  },
  openGraph: {
    title: 'Permit-Ready Architectural Drafting & Floor Plans | ProArch',
    description:
      'Complete permit drawing sets conforming to municipal building codes. Site plans, elevations, dimensioned layouts, and schedules.',
    url: '/services/drafting',
    images: [
      {
        url: '/images/project_drafting.jpg',
        width: 1200,
        height: 630,
        alt: 'Permit-ready architectural drafting drawing set',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Permit-Ready Architectural Drafting | ProArch',
    description:
      'Permit drawing sets, dimensioned floor plans, and elevation sheets for city approvals.',
    images: ['/images/project_drafting.jpg'],
  },
};

export default function DraftingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
