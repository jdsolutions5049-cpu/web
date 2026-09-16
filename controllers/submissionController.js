const Contact = require('../models/Contact');
const Enquiry = require('../models/Enquiry');

exports.contact = async (req, res, next) => {
  try {
    await new Contact(req.body).save();
    res.redirect('/?message=' + encodeURIComponent('Message sent successfully.'));
  } catch (error) { next(error); }
};

exports.enquiry = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
    const phone = typeof payload.phone === 'string' ? payload.phone.replace(/\D/g, '') : '';

    payload.type = payload.type || payload.source || 'General Enquiry';
    payload.domain = payload.domain || payload.organization || 'General';
    payload.source = payload.source || 'Website';

    if (payload.source === 'JDS-SAT') {
      const existing = await Enquiry.findOne({ source: 'JDS-SAT', $or: [{ email }, { phone }] }).select('email phone').lean();
      if (existing) return res.redirect('/jds-sat?message=' + encodeURIComponent('A registration already exists with this email address or mobile number.'));
    }
    payload.email = email;
    payload.phone = phone;
    await new Enquiry(payload).save();
    const target = payload.source === 'JDS-SAT' ? '/jds-sat' : (payload.returnTo || '/');
    res.redirect(target + '?message=' + encodeURIComponent('Your enquiry was submitted successfully.'));
  } catch (error) { next(error); }
};
