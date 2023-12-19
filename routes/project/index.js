const express = require('express');
const router = express.Router();

const projectController = require('../../controllers/project');

router.get('/', projectController.getAll);
router.get('/:id', projectController.getDetail);
router.post('/', projectController.createData);
router.patch('/:id', projectController.updateData);
router.post('/publish/:id', projectController.publishData);
router.post('/unpublish/:id', projectController.unPublishData);

module.exports = router;
