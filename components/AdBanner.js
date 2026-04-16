import AdSenseSlot from './AdSenseSlot';

/*
 * AD SLOT — bajgames.xyz style with 3 size variants.
 * ============================================================
 * All slots render the same labeled container pattern baji uses:
 *
 *     <div class="ads">
 *       <div class="ads-tips">ADVERTISEMENT</div>
 *       <div class="banner-ad ad-baji-*">
 *         [ AdSense <ins> tag, if configured ]
 *       </div>
 *     </div>
 *
 * The inner `<ins>` only renders when both:
 *   - NEXT_PUBLIC_ADSENSE_CLIENT_ID is set (e.g. ca-pub-XXXXXXXXXXXXXXXX)
 *   - A slot-specific env var is set (one per size variant, see below).
 *
 * Size variants and their AdSense env vars:
 *   baji-bottom   → NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM   (970x250 desktop, 300x250 mobile)
 *   baji-inline   → NEXT_PUBLIC_ADSENSE_SLOT_INLINE   (728x90 desktop, 336x280 mobile)
 *   baji-sidebar  → NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR  (300x250 rectangle)
 *
 * If only NEXT_PUBLIC_ADSENSE_CLIENT_ID is set (no per-slot IDs),
 * the script still loads site-wide and AdSense Auto Ads may fill
 * opportunistically — but our placeholders won't get dedicated units.
 *
 * Adcash coexists with AdSense: the Adcash Autotag in layout.js
 * delivers interstitials / in-page-push regardless of whether AdSense
 * is approved yet, so the site always has some monetization path.
 */
export default function AdBanner({ type = 'baji-inline', className = '' }) {
  const sizeClassMap = {
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

  const slotEnvMap = {
    'baji-bottom':  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM,
    'baji-inline':  process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE,
    'baji-sidebar': process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
    leaderboard:    process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE,
    'detail-hero':  process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE,
    detail:         process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE,
    rectangle:      process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
    'in-feed':      process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE,
  };

  const sizeClass = sizeClassMap[type] || 'ad-baji-inline';
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adsenseSlot = slotEnvMap[type];
  const hasAdSense = Boolean(adsenseClient && adsenseSlot);

  return (
    <div className={`ads ${className}`}>
      <div className="ads-tips">ADVERTISEMENT</div>
      <div className={`banner-ad ${sizeClass}`}>
        {hasAdSense && <AdSenseSlot client={adsenseClient} slot={adsenseSlot} />}
      </div>
    </div>
  );
}
