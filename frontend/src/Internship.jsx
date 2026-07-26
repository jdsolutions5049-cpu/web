import React, { useRef, useState } from 'react';

const Internship = () => {
  const scrollRef = useRef(null);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const internshipList = [
    {
      title: "Web Development",
      iconClass: "bi-globe2",
      duration: "4 Weeks",
      details: "Master HTML, CSS, JavaScript, React, and Node.js. Build real-world e-commerce and dashboard projects.",
      skills: ["React.js", "Tailwind CSS", "Spring Boot", "MySQL"]
    },
    {
      title: "App Development",
      iconClass: "bi-phone",
      duration: "4 Weeks",
      details: "Build cross-platform mobile apps using React Native or Flutter. Learn mobile UI/UX and API integration.",
      skills: ["React Native", "Firebase", "Mobile UI", "REST APIs"]
    },
    {
      title: "Data Science",
      iconClass: "bi-bar-chart-line",
      duration: "4 Weeks",
      details: "Analyze large datasets using Python. Learn data visualization, statistical modeling, and predictive analysis.",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib", "SQL"]
    },
    {
      title: "AI & Machine Learning",
      iconClass: "bi-robot",
      duration: "4 Weeks",
      details: "Dive into Neural Networks and Deep Learning. Build models for image recognition and NLP.",
      skills: ["Scikit-Learn", "TensorFlow", "NLP", "Computer Vision"]
    },
    {
      title: "Data Analytics",
      iconClass: "bi-graph-up-arrow",
      duration: "4 Weeks",
      details: "Transform raw data into insights. Master Excel, Tableau, and PowerBI for business intelligence.",
      skills: ["Tableau", "PowerBI", "Excel", "Data Cleaning"]
    }
  ];

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 380;
    if (!current) return;

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
    <section className="section-internships">
      <div className="max-w-7xl mx-auto px-6 md:px-20 flex justify-between items-end mb-12" style={{maxWidth: '1200px', margin: '0 auto 40px', padding: '0 24px'}}>
        <div>
          <div className="section-subtitle" style={{marginBottom: '10px'}}>OUR PROGRAMS</div>
          <h2 className="section-title dark-text" style={{fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '12px'}}>Internship Programs</h2>
          <div className="section-divider" style={{margin: '0'}}></div>
          <p className="section-desc" style={{textAlign: 'left', marginLeft: '0', marginTop: '16px', color: 'var(--muted)', fontSize: '16px'}}>Explore our specialized domains</p>
        </div>

        <div className="internship-nav">
          <button
            onClick={() => scroll('left')}
            className="internship-nav-btn"
            aria-label="Scroll left"
          >
            &larr;
          </button>
          <button
            onClick={() => scroll('right')}
            className="internship-nav-btn"
            aria-label="Scroll right"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="internship-slider"
      >
        {internshipList.map((item, idx) => (
          <div
            key={idx}
            className="internship-card"
          >
            <div className="internship-header">
              <div className="internship-title-block">
                <div className="internship-icon"><i className={`bi ${item.iconClass}`}></i></div>
                <h3>{item.title}</h3>
              </div>
              <div className="internship-star"><i className="bi bi-star-fill"></i></div>
            </div>

            <div className="internship-body">
              <ul className="internship-perks">
                <li>
                  <span className="internship-check"><i className="bi bi-check-lg"></i></span>
                  Industry Mentor Support
                </li>
                <li>
                  <span className="internship-check"><i className="bi bi-check-lg"></i></span>
                  Live Project Experience
                </li>
                <li>
                  <span className="internship-check"><i className="bi bi-check-lg"></i></span>
                  Professional Certificate
                </li>
              </ul>

              <div className="internship-footer">
                <span className="internship-duration">
                  {item.duration}
                </span>
                <button
                  onClick={() => setSelectedDomain(item)}
                  className="internship-apply-btn"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDomain && (
        <div className="internship-modal-overlay">
          <div className="internship-modal">
            <button
              onClick={() => setSelectedDomain(null)}
              className="modal-close"
              aria-label="Close modal"
            ><i className="bi bi-x-lg"></i></button>

            <span className="modal-icon"><i className={`bi ${selectedDomain.iconClass}`}></i></span>
            <h3 className="modal-title">{selectedDomain.title}</h3>
            <p className="modal-description">{selectedDomain.details}</p>

            <div>
              <div className="modal-skills-label">Key Skills Involved:</div>
              <div className="modal-skills">
                {selectedDomain.skills.map((skill, i) => (
                  <span key={i} className="modal-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleFinalApply(selectedDomain.title)}
              className="modal-apply-btn"
            >
              Confirm & Apply Now
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Internship;
