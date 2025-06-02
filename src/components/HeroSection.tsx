
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* Parallax Background Elements */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white/30 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-white/5 rotate-12"></div>
        <div className="absolute top-1/2 right-10 w-40 h-40 border border-white/15 rotate-12"></div>
      </div>

      {/* Floating Tech Graphics */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute top-1/4 left-1/2 w-96 h-96 border border-white/20 rounded-full transform -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white/15 transform rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider">
              WEBSTOR
              <span className="block text-white/80">LABS</span>
            </h1>
            
            {/* Subtitle */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light tracking-wide leading-relaxed">
                Revolutionizing secure access—From smart NFC entry to intelligent software control.
              </h2>
            </div>
          </div>

          {/* Tagline */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-white/70 font-light tracking-wide leading-relaxed">
              From NFC access control to custom embedded solutions, we build the future of secure infrastructure.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <button 
              onClick={() => scrollToSection('products')}
              className="group relative px-8 py-4 bg-white text-black font-semibold tracking-wider transition-all duration-300 hover:bg-white/90 transform hover:scale-105"
            >
              <span className="relative z-10">KNOW MORE</span>
              <div className="absolute inset-0 bg-white transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            </button>
            
            <button 
              onClick={() => scrollToSection('careers')}
              className="group relative px-8 py-4 border-2 border-white text-white font-semibold tracking-wider transition-all duration-300 hover:bg-white hover:text-black transform hover:scale-105"
            >
              <span className="relative z-10">WE'RE HIRING!</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
