/**
 * Adcash Autotag — zoneId qdabofupyz (account 1172402).
 *
 * Rendered as raw <script> tags (NOT next/script) so both scripts
 * appear in the SSR HTML stream, are visible in view-source, and
 * execute during initial page parsing before hydration. This is
 * the exact two-tag pattern documented in Adcash's publisher
 * dashboard.
 *
 * 1. aclib.js loads from Adcash's CDN (creates window.aclib).
 * 2. Inline bootstrapper polls for window.aclib and fires
 *    runAutoTag once it's present. Polling exists because aclib.js
 *    loads async, so the inline script can execute first.
 *
 * Autotag's format mix (Pop-Under, Interstitial, In-Page Push,
 * Video Slider) is controlled by Adcash's server-side config for
 * zone qdabofupyz — we don't pick them here.
 *
 * This is a server component (no 'use client'): the <script> tags
 * are rendered statically into the HTML, and the browser executes
 * them natively. No React state or effects are needed.
 */
export default function AdcashAutotag() {
  const bootstrap = `
    (function runAdcashAutotag(attempts) {
      if (typeof window === 'undefined') return;
      if (window.aclib && typeof window.aclib.runAutoTag === 'function') {
        try { window.aclib.runAutoTag({ zoneId: 'qdabofupyz' }); } catch (e) {}
        return;
      }
      if (attempts < 50) {
        setTimeout(function () { runAdcashAutotag(attempts + 1); }, 100);
      }
    })(0);
  `;

  return (
    <>
      <script src="//acscdn.com/script/aclib.js" async />
      <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
    </>
  );
}
