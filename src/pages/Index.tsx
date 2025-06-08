
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import DashboardSection from '../components/DashboardSection';
import ProductSection from '../components/ProductSection';
import CareersSection from '../components/CareersSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import SplashCursor from '../components/SplashCursor';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <SplashCursor />
      <Navigation />
      <HeroSection />
      <DashboardSection />
      <ProductSection />
      <CareersSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
