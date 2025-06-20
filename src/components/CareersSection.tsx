
import { useState, useEffect } from 'react';

const CareersSection = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jobs = [
    {
      title: "Full-Stack Developer",
      location: "Remote / On-site",
      type: "Full-time",
      description: "Build end-to-end web applications using modern technologies. Work with React, Node.js, Python, and cloud platforms to create scalable solutions for diverse clients.",
      requirements: [
        "3+ years experience with React, Node.js, or Python",
        "Proficiency in database design (SQL/NoSQL)",
        "Experience with cloud platforms (AWS, Azure, GCP)",
        "Knowledge of containerization (Docker, Kubernetes)",
        "Strong problem-solving and communication skills"
      ]
    },
    {
      title: "Hardware Design Engineer",
      location: "Remote / On-site",
      type: "Full-time",
      description: "Design and develop custom hardware solutions including PCB design, embedded systems, and IoT devices. Collaborate with software teams for seamless integration.",
      requirements: [
        "5+ years in hardware design and PCB layout",
        "Experience with CAD tools (Altium, KiCad)",
        "Knowledge of embedded systems and microcontrollers",
        "Familiarity with manufacturing processes",
        "Strong analytical and debugging skills"
      ]
    },
    {
      title: "UI/UX Designer",
      location: "Hybrid",
      type: "Full-time",
      description: "Create intuitive and beautiful user experiences across web and mobile platforms. Conduct user research, design systems, and collaborate closely with development teams.",
      requirements: [
        "Portfolio showcasing web and mobile design work",
        "Proficiency in Figma, Adobe Creative Suite",
        "Experience with design systems and prototyping",
        "Knowledge of user research methodologies",
        "Understanding of front-end development principles"
      ]
    },
    {
      title: "DevOps Engineer",
      location: "Remote / On-site",
      type: "Full-time",
      description: "Build and maintain scalable infrastructure, implement CI/CD pipelines, and ensure secure deployment practices across our diverse technology stack.",
      requirements: [
        "Experience with AWS, Docker, and Kubernetes",
        "Proficiency in Infrastructure as Code (Terraform, CloudFormation)",
        "Knowledge of CI/CD tools (Jenkins, GitLab CI, GitHub Actions)",
        "Understanding of security best practices",
        "Scripting skills in Python, Bash, or PowerShell"
      ]
    }
  ];

  return (
    <section id="careers" className="relative min-h-screen bg-black py-20 overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-blue-400/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-purple-500/10 rotate-12"></div>
        <div className="absolute top-1/2 right-10 w-40 h-40 border border-white/15 rotate-12"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider mb-6">
            JOIN THE MINDS
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              BEHIND INNOVATION
            </span>
            <span className="block text-white/70">ACROSS ALL DOMAINS.</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto">
            We're building the future of technology across software, hardware, and everything in between — and we want you on board.
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <div key={index} className="border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 rounded-lg overflow-hidden group">
              {/* Job Header */}
              <button 
                onClick={() => setSelectedJob(selectedJob === index ? null : index)}
                className="w-full p-6 text-left hover:bg-white/5 transition-colors duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-semibold text-white tracking-wide mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-white/70">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <div className={`w-8 h-8 border-2 border-white rounded-lg flex items-center justify-center transform transition-all duration-300 hover:border-blue-400 hover:scale-110 ${
                    selectedJob === index ? 'rotate-45 bg-gradient-to-r from-blue-500 to-purple-600' : ''
                  }`}>
                    <div className={`w-4 h-0.5 bg-white absolute transition-opacity duration-300 ${
                      selectedJob === index ? 'opacity-0' : 'opacity-100'
                    }`}></div>
                    <div className="w-0.5 h-4 bg-white absolute"></div>
                  </div>
                </div>
              </button>

              {/* Job Details */}
              {selectedJob === index && (
                <div className="px-6 pb-6 space-y-6 animate-fade-in border-t border-white/10">
                  <p className="text-white/80 text-lg leading-relaxed">
                    {job.description}
                  </p>
                  
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-4 tracking-wide">
                      REQUIREMENTS
                    </h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-white/80">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 font-semibold tracking-wider hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 rounded-lg">
                    APPLY NOW
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 right-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 animate-float">
          <div className="text-white font-semibold text-sm">Remote Work</div>
          <div className="text-white/60 text-xs">Global Team</div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;
