const Contact = require('../models/Contact');
const Enquiry = require('../models/Enquiry');
const SiteSetting = require('../models/SiteSetting');

exports.requireLogin = (req, res, next) => {
  if (!req.session.admin) return res.render('admin-login', { title: 'Admin Login', error: null });
  next();
};

exports.login = (req, res) => {
  const valid = req.body.username === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD;
  if (!valid) return res.status(401).render('admin-login', { title: 'Admin Login', error: 'Invalid credentials.' });
  req.session.admin = true;
  res.redirect('/admin');
};

exports.logout = (req, res) => req.session.destroy(() => res.redirect('/admin'));

exports.data = async (req, res, next) => {
  try {
    const [enquiries, contacts, siteSettings] = await Promise.all([
      Enquiry.find().sort({ createdAt: -1 }).lean(),
      Contact.find().sort({ createdAt: -1 }).lean(),
      SiteSetting.findOne({ key: 'main' }).lean(),
    ]);
    req.adminData = { enquiries, contacts };
    req.siteSettings = siteSettings || { satEnabled: true };
    next();
  } catch (error) { next(error); }
};

exports.updateSatVisibility = async (req, res, next) => {
  try {
    await SiteSetting.findOneAndUpdate(
      { key: 'main' },
      { $set: { satEnabled: req.body.satEnabled === 'on' } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.redirect('/admin?view=sat');
  } catch (error) { next(error); }
};

exports.delete = async (req, res, next) => {
  try {
    const Model = req.params.collection === 'contacts' ? Contact : Enquiry;
    await Model.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (error) { next(error); }
};
