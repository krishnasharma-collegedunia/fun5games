export const metadata = {
  title: 'About Us - Fun5Games',
  description:
    'About Fun5Games — an independent mobile game discovery portal with hand-written how-to-play guides, tips, and direct store links for 200+ Android and iOS games.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main className="page-content">
      <div className="static-page">
        <h1>About Fun5Games</h1>
        <p>
          Fun5Games is an independent mobile game discovery portal for Android and iOS players,
          owned and operated by <strong>Mediafinity Adtech Pvt Ltd</strong>, a company
          headquartered in Gurugram, Haryana, India. We were started in 2024 by a small team of
          long-time mobile gamers who were tired of app-store search results being dominated by
          knock-offs, ad-heavy clones and endless scroll-to-find-nothing feeds. We wanted one clean
          place where you could see a game, read a short how-to-play guide, look at real
          screenshots, and tap through to the actual store listing — without fifteen pop-ups in
          between.
        </p>

        <h2>Our Mission</h2>
        <p>
          To help players discover genuinely fun mobile games by providing honest, readable guides
          and clear signposting to the official Google Play Store and Apple App Store. We never host
          APK or IPA files, we never wrap installers, and we never ask for your account details.
          Every download button on this site is a direct link to the publisher&apos;s own store page.
        </p>

        <h2>What We Do</h2>
        <ul>
          <li>
            Curate around 200 hand-picked mobile games across Action, Puzzle, Racing, Sports,
            Arcade, Casual, Strategy and Adventure.
          </li>
          <li>
            Write a short how-to-play section, a tips-and-tricks list and a FAQ for every game so
            you know what to expect before you install it.
          </li>
          <li>
            Show official store screenshots pulled from the iTunes Search API and Google Play,
            alongside publisher-listed metadata (developer, version, age rating, price).
          </li>
          <li>
            Link directly to the official Google Play and App Store listings so downloads always
            come from the publisher.
          </li>
          <li>
            Organise games into browsable categories so you can explore by mood or genre instead of
            guessing search terms.
          </li>
        </ul>

        <h2>Editorial Standards</h2>
        <p>
          Game metadata (title, developer, category, icon, screenshots) is sourced from the public
          iTunes Search API and Google Play. Ratings and download counts reflect what was shown on
          the store at the time the listing was last updated. How-to-play guides, tips and FAQs are
          written in-house by our editors based on first-hand play experience and publisher
          documentation. We aim to keep every listing factual, genre-accurate and spoiler-free.
        </p>
        <p>
          If you spot an outdated version number, a wrong category, or a broken store link, please
          tell us via the <a href="/contact">contact page</a> and we will fix it.
        </p>

        <h2>How We Make Money</h2>
        <p>
          Fun5Games is a free site supported by display advertising. We do not charge users, we do
          not sell your personal data, and we do not receive affiliate commissions from Google Play
          or the Apple App Store — those stores do not run a public affiliate programme for app
          installs. If we ever add affiliate or sponsored content, it will be clearly labelled as
          such.
        </p>

        <h2>Important Trademark Notice</h2>
        <p>
          Fun5Games is an independent portal and is <strong>not affiliated with, endorsed by,
          sponsored by or connected to</strong> Google LLC, Apple Inc., Google Play, the Apple App
          Store, or any game developer or publisher whose title appears on this site. All app names,
          icons, screenshots, logos and trademarks are the property of their respective owners and
          are used here for identification and editorial purposes only. Google Play and the Google
          Play logo are trademarks of Google LLC. App Store is a service mark of Apple Inc.
        </p>

        <h2>Company Information</h2>
        <p>
          <strong>Mediafinity Adtech Pvt Ltd</strong>
          <br />
          AIHP Signature Tower, 418 &amp; 419
          <br />
          Phase IV, Udyog Vihar
          <br />
          Gurugram, Haryana &mdash; 122015
          <br />
          India
          <br />
          Email: <strong>quizzy2026@gmail.com</strong>
        </p>
      </div>
    </main>
  );
}
