import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const STORY_IMAGE =
  'https://images.pexels.com/photos/6480844/pexels-photo-6480844.jpeg?auto=compress&cs=tinysrgb&w=900';

export default function BrandStory() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="story" className="bg-cream-50 py-24 lg:py-32">
      <div
        ref={ref}
        className={`reveal mx-auto max-w-7xl px-5 lg:px-8 ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-5xl shadow-2xl shadow-honey-400/15">
              <img
                src={STORY_IMAGE}
                alt="SweetHoney biscuits with flour and rustic decor"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/20 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 rounded-3xl bg-cream-50/95 p-5 shadow-xl backdrop-blur-sm sm:-right-8">
              <p className="font-display text-3xl font-bold text-honey-600">25+</p>
              <p className="text-sm font-medium text-brown-700/80">Years of perfecting our recipe</p>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-3xl border-4 border-honey-300/40" />
          </div>

          {/* Right: text */}
          <div>
            <span className="inline-block rounded-full bg-honey-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-honey-700">
              Our Story
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-brown-900 sm:text-5xl">
              Sweetness Made Simple.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brown-700/80">
              SweetHoney was created with one simple idea — make an everyday biscuit taste a little
              more special. From the golden crunch to the touch of honey, every bite is made to
              bring a little happiness to your day.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brown-700/80">
              We believe great biscuits start with great ingredients. That's why we use real honey,
              carefully sourced wheat, and time-honored baking methods to create something worth
              sharing.
            </p>

            <button
              onClick={() => scrollTo('#footer')}
              className="group mt-8 flex items-center gap-2 rounded-full border-2 border-honey-300 bg-cream-50 px-7 py-3.5 text-base font-semibold text-brown-800 transition-all duration-300 hover:border-honey-400 hover:bg-honey-50 hover:-translate-y-1 active:translate-y-0"
            >
              Our Story
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
