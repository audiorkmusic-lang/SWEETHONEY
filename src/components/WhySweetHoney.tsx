import { Heart, Sparkles, Wheat, Droplet } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const features = [
  {
    icon: Droplet,
    title: 'Real Honey Goodness',
    description: 'Made with delicious honey flavor in every single bite.',
    accent: 'from-honey-300 to-honey-500',
  },
  {
    icon: Wheat,
    title: 'Quality Ingredients',
    description: 'Carefully selected ingredients for great taste you can trust.',
    accent: 'from-honey-400 to-honey-600',
  },
  {
    icon: Sparkles,
    title: 'Crispy & Fresh',
    description: 'A satisfying crunch that keeps you coming back for more.',
    accent: 'from-honey-300 to-honey-500',
  },
  {
    icon: Heart,
    title: 'Made for Every Moment',
    description: 'Perfect with tea, coffee, or as a quick snack anytime.',
    accent: 'from-honey-400 to-honey-600',
  },
];

export default function WhySweetHoney() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-beige-100 to-cream-100 py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-honey-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-honey-100/30 blur-3xl" />

      <div ref={ref} className={`reveal mx-auto max-w-7xl px-5 lg:px-8 ${isVisible ? 'is-visible' : ''}`}>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-honey-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-honey-700">
            Why SweetHoney
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold text-brown-900 sm:text-5xl">
            Taste the Difference
          </h2>
          <p className="mt-4 text-lg text-brown-700/70">
            We put care into every detail, from sourcing to baking, so every bite feels special.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`reveal group rounded-4xl bg-cream-50 p-8 text-center shadow-lg shadow-honey-400/5 transition-all duration-500 hover:shadow-xl hover:shadow-honey-400/10 hover:-translate-y-2 ${isVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-white shadow-lg shadow-honey-400/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <Icon className="h-8 w-8" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-brown-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-700/70">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
