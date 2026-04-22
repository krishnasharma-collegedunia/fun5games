import { games, categories } from '@/data/games';

const SITE_URL = 'https://fun5games.com';

export default function sitemap() {
  const now = new Date();

  // Static pages
  const staticPages = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },

    // Landing pages — high-intent editorial content, ranked higher
    // than boilerplate static pages because Taboola traffic and
    // organic search both target these URLs.
    {
      url: `${SITE_URL}/top-mobile-games-india-2026`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/games-banned-india`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Category pages
  const categoryPages = categories.map((cat) => ({
    url: `${SITE_URL}/category/${cat.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Game detail pages
  const gamePages = games.map((g) => ({
    url: `${SITE_URL}/game/${g.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...gamePages];
}
