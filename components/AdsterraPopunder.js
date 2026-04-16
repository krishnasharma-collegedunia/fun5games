import Script from 'next/script';

/**
 * Adsterra Popunder integration — site-wide.
 * ==========================================
 * Approval received:  April 2026
 * Placement ID:       29159531 (Popunder_1)
 * Ad format:          Popunder (opens a background tab on user click)
 * Website:            fun5games.com
 * Script domain:      pl29159531.profitablecpmratenetwork.com
 *
 * ▸ WHERE IT LOADS:
 * The Adsterra dashboard recommends placing the snippet right before
 * </head>. In Next.js App Router we inject it via <Script> with
 * strategy="afterInteractive", which loads once the page is hydrated —
 * functionally equivalent for popunders since they bind to click
 * handlers that only fire post-hydration. Adsterra also recommends
 * "one popunder per page", and RootLayout guarantees exactly that.
 *
 * ▸ POLICY NOTE:
 * Popunders violate Google AdSense's content policy. If/when we apply
 * for AdSense, remove or disable this component first.
 */

const ADSTERRA_SCRIPT_URL =
  'https://pl29159531.profitablecpmratenetwork.com/19/5e/2a/195e2a232f79b43493e800c0bab3c41f.js';

export default function AdsterraPopunder() {
  return (
    <Script
      id="adsterra-popunder-29159531"
      strategy="afterInteractive"
      src={ADSTERRA_SCRIPT_URL}
    />
  );
}
