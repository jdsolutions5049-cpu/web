const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  domain: { type: String, required: true },
  type: { type: String, required: true },
  source: { type: String, default: 'Website' },
  college: { type: String, default: '' },
  course: { type: String, default: '' },
  branch: { type: String, default: '' },
  year: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  resume: { type: String, default: '' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Enquiry', enquirySchema);
