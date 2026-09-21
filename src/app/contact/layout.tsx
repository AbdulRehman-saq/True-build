import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Request a Project Quote',
  description:
    'Contact ProArch Design & Estimation. Reach our Dallas, TX office at (832) 737-3912 or submit project plans for a fast 24-48hr quote on drafting, PE engineering, or cost estimation.',
  keywords: [
    'contact proarch',
    'request drafting quote',
    'PE engineer contact Dallas',
    'construction estimate quote request',
    'upload plans for estimate',
    'proarch phone number',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us & Request a Quote | ProArch Design & Estimation',
    description:
      'Direct line to our engineering and cost estimation team. Send drawings for a 24-48hr turnaround quote.',
    url: '/contact',
    images: [
      {
        url: '/images/hero_architecture.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact ProArch Design and Estimation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact ProArch | Request a Quote',
    description:
      'Call (832) 737-3912 or submit plans online for 24-48hr turnaround drafting, PE stamps, or estimates.',
    images: ['/images/hero_architecture.jpg'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
