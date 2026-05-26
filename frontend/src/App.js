import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./NavBar";
import Hero from "./Hero";
import Services from "./Services";
import Internship from "./Internship";
import AboutUs from "./AboutUs";
import CorporateTraining from "./CorporateTraining";
import EnquiryForm from "./EnquiryForm";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import AdminDashboard from "./AdminDashboard"; 

const sectionRoutes = {
  "/": "home",
  "/services": "services",
  "/internships": "internship",
  "/about-us": "about",
  "/contact-us": "contact",
};

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const sectionId = sectionRoutes[location.pathname] || "home";
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.pathname]);

  return (
    <>
      <NavBar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="services" className="py-10">
          <Services />
        </section>
        <section id="internship" className="py-10">
          <Internship />
        </section>
        <section id="about" className="py-10">
          <AboutUs />
        </section>
        <section id="corporate" className="py-10">
          <CorporateTraining />
        </section>
        <section id="enquiry" className="py-10">
          <EnquiryForm />
        </section>
        <section id="contact" className="py-10">
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
      <div className="App bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<HomePage />} />
          <Route path="/internships" element={<HomePage />} />
          <Route path="/about-us" element={<HomePage />} />
          <Route path="/contact-us" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
