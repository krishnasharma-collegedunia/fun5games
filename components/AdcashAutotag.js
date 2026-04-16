'use client';

import Script from 'next/script';

/**
 * Adcash Autotag — zoneId qdabofupyz (account 1172402).
 *
 * Two-script pattern matching Adcash's documented integration:
 *   1. Load aclib.js from their CDN (creates window.aclib).
 *   2. A separate inline script polls for window.aclib and fires
 *      runAutoTag() once it's ready.
 *
 * We use polling instead of Next.js's <Script onLoad> because the
 * onLoad callback lives in a client JS chunk and isn't part of the
 * HTML stream — so debugging "is the autotag firing?" requires
 * opening DevTools. With inline polling the call is visible in
 * view-source and fires deterministically in page-load order.
 *
 * Autotag's formats (Pop-Under, Interstitial, In-Page Push, Video
 * Slider) are controlled entirely by Adcash's server-side config
 * for zone qdabofupyz — we don't pick them here.
 */
export default function AdcashAutotag() {
  return (
    <>
      <Script
        id="adcash-aclib"
        src="https://acscdn.com/script/aclib.js"
        strategy="afterInteractive"
      />
      <Script
        id="adcash-autotag-run"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
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
          `,
        }}
      />
    </>
  );
}
