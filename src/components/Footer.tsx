
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold tracking-wider mb-4">WEBSTORLABS</h3>
              <p className="text-white/70 leading-relaxed">
                Revolutionizing secure access through cutting-edge NFC technology and intelligent software solutions.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-white/60" />
                <span className="text-white/80">hello@webstorlabs.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-white/60" />
                <span className="text-white/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-white/60" />
                <span className="text-white/80">Tech Valley, CA 94025</span>
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
                  className="text-white/70 hover:text-white transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="text-white/70 hover:text-white transition-colors duration-300"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('careers')}
                  className="text-white/70 hover:text-white transition-colors duration-300"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-white/70 hover:text-white transition-colors duration-300"
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
              <li>NFC Access Control</li>
              <li>Cloud Software Solutions</li>
              <li>Custom Embedded Systems</li>
              <li>Enterprise Integration</li>
              <li>24/7 Technical Support</li>
              <li>Security Consulting</li>
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
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="#" 
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="#" 
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
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
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                  <button className="px-4 py-2 bg-white text-black rounded-r-lg hover:bg-white/90 transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 WebstorLabs. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
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
