
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div className="font-bold text-xl tracking-wider text-white">
              WEBSTORLABS
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-white/80 hover:text-white transition-colors duration-300 tracking-wide"
            >
              HOME
            </button>
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="text-white/80 hover:text-white transition-colors duration-300 tracking-wide"
            >
              DASHBOARD
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="text-white/80 hover:text-white transition-colors duration-300 tracking-wide"
            >
              PRODUCTS
            </button>
            <button 
              onClick={() => scrollToSection('careers')}
              className="text-white/80 hover:text-white transition-colors duration-300 tracking-wide"
            >
              CAREERS
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white/80 hover:text-white transition-colors duration-300 tracking-wide"
            >
              CONTACT
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white transition-colors"
              >
                HOME
              </button>
              <button 
                onClick={() => scrollToSection('dashboard')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white transition-colors"
              >
                DASHBOARD
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white transition-colors"
              >
                PRODUCTS
              </button>
              <button 
                onClick={() => scrollToSection('careers')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white transition-colors"
              >
                CAREERS
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white transition-colors"
              >
                CONTACT
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
