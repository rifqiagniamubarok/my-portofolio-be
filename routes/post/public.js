const express = require('express');
const router = express.Router();
const postControllers = require('../../controllers/post/public');

router.get('/', postControllers.getPosts);
router.get('/:slug', postControllers.getPost);

module.exports = router;
