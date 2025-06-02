
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

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

  const performanceMetrics = [
    { value: '99.9%', label: 'System Uptime' },
    { value: '500ms', label: 'Access Speed' },
    { value: '256-bit', label: 'Encryption' },
    { value: '24/7', label: 'Monitoring' }
  ];

  const teamAvatars = [
    { name: 'Alex Chen', role: 'Lead Engineer' },
    { name: 'Sarah Kim', role: 'Security Expert' },
    { name: 'Mike Rodriguez', role: 'Hardware Designer' },
    { name: 'Emma Watson', role: 'Product Manager' }
  ];

  return (
    <section id="hero" className="relative min-h-screen bg-black overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white/30 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-white/5 rotate-12"></div>
        <div className="absolute top-1/2 right-10 w-40 h-40 border border-white/15 rotate-12"></div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-xl space-y-8 animate-fade-in">
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Secure Access
                <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Redefined
                </span>
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
                Revolutionary NFC technology meets intelligent software control. 
                Building the future of secure infrastructure, one innovation at a time.
              </p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-colors duration-300">
                  <div className="text-lg md:text-xl lg:text-2xl font-bold text-white">{metric.value}</div>
                  <div className="text-xs md:text-sm text-white/60">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('products')}
                className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105"
              >
                Explore Solutions
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => scrollToSection('careers')}
                className="px-6 md:px-8 py-3 md:py-4 border-2 border-white/20 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40"
              >
                Join Our Team
              </button>
            </div>

            {/* Team Avatars */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-3">
                {teamAvatars.map((member, index) => (
                  <div 
                    key={index}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-black bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center"
                    title={`${member.name} - ${member.role}`}
                  >
                    <span className="text-white font-semibold text-xs md:text-sm">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-white/60 text-xs md:text-sm">
                Trusted by our expert team
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative">
          <div 
            className="relative"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            {/* Main Visual Container */}
            <div className="relative w-80 h-80 xl:w-96 xl:h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl border border-white/10 backdrop-blur-sm">
              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 w-20 h-20 xl:w-24 xl:h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl rotate-12 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 xl:w-32 xl:h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl rotate-45 animate-pulse delay-1000"></div>
              
              {/* Central Icon/Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 xl:w-32 xl:h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 flex items-center justify-center">
                  <div className="w-12 h-12 xl:w-16 xl:h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl xl:text-2xl">W</span>
                  </div>
                </div>
              </div>

              {/* Orbital Elements */}
              <div className="absolute top-4 right-4 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-500"></div>
              <div className="absolute top-1/2 left-4 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-4 w-2 h-2 bg-white/60 rounded-full animate-pulse delay-700"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-16 -right-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 animate-float">
              <div className="text-white font-semibold text-sm">NFC Enabled</div>
              <div className="text-white/60 text-xs">Instant Access</div>
            </div>
            
            <div className="absolute -bottom-16 -left-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 animate-float delay-1000">
              <div className="text-white font-semibold text-sm">Secure</div>
              <div className="text-white/60 text-xs">256-bit Encryption</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
