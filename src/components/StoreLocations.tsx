import { MapPin, ArrowRight } from 'lucide-react';
import { stores } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function StoreLocations() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="stores" className="relative overflow-hidden bg-gradient-to-b from-cream-100 to-beige-100 py-24 lg:py-32">
      {/* Decorative map-style pin */}
      <div className="pointer-events-none absolute left-8 top-24 opacity-5">
        <MapPin className="h-48 w-48 text-honey-600" strokeWidth={1} />
      </div>

      <div ref={ref} className={`reveal mx-auto max-w-7xl px-5 lg:px-8 ${isVisible ? 'is-visible' : ''}`}>
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-honey-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-honey-700">
            Find Us
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold text-brown-900 sm:text-5xl">
            Find SweetHoney Near You
          </h2>
          <p className="mt-4 text-lg text-brown-700/70">
            Visit your nearest store and bring home your favorite SweetHoney biscuits.
          </p>
        </div>

        {/* Store grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stores.map((store, idx) => (
            <article
              key={store.id}
              className={`reveal group overflow-hidden rounded-4xl bg-cream-50 shadow-lg shadow-honey-400/5 transition-all duration-500 hover:shadow-2xl hover:shadow-honey-400/15 hover:-translate-y-2 ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={store.image}
                  alt={`${store.name} in ${store.city}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/50 via-transparent to-transparent" />
                {/* Location pin badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-cream-50/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                  <MapPin className="h-3.5 w-3.5 text-honey-600" />
                  <span className="text-xs font-bold text-brown-900">{store.city}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-brown-900">{store.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brown-700/70">{store.address}</p>
                <button className="group/btn mt-4 flex items-center gap-1.5 text-sm font-semibold text-honey-600 transition-colors hover:text-honey-700">
                  View Location
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
