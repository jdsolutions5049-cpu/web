import React, { useState } from 'react';
import axios from 'axios';
import { buildApiUrl } from './api';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    domain: 'Full Stack Development',
    type: 'Course'
  });

  const domains = ['Full Stack Development', 'Web Development', 'App Development', 'Data Science', 'AI & Machine Learning', 'Machine Learning', 'Data Analytics', 'UI/UX Design', 'Cloud Computing'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(buildApiUrl('/api/enquiry'), formData);
      alert(res.data);
      const message = `Can I get info about ${formData.domain} (${formData.type})?`;
      window.location.href = `https://wa.me/918308035049?text=${encodeURIComponent(message)}`;
      setFormData({ fullName: '', email: '', phone: '', domain: 'Full Stack Development', type: 'Course' });
    } catch (err) {
      alert("Unable to submit enquiry right now. Please try again later.");
    }
  };

  return (
    <section className="section-enquiry">
      <div className="section-header">
        <div className="section-subtitle">GET STARTED</div>
        <h2 className="section-title dark-text">Enquiry Form</h2>
        <div className="section-divider"></div>
      </div>
      <div className="enquiry-card">
        <div className="enquiry-side">
          <h2>Enquire Now</h2>
          <p>
            Select your domain and start your professional journey with <strong>JD Solutions</strong>.
          </p>

          <ul className="enquiry-perks">
            <li>
              <span className="enquiry-perks-check">✓</span>
              24/7 Support
            </li>
            <li>
              <span className="enquiry-perks-check">✓</span>
              Expert Guidance
            </li>
            <li>
              <span className="enquiry-perks-check">✓</span>
              Industry Curriculum
            </li>
          </ul>
        </div>

        <div className="enquiry-form-wrap">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                placeholder="Jay Deshmukh"
                className="form-input"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="form-input"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  placeholder="+91 83080 35049"
                  className="form-input"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Domain</label>
              <select
                name="domain"
                className="form-select"
                value={formData.domain}
                onChange={(e) => setFormData({...formData, domain: e.target.value})}
              >
                {domains.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="form-radio-group">
              <label className="form-radio">
                <input
                  type="radio"
                  name="type"
                  value="Course"
                  checked={formData.type === 'Course'}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                />
                <span>Course</span>
              </label>
              <label className="form-radio">
                <input
                  type="radio"
                  name="type"
                  value="Internship"
                  checked={formData.type === 'Internship'}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                />
                <span>Internship</span>
              </label>
              <label className="form-radio">
                <input
                  type="radio"
                  name="type"
                  value="Corporate Training"
                  checked={formData.type === 'Corporate Training'}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                />
                <span>Corporate Training</span>
              </label>
            </div>

            <button type="submit" className="form-submit-btn">
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
