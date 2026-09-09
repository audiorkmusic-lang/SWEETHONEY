import { Star, Quote } from 'lucide-react';
import { reviews } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CustomerReviews() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-cream-50 py-24 lg:py-32">
      <div ref={ref} className={`reveal mx-auto max-w-7xl px-5 lg:px-8 ${isVisible ? 'is-visible' : ''}`}>
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-honey-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-honey-700">
            Testimonials
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold text-brown-900 sm:text-5xl">
            Loved by Biscuit Lovers
          </h2>
          <p className="mt-4 text-lg text-brown-700/70">
            Thousands of families have made SweetHoney part of their everyday moments.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reviews.map((review, idx) => (
            <article
              key={review.id}
              className={`reveal group relative rounded-4xl bg-gradient-to-br from-cream-100 to-beige-100 p-8 shadow-lg shadow-honey-400/5 transition-all duration-500 hover:shadow-xl hover:shadow-honey-400/10 hover:-translate-y-2 ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              {/* Quote icon */}
              <div className="mb-4 flex items-center justify-between">
                <Quote className="h-10 w-10 text-honey-300" fill="currentColor" />
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-honey-400 text-honey-400" />
                  ))}
                </div>
              </div>

              {/* Review text */}
              <p className="text-base leading-relaxed text-brown-700/85">"{review.text}"</p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-honey-200/40 pt-5">
                <img
                  src={review.image}
                  alt={review.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-honey-300/50"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-brown-900">{review.name}</p>
                  <p className="text-xs text-brown-700/60">Verified Customer</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
