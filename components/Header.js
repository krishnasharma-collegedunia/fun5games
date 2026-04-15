'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
          <span className="logo-icon">F5</span>
          Fun5Games
        </Link>

        <form className="search-form" onSubmit={handleSearch} role="search">
          <input
            type="text"
            placeholder="Search games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search games"
          />
          <button type="submit">Search</button>
        </form>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Primary">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
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
