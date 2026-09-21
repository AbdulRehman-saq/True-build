import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photorealistic 3D Architectural Renders & 4K Walkthrough Animations',
  description:
    'High-resolution 4K interior and exterior 3D architectural renderings, material and daylighting simulations, and virtual walkthrough animations for residential, custom homes, and commercial spaces.',
  keywords: [
    '3D architectural rendering',
    'photorealistic exterior rendering',
    'interior 3D visualization',
    'architectural walkthrough animation',
    'custom home 3D renders',
    'commercial rendering',
    'BIM visualization',
    'Lumion rendering',
    'Unreal Engine architectural visualization',
  ],
  alternates: {
    canonical: '/services/3d-design',
  },
  openGraph: {
    title: 'Photorealistic 3D Architectural Renders & Animations | ProArch',
    description:
      'Turn blueprints into lifelike imagery for clients, investors, city reviews, and marketing.',
    url: '/services/3d-design',
    images: [
      {
        url: '/images/project_interior_3d.jpg',
        width: 1200,
        height: 630,
        alt: 'Photorealistic 3D interior architectural render',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D Architectural Rendering & Animation | ProArch',
    description:
      'Photorealistic 3D interior & exterior renderings and 4K virtual walkthrough animations.',
    images: ['/images/project_interior_3d.jpg'],
  },
};

export default function ThreeDDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
