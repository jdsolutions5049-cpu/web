const Contact = require('../models/Contact');
const Enquiry = require('../models/Enquiry');
const SiteSetting = require('../models/SiteSetting');
const mongoose = require('mongoose');
const crypto = require('crypto');
const { sameToken } = require('../middleware/security');

exports.requireLogin = (req, res, next) => {
  if (!req.session.admin) return res.render('admin-login', { title: 'Admin Login', error: null });
  if (!req.session.csrfToken) req.session.csrfToken = crypto.randomBytes(32).toString('hex');
  res.locals.csrfToken = req.session.csrfToken;
  next();
};

exports.login = (req, res, next) => {
  const valid = sameToken(req.body.username, process.env.ADMIN_USERNAME) && sameToken(req.body.password, process.env.ADMIN_PASSWORD);
  if (!valid) return res.status(401).render('admin-login', { title: 'Admin Login', error: 'Invalid credentials.' });
  req.session.regenerate(error => {
    if (error) return next(error);
    req.session.admin = true;
    req.session.csrfToken = crypto.randomBytes(32).toString('hex');
    req.session.save(saveError => saveError ? next(saveError) : res.redirect('/admin'));
  });
};

exports.logout = (req, res, next) => req.session.destroy(error => {
  if (error) return next(error);
  res.clearCookie(process.env.NODE_ENV === 'production' ? '__Host-jds.sid' : 'jds.sid', {
    httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/',
  });
  res.redirect('/admin');
});

exports.data = async (req, res, next) => {
  const fallbackSettings = { satEnabled: true, satCountdownEnabled: false, satCountdownAt: null, careerJobs: [] };
  if (SiteSetting.db.readyState !== 1) {
    req.adminData = { enquiries: [], contacts: [] };
    req.siteSettings = fallbackSettings;
    req.adminDatabaseAvailable = false;
    req.adminDatabaseNotice = 'The database is currently unavailable. Enquiries and saved settings cannot be loaded until the connection is restored.';
    return next();
  }
  try {
    const [enquiries, contacts, siteSettings] = await Promise.all([
      Enquiry.find().sort({ createdAt: -1 }).lean(),
      Contact.find().sort({ createdAt: -1 }).lean(),
      SiteSetting.findOne({ key: 'main' }).lean(),
    ]);
    req.adminData = { enquiries, contacts };
    req.siteSettings = siteSettings || { satEnabled: true, satCountdownEnabled: false, satCountdownAt: null, careerJobs: [] };
    req.adminDatabaseAvailable = true;
    next();
  } catch (error) {
    console.warn('Admin dashboard data could not be loaded:', error.message);
    req.adminData = { enquiries: [], contacts: [] };
    req.siteSettings = fallbackSettings;
    req.adminDatabaseAvailable = false;
    req.adminDatabaseNotice = 'The database could not be reached. Enquiries and saved settings are temporarily unavailable.';
    next();
  }
};

exports.updateSatVisibility = async (req, res, next) => {
  try {
    if (SiteSetting.db.readyState !== 1) return res.redirect('/admin?view=sat&error=Database+unavailable.+The+SAT+page+setting+was+not+saved.');
    await SiteSetting.findOneAndUpdate(
      { key: 'main' },
      { $set: { satEnabled: req.body.satEnabled === 'on' } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.redirect('/admin?view=sat');
  } catch (error) { next(error); }
};

exports.updateSatTimer = async (req, res, next) => {
  try {
    if (SiteSetting.db.readyState !== 1) return res.redirect('/admin?view=sat&error=Database+unavailable.+The+countdown+setting+was+not+saved.');
    const enabled = req.body.satCountdownEnabled === 'on';
    const dateInput = String(req.body.satCountdownAt || '').trim();
    let countdownAt;
    if (enabled) {
      if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateInput)) {
        return res.redirect('/admin?view=sat&error=Choose+a+valid+countdown+date+and+time.');
      }
      countdownAt = new Date(`${dateInput}:00+05:30`);
      if (Number.isNaN(countdownAt.getTime()) || countdownAt <= new Date()) {
        return res.redirect('/admin?view=sat&error=Countdown+date+must+be+in+the+future.');
      }
    }
    const update = { satCountdownEnabled: enabled };
    if (countdownAt) update.satCountdownAt = countdownAt;
    await SiteSetting.findOneAndUpdate(
      { key: 'main' },
      { $set: update },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.redirect('/admin?view=sat');
  } catch (error) { next(error); }
};

exports.createCareerJob = async (req, res, next) => {
  try {
    if (SiteSetting.db.readyState !== 1) return res.redirect('/admin?view=recruitment&error=Database+unavailable.+The+career+opening+was+not+saved.');
    const job = {
      title: String(req.body.title || '').trim(),
      department: String(req.body.department || '').trim(),
      employmentType: String(req.body.employmentType || '').trim(),
      location: String(req.body.location || '').trim(),
      description: String(req.body.description || '').trim(),
      applyUrl: String(req.body.applyUrl || '').trim(),
      isActive: req.body.isActive === 'on',
    };
    if (!job.title || !job.employmentType || !job.location || !job.description) {
      return res.redirect('/admin?view=recruitment&error=Complete+the+required+job+details.');
    }
    if (job.applyUrl && !/^(https:\/\/|mailto:)[^\s]+$/i.test(job.applyUrl)) {
      return res.redirect('/admin?view=recruitment&error=Application+link+must+start+with+https%3A%2F%2F+or+mailto%3A.');
    }
    const settings = await SiteSetting.findOneAndUpdate(
      { key: 'main' }, { $setOnInsert: { key: 'main' } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    if (!settings.careerJobs) settings.careerJobs = [];
    settings.careerJobs.push(job);
    await settings.save();
    res.redirect('/admin?view=recruitment');
  } catch (error) { next(error); }
};

exports.deleteCareerJob = async (req, res, next) => {
  try {
    if (SiteSetting.db.readyState !== 1) return res.redirect('/admin?view=recruitment&error=Database+unavailable.+The+career+opening+was+not+removed.');
    const settings = await SiteSetting.findOne({ key: 'main' });
    const job = settings?.careerJobs?.id(req.params.jobId);
    if (job) {
      job.deleteOne();
      await settings.save();
    }
    res.redirect('/admin?view=recruitment');
  } catch (error) { next(error); }
};

exports.delete = async (req, res, next) => {
  try {
    if (Enquiry.db.readyState !== 1) return res.redirect('/admin?error=Database+unavailable.+The+entry+was+not+removed.');
    if (!['contacts', 'enquiries'].includes(req.params.collection) || !mongoose.isValidObjectId(req.params.id)) {
      return res.redirect('/admin?error=Invalid+record+identifier.');
    }
    const Model = req.params.collection === 'contacts' ? Contact : Enquiry;
    await Model.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (error) { next(error); }
};
