/*
 * AD SLOT — bajgames.xyz style with 3 size variants.
 * ============================================================
 * All slots render the same labeled container pattern baji uses:
 *
 *     <div class="ads">
 *       <div class="ads-tips">ADVERTISEMENT</div>
 *       <div class="banner-ad ad-baji-*">...</div>
 *     </div>
 *
 * Only the inner size class changes per placement so we can
 * reserve the right CTR-safe min-height without layout shift.
 *
 * Size variants:
 *   baji-bottom   — flagship bottom slot, 970x250 → 300x250
 *                   responsive, min-height 310 (desktop) /
 *                   260 (mobile). Use once per game detail page.
 *   baji-inline   — mid-content slot, 728x90 → 336x280 →
 *                   300x250, min-height 250/210. Use between
 *                   content blocks (after hero, after
 *                   screenshots, after features…).
 *   baji-sidebar  — sidebar rectangle, 300x250, fixed
 *                   min-height 250. Use inside Sidebar.
 *
 * When AdSense is approved or an Adcash Banner zone is created,
 * replace the placeholder <div> below with the real ad unit
 * tag (e.g. `<ins className="adsbygoogle">` or an Adcash
 * aclib.runBanner call keyed off the slot size).
 */
export default function AdBanner({ type = 'baji-inline', className = '' }) {
  const map = {
    'baji-bottom':  'ad-baji-bottom',
    'baji-inline':  'ad-baji-inline',
    'baji-sidebar': 'ad-baji-sidebar',
    // Legacy aliases so older callers still render something sane.
    leaderboard:    'ad-baji-inline',
    'detail-hero':  'ad-baji-inline',
    detail:         'ad-baji-inline',
    rectangle:      'ad-baji-sidebar',
    'in-feed':      'ad-baji-inline',
  };
  const c = map[type] || 'ad-baji-inline';

  return (
    <div className={`ads ${className}`}>
      <div className="ads-tips">ADVERTISEMENT</div>
      <div className={`banner-ad ${c}`} />
    </div>
  );
}
