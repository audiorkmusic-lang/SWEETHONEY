import { ShoppingBag, Instagram, Facebook, Youtube, MapPin, Mail, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Biscuits', href: '#products' },
  { label: 'Our Story', href: '#story' },
  { label: 'Stores', href: '#stores' },
  { label: 'Contact', href: '#footer' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-brown-900 text-cream-100">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-honey-300 to-honey-500 text-white shadow-lg">
                <ShoppingBag className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-display text-2xl font-bold text-cream-50">
                Sweet<span className="text-honey-400">Honey</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cream-100/70">
              Sweetness in every bite. Premium honey biscuits crafted with love for families who
              deserve the best.
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brown-800 text-cream-100/80 transition-all duration-300 hover:bg-honey-500 hover:text-white hover:-translate-y-1"
                  aria-label="Social link"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-lg font-bold text-cream-50">Navigation</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm text-cream-100/70 transition-colors hover:text-honey-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold text-cream-50">Get in Touch</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-cream-100/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-honey-400" />
                <span>12 Honey Lane, Bengaluru 560001, India</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-cream-100/70">
                <Mail className="h-4 w-4 shrink-0 text-honey-400" />
                <span>hello@sweethoney.com</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-cream-100/70">
                <Phone className="h-4 w-4 shrink-0 text-honey-400" />
                <span>+91 80 1234 5678</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg font-bold text-cream-50">Stay Sweet</h4>
            <p className="mt-4 text-sm text-cream-100/70">
              Join our newsletter for sweet updates and exclusive offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 rounded-full bg-brown-800 px-4 py-2.5 text-sm text-cream-50 placeholder-cream-100/40 outline-none ring-1 ring-brown-700 transition-all focus:ring-2 focus:ring-honey-400"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-honey-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-honey-400 hover:-translate-y-0.5"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brown-800 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-cream-100/60">
            &copy; 2026 SweetHoney. All rights reserved.
          </p>
          <p className="font-display text-sm italic text-honey-400">
            "Sweetness in every bite."
          </p>
        </div>
      </div>
    </footer>
  );
}
