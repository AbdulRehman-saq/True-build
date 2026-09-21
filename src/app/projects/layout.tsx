import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Portfolio - Architectural, Engineering & Estimation Work',
  description:
    'Explore ProArch’s portfolio of permit-ready residential drafting, commercial engineering, 3D interior/exterior renderings, and construction cost takeoffs.',
  keywords: [
    'architectural portfolio',
    'engineering project samples',
    'construction estimate examples',
    '3D rendering portfolio',
    'residential drafting projects',
    'commercial engineering projects',
  ],
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Featured Projects & Design Portfolio | ProArch',
    description:
      'Real projects, proven results. View our architectural drafting, structural engineering, 3D renderings, and estimating portfolio.',
    url: '/projects',
    images: [
      {
        url: '/images/project_commercial.jpg',
        width: 1200,
        height: 630,
        alt: 'ProArch featured construction project portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Portfolio | ProArch Design & Estimation',
    description:
      'Completed architectural drafting, PE-stamped engineering, 3D renders, and cost estimating projects.',
    images: ['/images/project_commercial.jpg'],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
