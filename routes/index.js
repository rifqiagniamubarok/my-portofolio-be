const express = require('express');
const router = express.Router();
const auth = require('./auth');

const profile = require('./profile');
const education = require('./education');

const Auth = require('../middlewares/auth');

router.use('/auth', auth);
router.use('/profile', Auth, profile);
router.use('/education', Auth, education);

module.exports = router;
