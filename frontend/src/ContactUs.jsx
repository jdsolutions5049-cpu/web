import React, { useState } from 'react';
import axios from 'axios';
import { buildApiUrl } from './api';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(buildApiUrl('/api/contact'), formData);
      alert("Message Sent! Jay Dynamic Solutions pvt will contact you soon.");
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert("Unable to send message right now. Please try again later.");
    }
  };

  return (
    <section className="section-contact">
      <div className="section-header">
        <div className="section-subtitle">CONTACT US</div>
        <h2 className="section-title dark-text">Get In Touch</h2>
        <div className="section-divider"></div>
        <p className="section-desc">
          Let's build something amazing together. Reach out for expert IT consultations or internship queries.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>
            We're here to help and answer any question you might have. We look forward to hearing from you!
          </p>

          <div className="contact-items">
            <div className="contact-item">
              <div className="contact-item-icon"><i className="bi bi-telephone-fill"></i></div>
              <div>
                <div className="contact-item-label">Call Us</div>
                <div className="contact-item-value">+91 83080 35049</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon"><i className="bi bi-envelope-fill"></i></div>
              <div>
                <div className="contact-item-label">Email Us</div>
                <div className="contact-item-value">jdsolutions5049@gmail.com</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon"><i className="bi bi-geo-alt-fill"></i></div>
              <div>
                <div className="contact-item-label">Location</div>
                <div className="contact-item-value">Shop No. 113, 1st Floor, Rainbow Crossroad, Behind McDonald's, Bakori Phata, Wagholi, Pune.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <h3>Need IT Services?</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                placeholder="Describe your project or inquiry..."
                rows="4"
                className="form-input contact-textarea"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>

            <button type="submit" className="contact-submit-btn">
              Request a Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
