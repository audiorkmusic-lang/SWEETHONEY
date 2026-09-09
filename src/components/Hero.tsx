import { ArrowRight, ShoppingBag, Star } from 'lucide-react';

const HERO_BISCUIT =
  'https://images.pexels.com/photos/10311439/pexels-photo-10311439.jpeg?auto=compress&cs=tinysrgb&w=1100';

const HONEY_JAR =
  'https://images.pexels.com/photos/5634205/pexels-photo-5634205.jpeg?auto=compress&cs=tinysrgb&w=400';

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cream-50 via-cream-100 to-honey-50 pt-28 pb-16 lg:pt-32"
    >
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-honey-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-honey-100/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-beige-200/40 blur-3xl" />

      {/* Floating decorative elements */}
      <div className="pointer-events-none absolute left-[8%] top-[30%] hidden md:block">
        <div className="animate-float-slow">
          <div className="h-6 w-6 rounded-full bg-honey-400/50 blur-[1px]" />
        </div>
      </div>
      <div className="pointer-events-none absolute left-[15%] bottom-[20%] hidden md:block">
        <div className="animate-float-medium">
          <div className="h-4 w-4 rounded-full bg-honey-300/60" />
        </div>
      </div>
      <div className="pointer-events-none absolute right-[5%] bottom-[15%] hidden md:block">
        <div className="animate-float-fast">
          <div className="h-5 w-5 rounded-full bg-honey-200/70 blur-[1px]" />
        </div>
      </div>
      <div className="pointer-events-none absolute right-[12%] top-[25%] hidden lg:block">
        <div className="animate-float-slow">
          <div className="h-3 w-3 rounded-full bg-brown-700/20" />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left: copy */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-honey-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-honey-700">
            <span className="h-2 w-2 rounded-full bg-honey-500" />
            Made with Love &amp; Honey
          </div>

          <h1
            className="animate-fade-up mt-6 font-display text-5xl font-bold leading-[1.1] text-brown-900 sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            A Little Sweetness
            <br />
            in Every <span className="shimmer-text">Bite.</span>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-md text-lg leading-relaxed text-brown-700/80 lg:mx-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            Crispy, golden biscuits crafted with delicious honey for a taste you'll want again and
            again.
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            <button
              onClick={() => scrollTo('#products')}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-honey-400 to-honey-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-honey-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-honey-400/40 hover:-translate-y-1 active:translate-y-0"
            >
              <ShoppingBag className="h-5 w-5" />
              Shop SweetHoney
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo('#products')}
              className="rounded-full border-2 border-honey-300 bg-cream-50/50 px-8 py-4 text-base font-semibold text-brown-800 transition-all duration-300 hover:border-honey-400 hover:bg-honey-50 hover:-translate-y-1 active:translate-y-0"
            >
              Explore Our Biscuits
            </button>
          </div>

          {/* Trust badges */}
          <div
            className="animate-fade-up mt-10 flex items-center justify-center gap-6 lg:justify-start"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-honey-400 text-honey-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-brown-700">4.9/5</span>
            </div>
            <div className="h-5 w-px bg-brown-700/15" />
            <span className="text-sm font-medium text-brown-700">10,000+ Happy Families</span>
          </div>
        </div>

        {/* Right: hero image */}
        <div className="relative order-1 lg:order-2">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            {/* Glow background */}
            <div className="absolute inset-0 bg-honey-glow scale-110" />

            {/* Main circular backdrop */}
            <div className="relative aspect-square overflow-hidden rounded-full border-8 border-cream-50 shadow-2xl shadow-honey-400/20">
              <img
                src={HERO_BISCUIT}
                alt="SweetHoney golden honey biscuits"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>

            {/* Floating honey jar card */}
            <div className="absolute -bottom-4 -left-4 animate-float-medium rounded-3xl bg-cream-50/90 p-3 shadow-xl backdrop-blur-sm sm:-left-8 lg:-left-12">
              <div className="flex items-center gap-3">
                <img
                  src={HONEY_JAR}
                  alt="Honey jar with dipper"
                  className="h-14 w-14 rounded-2xl object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-brown-900">100% Real Honey</p>
                  <p className="text-xs text-brown-700/70">No artificial flavors</p>
                </div>
              </div>
            </div>

            {/* Floating rating badge */}
            <div className="absolute -right-2 top-8 animate-float-slow rounded-2xl bg-cream-50/90 px-4 py-3 shadow-xl backdrop-blur-sm sm:-right-6 lg:-right-10">
              <p className="font-display text-2xl font-bold text-honey-600">25+</p>
              <p className="text-xs font-medium text-brown-700/70">Years of baking</p>
            </div>

            {/* Small biscuit crumb decoration */}
            <div className="absolute right-10 bottom-12 animate-float-fast">
              <div className="h-3 w-3 rounded-full bg-honey-300/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path
            d="M0,40 C320,80 720,0 1440,40 L1440,80 L0,80 Z"
            fill="#FFFDF7"
            className="transition-all"
          />
        </svg>
      </div>
    </section>
  );
}
