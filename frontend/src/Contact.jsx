import React, { useState } from "react";
import axios from "axios";
import { buildApiUrl } from "./api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        buildApiUrl("/api/contact"),
        formData,
      );
      alert("Message Sent! Jay Dynamic Solutions will contact you soon.");
    } catch (err) {
      alert("Unable to send message right now. Please try again later.");
    }
  };

  return (
    <section id="contact" className="bg-[#F4F9FF] py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        
        <div className="bg-[#002E5D] p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0059B2] rounded-full opacity-20"></div>
          
          <h2 className="text-3xl font-extrabold mb-6 text-white">
            Get in Touch
          </h2>
          <p className="mb-10 text-blue-100 text-lg">
            Let's build something amazing together. Reach out for expert IT consultations or internship queries.
          </p>

          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-5">
              <div className="bg-[#0059B2] p-3 rounded-lg text-2xl">📞</div>
              <div>
                <p className="text-blue-200 text-sm uppercase tracking-wider font-bold">Call Us</p>
                <p className="text-lg">+91 9325426042 / +91 9579941121</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-[#0059B2] p-3 rounded-lg text-2xl">📧</div>
              <div>
                <p className="text-blue-200 text-sm uppercase tracking-wider font-bold">Email Us</p>
                <p className="text-lg">jdsolutions5049@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="bg-[#0059B2] p-3 rounded-lg text-2xl">📍</div>
              <div>
                <p className="text-blue-200 text-sm uppercase tracking-wider font-bold">Location</p>
                <p className="text-lg">Pune, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-50">
          <h3 className="text-2xl font-bold text-[#002E5D] mb-8">
            Need IT Services?
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0059B2] focus:bg-white transition-all"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0059B2] focus:bg-white transition-all"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 ml-1">Message</label>
              <textarea
                placeholder="Describe your project or inquiry..."
                rows="4"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0059B2] focus:bg-white transition-all"
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </div>
            
            <button className="bg-[#0059B2] hover:bg-[#002E5D] text-white w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-1">
              Request a Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
