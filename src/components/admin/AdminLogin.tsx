import { useState } from 'react';
import { ShoppingBag, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function AdminLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError(signInError);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cream-50 via-cream-100 to-honey-50 px-5">
      <div className="w-full max-w-md">
        {/* Back link */}
        <a
          href="#/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-brown-700 transition-colors hover:text-honey-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to website
        </a>

        <div className="rounded-4xl bg-cream-50 p-8 shadow-2xl shadow-honey-400/10 sm:p-10">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-honey-300 to-honey-500 text-white shadow-lg shadow-honey-400/30">
              <ShoppingBag className="h-7 w-7" strokeWidth={2.2} />
            </div>
            <h1 className="font-display text-3xl font-bold text-brown-900">
              Sweet<span className="text-honey-500">Honey</span>
            </h1>
            <p className="mt-1 text-sm text-brown-700/60">Admin Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brown-800">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-honey-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sweethoney.com"
                  className="w-full rounded-2xl border-2 border-cream-200 bg-cream-50 py-3 pl-11 pr-4 text-brown-900 outline-none transition-all placeholder:text-brown-700/30 focus:border-honey-400 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brown-800">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-honey-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border-2 border-cream-200 bg-cream-50 py-3 pl-11 pr-4 text-brown-900 outline-none transition-all placeholder:text-brown-700/30 focus:border-honey-400 focus:bg-white"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-honey-400 to-honey-500 py-3.5 text-base font-semibold text-white shadow-lg shadow-honey-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-honey-400/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
