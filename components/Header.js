'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from './Logo';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setMenuOpen(false);
    }
  }

  return (
    <header className="header header-minimal">
      <div className="header-inner">
        <Link href="/" className="logo" aria-label="Fun5Games home">
          <Logo size={34} />
        </Link>

        <form className="search-form" onSubmit={handleSearch} role="search">
          <input
            type="text"
            placeholder="Search 200+ games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search games"
          />
          <button type="submit" aria-label="Submit search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span>Search</span>
          </button>
        </form>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Primary">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/top-mobile-games-india-2026" onClick={() => setMenuOpen(false)}>Top 15</Link>
          <Link href="/category/action" onClick={() => setMenuOpen(false)}>Categories</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
