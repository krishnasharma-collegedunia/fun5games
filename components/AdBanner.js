/*
 * AD SLOT — bajgames.xyz style.
 * ============================================================
 * fun5games.com mirrors bajgames' ad architecture: ONE big
 * responsive banner at the bottom of each game detail page,
 * plus an out-of-page interstitial (delivered by Adcash
 * Autotag from components/AdcashAutotag.js).
 *
 * Do NOT sprinkle extra AdBanner components throughout the page
 * — the whole point of matching baji is to keep the surface
 * minimal. One honest slot + one autotag interstitial beats
 * six broken-looking placeholders every time.
 *
 * When AdSense is approved or an Adcash Banner zone is created,
 * replace the placeholder <div> below with the real ad unit
 * tag (e.g. `<ins className="adsbygoogle">` or an Adcash
 * aclib.runBanner call).
 *
 * Supported type:
 *   baji-bottom — responsive multi-size bottom banner,
 *                 min-height 310px, centered "ADVERTISEMENT"
 *                 label, mirrors baji's `.ads > .banner-ad`.
 */
export default function AdBanner({ type = 'baji-bottom', className = '' }) {
  const c = type === 'baji-bottom' ? 'ad-baji-bottom' : 'ad-baji-bottom';

  return (
    <div className={`ads ${className}`}>
      <div className="ads-tips">ADVERTISEMENT</div>
      <div className={`banner-ad ${c}`} />
    </div>
  );
}
