const express = require('express');
const router = express.Router();
const education = require('./education');

router.use(education);

module.exports = router;
