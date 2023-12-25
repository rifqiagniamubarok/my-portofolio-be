const express = require('express');
const router = express.Router();

const { getProject, getProjects } = require('../../controllers/project/public');

router.get('/', getProjects);
router.get('/:slug', getProject);

module.exports = router;
