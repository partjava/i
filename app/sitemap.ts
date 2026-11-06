import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.partjava.com';
  const routes = [
    '',
    '/challenges',
    '/code',
    '/notes',
    '/study',
    '/study/ai/cv',
    '/study/ai/dl',
    '/study/ai/datamining',
    '/auth/login',
    '/auth/register',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
