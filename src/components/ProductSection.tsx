
import { useEffect, useState } from 'react';

const ProductSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    "Custom Software Development & Web Applications",
    "Hardware Design & Embedded Systems", 
    "Mobile Apps & Cross-Platform Solutions",
    "Cloud Infrastructure & DevOps Solutions"
  ];

  return (
    <section id="services" className="relative min-h-screen bg-black py-20 overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="absolute top-20 right-10 w-32 h-32 border border-white/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border border-white/30 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/5 rotate-12"></div>
        <div className="absolute top-40 left-1/3 w-20 h-20 border border-blue-400/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/4 w-12 h-12 bg-purple-500/20 rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider leading-tight">
                SOFTWARE.
                <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  HARDWARE.
                </span>
                <span className="block text-white/70">EVERYTHING.</span>
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              
              <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                WebstorLabs delivers comprehensive technology solutions from concept to deployment. 
                Whether you need cutting-edge software, custom hardware, or complete digital transformation, 
                we're your all-in-one technology partner.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white tracking-wide">
                OUR SERVICES
              </h3>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    <p className="text-lg text-white/80 font-light tracking-wide group-hover:text-white transition-colors duration-300">
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
              className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl h-96 flex items-center justify-center transform hover:scale-105 transition-all duration-500"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <div className="text-center space-y-4">
                <div className="w-24 h-24 border-4 border-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                </div>
                <p className="text-white font-light tracking-wider">FULL-STACK SOLUTIONS</p>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 border border-blue-400/30 rotate-45 animate-float"></div>
            <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full animate-float delay-1000"></div>
            
            {/* Floating Cards */}
            <div className="absolute -top-16 -right-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 animate-float">
              <div className="text-white font-semibold text-sm">Enterprise Solutions</div>
              <div className="text-white/60 text-xs">Scalable & Secure</div>
            </div>
            
            <div className="absolute -bottom-16 -left-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 animate-float delay-500">
              <div className="text-white font-semibold text-sm">Scalable</div>
              <div className="text-white/60 text-xs">Architecture</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
