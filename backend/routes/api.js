const express = require('express');
const Contact = require('../models/Contact');
const Enquiry = require('../models/Enquiry');

const router = express.Router();

router.get('/health', (req, res) => {
  res.send('OK');
});

router.post('/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send('Message received!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to save contact message.');
  }
});

router.post('/enquiry', async (req, res) => {
  try {
    const payload = { ...req.body };
    const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
    const phone = typeof payload.phone === 'string' ? payload.phone.replace(/\D/g, '') : '';

    if (payload.source === 'JDS-SAT') {
      const existing = await Enquiry.findOne({
        source: 'JDS-SAT',
        $or: [{ email }, { phone }],
      }).select('email phone').lean();

      if (existing) {
        const duplicateFields = [];
        if (existing.email === email) duplicateFields.push('email address');
        if (existing.phone === phone) duplicateFields.push('mobile number');
        return res.status(409).send(`A registration already exists with this ${duplicateFields.join(' and ')}.`);
      }
    }

    payload.email = email;
    payload.phone = phone;
    const enquiry = new Enquiry(payload);
    await enquiry.save();
    res.status(201).send('Enquiry submitted!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to save enquiry.');
  }
});

router.post('/admin/login', (req, res) => {
  const username = process.env.ADMIN_USERNAME || 'Jd@123';
  const password = process.env.ADMIN_PASSWORD || 'Siks@4080';
  const { username: inputUser, password: inputPassword } = req.body;

  if (inputUser === username && inputPassword === password) {
    return res.send('Successful');
  }

  return res.status(401).send('Invalid Credentials');
});

router.get('/admin/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json([]);
  }
});

router.get('/admin/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json([]);
  }
});

router.delete('/admin/enquiries/:id', async (req, res) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Enquiry not found.');
    res.send('Enquiry deleted.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to delete enquiry.');
  }
});

router.delete('/admin/contacts/:id', async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Contact not found.');
    res.send('Contact deleted.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to delete contact.');
  }
});

module.exports = router;
