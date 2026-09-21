import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ProArch Design & Estimation',
    short_name: 'ProArch',
    description:
      'Permit-ready architectural drafting, PE-stamped structural engineering, and 24-48hr construction cost estimates.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0e121b',
    theme_color: '#12161F',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/ProArch_Logo_Design&Estimation.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
