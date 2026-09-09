import { useEffect, useState } from 'react';
import { Plus, Star } from 'lucide-react';
import { getProducts } from '@/lib/api';
import type { Product } from '@/lib/types';
import { products as fallbackProducts } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ProductHighlight() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data.length > 0 ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayProducts =
    products.length > 0
      ? products
      : fallbackProducts.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: parseFloat(p.price.replace('$', '')),
          image: p.image,
          category: 'Classic',
          stock: 0,
          created_at: '',
        }));

  return (
    <section id="products" className="bg-cream-50 py-24 lg:py-32">
      <div
        ref={ref}
        className={`reveal mx-auto max-w-7xl px-5 lg:px-8 ${isVisible ? 'is-visible' : ''}`}
      >
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-honey-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-honey-700">
            Our Biscuits
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold text-brown-900 sm:text-5xl">
            Meet Your New Favorite Biscuit
          </h2>
          <p className="mt-4 text-lg text-brown-700/70">
            Three delicious varieties, each crafted with real honey and baked to golden perfection.
          </p>
        </div>

        {/* Product cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? // Skeleton placeholders while loading
              [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-4xl bg-cream-100 shadow-lg shadow-honey-400/5"
                >
                  <div className="aspect-square animate-pulse bg-beige-100" />
                  <div className="p-6">
                    <div className="h-7 w-3/4 animate-pulse rounded-lg bg-beige-100" />
                    <div className="mt-3 h-4 w-full animate-pulse rounded-lg bg-beige-100" />
                    <div className="mt-5 flex items-center justify-between">
                      <div className="h-7 w-16 animate-pulse rounded-lg bg-beige-100" />
                      <div className="h-10 w-28 animate-pulse rounded-full bg-beige-100" />
                    </div>
                  </div>
                </div>
              ))
            : displayProducts.map((product, idx) => (
                <article
                  key={product.id}
                  className={`group reveal ${isVisible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                >
                  <div className="relative overflow-hidden rounded-4xl bg-cream-100 shadow-lg shadow-honey-400/5 transition-all duration-500 hover:shadow-2xl hover:shadow-honey-400/15 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image ?? ''}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brown-900/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      {/* Rating badge */}
                      <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-cream-50/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                        <Star className="h-3.5 w-3.5 fill-honey-400 text-honey-400" />
                        <span className="text-xs font-bold text-brown-900">4.9</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-2xl font-bold text-brown-900">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-brown-700/70">
                        {product.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="font-display text-2xl font-bold text-honey-600">
                          ${typeof product.price === 'number'
                            ? product.price.toFixed(2)
                            : product.price}
                        </span>
                        <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-honey-400 to-honey-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-honey-400/25 transition-all duration-300 hover:shadow-xl hover:shadow-honey-400/35 group-hover:scale-105 active:scale-95">
                          <Plus className="h-4 w-4" strokeWidth={2.5} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
