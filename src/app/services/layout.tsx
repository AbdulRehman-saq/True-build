import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architecture, PE Engineering & Construction Estimation Services',
  description:
    'Comprehensive architectural drafting, PE-stamped engineering across 11 states, submittal-ready shop drawings, 4K 3D renders, and 24-48hr construction cost estimates.',
  keywords: [
    'architectural services',
    'PE engineering services',
    'fabrication shop drawings',
    '3D rendering services',
    'construction cost estimation',
    'material takeoffs',
    'permit drawing sets',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Professional Architecture, Engineering & Estimating Services | ProArch',
    description:
      'End-to-end design, engineering stamps, 3D visualization, and fast construction cost takeoffs.',
    url: '/services',
    images: [
      {
        url: '/images/hero_architecture.jpg',
        width: 1200,
        height: 630,
        alt: 'ProArch Architecture and Engineering Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architecture & Engineering Services | ProArch',
    description:
      'Drafting, PE engineering stamps, shop drawings, 3D renders, and 24-48hr cost estimation.',
    images: ['/images/hero_architecture.jpg'],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
