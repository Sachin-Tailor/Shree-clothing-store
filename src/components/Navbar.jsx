'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import CartModal from './CartModal';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Collections',
    href: '/collections',
    dropdown: [
      { label: 'All Products', href: '/collections' },
      { label: 'New Arrivals', href: '/collections?category=new' },
      { label: 'Bestsellers', href: '/collections?category=bestseller' },
    ],
  },
  { label: 'Sarees', href: '/sarees' },
  { label: 'Kurtis', href: '/kurtis' },
  { label: 'Lehengas', href: '/lehengas' },
  { label: 'About Us', href: '/about' },
];

export default function Navbar() {
  const { cartCount, isCartOpen, setIsCartOpen, searchQuery, setSearchQuery } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-sm border-b border-shree/10'
          : 'bg-white/95 backdrop-blur-md border-b border-shree-light/15'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Mobile menu btn */}
            <button
              className="md:hidden text-shree-dark hover:text-shree transition p-1"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] text-shree-dark hover:text-shree transition duration-300">
              SHREE A
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map(link => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-3 py-2 text-xs uppercase tracking-[0.12em] font-medium transition duration-200 relative group ${
                      isActive(link.href)
                        ? 'text-shree'
                        : 'text-gray-600 hover:text-shree'
                    }`}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown className="w-3 h-3 opacity-60" />}
                    {/* Underline */}
                    <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-shree transition-all duration-300 ${
                      isActive(link.href) ? 'w-auto' : 'w-0 group-hover:w-auto'
                    }`} style={{ left: '0.75rem', right: '0.75rem' }} />
                  </Link>

                  {/* Dropdown */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 bg-white border border-shree-muted shadow-xl rounded-sm py-2 min-w-[180px] z-50 animate-fade-in">
                      {link.dropdown.map(item => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-5 py-2.5 text-xs uppercase tracking-wider text-gray-600 hover:text-shree hover:bg-shree-bg transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              {searchOpen ? (
                <div className="flex items-center bg-shree-muted rounded-full px-4 py-2 transition-all">
                  <Search className="w-4 h-4 text-shree-light mr-2 flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search sarees, kurtis…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm text-shree-dark placeholder-shree-light outline-none w-36"
                    onBlur={() => !searchQuery && setSearchOpen(false)}
                  />
                  {searchQuery && (
                    <button onClick={() => { setSearchQuery(''); setSearchOpen(false); }}>
                      <X className="w-4 h-4 text-shree-light ml-1" />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-shree-dark hover:text-shree transition p-1"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}

              {/* Wishlist */}
              <button className="hidden sm:block text-shree-dark hover:text-shree transition p-1" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                id="cart-button"
                onClick={() => setIsCartOpen(true)}
                className="relative text-shree-dark hover:text-shree transition p-1"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-shree text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-shree/10 animate-fade-in shadow-lg">
            <div className="px-6 py-4 space-y-1">
              {navLinks.map(link => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={`block text-sm uppercase tracking-wider font-medium transition py-3 border-b border-shree-bg ${
                      isActive(link.href) ? 'text-shree' : 'text-shree-dark hover:text-shree'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 space-y-1 py-1">
                      {link.dropdown.map(item => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block text-xs uppercase tracking-wider text-gray-500 hover:text-shree py-1.5 transition"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
