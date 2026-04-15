/*
 * AD PLACEHOLDER — Hidden by default until AdSense approval.
 * ============================================================
 * Ad slots on fun5games.com are intentionally hidden until the site is
 * approved by Google AdSense. Showing empty placeholder boxes before
 * approval violates AdSense's content policy and looks unprofessional.
 *
 * To re-enable placeholders during development:
 *   NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true npm run dev
 *
 * After AdSense is approved, replace the placeholder <div> below with the
 * real <ins className="adsbygoogle"> tag and remove the early-return guard.
 *
 * Supported types:
 *   leaderboard  — 728x90
 *   in-feed      — 728x90
 *   rectangle    — 300x250
 *   detail       — 728x90
 *   detail-hero  — 728x300
 *   banner-small — 320x100
 *   large-rect   — 336x280
 *   skyscraper   — 160x600
 */
export default function AdBanner({ type = 'leaderboard', className = '' }) {
  // Ads are hidden until AdSense approval — policy compliance.
  const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === 'true';
  if (!showPlaceholders) return null;

  const config = {
    leaderboard:   { cls: 'ad-leaderboard',  size: '728 × 90',  label: 'Advertisement' },
    'in-feed':     { cls: 'ad-in-feed',      size: '728 × 90',  label: 'Advertisement' },
    rectangle:     { cls: 'ad-rectangle',    size: '300 × 250', label: 'Advertisement' },
    detail:        { cls: 'ad-detail',       size: '728 × 90',  label: 'Advertisement' },
    'detail-hero': { cls: 'ad-detail-hero',  size: '728 × 300', label: 'Advertisement' },
    'banner-small':{ cls: 'ad-banner-small', size: '320 × 100', label: 'Ad' },
    'large-rect':  { cls: 'ad-large-rect',   size: '336 × 280', label: 'Advertisement' },
    skyscraper:    { cls: 'ad-skyscraper',   size: '160 × 600', label: 'Advertisement' },
  };

  const c = config[type] || config.leaderboard;

  return (
    <div className={`ad-banner ${c.cls} ${className}`}>
      <span className="ad-label">{c.label}</span>
      <span className="ad-size">{c.size}</span>
    </div>
  );
}
