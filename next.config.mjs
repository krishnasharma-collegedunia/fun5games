/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Apple App Store CDN serves our game icons (`is1-ssl.mzstatic.com`
    // plus mirrors is2–is5). Routing them through next/image proxies
    // each icon through /_next/image on our own origin so:
    //   1. 200+ images per page share our origin's HTTP/2 connection
    //      (instead of hitting Apple CDN's per-origin connection limit
    //      from the browser, which was causing fresh-browser failures)
    //   2. Icons are converted to AVIF/WebP and cached aggressively
    //   3. Better Core Web Vitals (LCP / CLS) for AdSense approval
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'placehold.co' },
      // Apple App Store CDN — game icons (always Apple) + any
      // legacy iOS screenshots we still have for some titles.
      { protocol: 'https', hostname: 'is1-ssl.mzstatic.com' },
      { protocol: 'https', hostname: 'is2-ssl.mzstatic.com' },
      { protocol: 'https', hostname: 'is3-ssl.mzstatic.com' },
      { protocol: 'https', hostname: 'is4-ssl.mzstatic.com' },
      { protocol: 'https', hostname: 'is5-ssl.mzstatic.com' },
      // Google Play CDN — primary screenshots source as of
      // April 2026 (Apple's iTunes Lookup deprecated screenshots
      // in 2024 and HTML scraping rate-limits aggressively).
      // play-lh.googleusercontent.com is the authoritative host
      // for Play Store screenshot CDN delivery.
      { protocol: 'https', hostname: 'play-lh.googleusercontent.com' },
    ],
    // Cache optimized variants for 30 days at the CDN/proxy layer.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // 301 redirects — the three editorial landing pages were removed
  // when we pivoted to a pure bajgames-style content-arbitrage model
  // (Taboola → game detail pages → Vertoz ads). Their URLs were
  // submitted to Bing / IndexNow / Google so we 301 them to the
  // homepage to preserve any earned crawl signal and avoid 404s
  // for any external links that might exist.
  async redirects() {
    return [
      {
        source: '/trending-mobile-games-india-april-2026',
        destination: '/',
        permanent: true,
      },
      {
        source: '/top-mobile-games-india-2026',
        destination: '/',
        permanent: true,
      },
      {
        source: '/games-banned-india',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
