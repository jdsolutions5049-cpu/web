const mongoose = require('mongoose');

const careerJobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  department: { type: String, trim: true, maxlength: 80 },
  employmentType: { type: String, required: true, trim: true, maxlength: 50 },
  location: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, trim: true, maxlength: 1200 },
  applyUrl: { type: String, trim: true, maxlength: 300 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const siteSettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  satEnabled: { type: Boolean, default: true },
  satCountdownEnabled: { type: Boolean, default: false },
  satCountdownAt: { type: Date, default: null },
  careerJobs: { type: [careerJobSchema], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
