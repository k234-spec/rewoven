import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.REWOVEN_SITE_URL || 'https://rewoven.vercel.app';
  const now = new Date();

  const staticRoutes = [
    '/',
    '/shop',
    '/about',
    '/our-story',
    '/creators',
    '/contact',
    '/wholesale',
    '/wholesale/catalogue',
    '/tracking',
    '/account',
    '/wishlist',
    '/checkout',
    '/policies/shipping',
    '/policies/returns',
    '/policies/privacy',
    '/policies/terms',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  return staticRoutes;
}
