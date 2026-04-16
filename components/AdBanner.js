import AdSenseSlot from './AdSenseSlot';
import AdcashBannerSlot from './AdcashBannerSlot';

/*
 * AD SLOT — bajgames.xyz style with 3 size variants.
 * ============================================================
 * All slots render the same labeled container pattern baji uses:
 *
 *     <div class="ads">
 *       <div class="ads-tips">ADVERTISEMENT</div>
 *       <div class="banner-ad ad-baji-*">
 *         [ AdSense <ins> OR Adcash banner div ]
 *       </div>
 *     </div>
 *
 * Resolution order (first wins):
 *   1. AdSense — if NEXT_PUBLIC_ADSENSE_CLIENT_ID and the slot-specific
 *      NEXT_PUBLIC_ADSENSE_SLOT_* are set.
 *   2. Adcash banner — if the slot-specific NEXT_PUBLIC_ADCASH_BANNER_ZONE_*
 *      is set.
 *   3. Nothing — component returns null so we don't render an empty
 *      "ADVERTISEMENT" placeholder that looks broken.
 *
 * Size variants:
 *   baji-bottom   → 970x250 desktop, 300x250 mobile
 *   baji-inline   → 728x90 desktop, 336x280 mobile
 *   baji-sidebar  → 300x250 rectangle
 *
 * Adcash Autotag in layout.js runs independently of this component —
 * it delivers interstitials / pops / in-page-push regardless of
 * whether any banner slots are filled.
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

  // AdSense slot IDs — one per size variant.
  const adsenseSlotMap = {
    'baji-bottom':  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM,
    'baji-inline':  process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE,
    'baji-sidebar': process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
    leaderboard:    process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE,
    'detail-hero':  process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE,
    detail:         process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE,
    rectangle:      process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
    'in-feed':      process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE,
  };

  // Adcash banner zone IDs — fallback when AdSense isn't approved yet.
  const adcashZoneMap = {
    'baji-bottom':  process.env.NEXT_PUBLIC_ADCASH_BANNER_ZONE_BOTTOM,
    'baji-inline':  process.env.NEXT_PUBLIC_ADCASH_BANNER_ZONE_INLINE,
    'baji-sidebar': process.env.NEXT_PUBLIC_ADCASH_BANNER_ZONE_SIDEBAR,
    leaderboard:    process.env.NEXT_PUBLIC_ADCASH_BANNER_ZONE_INLINE,
    'detail-hero':  process.env.NEXT_PUBLIC_ADCASH_BANNER_ZONE_INLINE,
    detail:         process.env.NEXT_PUBLIC_ADCASH_BANNER_ZONE_INLINE,
    rectangle:      process.env.NEXT_PUBLIC_ADCASH_BANNER_ZONE_SIDEBAR,
    'in-feed':      process.env.NEXT_PUBLIC_ADCASH_BANNER_ZONE_INLINE,
  };

  const sizeClass = sizeClassMap[type] || 'ad-baji-inline';
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adsenseSlot = adsenseSlotMap[type];
  const adcashZone = adcashZoneMap[type];

  const hasAdSense = Boolean(adsenseClient && adsenseSlot);
  const hasAdcash = !hasAdSense && Boolean(adcashZone);
  const hasAnyAd = hasAdSense || hasAdcash;

  // No ad source configured → render nothing (no empty placeholder).
  if (!hasAnyAd) {
    return null;
  }

  return (
    <div className={`ads ${className}`}>
      <div className="ads-tips">ADVERTISEMENT</div>
      <div className={`banner-ad ${sizeClass}`}>
        {hasAdSense && <AdSenseSlot client={adsenseClient} slot={adsenseSlot} />}
        {hasAdcash && <AdcashBannerSlot zoneId={adcashZone} />}
      </div>
    </div>
  );
}
