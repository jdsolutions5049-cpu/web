import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const assetBase = process.env.PUBLIC_URL || "";
  const homeHashLink = `${assetBase}/#/`;
  const sectionHashLink = (sectionId) => `${assetBase}/#/#${sectionId}`;

  const goToSat = (e) => {
    if (e) e.preventDefault();
    navigate('/jds-sat');
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <h2>
            <div className="footer-brand-logo">
              <img
                src={`${assetBase}/jd-logo.jpeg`}
                alt="Jay Dynamic Solutions pvt Logo"
              />
            </div>
            Jay Dynamic Solutions pvt
          </h2>
          <p>
            Empowering Technology through Quality Education and Innovative IT
            Solutions. Leading the way in software excellence.
          </p>
          <a
            href="#/jds-sat"
            onClick={goToSat}
            className="footer-sat-promo"
          >
            <span className="footer-sat-icon">🏆</span>
            <span>
              <strong>JDS-SAT 2026</strong>
              <small>India's Biggest Scholarship Test • Up to 100% OFF</small>
            </span>
            <span className="footer-sat-arrow">→</span>
          </a>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href={homeHashLink}>Home</a>
            </li>
            <li>
              <a href={sectionHashLink("services")}>Services</a>
            </li>
            <li>
              <a href={sectionHashLink("internship")}>Internships</a>
            </li>
            <li>
              <a href={sectionHashLink("about")}>About Us</a>
            </li>
            <li>
              <a href="#/jds-sat" onClick={goToSat} style={{ color: 'var(--primary)' }}>🏆 Scholarship Test</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Expertise</h3>
          <ul className="footer-expertise-list">
            <li>Web & Mobile App</li>
            <li>Machine Learning</li>
            <li>Corporate Training</li>
            <li>Data Science</li>
          </ul>
        </div>

        <div className="footer-col footer-contact-col">
          <h3>Get In Touch</h3>
          <p>
            Directed by Jay Deshmukh & Abhishek Bharti
          </p>
          <p>
            Phone: +91 83080 35049
          </p>
          <p className="footer-address">
            Jay Dynamic Solutions Pvt. Ltd.<br />
            Shop No. 113, 1st Floor, Rainbow Crossroad,<br />
            Behind McDonald's, Bakori Phata, Wagholi, Pune.
          </p>
          <a
            href={sectionHashLink("enquiry")}
            className="footer-cta-btn"
          >
            Enquire Now →
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          Copyright {new Date().getFullYear()} Jay Dynamic Solutions pvt. All rights reserved.
        </p>

        <Link
          to="/admin"
          className="footer-admin-link"
        >
          System Management Login
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
