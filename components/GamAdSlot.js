/*
 * GamAdSlot — bajgames.xyz-identical Google Ad Manager (GPT) slot.
 *
 * Faithfully mirrors the ad units on
 *   https://play01.bajgames.xyz/game/<slug>
 *
 * Same SIZE, same LOCATION, same FLOW, same PATH:
 *   - Outer markup:   .ads > .ads-tips "ADVERTISEMENT" > .banner-ad > #<container>
 *   - Reserved space: min-height 310px ("CTR-safe" — prevents CLS)
 *   - Flow:           googletag.cmd.push → defineSlot + sizeMapping
 *                     → IntersectionObserver lazy-load (threshold 0.25)
 *   - Path:           <NETWORK>/fun5games.com_<Native_01|Native_02>
 *
 * PLACEHOLDER MODE (default — Vertoz onboarding pending):
 *   NEXT_PUBLIC_GAM_NETWORK is unset → only the reserved 310px shell
 *   renders (exactly the bajgames "ADVERTISEMENT" placeholder look).
 *   No gpt.js, no googletag calls → zero console errors, no empty
 *   ad requests, AdSense-policy-safe.
 *
 * LIVE MODE (Vertoz delivers the GAM network code):
 *   Set NEXT_PUBLIC_GAM_NETWORK=/22XXXXXXXXX  (their GAM network path)
 *   → the GPT define + lazy-load script activates with the real
 *   ad-unit path. No code change, just an env var + rebuild.
 *
 * The two presets below are copied size-for-size from bajgames'
 * adConfigs1 (top) and adConfigs2 (center).
 */

const SLOT_PRESETS = {
  // bajgames topAds — adConfigs1 / Native_01
  Native_01: {
    container: 'topAds',
    gptDivId: 'div-gpt-ad-fun5games-top',
    size: [
      [970, 250],
      [970, 90],
      [728, 90],
      [336, 280],
      [300, 250],
      [320, 100],
      [320, 480],
      [250, 250],
      'fluid',
    ],
    mapping: {
      desktop: [[970, 250], [970, 90], [728, 90], [336, 280], [300, 250], [250, 250], 'fluid'],
      tablet: [[728, 90], [336, 280], [300, 250], [250, 250], 'fluid'],
      mobile: [[320, 100], [300, 250], [336, 280], [320, 480], [250, 250], 'fluid'],
    },
  },
  // bajgames centerAds — adConfigs2 / Native_02
  Native_02: {
    container: 'centerAds',
    gptDivId: 'div-gpt-ad-fun5games-center',
    size: [
      [728, 90],
      [336, 280],
      [300, 250],
      [320, 100],
      [320, 480],
      [250, 250],
      'fluid',
    ],
    mapping: {
      desktop: [[728, 90], [336, 280], [300, 250], [250, 250], 'fluid'],
      tablet: [[336, 280], [300, 250], [250, 250], 'fluid'],
      mobile: [[320, 100], [300, 250], [336, 280], [320, 480], 'fluid'],
    },
  },
};

// CTR-safe reserved box — identical to bajgames' inline style.
const RESERVED_BOX = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '310px',
};

function buildSlotScript({ network, slot, preset }) {
  const adUnit = `${network}/fun5games.com_${slot}`;
  // Mirrors bajgames' per-slot inline script exactly: cmd queue,
  // sizeMapping (desktop ≥1024 / tablet ≥600 / mobile ≥0), lazy
  // display via IntersectionObserver at 0.25 visibility.
  return `
(function(){
  var cfg = {
    id: ${JSON.stringify(preset.gptDivId)},
    adUnit: ${JSON.stringify(adUnit)},
    size: ${JSON.stringify(preset.size)}
  };
  var container = document.getElementById(${JSON.stringify(preset.container)});
  if (!container || !window.googletag) return;
  googletag.cmd.push(function () {
    var adDiv = document.createElement("div");
    adDiv.id = cfg.id;
    adDiv.className = "ad-slot";
    container.appendChild(adDiv);
    var mapping = googletag.sizeMapping()
      .addSize([1024, 0], ${JSON.stringify(preset.mapping.desktop)})
      .addSize([600, 0], ${JSON.stringify(preset.mapping.tablet)})
      .addSize([0, 0], ${JSON.stringify(preset.mapping.mobile)})
      .build();
    googletag.defineSlot(cfg.adUnit, cfg.size, cfg.id)
      .defineSizeMapping(mapping)
      .addService(googletag.pubads());
    googletag.enableServices();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          googletag.display(cfg.id);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    observer.observe(document.getElementById(cfg.id));
  });
})();`;
}

export default function GamAdSlot({ slot = 'Native_01', className = '' }) {
  const preset = SLOT_PRESETS[slot] || SLOT_PRESETS.Native_01;
  const network = process.env.NEXT_PUBLIC_GAM_NETWORK || '';

  return (
    <div className={`ads ${className}`} style={{ margin: '0 auto', textAlign: 'center' }}>
      <div className="ads-tips">ADVERTISEMENT</div>
      <div className="banner-ad">
        <div id={preset.container} className="gam-slot" style={RESERVED_BOX} />
        {network && (
          <script
            dangerouslySetInnerHTML={{
              __html: buildSlotScript({ network, slot, preset }),
            }}
          />
        )}
      </div>
    </div>
  );
}
