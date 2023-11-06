const express = require('express');
const router = express.Router();
const tagConrollers = require('../../controllers/tag');

router.get('/', tagConrollers.getTags);
router.get('/:id', tagConrollers.getDetailTag);
router.post('/', tagConrollers.createTag);
router.patch('/:id', tagConrollers.updateTag);
router.delete('/:id', tagConrollers.deleteTag);

module.exports = router;
