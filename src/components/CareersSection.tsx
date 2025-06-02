
import { useState } from 'react';

const CareersSection = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const jobs = [
    {
      title: "Embedded Developer",
      location: "Remote / On-site",
      type: "Full-time",
      description: "Design and develop embedded systems for NFC access control hardware. Work with microcontrollers, real-time operating systems, and low-level programming.",
      requirements: [
        "3+ years experience in embedded C/C++ development",
        "Experience with ARM microcontrollers and RTOS",
        "Knowledge of communication protocols (SPI, I2C, UART)",
        "Familiarity with NFC/RFID technologies preferred",
        "Strong debugging and testing skills"
      ]
    },
    {
      title: "System Designer", 
      location: "Remote / On-site",
      type: "Full-time",
      description: "Architect scalable cloud infrastructure and design system integration for access control solutions. Lead technical decision-making and system optimization.",
      requirements: [
        "5+ years in system architecture and cloud design",
        "Experience with microservices and distributed systems", 
        "Proficiency in AWS/Azure cloud platforms",
        "Knowledge of security protocols and encryption",
        "Experience with real-time data processing"
      ]
    },
    {
      title: "Project Manager",
      location: "Hybrid",
      type: "Full-time", 
      description: "Lead cross-functional teams to deliver complex access control projects. Coordinate between hardware, software, and client implementation teams.",
      requirements: [
        "PMP or equivalent project management certification",
        "3+ years managing technical projects",
        "Experience in IoT or hardware product development",
        "Strong stakeholder management skills",
        "Agile/Scrum methodology expertise"
      ]
    },
    {
      title: "Cybersecurity & QA Specialist",
      location: "Remote / On-site", 
      type: "Full-time",
      description: "Ensure the security and quality of access control systems. Conduct penetration testing, security audits, and comprehensive QA processes.",
      requirements: [
        "Cybersecurity certification (CISSP, CEH, or equivalent)",
        "Experience with penetration testing tools",
        "Knowledge of IoT security best practices",
        "Automated testing framework experience",
        "Understanding of compliance standards (ISO 27001, etc.)"
      ]
    }
  ];

  return (
    <section id="careers" className="relative min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider mb-6">
            JOIN THE MINDS
            <span className="block text-white/70">BEHIND SECURE</span>
            <span className="block text-white/50">ACCESS.</span>
          </h2>
          
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto">
            We're building the infrastructure of the future — and we want you on board.
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <div key={index} className="border border-white/20 bg-white/5 backdrop-blur-sm">
              {/* Job Header */}
              <button
                onClick={() => setSelectedJob(selectedJob === index ? null : index)}
                className="w-full p-6 text-left hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-semibold text-white tracking-wide mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-white/70">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <div className={`w-6 h-6 border-2 border-white transform transition-transform duration-300 ${
                    selectedJob === index ? 'rotate-45' : ''
                  }`}>
                    <div className={`w-full h-0.5 bg-white absolute top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
                      selectedJob === index ? 'opacity-0' : 'opacity-100'
                    }`}></div>
                    <div className="w-0.5 h-full bg-white absolute left-1/2 transform -translate-x-1/2"></div>
                  </div>
                </div>
              </button>

              {/* Job Details */}
              {selectedJob === index && (
                <div className="px-6 pb-6 space-y-6 animate-fade-in">
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
                          <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                          <span className="text-white/80">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="bg-white text-black px-8 py-3 font-semibold tracking-wider hover:bg-white/90 transition-colors duration-300 transform hover:scale-105">
                    APPLY NOW
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersSection;
