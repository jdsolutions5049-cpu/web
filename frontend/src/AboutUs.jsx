import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Header Section - Clean Ice Blue Background */}
      <div className="bg-[#F4F9FF] py-20 text-center px-6 border-b border-blue-50">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-[#002E5D]">About Jay Dynamic Solutions</h1>
        <div className="w-24 h-1.5 bg-[#0059B2] mx-auto mb-6 rounded-full"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Jay Dynamic Solutions is a technology learning platform dedicated to helping students build real-world skills through industry-oriented internships.
        </p>
      </div>
      
      <section id="about" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002E5D] mb-8">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our programs are designed to bridge the gap between academic learning and industry requirements by focusing on practical knowledge and mentorship.
            </p>
            <ul className="space-y-5">
              <li className="flex items-center gap-4 text-gray-700 font-medium">
                <span className="bg-[#E6F0FF] text-[#0059B2] w-8 h-8 flex items-center justify-center rounded-full font-bold">✔</span> 
                Hands-on Project Experience
              </li>
              <li className="flex items-center gap-4 text-gray-700 font-medium">
                <span className="bg-[#E6F0FF] text-[#0059B2] w-8 h-8 flex items-center justify-center rounded-full font-bold">✔</span> 
                Industry Mentor Support
              </li>
              <li className="flex items-center gap-4 text-gray-700 font-medium">
                <span className="bg-[#E6F0FF] text-[#0059B2] w-8 h-8 flex items-center justify-center rounded-full font-bold">✔</span> 
                Internship Certification
              </li>
            </ul>
          </div>
          
          <div className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-2xl border-8 border-[#F4F9FF]">
            <img src="/our mission.jpeg" alt="Team Working" className="w-full h-auto transform hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>
      
      <div className="bg-[#002E5D] py-16 px-6 text-white text-center">
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto font-bold">
          <div className="space-y-2">
            <p className="text-5xl text-[#00A3FF]">300+</p>
            <p className="text-blue-100 uppercase tracking-widest text-xs">Success Stories</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl text-[#00A3FF]">100+</p>
            <p className="text-blue-100 uppercase tracking-widest text-xs">Real-world Projects</p>
          </div>
          <div className="space-y-2">
            <p className="text-5xl text-[#00A3FF]">30+</p>
            <p className="text-blue-100 uppercase tracking-widest text-xs">Scheduled Internships</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;