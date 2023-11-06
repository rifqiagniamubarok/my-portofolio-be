const express = require('express');
const router = express.Router();
const workControllers = require('../../controllers/work');
const auth = require('../../middlewares/auth');

router.get('/', workControllers.getWorks);
router.get('/:id', workControllers.getDetailWork);
router.post('/', auth, workControllers.createWork);
router.delete('/:id', auth, workControllers.deleteWork);
router.patch('/:id', auth, workControllers.updateWork);

module.exports = router;
