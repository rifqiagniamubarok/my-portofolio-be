const express = require('express');
const router = express.Router();
const educationControllers = require('../../controllers/education');

router.get('/', educationControllers.getEducations);
router.get('/:id', educationControllers.getDetailEducation);
router.post('/', educationControllers.createEducation);
router.delete('/:id', educationControllers.deleteEducation);
router.patch('/:id', educationControllers.updateEducation);

module.exports = router;
