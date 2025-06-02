
import { useEffect, useState } from 'react';
import { BarChart3, Users, Shield, Activity, TrendingUp, Clock } from 'lucide-react';

const DashboardSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="dashboard" className="relative min-h-screen bg-black py-20 overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="absolute top-20 right-10 w-32 h-32 border border-blue-400/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border border-cyan-400/30 rounded-full"></div>
        <div className="absolute top-1/3 left-10 w-16 h-16 bg-blue-500/5 rotate-12"></div>
        <div className="absolute top-40 right-1/3 w-20 h-20 border border-blue-400/30 rounded-full animate-ping"></div>
      </div>

      {/* Blue Flames */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left flames */}
        <div className="absolute left-20 top-1/4 w-16 h-32 bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300 opacity-60 blur-sm animate-flame-flicker rounded-full transform rotate-12"></div>
        <div className="absolute left-32 top-1/3 w-12 h-24 bg-gradient-to-t from-blue-500 via-cyan-400 to-blue-200 opacity-70 blur-sm animate-flame-flicker-delay rounded-full transform -rotate-6"></div>
        <div className="absolute left-16 bottom-1/3 w-20 h-40 bg-gradient-to-t from-blue-700 via-blue-500 to-cyan-400 opacity-50 blur-sm animate-flame-flicker-slow rounded-full transform rotate-8"></div>
        
        {/* Right flames */}
        <div className="absolute right-20 top-1/4 w-16 h-32 bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300 opacity-60 blur-sm animate-flame-flicker rounded-full transform -rotate-12"></div>
        <div className="absolute right-32 top-1/2 w-14 h-28 bg-gradient-to-t from-blue-500 via-cyan-400 to-blue-200 opacity-70 blur-sm animate-flame-flicker-delay rounded-full transform rotate-6"></div>
        <div className="absolute right-16 bottom-1/4 w-18 h-36 bg-gradient-to-t from-blue-700 via-blue-500 to-cyan-400 opacity-50 blur-sm animate-flame-flicker-slow rounded-full transform -rotate-8"></div>

        {/* Top flames */}
        <div className="absolute top-10 left-1/3 w-12 h-20 bg-gradient-to-t from-blue-600 via-cyan-400 to-blue-300 opacity-40 blur-sm animate-flame-flicker rounded-full transform rotate-45"></div>
        <div className="absolute top-16 right-1/3 w-10 h-16 bg-gradient-to-t from-blue-500 via-blue-300 to-cyan-200 opacity-50 blur-sm animate-flame-flicker-delay rounded-full transform -rotate-45"></div>

        {/* Bottom flames */}
        <div className="absolute bottom-10 left-1/4 w-14 h-24 bg-gradient-to-t from-blue-700 via-blue-400 to-cyan-300 opacity-45 blur-sm animate-flame-flicker-slow rounded-full transform rotate-30"></div>
        <div className="absolute bottom-16 right-1/4 w-16 h-28 bg-gradient-to-t from-blue-600 via-cyan-500 to-blue-300 opacity-55 blur-sm animate-flame-flicker rounded-full transform -rotate-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-wider leading-tight mb-6">
            INTELLIGENT
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              DASHBOARD
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto">
            Experience real-time monitoring and analytics with our cutting-edge dashboard interface
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative">
          <div 
            className="relative z-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 transform hover:scale-105 transition-all duration-500 shadow-2xl"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          >
            {/* Dashboard Header */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/20">
              <h3 className="text-2xl font-bold text-white">Access Control Dashboard</h3>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/80 text-sm">Live</span>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Stat Cards */}
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-xl border border-blue-400/30 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Users className="text-blue-400" size={24} />
                  <span className="text-green-400 text-sm">+12%</span>
                </div>
                <h4 className="text-white text-2xl font-bold">1,234</h4>
                <p className="text-white/60">Active Users</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-400/30 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="text-cyan-400" size={24} />
                  <span className="text-green-400 text-sm">+8%</span>
                </div>
                <h4 className="text-white text-2xl font-bold">567</h4>
                <p className="text-white/60">Access Points</p>
              </div>

              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-6 rounded-xl border border-blue-500/30 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="text-blue-300" size={24} />
                  <span className="text-green-400 text-sm">Real-time</span>
                </div>
                <h4 className="text-white text-2xl font-bold">89</h4>
                <p className="text-white/60">Live Sessions</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 p-6 rounded-xl border border-cyan-500/30 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="text-cyan-300" size={24} />
                  <span className="text-green-400 text-sm">+15%</span>
                </div>
                <h4 className="text-white text-2xl font-bold">98.7%</h4>
                <p className="text-white/60">Uptime</p>
              </div>
            </div>

            {/* Dashboard Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">Access Analytics</h4>
                  <BarChart3 className="text-blue-400" size={20} />
                </div>
                <div className="h-32 flex items-end space-x-2">
                  {[65, 80, 45, 90, 75, 85, 70].map((height, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t flex-1 animate-pulse"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">Recent Activity</h4>
                  <Clock className="text-cyan-400" size={20} />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white/80 text-sm">User accessed Lab 1</span>
                    <span className="text-white/50 text-xs ml-auto">2m ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white/80 text-sm">New user registered</span>
                    <span className="text-white/50 text-xs ml-auto">5m ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-white/80 text-sm">System backup completed</span>
                    <span className="text-white/50 text-xs ml-auto">10m ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Feature Cards */}
          <div className="absolute -top-8 -left-8 bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-lg p-4 animate-float">
            <div className="text-blue-400 font-semibold text-sm">Real-time</div>
            <div className="text-white/60 text-xs">Monitoring</div>
          </div>

          <div className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4 animate-float delay-500">
            <div className="text-cyan-400 font-semibold text-sm">Advanced</div>
            <div className="text-white/60 text-xs">Analytics</div>
          </div>

          <div className="absolute -bottom-8 -left-8 bg-white/10 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 animate-float delay-1000">
            <div className="text-blue-300 font-semibold text-sm">Secure</div>
            <div className="text-white/60 text-xs">Access</div>
          </div>

          <div className="absolute -bottom-8 -right-8 bg-white/10 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 animate-float delay-300">
            <div className="text-cyan-300 font-semibold text-sm">Cloud</div>
            <div className="text-white/60 text-xs">Based</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
