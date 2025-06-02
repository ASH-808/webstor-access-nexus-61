
import { useEffect, useState } from 'react';

const ProductSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    "One-tap secure access with NFC",
    "Real-time monitoring and analytics", 
    "Admin + User dashboards",
    "Custom role-based permissions"
  ];

  return (
    <section id="products" className="relative min-h-screen bg-white py-20">
      {/* Parallax Background Elements */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="absolute top-20 right-10 w-32 h-32 border border-black/20 rotate-45"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border border-black/30 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-black/5 rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black tracking-wider leading-tight">
                SEAMLESS.
                <span className="block text-black/70">SECURE.</span>
                <span className="block text-black/50">SCALABLE.</span>
              </h2>
              
              <div className="w-24 h-1 bg-black"></div>
              
              <p className="text-xl md:text-2xl text-black/80 font-light leading-relaxed">
                WebstorLabs provides cutting-edge NFC-based access control systems integrated with powerful cloud software, tailored for enterprises, institutions, and modern workplaces.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-black tracking-wide">
                KEY HIGHLIGHTS
              </h3>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-2 h-2 bg-black group-hover:scale-150 transition-transform duration-300"></div>
                    <p className="text-lg text-black/80 font-light tracking-wide group-hover:text-black transition-colors duration-300">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div 
              className="relative z-10 bg-black h-96 flex items-center justify-center transform hover:scale-105 transition-transform duration-500"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <div className="text-center space-y-4">
                <div className="w-24 h-24 border-4 border-white rounded-full mx-auto flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full animate-pulse"></div>
                </div>
                <p className="text-white font-light tracking-wider">NFC ACCESS CONTROL</p>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 border border-black/20 rotate-45 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-black/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
