/*
 * GptLoader — global Google Ad Manager (GPT) bootstrap + Interstitial.
 *
 * Faithful copy of the <head> GPT setup on bajgames.xyz:
 *   - loads https://securepubads.g.doubleclick.net/tag/js/gpt.js
 *   - googletag.pubads().enableSingleRequest() + enableServices()
 *   - preloads an out-of-page INTERSTITIAL slot
 *     (<NETWORK>/fun5games.com_Interstitial) and exposes
 *     window.showInterstitial(cb) — shown on game navigation,
 *     auto re-preloads ~1s after dismiss (same as bajgames).
 *
 * Env-gated: renders NOTHING until NEXT_PUBLIC_GAM_NETWORK is set
 * (Vertoz delivers the GAM network path). Until then the site loads
 * zero ad JS — only the reserved placeholder shells from GamAdSlot
 * are visible, exactly like the bajgames placeholder state.
 *
 * Mounted once in app/layout.js.
 */

export default function GptLoader() {
  const network = process.env.NEXT_PUBLIC_GAM_NETWORK || '';
  if (!network) return null;

  const interstitialSetup = `
window.googletag = window.googletag || { cmd: [] };
googletag.cmd.push(function () {
  var adUnitPath = ${JSON.stringify(`${network}/fun5games.com_Interstitial`)};
  var adReady = false;
  var pendingCallback = null;
  var preloadedSlot = null;

  function preloadInterstitial() {
    preloadedSlot = googletag.defineOutOfPageSlot(
      adUnitPath,
      googletag.enums.OutOfPageFormat.INTERSTITIAL
    );
    if (!preloadedSlot) return;
    preloadedSlot.addService(googletag.pubads());
    googletag.display(preloadedSlot);
  }

  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  googletag.pubads().addEventListener("slotRenderEnded", function (e) {
    if (preloadedSlot && e.slot === preloadedSlot) {
      adReady = !e.isEmpty;
    }
  });

  googletag.pubads().addEventListener("slotVisibilityChanged", function (e) {
    if (preloadedSlot && e.slot === preloadedSlot &&
        e.inViewPercentage === 0 && pendingCallback) {
      pendingCallback();
      pendingCallback = null;
      adReady = false;
      setTimeout(preloadInterstitial, 1000);
    }
  });

  preloadInterstitial();

  window.showInterstitial = function (callback) {
    if (adReady && preloadedSlot) {
      pendingCallback = callback;
      adReady = false;
      googletag.display(preloadedSlot);
    } else {
      callback();
    }
  };
});`;

  return (
    <>
      <script
        async
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      />
      <script dangerouslySetInnerHTML={{ __html: interstitialSetup }} />
    </>
  );
}
