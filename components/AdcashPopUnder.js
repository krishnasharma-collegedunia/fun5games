/**
 * Adcash Pop-Under — zoneId 11198914 (account 1172402).
 *
 * Dedicated pop-under zone for baji-style guaranteed popup on site
 * visit. Fires in addition to the Autotag mix, but Adcash honors
 * the per-zone frequency cap set in the dashboard (currently 1 per
 * 24 hours per visitor) so users don't get spammed.
 *
 * Pattern is identical to AdcashAutotag — two raw <script> tags
 * emitted into the SSR HTML stream, visible in view-source. The
 * inline bootstrapper polls for window.aclib (created by the first
 * aclib.js script) before calling runPop.
 *
 * aclib.js is loaded a second time by AdcashAutotag. The second
 * <script src> is a no-op: the browser dedupes external scripts by
 * URL and the second one won't re-execute. Kept here so this
 * component works independently if Autotag is ever removed.
 */
export default function AdcashPopUnder() {
  const bootstrap = `
    (function runAdcashPopUnder(attempts) {
      if (typeof window === 'undefined') return;
      if (window.aclib && typeof window.aclib.runPop === 'function') {
        try { window.aclib.runPop({ zoneId: '11198914' }); } catch (e) {}
        return;
      }
      if (attempts < 50) {
        setTimeout(function () { runAdcashPopUnder(attempts + 1); }, 100);
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
