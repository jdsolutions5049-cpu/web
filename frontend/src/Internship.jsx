import React, { useRef, useState } from 'react';

const Internship = () => {
  const scrollRef = useRef(null);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const internshipList = [
    { 
      title: "Web Development", 
      icon: "🌐", 
      duration: "4 Weeks",
      details: "Master HTML, CSS, JavaScript, React, and Node.js. Build real-world e-commerce and dashboard projects.",
      skills: ["React.js", "Tailwind CSS", "Spring Boot", "MySQL"]
    },
    { 
      title: "App Development", 
      icon: "📱", 
      duration: "4 Weeks",
      details: "Build cross-platform mobile apps using React Native or Flutter. Learn mobile UI/UX and API integration.",
      skills: ["React Native", "Firebase", "Mobile UI", "REST APIs"]
    },
    { 
      title: "Data Science", 
      icon: "📊", 
      duration: "4 Weeks",
      details: "Analyze large datasets using Python. Learn data visualization, statistical modeling, and predictive analysis.",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib", "SQL"]
    },
    { 
      title: "AI & Machine Learning", 
      icon: "🤖", 
      duration: "4 Weeks",
      details: "Dive into Neural Networks and Deep Learning. Build models for image recognition and NLP.",
      skills: ["Scikit-Learn", "TensorFlow", "NLP", "Computer Vision"]
    },
    { 
      title: "Data Analytics", 
      icon: "📈", 
      duration: "4 Weeks", 
      details: "Transform raw data into insights. Master Excel, Tableau, and PowerBI for business intelligence.",
      skills: ["Tableau", "PowerBI", "Excel", "Data Cleaning"]
    }
  ];

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 380; // Adjusted for card width + gap
    if (direction === 'left') {
      current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleFinalApply = (domainTitle) => {
    setSelectedDomain(null);
    const element = document.getElementById('enquiry');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      const dropdown = document.querySelector('select[name="domain"]');
      if (dropdown) {
        dropdown.value = domainTitle;
        dropdown.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <section id="internship" className="py-20 bg-[#F4F9FF] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-20 flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-[#002E5D]">Internship Programs</h2>
          <div className="w-24 h-1.5 bg-[#0059B2] mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-6 text-lg italic">Explore our specialized domains</p>
        </div>

        {/* Navigation Arrows */}
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border-2 border-[#0059B2] text-[#0059B2] flex items-center justify-center hover:bg-[#0059B2] hover:text-white transition-all shadow-sm"
          >
            <span className="text-xl font-bold">←</span>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full bg-[#002E5D] text-white flex items-center justify-center hover:bg-[#0059B2] transition-all shadow-lg"
          >
            <span className="text-xl font-bold">→</span>
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-10 px-6 md:px-20 gap-8 snap-x snap-mandatory scrollbar-hide"
      >
        {internshipList.map((item, idx) => (
          <div 
            key={idx} 
            className="min-w-[300px] md:min-w-[360px] bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-50 flex flex-col snap-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="bg-[#002E5D] p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="text-xl font-bold leading-tight">{item.title}</h3>
              </div>
              <span className="text-yellow-400 text-xl">★</span>
            </div>

            <div className="p-8 flex-grow flex flex-col">
              <ul className="space-y-4 mb-8 text-gray-700 font-medium">
                <li className="flex items-center gap-3">
                  <span className="text-[#0059B2] font-black">✓</span> Industry Mentor Support
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#0059B2] font-black">✓</span> Live Project Experience
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#0059B2] font-black">✓</span> Professional Certificate
                </li>
              </ul>

              <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-100">
                <span className="text-gray-400 font-bold italic underline decoration-[#0059B2]">
                  {item.duration}
                </span>
                <button 
                  onClick={() => setSelectedDomain(item)}
                  className="bg-[#0059B2] hover:bg-[#002E5D] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- POPUP MODAL --- */}
      {selectedDomain && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[#002E5D]/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedDomain(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-red-500 text-2xl transition-colors"
            >✕</button>
            
            <div className="text-[#0059B2] text-5xl mb-4">{selectedDomain.icon}</div>
            <h3 className="text-3xl font-black text-[#002E5D] mb-3">{selectedDomain.title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">{selectedDomain.details}</p>
            
            <div className="mb-8">
              <h4 className="font-bold text-[#002E5D] mb-3 uppercase tracking-wider text-sm">Key Skills Involved:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDomain.skills.map((skill, i) => (
                  <span key={i} className="bg-blue-50 text-[#0059B2] px-4 py-1.5 rounded-full text-xs font-black border border-blue-100 uppercase">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button 
              onClick={() => handleFinalApply(selectedDomain.title)}
              className="w-full bg-[#002E5D] hover:bg-[#0059B2] text-white py-4 rounded-2xl font-black text-xl transition-all shadow-lg hover:shadow-blue-200"
            >
              Confirm & Apply Now
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default Internship;