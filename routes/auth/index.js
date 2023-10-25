const express = require('express');
const router = express.Router();
const authControllers = require('../../controllers/auth');
const { login } = authControllers;

router.post('/login', login);

module.exports = router;
