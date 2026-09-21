import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fast Construction Cost Estimation & Material Takeoffs (24-48hr Turnaround)',
  description:
    'Reliable construction cost estimating and itemized material takeoffs with 95-97% accuracy. Excel bid spreadsheets, PlanSwift/Bluebeam markups, and localized pricing for general contractors and subcontractors.',
  keywords: [
    'construction cost estimation',
    'material takeoff services',
    'bid estimating contractor',
    'PlanSwift takeoff services',
    'Bluebeam construction takeoff',
    'residential cost estimating',
    'commercial construction estimator',
    'fast bid turnaround',
    'accurate construction takeoffs',
  ],
  alternates: {
    canonical: '/services/estimation-takeoff',
  },
  openGraph: {
    title: 'Construction Cost Estimation & Material Takeoffs | ProArch',
    description:
      '24-48 hour turnaround with 95-97% trade accuracy. Regional material & labor pricing for winning bids.',
    url: '/services/estimation-takeoff',
    images: [
      {
        url: '/images/project_estimation.jpg',
        width: 1200,
        height: 630,
        alt: 'Detailed construction cost estimation spreadsheet and takeoff markup',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construction Cost Estimation & Takeoffs | ProArch',
    description:
      '24-48hr turnaround construction cost estimates & material takeoffs with 95-97% accuracy.',
    images: ['/images/project_estimation.jpg'],
  },
};

export default function EstimationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
