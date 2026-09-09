import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Biscuits', href: '#products' },
  { label: 'Our Story', href: '#story' },
  { label: 'Stores', href: '#stores' },
  { label: 'Contact', href: '#footer' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-[0_4px_30px_rgba(247,183,51,0.08)] py-3' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-honey-300 to-honey-500 text-white shadow-lg shadow-honey-400/30">
            <ShoppingBag className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-brown-800">
            Sweet<span className="text-honey-500">Honey</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="group relative text-sm font-medium text-brown-700 transition-colors hover:text-honey-600"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-honey-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={() => handleNavClick('#products')}
          className="hidden rounded-full bg-gradient-to-r from-honey-400 to-honey-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-honey-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-honey-400/40 hover:-translate-y-0.5 active:translate-y-0 lg:block"
        >
          Shop Now
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 text-brown-800 transition-colors hover:bg-cream-200 lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mx-5 mt-3 space-y-1 rounded-3xl bg-cream-50 p-4 shadow-xl shadow-honey-400/10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-brown-700 transition-colors hover:bg-honey-100 hover:text-honey-600"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNavClick('#products')}
              className="mt-2 w-full rounded-full bg-gradient-to-r from-honey-400 to-honey-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-honey-400/30"
            >
              Shop Now
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
