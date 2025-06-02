
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-20 bg-black overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="absolute top-20 right-10 w-32 h-32 border border-white/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border border-blue-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-500/10 rotate-12"></div>
        <div className="absolute top-32 left-1/3 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full"></div>
        <div className="absolute bottom-20 right-1/4 w-12 h-12 border border-white/15 rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-wider mb-6">
            GET IN
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              TOUCH
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Ready to revolutionize your access control? Let's discuss your security needs and build something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-semibold text-white mb-8 tracking-wide">
                LET'S CONNECT
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">Email Us</h4>
                    <p className="text-white/70">hello@webstorlabs.com</p>
                    <p className="text-white/70">support@webstorlabs.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">Call Us</h4>
                    <p className="text-white/70">+1 (555) 123-4567</p>
                    <p className="text-white/70">+1 (555) 123-4568</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">Visit Us</h4>
                    <p className="text-white/70">123 Innovation Drive</p>
                    <p className="text-white/70">Tech Valley, CA 94025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-white">
              <h4 className="text-xl font-semibold mb-4">Why Choose WebstorLabs?</h4>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  <span>24/7 Technical Support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  <span>Custom Solutions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  <span>Enterprise-Grade Security</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  <span>Rapid Implementation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-white mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-white">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400 resize-none"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-300"
              >
                <Send size={20} />
                <span>SEND MESSAGE</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 right-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 animate-float">
          <div className="text-white font-semibold text-sm">Quick Response</div>
          <div className="text-white/60 text-xs">Within 24 Hours</div>
        </div>
        
        <div className="absolute bottom-32 left-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 animate-float delay-500">
          <div className="text-white font-semibold text-sm">Expert Team</div>
          <div className="text-white/60 text-xs">Ready to Help</div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
