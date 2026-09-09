import { useState } from 'react';
import {
  ShoppingBag,
  Package,
  Store as StoreIcon,
  ShoppingCart,
  LogOut,
  Home,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import ProductManager from './ProductManager';
import StoreManager from './StoreManager';
import OrderManager from './OrderManager';

type Tab = 'products' | 'stores' | 'orders';

const tabs: { id: Tab; label: string; icon: typeof Package }[] = [
  { id: 'products', label: 'Products', icon: Package },
  { id: 'stores', label: 'Stores', icon: StoreIcon },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
];

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.hash = '#/';
  };

  const handleHome = () => {
    window.location.hash = '#/';
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Top bar (mobile) */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-cream-50/90 px-5 py-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-honey-300 to-honey-500 text-white">
            <ShoppingBag className="h-4.5 w-4.5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-xl font-bold text-brown-900">
            Sweet<span className="text-honey-500">Honey</span>
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 text-brown-800"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-cream-200 bg-cream-100 transition-transform duration-300 lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col p-5">
            {/* Logo */}
            <div className="mb-8 flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-honey-300 to-honey-500 text-white shadow-lg shadow-honey-400/30">
                <ShoppingBag className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-display text-xl font-bold text-brown-900">
                Sweet<span className="text-honey-500">Honey</span>
              </span>
            </div>

            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-brown-700/40">
              Admin Panel
            </p>

            {/* Nav */}
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSidebarOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-honey-400 to-honey-500 text-white shadow-lg shadow-honey-400/25'
                        : 'text-brown-700 hover:bg-cream-200'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Bottom actions */}
            <div className="mt-auto space-y-1 pt-8">
              <button
                onClick={handleHome}
                className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold text-brown-700 transition-colors hover:bg-cream-200"
              >
                <Home className="h-5 w-5" />
                View Website
              </button>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-brown-900/30 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-5 lg:p-8">
          {activeTab === 'products' && <ProductManager />}
          {activeTab === 'stores' && <StoreManager />}
          {activeTab === 'orders' && <OrderManager />}
        </main>
      </div>
    </div>
  );
}
