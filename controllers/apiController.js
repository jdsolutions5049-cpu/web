const Contact = require('../models/Contact');
const Enquiry = require('../models/Enquiry');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { sameToken } = require('../middleware/security');

exports.health = (req, res) => res.send('OK');
exports.requireAdmin = (req, res, next) => {
  if (!req.session || !req.session.admin) {
    return res.status(401).json({ error: 'Unauthorized. Admin session required.' });
  }
  next();
};
exports.contact = async (req, res, next) => {
  try {
    const contact = {
      name: typeof req.body.name === 'string' ? req.body.name.trim().slice(0, 120) : '',
      email: typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase().slice(0, 254) : '',
      message: typeof req.body.message === 'string' ? req.body.message.trim().slice(0, 5000) : '',
    };
    if (!contact.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) || !contact.message) {
      return res.status(400).json({ error: 'A name, valid email address, and message are required.' });
    }
    await new Contact(contact).save();
    res.status(201).json({ message: 'Message received.' });
  } catch (error) { next(error); }
};
exports.enquiry = async (req, res, next) => {
  try {
    const text = (key, maxLength) => typeof req.body[key] === 'string' ? req.body[key].trim().slice(0, maxLength) : '';
    const email = text('email', 254).toLowerCase();
    const phone = text('phone', 32).replace(/\D/g, '').slice(0, 15);
    const source = text('source', 80) || 'Website';
    const payload = {
      fullName: text('fullName', 120), email, phone,
      domain: text('domain', 120) || text('organization', 120) || 'General',
      type: text('type', 80) || source, source,
      college: text('college', 160) || text('organization', 160),
      course: text('course', 120), branch: text('branch', 120),
      year: text('year', 40), city: text('city', 120), state: text('state', 120),
      resume: text('resume', 500),
    };
    if (!payload.fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length < 7) {
      return res.status(400).json({ error: 'A name, valid email address, and valid phone number are required.' });
    }
    if (payload.source === 'JDS-SAT') {
      const existing = await Enquiry.findOne({ source: 'JDS-SAT', $or: [{ email }, { phone }] }).select('email phone').lean();
      if (existing) {
        const duplicateFields = [];
        if (existing.email === email) duplicateFields.push('email address');
        if (existing.phone === phone) duplicateFields.push('mobile number');
        return res.status(409).send(`A registration already exists with this ${duplicateFields.join(' and ')}.`);
      }
    }
    await new Enquiry(payload).save();
    res.status(201).send('Enquiry submitted!');
  } catch (error) { next(error); }
};
exports.login = (req, res, next) => {
  const valid = sameToken(req.body.username, process.env.ADMIN_USERNAME) && sameToken(req.body.password, process.env.ADMIN_PASSWORD);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });
  req.session.regenerate(error => {
    if (error) return next(error);
    req.session.admin = true;
    req.session.csrfToken = crypto.randomBytes(32).toString('hex');
    req.session.save(saveError => saveError ? next(saveError) : res.json({ status: 'ok', csrfToken: req.session.csrfToken }));
  });
};
exports.enquiries = async (req, res, next) => { try { res.json(await Enquiry.find().sort({ createdAt: -1 })); } catch (error) { next(error); } };
exports.contacts = async (req, res, next) => { try { res.json(await Contact.find().sort({ createdAt: -1 })); } catch (error) { next(error); } };
exports.remove = async (req, res, next) => {
  try {
    if (!['contacts', 'enquiries'].includes(req.params.collection) || !mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid record identifier.' });
    }
    const Model = req.params.collection === 'contacts' ? Contact : Enquiry;
    const deleted = await Model.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Record not found.');
    res.send('Record deleted.');
  } catch (error) { next(error); }
};
