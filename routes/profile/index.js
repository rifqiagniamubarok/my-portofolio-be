const express = require('express');
const router = express.Router();

const profileControllers = require('../../controllers/profile');
const { getProfile, updateProfile } = profileControllers;

const Auth = require('../../middlewares/auth');

router.get('/', getProfile);
router.patch('/', updateProfile);

module.exports = router;
