import React, { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const assetBase = process.env.PUBLIC_URL || "";

  const navLinkStyle = "hover:text-[#002E5D] hover:border-b-2 border-[#002E5D] pb-1 transition-all duration-300 cursor-pointer";
  const navItems = [
    { label: "Home", id: "home", path: "/" },
    { label: "Services", id: "services", path: "/services" },
    { label: "Internships", id: "internship", path: "/internships" },
    { label: "About Us", id: "about", path: "/about-us" },
    { label: "Contact Us", id: "contact", path: "/contact-us" },
  ];

  const scrollToSection = (id, path = "/") => {
    setIsOpen(false);
    window.location.hash = path;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (event, item) => {
    event.preventDefault();
    scrollToSection(item.id, item.path);
  };

  return (
    <nav className="bg-white text-[#0059B2] py-4 px-6 md:px-20 flex justify-between items-center sticky top-0 z-50 shadow-sm border-b border-blue-100">
      
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-lg border border-gray-100">
          <img src={`${assetBase}/jd-logo.jpeg`} alt="Jay Dynamic Solutions Logo" className="h-full w-full object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-extrabold tracking-tight leading-none text-[#0059B2]">Jay Dynamic Solutions</span>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400 mt-1">IT Excellence</span>
        </div>
      </div>

      <div className="hidden md:flex gap-10 font-semibold text-gray-500 text-sm" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={`${assetBase}/#${item.path}`}
            onClick={(event) => handleNavClick(event, item)}
            className={navLinkStyle}
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="hidden md:block">
        {/* ACTIVATE: Request a Quote (Scrolls to Contact) */}
        <button 
          onClick={() => scrollToSection('contact', '/contact-us')}
          className="bg-[#0059B2] hover:bg-[#002E5D] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md"
        >
          Request a Quote
        </button>
      </div>

      {/* Mobile Menu logic remains same but use scrollToSection for clicks */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-[#0059B2] p-2">
          {isOpen ? "✕" : "☰"} 
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 md:hidden">
          <div className="flex flex-col p-6 gap-5 font-semibold text-gray-600">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={`${assetBase}/#${item.path}`}
                onClick={(event) => handleNavClick(event, item)}
                className="text-left"
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={() => scrollToSection('contact', '/contact-us')}
              className="bg-[#0059B2] text-white py-3 rounded-lg font-bold mt-2"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
