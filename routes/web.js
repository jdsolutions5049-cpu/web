const express = require('express');
const pages = require('../controllers/pageController');
const submissions = require('../controllers/submissionController');
const admin = require('../controllers/adminController');
const { loginRateLimiter, submissionRateLimiter } = require('../middleware/security');
const SiteSetting = require('../models/SiteSetting');

const router = express.Router();
router.get('/', pages.home);
router.get('/internships', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  pages.internshipsPage(req, res, next);
});
router.get('/courses', async (req, res, next) => {
  const settings = await SiteSetting.findOne({ key: 'main' }).lean();
  if (!settings?.coursesEnabled) return res.status(404).render('error', { message: 'Courses page is currently unavailable.' });
  next();
}, pages.courses);
router.get('/career-acceleration', pages.careerAcceleration);
router.get('/services', pages.page('services'));
router.get('/corporate-training', pages.page('corporate-training'));
router.get('/college-training', async (req, res, next) => {
  const settings = await SiteSetting.findOne({ key: 'main' }).lean();
  if (!settings?.collegeTrainingEnabled) return res.status(404).render('error', { message: 'College Training page is currently unavailable.' });
  next();
}, pages.page('college-training'));
router.post('/admin/settings/college-training', admin.requireLogin, admin.updateCollegeTrainingVisibility);
router.post('/admin/settings/courses', admin.requireLogin, admin.updateCoursesVisibility);
router.get('/about', pages.page('about'));
router.get('/about-us', (req, res) => res.redirect(301, '/about'));
router.get('/contact', pages.page('contact'));
router.get('/contact-us', (req, res) => res.redirect(301, '/contact'));
router.get('/jds-sat', pages.sat);
router.post('/contact', submissionRateLimiter, submissions.contact);
router.post('/enquiry', submissionRateLimiter, submissions.enquiry);
router.get('/admin', admin.requireLogin, admin.data, pages.adminDashboard);
router.post('/admin/login', loginRateLimiter, admin.login);
router.post('/admin/logout', admin.logout);
router.get('/admin/data', admin.requireLogin, admin.data, pages.adminDashboard);
router.post('/admin/settings/sat', admin.requireLogin, admin.updateSatVisibility);
router.post('/admin/settings/sat-timer', admin.requireLogin, admin.updateSatTimer);
router.post('/admin/career/jobs', admin.requireLogin, admin.createCareerJob);
router.post('/admin/career/jobs/:jobId/delete', admin.requireLogin, admin.deleteCareerJob);
router.post('/admin/delete/:collection/:id', admin.requireLogin, admin.delete);
router.use(pages.notFound);
module.exports = router;
