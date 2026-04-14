import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const assetBase = process.env.PUBLIC_URL || "";
  const homeHashLink = `${assetBase}/#/`;
  const sectionHashLink = (sectionId) => `${assetBase}/#/#${sectionId}`;

  const footerLinkStyle =
    "hover:text-[#0059B2] transition-colors duration-300 cursor-pointer";

  return (
    <footer className="bg-white text-gray-600 py-16 px-6 md:px-16 border-t border-blue-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 overflow-hidden rounded shadow-sm border border-gray-50">
              <img
                src={`${assetBase}/jd-logo.jpeg`}
                alt="Jay Dynamic Solutions Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <h2 className="text-xl font-bold text-[#0059B2] tracking-tight">
              Jay Dynamic Solutions
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-500">
            Empowering Technology through Quality Education and Innovative IT
            Solutions. Leading the way in software excellence.
          </p>
        </div>

        <div>
          <h3 className="text-[#0059B2] font-bold mb-6 uppercase text-xs tracking-widest">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            <li>
              <a href={homeHashLink} className={footerLinkStyle}>
                Home
              </a>
            </li>
            <li>
              <a href={sectionHashLink("services")} className={footerLinkStyle}>
                Services
              </a>
            </li>
            <li>
              <a href={sectionHashLink("internship")} className={footerLinkStyle}>
                Internships
              </a>
            </li>
            <li>
              <a href={sectionHashLink("about")} className={footerLinkStyle}>
                About Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#0059B2] font-bold mb-6 uppercase text-xs tracking-widest">
            Expertise
          </h3>
          <ul className="space-y-3 text-sm text-gray-500">
            <li className="hover:text-gray-800 transition-colors">
              Web & Mobile App
            </li>
            <li className="hover:text-gray-800 transition-colors">
              Machine Learning
            </li>
            <li className="hover:text-gray-800 transition-colors">
              Corporate Training
            </li>
            <li className="hover:text-gray-800 transition-colors">Data Science</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#0059B2] font-bold mb-6 uppercase text-xs tracking-widest">
            Get In Touch
          </h3>
          <p className="text-sm mb-4 italic text-gray-500">
            Directed by Jay Deshmukh & Abhishek Bharti
          </p>
          <a
            href={sectionHashLink("enquiry")}
            className="inline-block bg-[#0059B2] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md hover:bg-[#002E5D] transition-all transform hover:-translate-y-1"
          >
            Enquire Now
          </a>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-blue-50 flex flex-col items-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">
          Copyright {new Date().getFullYear()} Jay Dynamic Solutions. All rights
          reserved.
        </p>

        <Link
          to="/admin"
          className="text-[9px] uppercase tracking-[0.3em] text-gray-300 hover:text-[#0059B2] font-bold transition-all"
        >
          System Management Login
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
