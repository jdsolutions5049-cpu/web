import React from 'react';

const Services = () => {
  const serviceList = [
    { title: "Website Development", icon: "🌐", items: ["Business Websites", "Portfolio Websites", "E-Commerce", "Landing Pages"] },
    { title: "Mobile App Development", icon: "📱", items: ["Android Apps", "Cross-Platform Apps", "UI/UX Design", "App Maintenance"] },
    { title: "Software Development", icon: "⚙️", items: ["Custom Software", "ERP Systems", "CRM Solutions", "Automation Tools"] },
    { title: "UI/UX Design", icon: "🎨", items: ["Data Analysis", "Mobile App UI", "Wireframing", "Prototyping"] }
  ];

  return (
    <section id="services" className="py-20 bg-white px-6 md:px-20">
      <div className="text-center mb-16">
        {/* Title in Deep Navy */}
        <h2 className="text-4xl md:text-5xl font-black text-[#002E5D]">Our IT Services</h2>
        {/* Underline in Logo Blue instead of Orange */}
        <div className="w-24 h-1.5 bg-[#0059B2] mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {serviceList.map((s, idx) => (
          <div 
            key={idx} 
            className="bg-[#F4F9FF] p-10 rounded-3xl shadow-sm border-b-8 border-transparent hover:border-[#002E5D] hover:shadow-xl transition-all duration-300 group"
          >
            {/* Icon gets a subtle zoom effect on hover */}
            <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform duration-300">
              {s.icon}
            </span>
            
            <h3 className="text-2xl font-bold text-[#002E5D] mb-4">{s.title}</h3>
            
            <ul className="space-y-3">
              {s.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                  {/* Checkmark in Logo Blue */}
                  <span className="text-[#0059B2] font-extrabold text-lg">✓</span> 
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;