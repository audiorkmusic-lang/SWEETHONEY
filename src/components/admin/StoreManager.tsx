import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, AlertCircle, MapPin, Store as StoreIcon } from 'lucide-react';
import { getStores, createStore, updateStore, deleteStore } from '@/lib/api';
import type { Store, StoreInput } from '@/lib/types';

export default function StoreManager() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Store | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStores();
      setStores(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stores');
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (store: Store) => {
    setEditing(store);
    setShowForm(true);
    setFormError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this store? This cannot be undone.')) return;
    try {
      await deleteStore(id);
      setStores((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete store');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-honey-200 border-t-honey-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-brown-900">Stores</h2>
          <p className="text-sm text-brown-700/60">{stores.length} locations</p>
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
          Add Store
        </button>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <div
            key={store.id}
            className="group overflow-hidden rounded-3xl bg-cream-100 shadow-md transition-all hover:shadow-lg"
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              {store.image ? (
                <img src={store.image} alt={store.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-beige-100">
                  <StoreIcon className="h-12 w-12 text-honey-300" />
                </div>
              )}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-cream-50/95 px-3 py-1.5 shadow-sm">
                <MapPin className="h-3.5 w-3.5 text-honey-600" />
                <span className="text-xs font-bold text-brown-900">{store.city}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg font-bold text-brown-900">{store.name}</h3>
              <p className="mt-1 text-sm text-brown-700/70">{store.address}</p>
              {store.phone && (
                <p className="mt-1 text-sm text-brown-700/60">{store.phone}</p>
              )}
              {store.opening_hours && (
                <p className="mt-1 text-sm text-brown-700/60">{store.opening_hours}</p>
              )}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(store)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-cream-50 py-2 text-sm font-medium text-brown-800 transition-colors hover:bg-honey-100"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(store.id)}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {stores.length === 0 && (
        <div className="py-20 text-center">
          <StoreIcon className="mx-auto mb-3 h-12 w-12 text-honey-300" />
          <p className="text-brown-700/60">No stores yet. Add your first location!</p>
        </div>
      )}

      {showForm && (
        <StoreForm
          store={editing}
          formError={formError}
          saving={saving}
          onClose={() => setShowForm(false)}
          onSave={async (input) => {
            setSaving(true);
            setFormError(null);
            try {
              if (editing) {
                const updated = await updateStore(editing.id, input);
                setStores((prev) => prev.map((s) => (s.id === editing.id ? updated : s)));
              } else {
                const created = await createStore(input);
                setStores((prev) => [...prev, created]);
              }
              setShowForm(false);
            } catch (err) {
              setFormError(err instanceof Error ? err.message : 'Failed to save store');
            }
            setSaving(false);
          }}
        />
      )}
    </div>
  );
}

function StoreForm({
  store,
  formError,
  saving,
  onClose,
  onSave,
}: {
  store: Store | null;
  formError: string | null;
  saving: boolean;
  onClose: () => void;
  onSave: (input: StoreInput) => void;
}) {
  const [name, setName] = useState(store?.name ?? 'SweetHoney Store');
  const [city, setCity] = useState(store?.city ?? '');
  const [address, setAddress] = useState(store?.address ?? '');
  const [phone, setPhone] = useState(store?.phone ?? '');
  const [openingHours, setOpeningHours] = useState(store?.opening_hours ?? '');
  const [image, setImage] = useState(store?.image ?? '');
  const [latitude, setLatitude] = useState(store?.latitude ? String(store.latitude) : '');
  const [longitude, setLongitude] = useState(store?.longitude ? String(store.longitude) : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      city,
      address,
      phone: phone || undefined,
      opening_hours: openingHours || undefined,
      image: image || undefined,
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-brown-900/40 p-5 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-4xl bg-cream-50 p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold text-brown-900">
            {store ? 'Edit Store' : 'Add Store'}
          </h3>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-100 text-brown-700 transition-colors hover:bg-cream-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormRow>
            <Field label="Store Name">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="SweetHoney Store"
              />
            </Field>
            <Field label="City">
              <input
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-input"
                placeholder="Bengaluru"
              />
            </Field>
          </FormRow>

          <Field label="Address">
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              placeholder="45 Brigade Rd, Ashok Nagar, Bengaluru 560001"
            />
          </Field>

          <FormRow>
            <Field label="Phone">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
                placeholder="+91 80 1234 5678"
              />
            </Field>
            <Field label="Opening Hours">
              <input
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                className="form-input"
                placeholder="Mon–Sun: 9 AM – 9 PM"
              />
            </Field>
          </FormRow>

          <Field label="Image URL">
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="form-input"
              placeholder="https://..."
            />
          </Field>

          <FormRow>
            <Field label="Latitude">
              <input
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="form-input"
                placeholder="12.971599"
              />
            </Field>
            <Field label="Longitude">
              <input
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="form-input"
                placeholder="77.594566"
              />
            </Field>
          </FormRow>

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

function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-brown-800">{label}</label>
      {children}
    </div>
  );
}
