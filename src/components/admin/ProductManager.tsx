import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, AlertCircle, Package } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/lib/api';
import type { Product, ProductInput } from '@/lib/types';

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (product: Product) => {
    setEditing(product);
    setShowForm(true);
    setFormError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-honey-200 border-t-honey-500" />
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
        <AlertCircle className="h-4 w-4" />
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-brown-900">Products</h2>
          <p className="text-sm text-brown-700/60">{products.length} items in catalog</p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
            setFormError(null);
          }}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-honey-400 to-honey-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-honey-400/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Add Product
        </button>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-3xl bg-cream-100 shadow-md transition-all hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-beige-100">
                  <Package className="h-12 w-12 text-honey-300" />
                </div>
              )}
              <div className="absolute right-3 top-3 rounded-full bg-cream-50/95 px-2.5 py-1 text-xs font-bold text-brown-900 shadow-sm">
                {product.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg font-bold text-brown-900">{product.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-brown-700/70">{product.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-display text-xl font-bold text-honey-600">
                  ${product.price.toFixed(2)}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    product.stock > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {product.stock} in stock
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-cream-50 py-2 text-sm font-medium text-brown-800 transition-colors hover:bg-honey-100"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="py-20 text-center">
          <Package className="mx-auto mb-3 h-12 w-12 text-honey-300" />
          <p className="text-brown-700/60">No products yet. Add your first biscuit!</p>
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <ProductForm
          product={editing}
          formError={formError}
          saving={saving}
          onClose={() => setShowForm(false)}
          onSave={async (input) => {
            setSaving(true);
            setFormError(null);
            try {
              if (editing) {
                const updated = await updateProduct(editing.id, input);
                setProducts((prev) => prev.map((p) => (p.id === editing.id ? updated : p)));
              } else {
                const created = await createProduct(input);
                setProducts((prev) => [...prev, created]);
              }
              setShowForm(false);
            } catch (err) {
              setFormError(err instanceof Error ? err.message : 'Failed to save product');
            }
            setSaving(false);
          }}
        />
      )}
    </div>
  );
}

function ProductForm({
  product,
  formError,
  saving,
  onClose,
  onSave,
}: {
  product: Product | null;
  formError: string | null;
  saving: boolean;
  onClose: () => void;
  onSave: (input: ProductInput) => void;
}) {
  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(product ? String(product.price) : '');
  const [image, setImage] = useState(product?.image ?? '');
  const [category, setCategory] = useState(product?.category ?? 'Classic');
  const [stock, setStock] = useState(product ? String(product.stock) : '0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description: description || undefined,
      price: parseFloat(price) || 0,
      image: image || undefined,
      category: category || undefined,
      stock: parseInt(stock) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-brown-900/40 p-5 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-4xl bg-cream-50 p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold text-brown-900">
            {product ? 'Edit Product' : 'Add Product'}
          </h3>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-100 text-brown-700 transition-colors hover:bg-cream-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Name">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Classic Honey Biscuit"
            />
          </Field>

          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="form-input resize-none"
              placeholder="A delicious golden biscuit..."
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Price ($)">
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input"
                placeholder="4.99"
              />
            </Field>
            <Field label="Stock">
              <input
                required
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="form-input"
                placeholder="100"
              />
            </Field>
          </div>

          <Field label="Category">
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
              placeholder="Classic"
            />
          </Field>

          <Field label="Image URL">
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="form-input"
              placeholder="https://..."
            />
          </Field>

          {formError && (
            <div className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4" />
              {formError}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border-2 border-cream-200 bg-cream-50 py-3 text-sm font-semibold text-brown-800 transition-colors hover:bg-cream-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-full bg-gradient-to-r from-honey-400 to-honey-500 py-3 text-sm font-semibold text-white shadow-lg shadow-honey-400/25 transition-all hover:shadow-xl disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-brown-800">{label}</label>
      {children}
    </div>
  );
}
