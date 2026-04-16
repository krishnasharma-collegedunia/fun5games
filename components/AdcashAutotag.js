'use client';

import Script from 'next/script';

// Adcash Autotag — zoneId qdabofupyz (account 1172402).
// The Adcash dashboard only provides the `aclib.runAutoTag(...)` call,
// but `aclib` comes from their CDN library (acscdn.com/script/aclib.js).
// We load the library with next/script `afterInteractive` and fire
// runAutoTag from its onLoad callback so the autotag never runs before
// the library has finished initializing.
export default function AdcashAutotag() {
  return (
    <Script
      id="adcash-aclib"
      src="https://acscdn.com/script/aclib.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && window.aclib) {
          window.aclib.runAutoTag({ zoneId: 'qdabofupyz' });
        }
      }}
    />
  );
}
