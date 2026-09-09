import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CTA_IMAGE =
  'https://images.pexels.com/photos/9834373/pexels-photo-9834373.png?auto=compress&cs=tinysrgb&w=800';

export default function FinalCTA() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-cream-50 px-5 py-16 lg:px-8 lg:py-24">
      <div
        ref={ref}
        className={`reveal mx-auto max-w-7xl overflow-hidden rounded-5xl bg-gradient-to-br from-honey-400 via-honey-500 to-honey-600 shadow-2xl shadow-honey-400/30 ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Text side */}
          <div className="px-8 py-12 text-center lg:px-16 lg:py-20 lg:text-left">
            <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Ready for a Sweeter Moment?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-cream-50/90 lg:mx-0">
              Open a pack. Take a bite. Let SweetHoney make your day a little better.
            </p>
            <button
              onClick={() => scrollTo('#products')}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-8 py-4 text-base font-bold text-honey-600 shadow-xl transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
            >
              <ShoppingBag className="h-5 w-5" />
              Shop SweetHoney
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Image side */}
          <div className="relative h-64 lg:h-full">
            <img
              src={CTA_IMAGE}
              alt="Golden biscuits with honey"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-honey-500/30 to-transparent" />
            {/* Decorative floating drops */}
            <div className="absolute right-8 top-8 h-4 w-4 animate-float-slow rounded-full bg-cream-50/40" />
            <div className="absolute right-16 bottom-12 h-3 w-3 animate-float-medium rounded-full bg-cream-50/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
