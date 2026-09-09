import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductHighlight from '@/components/ProductHighlight';
import WhySweetHoney from '@/components/WhySweetHoney';
import BrandStory from '@/components/BrandStory';
import StoreLocations from '@/components/StoreLocations';
import CustomerReviews from '@/components/CustomerReviews';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function App() {
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
    </div>
  );
}
