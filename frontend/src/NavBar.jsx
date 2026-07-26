import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const assetBase = process.env.PUBLIC_URL || "";

  const navItems = [
    { label: "Home", id: "home", path: "/" },
    { label: "Services", id: "services", path: "/services" },
    { label: "Internships", id: "internship", path: "/internships" },
    { label: "Courses", id: "course-mode", path: "/courses" },
    { label: "About Us", id: "about", path: "/about-us" },
    { label: "Contact Us", id: "contact", path: "/contact-us" },
  ];

  const scrollToSection = (id, path = "/") => {
    setIsOpen(false);
    window.location.hash = path;
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const handleNavClick = (event, item) => {
    event.preventDefault();
    scrollToSection(item.id, item.path);
  };

  const goToSat = () => {
    setIsOpen(false);
    navigate('/jds-sat');
  };

  return (
    <nav className="site-nav">
      <div className="brand">
        <div className="brand-logo">
          <img src={`${assetBase}/jd-logo.jpeg`} alt="Jay Dynamic Solutions pvt Logo" />
        </div>
        <div>
          <div className="title">Jay Dynamic Solutions pvt</div>
          <div className="subtitle">INTERN & IT SERVICES</div>
        </div>
      </div>

      <div className="nav-links">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={`${assetBase}/#${item.path}`}
            onClick={(event) => handleNavClick(event, item)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#/jds-sat"
          onClick={(e) => { e.preventDefault(); goToSat(); }}
          className="nav-sat-link"
        >
          🏆 JDS-SAT
        </a>
      </div>

      <div className="desktop-cta">
        <button
          onClick={goToSat}
          className="btn-sat-nav"
        >
          🎓 Scholarship Test
        </button>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-menu-btn"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {isOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={`${assetBase}/#${item.path}`}
              onClick={(event) => handleNavClick(event, item)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#/jds-sat"
            onClick={(e) => { e.preventDefault(); goToSat(); }}
            className="mobile-sat-link"
          >
            🏆 JDS-SAT Scholarship Test
          </a>
          <button
            onClick={goToSat}
            className="mobile-cta mobile-sat-cta"
          >
            🎓 Register for Scholarship
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
