import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proarchestdesign.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/services/drafting', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/services/engineering', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/services/shop-drawings', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/services/3d-design', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/services/estimation-takeoff', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/projects', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
