import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Turnaround, PE Stamps & Cost Estimates',
  description:
    'Answers to common questions about ProArch drafting standards, PE engineering stamp coverage in 11 states, 24-48hr estimation turnaround, and shop drawings submittal process.',
  keywords: [
    'architectural drafting FAQ',
    'PE engineer stamp states',
    'estimation turnaround time',
    'permit drawing requirements',
    'shop drawing submittals',
    'construction takeoff pricing',
  ],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ - ProArch Design & Estimation',
    description:
      'Got questions about our drafting, PE stamps, or cost estimation? Find clear answers on turnaround, licensing, deliverables, and pricing.',
    url: '/faq',
    images: [
      {
        url: '/images/hero_architecture.jpg',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions at ProArch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | ProArch Design & Estimation',
    description:
      'Answers on PE licensing in 11 states, 24-48hr estimation turnaround, drafting standards, and submittals.',
    images: ['/images/hero_architecture.jpg'],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Can you draft using our firm's existing drawing templates?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. When acting as an extended drafting partner, we draft directly into your CAD/BIM templates, adhering to your layer standards, font hierarchies, and title blocks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in a residential permit drafting set?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our permit-ready sets include site plans, dimensioned floor plans, exterior elevations, foundation plans, roof plans, electrical/ceiling layouts, and door & window schedules sized for city code compliance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide PE stamps for plan approval?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide PE-stamped structural and MEP engineering sets in all 11 licensed states (TX, FL, CA, GA, CO, MA, AZ, UT, KY, NC, SC).',
      },
    },
    {
      '@type': 'Question',
      name: 'What engineering services do you handle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We perform structural timber and steel design, foundation load calculations, load-bearing wall removal evaluations, MEP system layouts, and energy calculations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of shop drawings do you produce?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We produce structural steel erection drawings, precast concrete and rebar layout drawings, architectural casework/millwork shop sets, MEP coordination sheets, and glass curtain wall shop drawings.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate are your cost estimates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our estimators maintain 95-97% accuracy across trades by using continuously updated regional material and labor pricing databases specific to your project zip code.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can we receive a completed takeoff?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard turnaround is 24-48 hours. For tight bidding deadlines, we offer 1-hour rush quote response options.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which states are you licensed in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We hold active licenses across 11 states: Texas, Florida, California, Georgia, Colorado, Massachusetts, Arizona, Utah, Kentucky, North Carolina, and South Carolina.',
      },
    },
  ],
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {children}
    </>
  );
}
