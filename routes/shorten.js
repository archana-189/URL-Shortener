const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const protect = require('../middleware/authMiddleware');
function generateShort() {
  return Math.random().toString(36).substring(2, 8);
}

router.get('/dashboard', protect, async (req, res) => {
  const urls = await Url.find({ createdBy: req.user.id });
  res.render('dashboard', { urls });
});

router.post('/shorten', protect, async (req, res) => {
  const shortUrl = generateShort();
  await Url.create({
    originalUrl: req.body.url,
    shortUrl,
    createdBy: req.user.id
  });
  res.redirect('/dashboard');
});

module.exports = router;