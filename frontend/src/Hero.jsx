import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToSat = () => {
    navigate('/jds-sat');
  };

  const assetBase = process.env.PUBLIC_URL || "";

  return (
    <header className="hero">
      <div className="hero-pattern"></div>
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-badge">WELCOME TO JDS</div>
          <h1>Best Online <span className="highlight">Education Expertise</span></h1>
          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>

          <div className="sat-hero-banner" onClick={goToSat}>
            <div className="sat-hero-left">
              <span className="sat-pulse-dot"></span>
              <div>
                <div className="sat-hero-title">🏆 INDIA'S BIGGEST SCHOLARSHIP TEST</div>
                <div className="sat-hero-subtitle">JDS-SAT 2026 • Win Up to 100% Scholarship on IT Courses</div>
              </div>
            </div>
            <button className="btn btn-primary sat-hero-btn" onClick={(e) => { e.stopPropagation(); goToSat(); }}>
              Register Now →
            </button>
          </div>

          <div className="hero-cta">
            <button onClick={() => scrollToSection('contact')} className="btn btn-primary">Get Started Now</button>
            <button onClick={() => scrollToSection('course-mode')} className="btn btn-light">View Course</button>
            <button onClick={goToSat} className="btn btn-biggest-test">Biggest Test</button>
          </div>
          <div className="hero-features">
            <div className="hero-feature">
              <div className="hero-feature-icon">🎓</div>
              <div className="hero-feature-text">
                <strong>300+</strong>
                <span>Students Trained</span>
              </div>
            </div>
            <div className="hero-feature">
              <div className="hero-feature-icon">🏆</div>
              <div className="hero-feature-text">
                <strong>100+</strong>
                <span>Projects Completed</span>
              </div>
            </div>
            <div className="hero-feature">
              <div className="hero-feature-icon">⭐</div>
              <div className="hero-feature-text">
                <strong>4.9/5</strong>
                <span>Student Rating</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-image-wrap">
          <div className="hero-image-main">
            <img src={`${assetBase}/Hero.png`} alt="Education" onError={(e) => { e.target.style.display = 'none'; }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #0a1a2f 0%, #1a365d 100%)',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '80px',
            }} id="hero-fallback">📚</div>
          </div>
          <div className="hero-card-float card-1">
            <div className="hero-card-icon orange">👨‍🏫</div>
            <div className="hero-card-text">
              <strong>Expert</strong>
              <span>Mentors</span>
            </div>
          </div>
          <div className="hero-card-float card-2">
            <div className="hero-card-icon blue">📜</div>
            <div className="hero-card-text">
              <strong>Certified</strong>
              <span>Courses</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
