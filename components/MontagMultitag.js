/**
 * Monetag Multitag — zone 230751 (fun5games.com).
 *
 * One script tag that delivers all Monetag ad formats automatically:
 *   - Push Notifications (browser permission prompt)
 *   - Pop-Under (background tab)
 *   - Interstitial (full-page overlay)
 *   - In-Page Push (on-page notification widget)
 *
 * Monetag's server-side algorithm decides which format to show based
 * on device, geo, frequency caps, and demand. No manual format
 * selection needed.
 *
 * The companion sw.js (service worker) in /public/sw.js enables
 * push notification delivery even after the user leaves the site.
 *
 * Rendered as a raw <script> tag in SSR HTML for maximum reliability
 * and view-source visibility.
 */
export default function MontagMultitag() {
  return (
    <script
      src="https://quge5.com/88/tag.min.js"
      data-zone="230751"
      async
      data-cfasync="false"
    />
  );
}
