import React from "react";

const Hero = () => {
  // Helper function for smooth scrolling
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header id="home" className="relative bg-[#F4F9FF] text-[#002E5D] py-24 px-6 md:px-20 overflow-hidden">
      <div className="max-w-4xl relative z-10">
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          IT Services <br/>
          <span className="text-[#0059B2]">by Jay Dynamic Solutions</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
          Empowering businesses with modern technology solutions. We help startups and companies build powerful digital products.
        </p>
        <div className="flex flex-wrap gap-5">
          {/* ACTIVATE: Get a Free Consultation (Scrolls to Contact) */}
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-[#002E5D] hover:bg-[#001A35] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
          >
            Get a Free Consultation
          </button>
          
          {/* ACTIVATE: Apply for Internship (Scrolls to Internship) */}
          <button 
            onClick={() => scrollToSection('internship')}
            className="border-2 border-[#0059B2] text-[#0059B2] hover:bg-[#0059B2] hover:text-white px-10 py-4 rounded-xl font-bold text-lg transition-all"
          >
            Apply for Internship
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full leading-[0]">
        <svg viewBox="0 0 1440 320" className="w-full h-auto fill-white">
          <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </header>
  );
};

export default Hero;