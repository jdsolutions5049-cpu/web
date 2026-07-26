import React from 'react';
import PhotoSlider from './PhotoSlider';

const AboutUs = () => {
  return (
    <div style={{background: '#fff'}}>
      <div className="about-header-section">
        <div className="about-header-inner">
          <h1>About Jay Dynamic Solutions Pvt.Ltd</h1>
          <div className="about-divider"></div>
          <p>
            Jay Dynamic Solutions Pvt.Ltd is a technology learning platform dedicated to helping students build real-world skills through industry-oriented internships.
          </p>
        </div>
      </div>

      <section className="section-about">
        <div className="about-grid">
          <div className="about-content">
            <h2>Our Mission</h2>
            <p>
              Our programs are designed to bridge the gap between academic learning and industry requirements by focusing on practical knowledge and mentorship.
            </p>
            <ul className="about-list">
              <li>
                <span className="about-list-icon">✔</span>
                Hands-on Project Experience
              </li>
              <li>
                <span className="about-list-icon">✔</span>
                Industry Mentor Support
              </li>
              <li>
                <span className="about-list-icon">✔</span>
                Internship Certification
              </li>
            </ul>
          </div>

          <div className="about-image">
            <div className="about-image-main">
              <PhotoSlider alt="Jay Dynamic Solutions team" />
            </div>
            <div className="about-image-badge">
              <strong>5+</strong>
              <span>Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      <div className="about-stats">
        <div className="about-stats-inner">
          <div className="about-stat">
            <strong>300+</strong>
            <span>Success Stories</span>
          </div>
          <div className="about-stat">
            <strong>100+</strong>
            <span>Real-world Projects</span>
          </div>
          <div className="about-stat">
            <strong>30+</strong>
            <span>Scheduled Internships</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
