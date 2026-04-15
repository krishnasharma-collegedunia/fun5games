import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Fun5Games</h4>
            <p>
              Fun5Games is an independent mobile game discovery portal. We hand-pick 200+ Android and
              iOS titles across Action, Puzzle, Racing, Sports, Arcade, Casual, Strategy and Adventure,
              and write a short how-to-play guide and tips for every game so you know what you are
              downloading before you tap install.
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/category/action">Action</Link></li>
              <li><Link href="/category/puzzle">Puzzle</Link></li>
              <li><Link href="/category/racing">Racing</Link></li>
              <li><Link href="/category/sports">Sports</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>More Categories</h4>
            <ul>
              <li><Link href="/category/arcade">Arcade</Link></li>
              <li><Link href="/category/casual">Casual</Link></li>
              <li><Link href="/category/strategy">Strategy</Link></li>
              <li><Link href="/category/adventure">Adventure</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal & Info</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-disclaimer">
            Fun5Games is an independent game discovery portal operated by Mediafinity Adtech Pvt Ltd.
            We are not affiliated with, endorsed by, sponsored by, or connected to Google LLC,
            Apple Inc., Google Play, the Apple App Store, or any game developer or publisher whose
            title appears on this site. All app names, icons, screenshots, logos and trademarks are
            the property of their respective owners and are used for identification and editorial
            purposes only. Download buttons link directly to the official Google Play Store and
            Apple App Store listings — we never host or redistribute any APK or IPA files.
          </p>
          <p className="footer-company">
            <strong>Mediafinity Adtech Pvt Ltd</strong> &middot; AIHP Signature Tower, 418 &amp; 419,
            Phase IV, Udyog Vihar, Gurugram, Haryana &mdash; 122015, India &middot;{' '}
            <a href="mailto:quizzy2026@gmail.com">quizzy2026@gmail.com</a>
          </p>
          <p>&copy; {new Date().getFullYear()} Mediafinity Adtech Pvt Ltd. All rights reserved. Fun5Games&trade; is a brand of Mediafinity Adtech Pvt Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
