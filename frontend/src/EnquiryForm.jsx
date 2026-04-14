import React, { useState } from 'react';
import axios from 'axios';
import { buildApiUrl } from './api';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    domain: 'Full Stack Development',
    type: 'Internship' 
  });

  const domains = ['Full Stack Development', 'Data Science', 'Machine Learning', 'Data Analytics', 'UI/UX Design', 'Cloud Computing'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(buildApiUrl('/api/enquiry'), formData);
      alert(res.data);
    } catch (err) {
      alert("Unable to submit enquiry right now. Please try again later.");
    }
  };

  return (
    <section id="enquiry" className="py-20 bg-[#F4F9FF] px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-[2rem] overflow-hidden flex flex-col md:flex-row border border-blue-50">
        
        
        <div className="bg-[#002E5D] p-12 text-white md:w-2/5 flex flex-col justify-center relative overflow-hidden">
        
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#0059B2] rounded-full opacity-20"></div>
          
          <h2 className="text-3xl font-black mb-6 relative z-10">Enquire Now</h2>
          <p className="text-blue-100 mb-8 leading-relaxed relative z-10">
            Select your domain and start your professional journey with <span className="text-white font-bold underline decoration-[#0059B2]">JD Solutions</span>.
          </p>
          
          <ul className="space-y-5 relative z-10">
            <li className="flex items-center gap-3">
              <span className="bg-[#0059B2] p-1 rounded-full text-xs font-bold">✓</span> 24/7 Support
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-[#0059B2] p-1 rounded-full text-xs font-bold">✓</span> Expert Guidance
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-[#0059B2] p-1 rounded-full text-xs font-bold">✓</span> Industry Curriculum
            </li>
          </ul>
        </div>

        {/* Right Form - Clean White with Logo Blue focus states */}
        <form onSubmit={handleSubmit} className="p-10 md:w-3/5 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
            <input 
              type="text" 
              placeholder="Jay Deshmukh" 
              className="w-full p-4 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#0059B2] focus:bg-white focus:outline-none transition-all" 
              required 
              onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full p-4 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#0059B2] focus:bg-white focus:outline-none transition-all" 
                required 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone</label>
              <input 
                type="text" 
                placeholder="+91 00000 00000" 
                className="w-full p-4 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#0059B2] focus:bg-white focus:outline-none transition-all" 
                required 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Preferred Domain</label>
            <select 
              className="w-full p-4 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#0059B2] bg-white focus:outline-none transition-all appearance-none cursor-pointer" 
              onChange={(e) => setFormData({...formData, domain: e.target.value})}
            >
              {domains.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex gap-6 py-4 border-y border-gray-50">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="type" 
                value="Internship" 
                className="w-5 h-5 accent-[#0059B2] cursor-pointer"
                defaultChecked 
                onChange={(e) => setFormData({...formData, type: e.target.value})} 
              /> 
              <span className="font-semibold text-gray-600 group-hover:text-[#0059B2]">Internship</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="type" 
                value="Corporate Training" 
                className="w-5 h-5 accent-[#0059B2] cursor-pointer"
                onChange={(e) => setFormData({...formData, type: e.target.value})} 
              /> 
              <span className="font-semibold text-gray-600 group-hover:text-[#0059B2]">Corporate Training</span>
            </label>
          </div>

          <button className="w-full bg-[#0059B2] hover:bg-[#002E5D] text-white py-4 rounded-2xl font-bold text-xl shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-1">
            Submit Enquiry
          </button>
        </form>
      </div>
    </section>
  );
};

export default EnquiryForm;
