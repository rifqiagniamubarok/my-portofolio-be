const express = require('express');
const router = express.Router();
const work = require('./work');

router.use(work);

module.exports = router;
