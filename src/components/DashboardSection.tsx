
import { useEffect, useState } from 'react';
import { BarChart3, Users, Shield, Activity } from 'lucide-react';

const DashboardSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dashboardStats = [
    { icon: Users, label: 'Active Projects', value: '47', change: '+12%' },
    { icon: Shield, label: 'Client Satisfaction', value: '98.5%', change: '+2.1%' },
    { icon: BarChart3, label: 'Technologies Used', value: '50+', change: '+8' },
    { icon: Activity, label: 'Team Members', value: '25+', change: '+5' }
  ];

  return (
    <section id="dashboard" className="relative min-h-screen bg-black py-20 overflow-hidden">
      {/* Blue Flame Background Elements */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        {/* Flame shapes */}
        <div className="absolute top-20 left-16 w-12 h-24 bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300 rounded-full blur-sm animate-flame-flicker"></div>
        <div className="absolute top-32 left-20 w-8 h-16 bg-gradient-to-t from-blue-500 via-cyan-400 to-blue-200 rounded-full blur-sm animate-flame-flicker-delay"></div>
        <div className="absolute top-40 right-20 w-10 h-20 bg-gradient-to-t from-blue-700 via-blue-500 to-cyan-400 rounded-full blur-sm animate-flame-flicker-slow"></div>
        <div className="absolute top-28 right-16 w-6 h-12 bg-gradient-to-t from-cyan-600 via-blue-400 to-cyan-200 rounded-full blur-sm animate-flame-flicker"></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-16 bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300 rounded-full blur-sm animate-flame-flicker-delay"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-24 bg-gradient-to-t from-blue-500 via-cyan-400 to-blue-200 rounded-full blur-sm animate-flame-flicker-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider leading-tight">
                COMPREHENSIVE
                <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  PROJECT
                </span>
                <span className="block text-white/70">MANAGEMENT.</span>
              </h2>
              
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              
              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed">
                Track every aspect of your software and hardware projects with our advanced 
                management platform. From conception to deployment, we ensure transparent 
                communication and seamless delivery across all technology domains.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {dashboardStats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex items-center space-x-3 mb-2">
                    <stat.icon className="w-5 h-5 text-blue-400 group-hover:text-cyan-300 transition-colors" />
                    <span className="text-sm text-white/60">{stat.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-xl font-bold text-white">{stat.value}</span>
                    <span className="text-xs text-green-400">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative">
            {/* More Blue Flames around dashboard */}
            <div className="absolute -top-8 -left-8 w-6 h-12 bg-gradient-to-t from-blue-600 via-cyan-400 to-blue-200 rounded-full blur-sm animate-flame-flicker"></div>
            <div className="absolute -top-4 -left-4 w-4 h-8 bg-gradient-to-t from-cyan-500 via-blue-300 to-cyan-100 rounded-full blur-sm animate-flame-flicker-delay"></div>
            <div className="absolute -bottom-8 -right-8 w-8 h-16 bg-gradient-to-t from-blue-700 via-blue-500 to-cyan-400 rounded-full blur-sm animate-flame-flicker-slow"></div>
            <div className="absolute -bottom-4 -right-4 w-5 h-10 bg-gradient-to-t from-cyan-600 via-blue-400 to-cyan-200 rounded-full blur-sm animate-flame-flicker"></div>
            <div className="absolute top-1/2 -left-6 w-4 h-8 bg-gradient-to-t from-blue-500 via-cyan-300 to-blue-100 rounded-full blur-sm animate-flame-flicker-delay"></div>
            <div className="absolute top-1/2 -right-6 w-6 h-12 bg-gradient-to-t from-blue-600 via-cyan-400 to-blue-200 rounded-full blur-sm animate-flame-flicker-slow"></div>

            <div 
              className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-all duration-500"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-lg">Project Management Dashboard</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Mock Dashboard Content */}
              <div className="space-y-4">
                {/* Chart Area */}
                <div className="h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg border border-white/10 flex items-center justify-center">
                  <BarChart3 className="w-12 h-12 text-blue-400 animate-pulse" />
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-blue-400 text-sm">Software</div>
                    <div className="text-white font-bold">28</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-green-400 text-sm">Hardware</div>
                    <div className="text-white font-bold">12</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-purple-400 text-sm">Design</div>
                    <div className="text-white font-bold">7</div>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">Mobile app deployed</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">Hardware prototype ready</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80">Client review scheduled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-16 -right-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 animate-float">
              <div className="text-white font-semibold text-sm">Multi-Platform</div>
              <div className="text-white/60 text-xs">Development</div>
            </div>
            
            <div className="absolute -bottom-16 -left-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 animate-float delay-500">
              <div className="text-white font-semibold text-sm">Agile</div>
              <div className="text-white/60 text-xs">Methodology</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
