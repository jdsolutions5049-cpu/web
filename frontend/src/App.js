import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./NavBar";
import Hero from "./Hero";
import Services from "./Services";
import Internship from "./Internship";
import AboutUs from "./AboutUs";
import CorporateTraining from "./CorporateTraining";
import CourseMode from "./CourseMode";
import EnquiryForm from "./EnquiryForm";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import AdminDashboard from "./AdminDashboard";
import JdsSatLanding from "./JdsSatLanding";

const sectionRoutes = {
  "/": "home",
  "/services": "services",
  "/internships": "internship",
  "/courses": "course-mode",
  "/about-us": "about",
  "/contact-us": "contact",
};

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const sectionId = sectionRoutes[location.pathname] || "home";
    const element = document.getElementById(sectionId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.pathname]);

  return (
    <>
      <NavBar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="internship">
          <Internship />
        </section>
        <section id="about">
          <AboutUs />
        </section>
        <section id="corporate">
          <CorporateTraining />
        </section>
        <section id="course-mode">
          <CourseMode />
        </section>
        <section id="enquiry">
          <EnquiryForm />
        </section>
        <section id="contact">
          <ContactUs />
        </section>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<HomePage />} />
          <Route path="/internships" element={<HomePage />} />
          <Route path="/courses" element={<HomePage />} />
          <Route path="/about-us" element={<HomePage />} />
          <Route path="/contact-us" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/jds-sat" element={<JdsSatLanding />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
