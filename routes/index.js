const express = require('express');
const router = express.Router();

const { ensureAuth, ensureGuest } = require('../middlewares/auth');
const Story = require('../models/Story');

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ use: req.user.id }).lean();
    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render('errors/500');
  }
});

module.exports = router;
