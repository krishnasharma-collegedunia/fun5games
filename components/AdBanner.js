/*
 * AD PLACEHOLDER — Google AdSense Ready
 * ======================================
 * To use real ads, replace the placeholder content with your AdSense code.
 *
 * Example for AdSense:
 *   <ins className="adsbygoogle"
 *        style={{ display: 'block' }}
 *        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *        data-ad-slot="XXXXXXXXXX"
 *        data-ad-format="auto"
 *        data-full-width-responsive="true" />
 *
 * Supported types:
 *   leaderboard  — 728x90  (top of page, between sections)
 *   in-feed      — 728x90  (between game rows on homepage)
 *   rectangle    — 300x250 (sidebar)
 *   detail       — 728x90  (game detail page sections)
 *   banner-small — 320x100 (mobile banner)
 *   large-rect   — 336x280 (sidebar large)
 *   skyscraper   — 160x600 (sidebar tall)
 */
export default function AdBanner({ type = 'leaderboard', className = '' }) {
  const config = {
    leaderboard:  { cls: 'ad-leaderboard',  size: '728 × 90',  label: 'Advertisement' },
    'in-feed':    { cls: 'ad-in-feed',       size: '728 × 90',  label: 'Advertisement' },
    rectangle:    { cls: 'ad-rectangle',     size: '300 × 250', label: 'Advertisement' },
    detail:       { cls: 'ad-detail',        size: '728 × 90',  label: 'Advertisement' },
    'banner-small': { cls: 'ad-banner-small', size: '320 × 100', label: 'Ad' },
    'large-rect': { cls: 'ad-large-rect',   size: '336 × 280', label: 'Advertisement' },
    skyscraper:   { cls: 'ad-skyscraper',    size: '160 × 600', label: 'Advertisement' },
  };

  const c = config[type] || config.leaderboard;

  return (
    <div className={`ad-banner ${c.cls} ${className}`}>
      {/* TODO: Replace this placeholder with your Google AdSense code */}
      <span className="ad-label">{c.label}</span>
      <span className="ad-size">{c.size}</span>
    </div>
  );
}
