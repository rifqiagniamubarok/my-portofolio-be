const express = require('express');
const router = express.Router();
const postControllers = require('../../controllers/post');

router.get('/', postControllers.getPosts);
router.get('/:id', postControllers.getPost);
router.post('/', postControllers.createPost);
router.patch('/:id', postControllers.updatePost);
router.delete('/:id', postControllers.deletePost);

router.post('/publish/:id', postControllers.publish);

module.exports = router;
