/**
 * Monetag Multitag — zone 230751 (fun5games.com).
 *
 * One tag that delivers Monetag's full format mix server-side:
 * pop-under, interstitial, in-page push, push-notification prompt,
 * video slider. The algorithm picks per device/geo/demand.
 *
 * ─── Spam-prevention design ─────────────────────────────────────
 * Default behaviour of `tag.min.js` is to fire immediately on page
 * load. That's hostile to Taboola / cold-traffic visitors — they
 * land, get slapped with a pop-under in 300 ms, bounce back to
 * whatever article referred them, and our bounce rate goes through
 * the roof (which also spikes Vertoz's invalid-traffic flag).
 *
 * We defer the Multitag load by 15 seconds. Behaviour now:
 *   - User arrives, sees content, starts reading
 *   - At 15 s the Monetag script loads and formats fire
 *   - If the user was going to bounce in <15 s, no impression
 *     is recorded — saving the zone's quality score
 *
 * Monetag still gets every engaged visitor; we just trade the
 * bottom-5% of "drive-by" pageviews (which rarely convert anyway)
 * for a dramatically lower bounce-rate metric that keeps Vertoz
 * and AdSense happy.
 *
 * The companion sw.js in /public/sw.js handles push-notification
 * delivery after the visit; it's loaded on demand by tag.min.js.
 */

const MONETAG_URL = 'https://quge5.com/88/tag.min.js';
const MONETAG_ZONE = '230751';
const DELAY_MS = 15_000;

export default function MontagMultitag() {
  // Rendered as a tiny inline bootstrapper that schedules the real
  // tag load 15 seconds after DOMContentLoaded. Inline so the delay
  // starts as soon as the HTML parses, not after React hydration.
  const bootstrap = `
    (function deferMonetag() {
      if (typeof window === 'undefined') return;
      // Guard against double-injection on client-side route changes
      if (window.__fg_monetag_loaded) return;
      window.__fg_monetag_loaded = true;

      var load = function () {
        var s = document.createElement('script');
        s.src = '${MONETAG_URL}';
        s.async = true;
        s.setAttribute('data-zone', '${MONETAG_ZONE}');
        s.setAttribute('data-cfasync', 'false');
        document.head.appendChild(s);
      };

      var start = function () { setTimeout(load, ${DELAY_MS}); };

      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        start();
      } else {
        window.addEventListener('DOMContentLoaded', start, { once: true });
      }
    })();
  `;

  return (
    <script
      id="fg-monetag-defer"
      dangerouslySetInnerHTML={{ __html: bootstrap }}
    />
  );
}
