const Contact = require('../models/Contact');
const Enquiry = require('../models/Enquiry');

exports.contact = async (req, res, next) => {
  try {
    const contact = {
      name: typeof req.body.name === 'string' ? req.body.name.trim().slice(0, 120) : '',
      email: typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase().slice(0, 254) : '',
      message: typeof req.body.message === 'string' ? req.body.message.trim().slice(0, 5000) : '',
    };
    if (!contact.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) || !contact.message) {
      return res.status(400).render('error', { message: 'Please provide a name, valid email address, and message.' });
    }
    await new Contact(contact).save();
    res.redirect('/?message=' + encodeURIComponent('Message sent successfully.'));
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
      type: text('type', 80) || source,
      source,
      college: text('college', 160) || text('organization', 160),
      course: text('course', 120), branch: text('branch', 120),
      year: text('year', 40), city: text('city', 120), state: text('state', 120),
      resume: text('resume', 500),
    };

    if (!payload.fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || phone.length < 7 || phone.length > 15) {
      return res.status(400).render('error', { message: 'Please provide your name, a valid email address, and a valid phone number.' });
    }

    if (payload.source === 'JDS-SAT') {
      const existing = await Enquiry.findOne({ source: 'JDS-SAT', $or: [{ email }, { phone }] }).select('email phone').lean();
      if (existing) return res.redirect('/jds-sat?message=' + encodeURIComponent('A registration already exists with this email address or mobile number.'));
    }
    await new Enquiry(payload).save();
    const allowedReturnPaths = new Set(['/', '/career-acceleration', '/courses', '/services', '/corporate-training', '/college-training', '/about', '/contact']);
    const returnTo = text('returnTo', 80);
    const target = payload.source === 'JDS-SAT' ? '/jds-sat' : (allowedReturnPaths.has(returnTo) ? returnTo : '/');
    res.redirect(target + '?message=' + encodeURIComponent('Your enquiry was submitted successfully.'));
  } catch (error) { next(error); }
};
