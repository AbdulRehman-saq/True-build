import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Extended Partner for Architects, Engineers & Contractors',
  description:
    'Learn about ProArch Design & Estimation. We act as an extended drafting, engineering, 3D rendering, and estimating partner for firms across 11 US states.',
  keywords: [
    'about proarch',
    'architectural drafting partner',
    'outsourced engineering firm',
    'construction cost estimators',
    'PE structural engineer partner',
    'Dallas architecture team',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us - ProArch Design & Estimation',
    description:
      'We provide permit-ready drafting, PE engineering in 11 states, shop drawings, 3D renders, and construction cost estimates.',
    url: '/about',
    images: [
      {
        url: '/images/hero_architecture.jpg',
        width: 1200,
        height: 630,
        alt: 'About ProArch Design & Estimation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | ProArch Design & Estimation',
    description:
      'Extended drafting, PE engineering, and estimation team for architecture firms and general contractors.',
    images: ['/images/hero_architecture.jpg'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
