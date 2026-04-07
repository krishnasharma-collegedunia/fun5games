import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>GameVault</h4>
            <p>
              GameVault is an independent game discovery portal helping users find and explore the best mobile games.
              We curate games across multiple categories to help you find your next favorite.
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
            <h4>Legal</h4>
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
            GameVault is an independent game discovery portal. We are not affiliated with, endorsed by, or connected to
            Google Play, Apple App Store, or any game developers. All app names, logos, and trademarks belong to their
            respective owners. We provide links to official stores for user convenience only.
          </p>
          <p>&copy; {new Date().getFullYear()} GameVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
