
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProductSection from '../components/ProductSection';
import CareersSection from '../components/CareersSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />
      <ProductSection />
      <CareersSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
