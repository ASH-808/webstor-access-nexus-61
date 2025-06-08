
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import DashboardSection from '../components/DashboardSection';
import ProductSection from '../components/ProductSection';
import CareersSection from '../components/CareersSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import SplashCursor from '../components/SplashCursor';
import ClickSpark from '../components/ClickSpark';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <SplashCursor />
      <ClickSpark 
        sparkColor="#3b82f6" 
        sparkSize={12} 
        sparkRadius={20} 
        sparkCount={6}
        duration={600}
      >
        <Navigation />
        <HeroSection />
        <DashboardSection />
        <ProductSection />
        <CareersSection />
        <ContactSection />
        <Footer />
      </ClickSpark>
    </div>
  );
};

export default Index;
