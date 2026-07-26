import React from 'react';

const Services = () => {
  const serviceList = [
    { title: "Website Development", iconClass: "bi-globe2", items: ["Business Websites", "Portfolio Websites", "E-Commerce", "Landing Pages"] },
    { title: "Mobile App Development", iconClass: "bi-phone", items: ["Android Apps", "Cross-Platform Apps", "UI/UX Design", "App Maintenance"] },
    { title: "Software Development", iconClass: "bi-gear", items: ["Custom Software", "ERP Systems", "CRM Solutions", "Automation Tools"] },
    { title: "UI/UX Design", iconClass: "bi-palette", items: ["Data Analysis", "Mobile App UI", "Wireframing", "Prototyping"] }
  ];

  return (
    <>
      <section className="section-services">
        <div className="section-header">
          <div className="section-subtitle">WHAT WE OFFER</div>
          <h2 className="section-title dark-text">Our IT Services</h2>
          <div className="section-divider"></div>
          <p className="section-desc">
            Comprehensive IT solutions tailored to empower your business with cutting-edge technology and innovative approaches.
          </p>
        </div>

        <div className="services-grid">
          {serviceList.map((s, idx) => (
            <div key={idx} className="service-card">
              <div className="service-icon"><i className={`bi ${s.iconClass}`}></i></div>
              <h3>{s.title}</h3>
              <ul>
                {s.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
