const express = require('express');
const router = express.Router();
const educationControllers = require('../../controllers/education');

router.get('/', educationControllers.getEducations);
router.post('/', educationControllers.createEducation);

module.exports = router;
