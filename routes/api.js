const express = require('express');
const api = require('../controllers/apiController');
const { loginRateLimiter, submissionRateLimiter } = require('../middleware/security');

const router = express.Router();

router.get('/health', api.health);
router.post('/contact', submissionRateLimiter, api.contact);
router.post('/enquiry', submissionRateLimiter, api.enquiry);
router.post('/admin/login', loginRateLimiter, api.login);
router.get('/admin/enquiries', api.requireAdmin, api.enquiries);
router.get('/admin/contacts', api.requireAdmin, api.contacts);
router.delete('/admin/:collection/:id', api.requireAdmin, api.remove);

module.exports = router;
