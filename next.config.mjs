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
};

export default nextConfig;
