import React from 'react';

const CorporateTraining = () => {
  return (
    <section id="corporate" className="py-24 bg-white px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          
          <h2 className="text-4xl md:text-5xl font-black text-[#002E5D]">Corporate Training Provider</h2>
          
          <p className="text-[#0059B2] font-bold mt-4 tracking-[0.2em] uppercase text-sm">Up-skilling your Workforce</p>
          <div className="w-24 h-1.5 bg-[#0059B2] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-[#F4F9FF]">
            <img 
              src="/training.jpeg" 
              alt="Corporate Session" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500" 
            />
          </div>

          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-[#002E5D]">Customized Tech Training for Teams</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              JD Solutions provides specialized corporate training sessions for companies looking to modernize their tech stack in Java Spring Boot, React, and Data Analytics.
            </p>
            
            <ul className="space-y-5">
              {/* Checkmarks updated to Logo Blue with subtle backgrounds */}
              <li className="flex items-center gap-4 text-gray-700 font-medium">
                <span className="bg-[#E6F0FF] text-[#0059B2] w-8 h-8 flex items-center justify-center rounded-full font-bold">✓</span> 
                On-site & Remote Sessions
              </li>
              <li className="flex items-center gap-4 text-gray-700 font-medium">
                <span className="bg-[#E6F0FF] text-[#0059B2] w-8 h-8 flex items-center justify-center rounded-full font-bold">✓</span> 
                Real-world Case Studies
              </li>
              <li className="flex items-center gap-4 text-gray-700 font-medium">
                <span className="bg-[#E6F0FF] text-[#0059B2] w-8 h-8 flex items-center justify-center rounded-full font-bold">✓</span> 
                Post-Training Support
              </li>
            </ul>

            {/* Button updated to Logo Blue/Navy Hover */}
            <a 
              href="#contact" 
              className="inline-block bg-[#0059B2] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#002E5D] transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-1"
            >
              Book a Corporate Session
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateTraining;