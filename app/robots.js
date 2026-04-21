const SITE_URL = 'https://fun5games.com';

/**
 * Allow ALL crawlers, including AI answer engines (ChatGPT, Claude,
 * Perplexity, Google AI Overviews). For a game-discovery portal,
 * being the answer AI cites = referral traffic, not content loss.
 *
 * Previously we blocked GPTBot/ClaudeBot/PerplexityBot/etc. That
 * made us invisible in 15-25% of 2026 discovery queries (AI search).
 * Unblocking them today.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/search?'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
