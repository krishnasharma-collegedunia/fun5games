'use client';

import Script from 'next/script';

/**
 * Loads the Google AdSense library once per page (app-wide).
 *
 * Controlled by NEXT_PUBLIC_ADSENSE_CLIENT_ID. Expected format is the
 * AdSense publisher ID — e.g. "ca-pub-1234567890123456" — which you
 * get from AdSense Dashboard → Account → Account information.
 *
 * When the env var is absent (i.e. AdSense is not yet approved), this
 * component renders nothing and the site falls back to labeled
 * placeholder divs served by AdBanner. No empty AdSense requests fire.
 *
 * When the env var is set, this loads adsbygoogle.js with the publisher
 * id in the query string, which:
 *   1. Enables AdSense Auto Ads if your account has them turned on
 *      (Google inserts ads anywhere it chooses).
 *   2. Powers every <ins className="adsbygoogle"> tag that AdBanner
 *      renders across the site (see components/AdSenseSlot.js).
 */
export default function AdSenseScript() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  if (!client) return null;

  return (
    <Script
      id="adsense-loader"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
