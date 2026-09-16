const Contact = require('../models/Contact');
const Enquiry = require('../models/Enquiry');

exports.health = (req, res) => res.send('OK');
exports.requireAdmin = (req, res, next) => {
  if (!req.session || !req.session.admin) {
    return res.status(401).json({ error: 'Unauthorized. Admin session required.' });
  }
  next();
};
exports.contact = async (req, res, next) => { try { await new Contact(req.body).save(); res.status(201).send('Message received!'); } catch (error) { next(error); } };
exports.enquiry = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
    const phone = typeof payload.phone === 'string' ? payload.phone.replace(/\D/g, '') : '';
    if (payload.source === 'JDS-SAT') {
      const existing = await Enquiry.findOne({ source: 'JDS-SAT', $or: [{ email }, { phone }] }).select('email phone').lean();
      if (existing) {
        const duplicateFields = [];
        if (existing.email === email) duplicateFields.push('email address');
        if (existing.phone === phone) duplicateFields.push('mobile number');
        return res.status(409).send(`A registration already exists with this ${duplicateFields.join(' and ')}.`);
      }
    }
    payload.email = email; payload.phone = phone;
    await new Enquiry(payload).save();
    res.status(201).send('Enquiry submitted!');
  } catch (error) { next(error); }
};
exports.login = (req, res) => {
  const valid = req.body.username === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD;
  return valid ? res.send('Successful') : res.status(401).send('Invalid Credentials');
};
exports.enquiries = async (req, res, next) => { try { res.json(await Enquiry.find().sort({ createdAt: -1 })); } catch (error) { next(error); } };
exports.contacts = async (req, res, next) => { try { res.json(await Contact.find().sort({ createdAt: -1 })); } catch (error) { next(error); } };
exports.remove = async (req, res, next) => {
  try {
    const Model = req.params.collection === 'contacts' ? Contact : Enquiry;
    const deleted = await Model.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Record not found.');
    res.send('Record deleted.');
  } catch (error) { next(error); }
};
