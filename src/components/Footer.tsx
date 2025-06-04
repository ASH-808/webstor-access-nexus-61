
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';

const Footer = () => {
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
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="absolute top-10 left-10 w-24 h-24 border border-white/20 rotate-45"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border border-blue-400/30 rounded-full"></div>
        <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-purple-500/10 rotate-12"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <img 
                src="/lovable-uploads/fd15c227-fc28-4973-8a5f-837497631525.png" 
                alt="WebstorLabs Logo" 
                className="h-12 w-auto object-contain mb-4"
              />
              <p className="text-white/70 leading-relaxed">
                Revolutionizing secure access through cutting-edge NFC technology and intelligent software solutions.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <Mail size={18} className="text-white/60 group-hover:text-blue-400 transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">hello@webstorlabs.com</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone size={18} className="text-white/60 group-hover:text-blue-400 transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <MapPin size={18} className="text-white/60 group-hover:text-blue-400 transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">Tech Valley, CA 94025</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 tracking-wide">QUICK LINKS</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('careers')}
                  className="text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 tracking-wide">SERVICES</h4>
            <ul className="space-y-3 text-white/70">
              <li className="hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer">NFC Access Control</li>
              <li className="hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer">Cloud Software Solutions</li>
              <li className="hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer">Custom Embedded Systems</li>
              <li className="hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer">Enterprise Integration</li>
              <li className="hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer">24/7 Technical Support</li>
              <li className="hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer">Security Consulting</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-6 tracking-wide">CONNECT WITH US</h4>
            <div className="space-y-4">
              <p className="text-white/70 text-sm">
                Follow us for the latest updates and innovations in access control technology.
              </p>
              
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="p-3 bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-lg transition-all duration-300 transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="#" 
                  className="p-3 bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-lg transition-all duration-300 transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="#" 
                  className="p-3 bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-lg transition-all duration-300 transform hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>

              <div className="pt-4">
                <h5 className="font-semibold mb-2">Newsletter</h5>
                <p className="text-white/60 text-sm mb-3">
                  Get updates on new products and industry insights.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 WebstorLabs. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm text-white/60">
              <a href="#" className="hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
