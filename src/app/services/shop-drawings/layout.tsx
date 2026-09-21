import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submittal-Ready Shop Drawings - Steel, Rebar, MEP & Millwork',
  description:
    'Accurate fabrication shop drawings, structural steel erection plans, precast concrete and rebar detailing, architectural casework/millwork, and MEP coordination sheets ready for approval.',
  keywords: [
    'fabrication shop drawings',
    'structural steel shop drawings',
    'rebar detailing plans',
    'precast concrete shop drawings',
    'architectural millwork drawings',
    'MEP coordination drawings',
    'submittal-ready drawings',
    'steel erection plans',
  ],
  alternates: {
    canonical: '/services/shop-drawings',
  },
  openGraph: {
    title: 'Submittal-Ready Fabrication Shop Drawings | ProArch',
    description:
      'High-precision shop drawings formatted for architect and engineer submittal reviews. Steel, rebar, casework, and MEP systems.',
    url: '/services/shop-drawings',
    images: [
      {
        url: '/images/project_shopdrawings.jpg',
        width: 1200,
        height: 630,
        alt: 'Fabrication shop drawings and erection plans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fabrication Shop Drawings | ProArch',
    description:
      'Steel erection, precast concrete, casework, and MEP coordination shop drawings.',
    images: ['/images/project_shopdrawings.jpg'],
  },
};

export default function ShopDrawingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
