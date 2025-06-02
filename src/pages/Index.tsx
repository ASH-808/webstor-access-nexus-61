
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProductSection from '../components/ProductSection';
import CareersSection from '../components/CareersSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />
      <ProductSection />
      <CareersSection />
    </div>
  );
};

export default Index;
