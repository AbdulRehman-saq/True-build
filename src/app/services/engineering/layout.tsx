import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PE-Stamped Structural & MEP Engineering (11 Licensed States)',
  description:
    'Licensed Professional Engineer (PE) stamped structural engineering calculations, foundation design, timber/steel framing, MEP engineering, and load-bearing assessments in TX, FL, CA, GA, CO, MA, AZ, UT, KY, NC, SC.',
  keywords: [
    'PE stamped engineering',
    'structural engineering calculations',
    'licensed professional engineer',
    'MEP engineering design',
    'foundation design engineering',
    'load-bearing wall removal',
    'Texas PE stamp',
    'Florida PE stamp',
    'California structural engineer',
    'commercial MEP plans',
  ],
  alternates: {
    canonical: '/services/engineering',
  },
  openGraph: {
    title: 'PE-Stamped Structural & MEP Engineering | ProArch',
    description:
      'Code-compliant PE stamps across 11 US states. Timber & steel design, foundation load calculations, and mechanical/electrical/plumbing systems.',
    url: '/services/engineering',
    images: [
      {
        url: '/images/project_engineering.jpg',
        width: 1200,
        height: 630,
        alt: 'PE-Stamped structural engineering calculations and drawings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PE-Stamped Structural & MEP Engineering | ProArch',
    description:
      'Licensed PE stamps across 11 states for structural, foundation, framing, and MEP systems.',
    images: ['/images/project_engineering.jpg'],
  },
};

export default function EngineeringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
