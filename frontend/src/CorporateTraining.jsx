import React from 'react';
import PhotoSlider from './PhotoSlider';

const CorporateTraining = () => {
  return (
    <section className="section-corporate">
      <div className="section-header">
        <div className="section-subtitle">CORPORATE SOLUTIONS</div>
        <h2 className="section-title dark-text">Corporate Training Provider</h2>
        <p className="corporate-subtitle" style={{textAlign: 'center', color: 'var(--primary)', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: 16}}>Up-skilling your Workforce</p>
        <div className="section-divider"></div>
      </div>

      <div className="corporate-grid">
          <div className="corporate-image">
            <div className="corporate-image-main">
              <PhotoSlider alt="Jay Dynamic Solutions training session" />
            </div>
        </div>

        <div className="corporate-content">
          <div className="corporate-subtitle">TAILORED TRAINING</div>
          <h2>Customized Tech Training for Teams</h2>
          <p>
            JD Solutions provides specialized corporate training sessions for companies looking to modernize their tech stack in Java Spring Boot, React, and Data Analytics.
          </p>

          <ul className="corporate-list">
            <li>
              <span className="corporate-list-icon">✓</span>
              On-site & Remote Sessions
            </li>
            <li>
              <span className="corporate-list-icon">✓</span>
              Real-world Case Studies
            </li>
            <li>
              <span className="corporate-list-icon">✓</span>
              Post-Training Support
            </li>
          </ul>

          <a
            href="#/contact-us"
            className="corporate-cta"
          >
            Book a Corporate Session →
          </a>
        </div>
      </div>
    </section>
  );
};

export default CorporateTraining;
