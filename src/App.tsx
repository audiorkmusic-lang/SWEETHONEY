import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '@/lib/auth';
import { CartProvider } from '@/lib/cart';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductHighlight from '@/components/ProductHighlight';
import WhySweetHoney from '@/components/WhySweetHoney';
import BrandStory from '@/components/BrandStory';
import StoreLocations from '@/components/StoreLocations';
import CustomerReviews from '@/components/CustomerReviews';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-honey-200 border-t-honey-500" />
      </div>
    );
  }

  if (!user) return <AdminLogin />;
  return <AdminDashboard />;
}

function AppContent() {
  const route = useHashRoute();
  const isAdmin = route.startsWith('#/admin');

  if (isAdmin) return <AdminRoute />;

  return (
    <div className="min-h-screen bg-cream-50 font-body text-brown-800">
      <Navbar />
      <main>
        <Hero />
        <ProductHighlight />
        <WhySweetHoney />
        <BrandStory />
        <StoreLocations />
        <CustomerReviews />
        <FinalCTA />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
